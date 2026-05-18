// Round types for the multi-format gameplay.
// A "round" is one question presentation, but the *format* (mechanic) varies.
// The /play page picks a format per question, builds the round payload, then
// dispatches to the matching component.
//
// Why discriminated union? Each format has very different data needs:
//  - T/F      → one statement + boolean expected answer
//  - 2T1L     → three statements, one is the lie
//  - Heardle  → multiple songs, player picks the right one
//  - YearLad. → one statement with masked year, player picks year
//
// Keeping them as one union lets the page hold "the current round" without
// each format leaking into the others.

import type { Question, Statement } from './question';

export type RoundFormat =
  | 'tf'
  | 'two-truths-one-lie'
  | 'audio-shrinker'
  | 'year-ladder';

// -----------------------------------------------------------------------------
// T/F — the original mechanic
// -----------------------------------------------------------------------------
export interface TrueFalseRound {
  format: 'tf';
  question: Question;
  statement: Statement;
  isStatementTrue: boolean;
}

// -----------------------------------------------------------------------------
// Two Truths One Lie — 3 statements about the same song, player picks the lie
// -----------------------------------------------------------------------------
export interface TwoTruthsOneLieRound {
  format: 'two-truths-one-lie';
  question: Question;
  statements: Statement[]; // length === 3, shuffled, 2 true + 1 false
  lieIndex: number; // index in `statements` of the false one
}

// -----------------------------------------------------------------------------
// Audio Shrinker (Heardle-style) — short clip, guess the song from 4 options
// -----------------------------------------------------------------------------
export interface AudioShrinkerRound {
  format: 'audio-shrinker';
  question: Question; // the correct song
  options: Question[]; // length === 4, includes `question`; shuffled
  correctIndex: number; // index in `options` of the correct song
  /** Initial clip duration (seconds). Each wrong guess extends to the next step. */
  clipStepsSec: number[]; // e.g. [1, 2, 4, 8]
}

// -----------------------------------------------------------------------------
// Year Ladder — show a statement with year masked, player picks year via slider
// -----------------------------------------------------------------------------
export interface YearLadderRound {
  format: 'year-ladder';
  question: Question;
  /** The full statement with the year replaced by a placeholder (e.g. "___" ). */
  maskedStatement: string;
  /** The correct year (what's masked in the statement). */
  correctYear: number;
  /** Range of years the slider should span. */
  minYear: number;
  maxYear: number;
}

// -----------------------------------------------------------------------------
// Union — what /play/page.tsx holds in state
// -----------------------------------------------------------------------------
export type Round =
  | TrueFalseRound
  | TwoTruthsOneLieRound
  | AudioShrinkerRound
  | YearLadderRound;
