"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { GridCell, GeneratedGrid, generateGrid, findAllValidWords, isValidPath, isValidWord } from "@/lib/gridGenerator";
import { getWordScore, getRandomCorrectResponse, getRandomIncorrectResponse } from "@/lib/dictionary";

const STORAGE_KEY = "scwerdiality_game_state";

interface SavedState {
  gridLetters: string[][];
  foundWords: string[];
  score: number;
  gridSize: number;
  timestamp: number;
}

interface ToastMessage {
  text: string;
  type: "success" | "error";
  id: number;
}

export function useGameState(gridSize: number = 4) {
  const [grid, setGrid] = useState<GeneratedGrid | null>(null);
  const [selectedPath, setSelectedPath] = useState<GridCell[]>(() => []);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const toastIdRef = useRef(0);

  // Load game from localStorage or generate new — deferred to avoid blocking hydration
  useEffect(() => {
    // Use setTimeout(0) to let the browser finish painting before heavy computation
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const state: SavedState = JSON.parse(saved);
          if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000 && state.gridSize === gridSize) {
            const cells: GridCell[][] = state.gridLetters.map((row, r) =>
              row.map((letter, c) => ({
                letter,
                row: r,
                col: c,
                id: `${r}-${c}`,
              }))
            );
            const validWords = findAllValidWords(cells, gridSize);
            setGrid({ cells, size: gridSize, validWords });
            setFoundWords(state.foundWords);
            setScore(state.score);
            setIsLoaded(true);
            return;
          }
        }
      } catch {
        // If loading fails, generate new grid
      }

      const newGrid = generateGrid(gridSize);
      setGrid(newGrid);
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [gridSize]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!grid || !isLoaded) return;
    const state: SavedState = {
      gridLetters: grid.cells.map((row) => row.map((cell) => cell.letter)),
      foundWords,
      score,
      gridSize: grid.size,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [grid, foundWords, score, isLoaded]);

  const showToast = useCallback((text: string, type: "success" | "error") => {
    const id = ++toastIdRef.current;
    setToast({ text, type, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 2000);
  }, []);

  const currentWord = selectedPath.map((c) => c.letter).join("");

  const handleCellEnter = useCallback(
    (cell: GridCell) => {
      if (!isDragging) return;
      setSelectedPath((prev) => {
        if (prev.length >= 2 && prev[prev.length - 2].id === cell.id) {
          return prev.slice(0, -1);
        }
        if (prev.some((c) => c.id === cell.id)) return prev;
        const last = prev[prev.length - 1];
        if (!last) return prev;
        const dr = Math.abs(last.row - cell.row);
        const dc = Math.abs(last.col - cell.col);
        if (dr <= 1 && dc <= 1) {
          return [...prev, cell];
        }
        return prev;
      });
    },
    [isDragging]
  );

  const handleCellDown = useCallback((cell: GridCell) => {
    setIsDragging(true);
    setSelectedPath([cell]);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || selectedPath.length === 0) {
      setIsDragging(false);
      setSelectedPath([]);
      return;
    }

    setIsDragging(false);
    const word = selectedPath.map((c) => c.letter).join("").toLowerCase();

    if (foundWords.includes(word)) {
      showToast("Already found that one, ya drongo!", "error");
    } else if (isValidWord(word) && isValidPath(selectedPath)) {
      const wordScore = getWordScore(word);
      setFoundWords((prev) => [...prev, word]);
      setScore((prev) => prev + wordScore);
      showToast(`${getRandomCorrectResponse()} +${wordScore}`, "success");
    } else if (word.length >= 3) {
      showToast(getRandomIncorrectResponse(), "error");
    }

    setSelectedPath([]);
  }, [isDragging, selectedPath, foundWords, showToast]);

  const startNewGame = useCallback(() => {
    setIsLoaded(false);
    setGrid(null);
    setFoundWords([]);
    setScore(0);
    setSelectedPath([]);
    localStorage.removeItem(STORAGE_KEY);
    // Defer generation so the UI shows loading state
    setTimeout(() => {
      const newGrid = generateGrid(gridSize);
      setGrid(newGrid);
      setIsLoaded(true);
    }, 50);
  }, [gridSize]);

  const totalWords = grid?.validWords.length ?? 0;
  const progress = totalWords > 0 ? (foundWords.length / totalWords) * 100 : 0;

  return {
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
  };
}
