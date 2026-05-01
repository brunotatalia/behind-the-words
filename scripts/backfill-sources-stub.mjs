#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUESTIONS_PATH = join(__dirname, '..', 'src', 'data', 'questions.json');

const raw = readFileSync(QUESTIONS_PATH, 'utf8');
const questions = JSON.parse(raw);

let touched = 0;
for (const q of questions) {
  if (!Array.isArray(q.sources)) {
    q.sources = [];
    touched++;
  }
  if (typeof q.verified !== 'boolean') {
    q.verified = false;
  }
}

writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2) + '\n');
console.log(`Backfilled ${touched}/${questions.length} questions with empty sources + verified=false.`);
