"use client";

import React from "react";
import { GameTheme } from "@/lib/themes";

interface ToastProps {
  message: string;
  type: "success" | "error";
  theme: GameTheme;
}

export default function Toast({ message, type, theme }: ToastProps) {
  return (
    <div
      className={`
        fixed top-5 left-1/2 -translate-x-1/2 z-50
        px-5 py-2.5 sm:px-7 sm:py-3 rounded-2xl shadow-2xl
        text-sm sm:text-base font-heading font-bold tracking-wide
        animate-bounce-in backdrop-blur-sm
        ${type === "success" ? theme.toastBg : "bg-red-700/90"}
        ${type === "success" ? theme.toastText : "text-red-50"}
      `}
    >
      {message}
    </div>
  );
}
