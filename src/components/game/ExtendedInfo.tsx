'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '@/types/question';

interface ExtendedInfoProps {
  question: Question;
  align?: 'center' | 'start';
}

export function ExtendedInfo({ question, align = 'center' }: ExtendedInfoProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMoreInfo =
    Boolean(question.extendedInfo_he) || (question.sources?.length ?? 0) > 0;

  useEffect(() => {
    setExpanded(false);
  }, [question.id]);

  if (!hasMoreInfo) return null;

  return (
    <div className={align === 'center' ? 'text-center' : 'text-start'}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded((v) => !v);
        }}
        aria-expanded={expanded}
        aria-controls={`extended-${question.id}`}
        className="inline-flex items-center gap-1 text-sm text-accent-light hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1"
      >
        <span>{expanded ? 'הסתר מידע נוסף' : 'הרחב מידע ומקורות'}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`extended-${question.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden text-start"
          >
            <div className="pt-3 space-y-3">
              {question.extendedInfo_he && (
                <p className="text-text-secondary text-sm leading-relaxed">
                  {question.extendedInfo_he}
                </p>
              )}
              {question.sources && question.sources.length > 0 && (
                <div className="text-xs text-text-secondary space-y-1">
                  <div className="opacity-70 font-medium">מקורות:</div>
                  <ul className="space-y-1">
                    {question.sources.map((s) => {
                      let host = '';
                      try {
                        host = new URL(s.url).hostname.replace(/^www\./, '');
                      } catch {
                        host = s.type;
                      }
                      return (
                        <li key={s.url} className="leading-snug">
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            onClick={(e) => e.stopPropagation()}
                            className="underline decoration-dotted underline-offset-2 hover:text-accent"
                          >
                            {s.title}
                          </a>
                          <span className="opacity-50"> · {host}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
