"use client";

import React from "react";
import { GameTheme } from "@/lib/themes";

interface ProgressBarProps {
  progress: number;
  theme: GameTheme;
}

export default function ProgressBar({ progress, theme }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      <div className={`w-full h-3 sm:h-4 rounded-full overflow-hidden ${theme.progressBg} shadow-inner`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${theme.progressFill}`}
          style={{
            width: `${clampedProgress}%`,
            backgroundImage: clampedProgress > 0
              ? `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)`
              : undefined,
            backgroundSize: "200% 100%",
            animation: clampedProgress > 0 ? "shimmer 2s linear infinite" : undefined,
          }}
        />
      </div>
      <p className={`text-xs sm:text-sm mt-1.5 text-center font-heading tracking-wide ${theme.subtitleText}`}>
        {clampedProgress < 25
          ? "Keep goin', ya bludger!"
          : clampedProgress < 50
          ? "Getting warmer, mate!"
          : clampedProgress < 75
          ? "Crikey, you're on fire!"
          : clampedProgress < 100
          ? "Almost there, legend!"
          : "You bloody ripper! All done!"}
      </p>
    </div>
  );
}
