"use client";

import React, { useState, useEffect } from "react";
import { GameTheme, getRandomTheme } from "@/lib/themes";
import { useGameState } from "@/hooks/useGameState";
import GameBoard from "./GameBoard";
import FoundWordsList from "./FoundWordsList";
import ProgressBar from "./ProgressBar";
import Toast from "./Toast";

const GRID_SIZE = 4;

export default function GameContainer() {
  const [theme, setTheme] = useState<GameTheme | null>(null);
  const [showHint, setShowHint] = useState(false);

  const {
    grid,
    selectedPath,
    foundWords,
    score,
    isDragging,
    toast,
    currentWord,
    totalWords,
    progress,
    isLoaded,
    handleCellEnter,
    handleCellDown,
    handleDragEnd,
    startNewGame,
  } = useGameState(GRID_SIZE);

  // Pick a random theme on mount
  useEffect(() => {
    setTheme(getRandomTheme());
  }, []);

  if (!theme || !grid || !isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 gap-4">
        <div className="text-3xl font-heading font-bold text-neutral-300 animate-load-pulse tracking-wider">
          SCWERDIALITY
        </div>
        <div className="text-neutral-500 text-sm animate-pulse">
          Loading, hold ya horses...
        </div>
      </div>
    );
  }

  // Show hint: reveal one unfound word
  const unfoundWords = grid.validWords.filter((w) => !foundWords.includes(w));
  const hintWord = unfoundWords.length > 0 ? unfoundWords[Math.floor(Math.random() * unfoundWords.length)] : null;

  return (
    <div
      className={`min-h-screen ${theme.bgClass} transition-colors duration-500`}
      style={theme.bgPattern ? { ...parseStyle(theme.bgPattern) } : {}}
    >
      {/* Overlay for readability */}
      <div className={`min-h-screen ${theme.overlayClass}`}>
        {/* Toast notification */}
        {toast && <Toast message={toast.text} type={toast.type} theme={theme} />}

        <div className="max-w-md mx-auto px-4 sm:px-5 py-5 sm:py-8 flex flex-col gap-4 sm:gap-5">
          {/* Header */}
          <header className="text-center space-y-1">
            <h1
              className={`text-3xl sm:text-4xl font-heading font-bold tracking-widest ${theme.titleText}`}
              style={{ letterSpacing: "0.15em" }}
            >
              SCWERDIALITY
            </h1>
            <p className={`text-xs sm:text-sm ${theme.subtitleText} tracking-wide`}>
              Aussie Word Search for Cheeky Legends
            </p>
            <p className={`text-[10px] sm:text-xs ${theme.subtitleText} opacity-50`}>
              18+ Only &middot; {theme.name}
            </p>
          </header>

          {/* Score & Words row */}
          <div className={`flex items-stretch gap-3`}>
            <div className={`flex-1 rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3 ${theme.containerClass}`}>
              <span className={`text-[10px] sm:text-xs uppercase tracking-wider ${theme.subtitleText}`}>Score</span>
              <p className={`text-2xl sm:text-3xl font-heading font-bold tabular-nums ${theme.titleText}`}>
                {score}
              </p>
            </div>
            <div className={`flex-1 rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3 text-right ${theme.containerClass}`}>
              <span className={`text-[10px] sm:text-xs uppercase tracking-wider ${theme.subtitleText}`}>Words</span>
              <p className={`text-2xl sm:text-3xl font-heading font-bold tabular-nums ${theme.titleText}`}>
                {foundWords.length}
                <span className={`text-base sm:text-lg font-normal ${theme.subtitleText}`}>/{totalWords}</span>
              </p>
            </div>
          </div>

          {/* Current word being formed */}
          <div className={`h-10 sm:h-12 flex items-center justify-center rounded-xl ${theme.containerClass} border`}>
            {currentWord ? (
              <span
                className={`text-xl sm:text-2xl font-heading font-bold tracking-[0.2em] uppercase ${theme.titleText}`}
              >
                {currentWord}
              </span>
            ) : (
              <span className={`text-xs sm:text-sm italic ${theme.subtitleText} opacity-70`}>
                Drag to spell a word, mate
              </span>
            )}
          </div>

          {/* Game Board */}
          <div className={`rounded-2xl border p-3 sm:p-4 ${theme.containerClass} shadow-lg`}>
            <GameBoard
              cells={grid.cells}
              size={grid.size}
              selectedPath={selectedPath}
              foundWords={foundWords}
              isDragging={isDragging}
              theme={theme}
              onCellDown={handleCellDown}
              onCellEnter={handleCellEnter}
              onDragEnd={handleDragEnd}
            />
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={progress} theme={theme} />

          {/* Found Words */}
          <FoundWordsList
            foundWords={foundWords}
            totalWords={totalWords}
            theme={theme}
          />

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={startNewGame}
              className={`flex-1 py-2.5 sm:py-3 rounded-xl font-heading font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover} shadow-md hover:shadow-lg`}
            >
              New Board
            </button>
            <button
              onClick={() => setShowHint((prev) => !prev)}
              className={`flex-1 py-2.5 sm:py-3 rounded-xl font-heading font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 border ${theme.containerClass} ${theme.panelText} hover:opacity-80`}
            >
              {showHint ? "Hide Hint" : "Give Us a Hint"}
            </button>
          </div>

          {/* Hint display */}
          {showHint && hintWord && (
            <div className={`text-center rounded-xl border p-3 sm:p-4 ${theme.containerClass} animate-chip-in`}>
              <p className={`text-[10px] sm:text-xs uppercase tracking-wider ${theme.subtitleText}`}>Try looking for</p>
              <p
                className={`text-xl sm:text-2xl font-heading font-bold uppercase tracking-[0.25em] mt-1 ${theme.titleText}`}
              >
                {hintWord[0]}{"_".repeat(hintWord.length - 2)}{hintWord[hintWord.length - 1]}
              </p>
              <p className={`text-[10px] sm:text-xs ${theme.subtitleText} mt-0.5`}>({hintWord.length} letters)</p>
            </div>
          )}

          {/* Footer */}
          <footer className={`text-center text-[10px] sm:text-xs ${theme.subtitleText} opacity-40 pb-6`}>
            Built for cheeky Aussies &middot; Not for the faint-hearted
          </footer>
        </div>
      </div>
    </div>
  );
}

// Parse inline CSS string into a React style object
function parseStyle(cssString: string): React.CSSProperties {
  const style: Record<string, string> = {};
  const declarations = cssString.split(";").filter(Boolean);
  for (const decl of declarations) {
    const colonIndex = decl.indexOf(":");
    if (colonIndex === -1) continue;
    const prop = decl.slice(0, colonIndex).trim();
    const value = decl.slice(colonIndex + 1).trim();
    // Convert kebab-case to camelCase
    const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    style[camelProp] = value;
  }
  return style as React.CSSProperties;
}
