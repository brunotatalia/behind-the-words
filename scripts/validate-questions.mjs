#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const ALLOWED_TYPES = new Set([
  'wikipedia',
  'songfacts',
  'genius',
  'interview',
  'book',
  'article',
  'official',
]);

const STALE_AFTER_DAYS = 365;
const MIN_SOURCES = 2;

const errors = [];
const warnings = [];

function isValidUrl(value) {
  if (typeof value !== 'string' || value.length === 0) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidIsoDate(value) {
  if (typeof value !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
}

function daysSince(iso) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

const raw = readFileSync(QUESTIONS_PATH, 'utf8');
const questions = JSON.parse(raw);

let unverifiedCount = 0;

for (const q of questions) {
  const id = q.id ?? '<missing-id>';

  if (typeof q.verified !== 'boolean') {
    errors.push(`[${id}] missing required boolean field "verified"`);
  } else if (!q.verified) {
    unverifiedCount++;
  }

  if (!Array.isArray(q.sources)) {
    errors.push(`[${id}] missing required field "sources" (array)`);
    continue;
  }

  if (q.verified === true && q.sources.length < MIN_SOURCES) {
    errors.push(
      `[${id}] verified questions must have at least ${MIN_SOURCES} sources, found ${q.sources.length}`
    );
  }

  q.sources.forEach((s, i) => {
    const where = `[${id}] sources[${i}]`;
    if (!s || typeof s !== 'object') {
      errors.push(`${where}: must be an object`);
      return;
    }
    if (!isValidUrl(s.url)) {
      errors.push(`${where}.url: invalid URL "${s.url}"`);
    }
    if (typeof s.title !== 'string' || s.title.trim() === '') {
      errors.push(`${where}.title: must be a non-empty string`);
    }
    if (!ALLOWED_TYPES.has(s.type)) {
      errors.push(
        `${where}.type: "${s.type}" is not one of ${[...ALLOWED_TYPES].join(', ')}`
      );
    }
    if (!isValidIsoDate(s.accessed)) {
      errors.push(`${where}.accessed: must be ISO date YYYY-MM-DD, got "${s.accessed}"`);
    } else if (daysSince(s.accessed) > STALE_AFTER_DAYS) {
      warnings.push(`${where}.accessed: stale (${daysSince(s.accessed)} days old)`);
    }
  });
}

if (warnings.length > 0) {
  console.warn(`\n⚠️  ${warnings.length} warning(s):`);
  warnings.slice(0, 20).forEach((w) => console.warn('  ' + w));
  if (warnings.length > 20) console.warn(`  ...and ${warnings.length - 20} more`);
}

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} validation error(s):`);
  errors.slice(0, 50).forEach((e) => console.error('  ' + e));
  if (errors.length > 50) console.error(`  ...and ${errors.length - 50} more`);
  console.error(`\nTotal questions: ${questions.length}`);
  process.exit(1);
}

console.log(
  `✅ ${questions.length} questions validated. ${unverifiedCount} marked verified=false (pending audit).`
);
