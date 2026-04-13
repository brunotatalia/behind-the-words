'use client';

import { motion } from 'framer-motion';
import type { Question } from '@/types/question';
import { DifficultyBadge } from './DifficultyBadge';
import { getCategoryInfo } from '@/data/categories';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
}

export function QuestionCard({ question, questionNumber }: QuestionCardProps) {
  const category = getCategoryInfo(question.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-4"
    >
      <div className="flex items-center justify-center gap-2">
        <DifficultyBadge difficulty={question.difficulty} />
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: `${category.color}20`, color: category.color }}
        >
          {category.icon} {category.label}
        </span>
      </div>

      <div className="text-text-muted text-sm">
        שאלה {questionNumber}
      </div>

      <h2 className="text-xl md:text-2xl font-bold leading-relaxed px-2">
        {question.question_he}
      </h2>
    </motion.div>
  );
}
