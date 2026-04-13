'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '@/types/question';
import type { AnswerRecord } from '@/types/game';

interface QuestionReviewProps {
  questions: Question[];
  answers: AnswerRecord[];
}

export function QuestionReview({ questions, answers }: QuestionReviewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-text-secondary mb-3">סקירת שאלות</h3>
      {questions.map((question, index) => {
        const answer = answers[index];
        const isExpanded = expandedId === question.id;

        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : question.id)}
              className="w-full text-start p-3 rounded-xl bg-surface-secondary hover:bg-surface-tertiary transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={answer.isCorrect ? 'text-correct' : 'text-wrong'}>
                  {answer.isCorrect ? '✓' : '✗'}
                </span>
                <span className="text-sm flex-1 line-clamp-1">{question.question_he}</span>
                <span className="text-xs text-text-muted">
                  {answer.isCorrect ? `+${answer.pointsEarned}` : '0'}
                </span>
                <span className="text-text-muted text-xs">{isExpanded ? '▲' : '▼'}</span>
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 mx-2 bg-surface-tertiary rounded-b-xl space-y-2">
                    <div className="font-inter text-sm">
                      <span className="text-correct">✓ </span>
                      <span className="text-accent-light">&quot;{question.songTitle}&quot;</span>
                      <span className="text-text-secondary"> - {question.artist}</span>
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {question.explanation_he}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
