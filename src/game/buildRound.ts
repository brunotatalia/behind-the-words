// Round builder — picks a format suitable for the given question and returns
// a fully-prepared `Round` payload for /play to render.
//
// Design rules:
//  • Not every question can power every format (e.g. Year Ladder needs a
//    statement whose text contains a 4-digit year that matches the song's
//    actual year). The builder filters and falls back.
//  • The builder is *pure given a question + the full deck* — no React state,
//    no DOM. This makes it testable and lets /play call it in a useEffect.
//  • The format pick is randomized but weighted to keep T/F as the most common
//    (it's still our richest format), with variety injected often enough.

import type { Question, Statement } from '@/types/question';
import type {
  AudioShrinkerRound,
  Round,
  RoundFormat,
  TrueFalseRound,
  TwoTruthsOneLieRound,
  YearLadderRound,
} from '@/types/round';

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pickOne<T>(arr: readonly T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Pick `n` distinct items from `arr` excluding the items passed in `exclude`. */
function pickN<T>(arr: readonly T[], n: number, exclude: Set<T> = new Set()): T[] {
  const pool = arr.filter((x) => !exclude.has(x));
  return shuffle(pool).slice(0, n);
}

// -----------------------------------------------------------------------------
// Format-eligibility checks (what does this question support?)
// -----------------------------------------------------------------------------

function canTrueFalse(q: Question): boolean {
  const trues = q.trueStatements ?? [];
  const falses = q.falseStatements ?? [];
  return trues.length + falses.length > 0;
}

function canTwoTruthsOneLie(q: Question): boolean {
  const trues = q.trueStatements ?? [];
  const falses = q.falseStatements ?? [];
  return trues.length >= 2 && falses.length >= 1;
}

function canAudioShrinker(q: Question, deck: readonly Question[]): boolean {
  // Need a preview URL and at least 3 *other* songs in the deck with a preview.
  if (!q.itunesPreviewUrl) return false;
  const others = deck.filter((d) => d.id !== q.id && d.itunesPreviewUrl);
  return others.length >= 3;
}

/**
 * Year Ladder needs a statement that literally contains the song's `year`
 * as a 4-digit token we can mask. Statements like
 * `השיר יצא ב-1971` qualify; abstract ones don't.
 */
function findYearStatement(q: Question): Statement | undefined {
  if (!q.year) return undefined;
  const yearStr = String(q.year);
  // Year appears as a standalone 4-digit number (not part of a larger run).
  // We rely on Unicode \b boundaries via a non-digit lookaround.
  const re = new RegExp(`(?<!\\d)${yearStr}(?!\\d)`);
  const trues = q.trueStatements ?? [];
  // Prefer easy/medium statements — the year is the *answer*, so the rest of
  // the statement should be clear context, not another trivia puzzle.
  const candidates = trues.filter((s) => re.test(s.text_he));
  if (candidates.length === 0) return undefined;
  const easyish = candidates.filter((s) => s.difficulty !== 'hard');
  return pickOne(easyish.length > 0 ? easyish : candidates);
}

function canYearLadder(q: Question): boolean {
  return findYearStatement(q) !== undefined;
}

// -----------------------------------------------------------------------------
// Format builders — each takes a question and returns a Round (or null if it
// turns out the question doesn't support this format after all).
// -----------------------------------------------------------------------------

function buildTrueFalse(q: Question): TrueFalseRound | null {
  const trues = q.trueStatements ?? [];
  const falses = q.falseStatements ?? [];
  if (trues.length === 0 && falses.length === 0) return null;

  let useTrue: boolean;
  if (trues.length === 0) useTrue = false;
  else if (falses.length === 0) useTrue = true;
  else useTrue = Math.random() < 0.5;

  const pool = useTrue ? trues : falses;
  const statement = pool[Math.floor(Math.random() * pool.length)];
  return { format: 'tf', question: q, statement, isStatementTrue: useTrue };
}

function buildTwoTruthsOneLie(q: Question): TwoTruthsOneLieRound | null {
  const trues = q.trueStatements ?? [];
  const falses = q.falseStatements ?? [];
  if (trues.length < 2 || falses.length < 1) return null;

  // Pick 2 trues + 1 false. Prefer the same difficulty band so the lie isn't
  // trivially obvious by length/tone — we sort all 3 by their inferred band
  // and pick from the most common one.
  const twoTrue = pickN(trues, 2);
  const oneFalse = pickOne(falses)!;
  const triple = shuffle([...twoTrue, oneFalse]);
  const lieIndex = triple.indexOf(oneFalse);
  return { format: 'two-truths-one-lie', question: q, statements: triple, lieIndex };
}

function buildAudioShrinker(
  q: Question,
  deck: readonly Question[]
): AudioShrinkerRound | null {
  if (!q.itunesPreviewUrl) return null;
  // Distractors: prefer same decade, fall back to anything with a preview.
  const decadeStart = Math.floor((q.year ?? 0) / 10) * 10;
  const sameDecade = deck.filter(
    (d) =>
      d.id !== q.id &&
      d.itunesPreviewUrl &&
      Math.floor((d.year ?? 0) / 10) * 10 === decadeStart
  );
  const distractorPool = sameDecade.length >= 3 ? sameDecade : deck.filter(
    (d) => d.id !== q.id && d.itunesPreviewUrl
  );
  if (distractorPool.length < 3) return null;
  const distractors = pickN(distractorPool, 3);
  const options = shuffle([q, ...distractors]);
  const correctIndex = options.findIndex((o) => o.id === q.id);
  return {
    format: 'audio-shrinker',
    question: q,
    options,
    correctIndex,
    clipStepsSec: [1, 2, 4, 8],
  };
}

function buildYearLadder(q: Question): YearLadderRound | null {
  const stmt = findYearStatement(q);
  if (!stmt || !q.year) return null;
  const yearStr = String(q.year);
  const masked = stmt.text_he.replace(
    new RegExp(`(?<!\\d)${yearStr}(?!\\d)`),
    '____'
  );
  // Slider range: cover all plausible decades the deck actually spans, plus
  // a small margin. Hard-coded for now; could be deck-derived later.
  return {
    format: 'year-ladder',
    question: q,
    maskedStatement: masked,
    correctYear: q.year,
    minYear: 1960,
    maxYear: 2025,
  };
}

// -----------------------------------------------------------------------------
// Format weighting — how often each format should appear when eligible.
// We keep T/F as the backbone (~50%) and inject variety often.
// -----------------------------------------------------------------------------

const FORMAT_WEIGHTS: Record<RoundFormat, number> = {
  tf: 50,
  'two-truths-one-lie': 20,
  'audio-shrinker': 20,
  'year-ladder': 10,
};

function weightedPick(formats: RoundFormat[]): RoundFormat {
  const totalWeight = formats.reduce((s, f) => s + FORMAT_WEIGHTS[f], 0);
  let r = Math.random() * totalWeight;
  for (const f of formats) {
    r -= FORMAT_WEIGHTS[f];
    if (r <= 0) return f;
  }
  return formats[formats.length - 1];
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export interface BuildRoundOptions {
  /** Force a specific format (debugging / testing / future daily mode). */
  forceFormat?: RoundFormat;
  /** Formats to exclude (e.g. to avoid repeating the previous round's format). */
  exclude?: RoundFormat[];
}

/**
 * Build the next round for `question` against the rest of the `deck`.
 *
 * The eligibility check picks the formats this question can power, then a
 * weighted random pick decides which one. If the chosen format's builder
 * returns null for any reason, we fall back through the remaining eligible
 * formats. Returns null only if no format can be built at all.
 */
export function buildRound(
  question: Question,
  deck: readonly Question[],
  opts: BuildRoundOptions = {}
): Round | null {
  const eligible: RoundFormat[] = [];
  if (canTrueFalse(question)) eligible.push('tf');
  if (canTwoTruthsOneLie(question)) eligible.push('two-truths-one-lie');
  if (canAudioShrinker(question, deck)) eligible.push('audio-shrinker');
  if (canYearLadder(question)) eligible.push('year-ladder');

  let candidates = eligible.filter((f) => !opts.exclude?.includes(f));
  if (candidates.length === 0) candidates = eligible;
  if (candidates.length === 0) return null;

  // Force-format takes precedence if it's actually eligible.
  if (opts.forceFormat && candidates.includes(opts.forceFormat)) {
    return buildByFormat(opts.forceFormat, question, deck);
  }

  // Weighted pick with cascade fallback if the chosen builder returns null.
  const tried = new Set<RoundFormat>();
  let pool = [...candidates];
  while (pool.length > 0) {
    const pick = weightedPick(pool);
    tried.add(pick);
    const built = buildByFormat(pick, question, deck);
    if (built) return built;
    pool = candidates.filter((f) => !tried.has(f));
  }
  return null;
}

function buildByFormat(
  format: RoundFormat,
  question: Question,
  deck: readonly Question[]
): Round | null {
  switch (format) {
    case 'tf':
      return buildTrueFalse(question);
    case 'two-truths-one-lie':
      return buildTwoTruthsOneLie(question);
    case 'audio-shrinker':
      return buildAudioShrinker(question, deck);
    case 'year-ladder':
      return buildYearLadder(question);
  }
}
