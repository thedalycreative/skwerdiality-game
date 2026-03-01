"use client";

import React from "react";
import { GameTheme } from "@/lib/themes";
import { getWordScore } from "@/lib/dictionary";

interface FoundWordsListProps {
  foundWords: string[];
  totalWords: number;
  theme: GameTheme;
}

export default function FoundWordsList({ foundWords, totalWords, theme }: FoundWordsListProps) {
  // Sort found words: longest first, then alphabetical
  const sortedWords = [...foundWords].sort((a, b) => b.length - a.length || a.localeCompare(b));

  return (
    <div className={`rounded-2xl border ${theme.panelBg} ${theme.panelBorder} p-3 sm:p-4 shadow-md`}>
      <div className="flex items-center justify-between mb-2.5">
        <h3 className={`font-heading font-bold text-sm sm:text-base tracking-wide ${theme.panelText}`}>
          Found Words
        </h3>
        <span className={`text-xs sm:text-sm tabular-nums ${theme.subtitleText}`}>
          {foundWords.length} / {totalWords}
        </span>
      </div>

      {sortedWords.length === 0 ? (
        <p className={`text-xs sm:text-sm italic ${theme.subtitleText} opacity-70`}>
          Drag across letters to find words, ya galah!
        </p>
      ) : (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-44 sm:max-h-64 overflow-y-auto">
          {sortedWords.map((word, idx) => (
            <span
              key={word}
              className={`
                animate-chip-in
                inline-flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-lg
                text-xs sm:text-sm font-heading font-medium
                ${theme.accentBg} ${theme.accentText} ${theme.accentBorder} border
                shadow-sm
              `}
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <span className="uppercase tracking-wide">{word}</span>
              <span className="opacity-50 text-[10px] sm:text-xs">+{getWordScore(word)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
