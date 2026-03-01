"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import { GridCell } from "@/lib/gridGenerator";
import { GameTheme } from "@/lib/themes";

interface GameBoardProps {
  cells: GridCell[][];
  size: number;
  selectedPath: GridCell[];
  foundWords: string[];
  isDragging: boolean;
  theme: GameTheme;
  onCellDown: (cell: GridCell) => void;
  onCellEnter: (cell: GridCell) => void;
  onDragEnd: () => void;
}

export default function GameBoard({
  cells,
  size,
  selectedPath,
  foundWords,
  isDragging,
  theme,
  onCellDown,
  onCellEnter,
  onDragEnd,
}: GameBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [cellPositions, setCellPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  // Compute cell centers for SVG path drawing
  const updateCellPositions = useCallback(() => {
    if (!boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const positions = new Map<string, { x: number; y: number }>();
    cellRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      positions.set(id, {
        x: rect.left + rect.width / 2 - boardRect.left,
        y: rect.top + rect.height / 2 - boardRect.top,
      });
    });
    setCellPositions(positions);
  }, []);

  useEffect(() => {
    updateCellPositions();
    window.addEventListener("resize", updateCellPositions);
    return () => window.removeEventListener("resize", updateCellPositions);
  }, [updateCellPositions, cells]);

  // After cells render, update positions
  useEffect(() => {
    const timer = setTimeout(updateCellPositions, 100);
    return () => clearTimeout(timer);
  }, [cells, updateCellPositions]);

  const selectedIds = new Set(selectedPath.map((c) => c.id));

  // Handle touch events for mobile drag
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !boardRef.current) return;
      e.preventDefault();
      const touch = e.touches[0];

      // Find which cell the touch is over
      cellRefs.current.forEach((el, id) => {
        const rect = el.getBoundingClientRect();
        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          const [r, c] = id.split("-").map(Number);
          onCellEnter(cells[r][c]);
        }
      });
    },
    [isDragging, cells, onCellEnter]
  );

  const handleTouchEnd = useCallback(() => {
    onDragEnd();
  }, [onDragEnd]);

  // Mouse up anywhere ends drag
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) onDragEnd();
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, onDragEnd]);

  // Build SVG path
  const pathPoints = selectedPath
    .map((c) => cellPositions.get(c.id))
    .filter(Boolean) as { x: number; y: number }[];

  const pathD =
    pathPoints.length >= 2
      ? pathPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
      : "";

  const setCellRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) cellRefs.current.set(id, el);
    else cellRefs.current.delete(id);
  }, []);

  return (
    <div
      ref={boardRef}
      className="relative select-none touch-none"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* SVG overlay for path lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ overflow: "visible" }}
      >
        {pathD && (
          <>
            {/* Glow layer */}
            <path
              d={pathD}
              fill="none"
              stroke={theme.pathColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.2"
            />
            {/* Main path */}
            <path
              d={pathD}
              fill="none"
              stroke={theme.pathColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.8"
            />
          </>
        )}
        {/* Draw circles at selected cell centers */}
        {pathPoints.map((p, i) => (
          <React.Fragment key={i}>
            <circle cx={p.x} cy={p.y} r="10" fill={theme.pathColor} fillOpacity="0.15" />
            <circle cx={p.x} cy={p.y} r="5" fill={theme.pathColor} fillOpacity="0.6" />
          </React.Fragment>
        ))}
      </svg>

      {/* Grid */}
      <div
        className="grid gap-2.5 sm:gap-3"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
        }}
      >
        {cells.flat().map((cell) => {
          const isSelected = selectedIds.has(cell.id);
          const isFirst = selectedPath.length > 0 && selectedPath[0].id === cell.id;

          return (
            <div
              key={cell.id}
              ref={setCellRef(cell.id)}
              className={`
                grid-cell
                aspect-square flex items-center justify-center
                rounded-xl sm:rounded-2xl font-heading font-bold
                text-2xl sm:text-3xl md:text-4xl
                border-2 cursor-pointer
                relative z-20
                ${isSelected
                  ? `${theme.cellSelected} animate-cell-pop shadow-xl ${theme.cellText}`
                  : `${theme.cellBg} ${theme.cellText} ${theme.cellBorder} shadow-md hover:shadow-lg`
                }
                ${isFirst ? "ring-2 ring-white/40" : ""}
              `}
              style={isSelected ? {
                boxShadow: `0 0 16px 2px ${theme.pathColor}40, 0 4px 12px rgba(0,0,0,0.3)`,
              } : undefined}
              onMouseDown={(e) => {
                e.preventDefault();
                onCellDown(cell);
              }}
              onMouseEnter={() => onCellEnter(cell)}
              onTouchStart={(e) => {
                e.preventDefault();
                onCellDown(cell);
              }}
            >
              {cell.letter}
            </div>
          );
        })}
      </div>
    </div>
  );
}
