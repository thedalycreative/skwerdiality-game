export interface GameTheme {
  name: string;
  // Background & container classes
  bgClass: string;
  containerClass: string;
  overlayClass: string;
  // Cell styling
  cellBg: string;
  cellText: string;
  cellBorder: string;
  cellSelected: string;
  cellFound: string;
  // Accent colors
  accentBg: string;
  accentText: string;
  accentBorder: string;
  // Progress bar
  progressBg: string;
  progressFill: string;
  // Found words panel
  panelBg: string;
  panelText: string;
  panelBorder: string;
  // Header / title
  titleText: string;
  subtitleText: string;
  // Button styles
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  // Path line color (SVG)
  pathColor: string;
  // CSS background pattern (inline style)
  bgPattern?: string;
  // Message toast
  toastBg: string;
  toastText: string;
}

export const THEMES: GameTheme[] = [
  // 1. Timber & Forest — Warm wood background with forest green accents
  {
    name: "Timber & Forest",
    bgClass: "bg-amber-950",
    containerClass: "bg-amber-900/80 border-amber-700",
    overlayClass: "bg-amber-950/60",
    cellBg: "bg-amber-800 hover:bg-amber-700",
    cellText: "text-amber-50",
    cellBorder: "border-amber-600",
    cellSelected: "bg-emerald-700 border-emerald-400",
    cellFound: "bg-emerald-900/50 border-emerald-700",
    accentBg: "bg-emerald-800",
    accentText: "text-emerald-100",
    accentBorder: "border-emerald-600",
    progressBg: "bg-amber-800",
    progressFill: "bg-emerald-500",
    panelBg: "bg-amber-900/90",
    panelText: "text-amber-100",
    panelBorder: "border-amber-700",
    titleText: "text-emerald-300",
    subtitleText: "text-amber-300",
    buttonBg: "bg-emerald-700",
    buttonText: "text-emerald-50",
    buttonHover: "hover:bg-emerald-600",
    pathColor: "#34d399",
    bgPattern: `background-image: repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.08) 30px, rgba(0,0,0,0.08) 32px), repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(139,90,43,0.15) 8px, rgba(139,90,43,0.15) 10px);`,
    toastBg: "bg-emerald-800",
    toastText: "text-emerald-100",
  },

  // 2. Persian Rug — Rich jewel tones with cream/yarn accents
  {
    name: "Persian Rug",
    bgClass: "bg-red-950",
    containerClass: "bg-red-900/80 border-orange-700",
    overlayClass: "bg-red-950/60",
    cellBg: "bg-red-800 hover:bg-red-700",
    cellText: "text-orange-50",
    cellBorder: "border-orange-600",
    cellSelected: "bg-amber-600 border-amber-300",
    cellFound: "bg-orange-900/50 border-orange-700",
    accentBg: "bg-orange-100",
    accentText: "text-red-900",
    accentBorder: "border-orange-300",
    progressBg: "bg-red-800",
    progressFill: "bg-amber-400",
    panelBg: "bg-red-900/90",
    panelText: "text-orange-100",
    panelBorder: "border-orange-700",
    titleText: "text-amber-300",
    subtitleText: "text-orange-300",
    buttonBg: "bg-amber-600",
    buttonText: "text-amber-50",
    buttonHover: "hover:bg-amber-500",
    pathColor: "#fbbf24",
    bgPattern: `background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(180,83,9,0.12) 20px, rgba(180,83,9,0.12) 22px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(180,83,9,0.12) 20px, rgba(180,83,9,0.12) 22px), repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,200,100,0.06) 40px, rgba(255,200,100,0.06) 42px);`,
    toastBg: "bg-amber-700",
    toastText: "text-amber-50",
  },

  // 3. Kitchen Tiles — Clean white tile with grouting lines
  {
    name: "Kitchen Tiles",
    bgClass: "bg-slate-100",
    containerClass: "bg-white/90 border-slate-300",
    overlayClass: "bg-white/40",
    cellBg: "bg-white hover:bg-slate-50",
    cellText: "text-slate-800",
    cellBorder: "border-slate-300",
    cellSelected: "bg-sky-500 border-sky-300 text-white",
    cellFound: "bg-sky-100 border-sky-300",
    accentBg: "bg-slate-200",
    accentText: "text-slate-700",
    accentBorder: "border-slate-300",
    progressBg: "bg-slate-200",
    progressFill: "bg-sky-500",
    panelBg: "bg-white/95",
    panelText: "text-slate-700",
    panelBorder: "border-slate-300",
    titleText: "text-sky-600",
    subtitleText: "text-slate-500",
    buttonBg: "bg-sky-500",
    buttonText: "text-white",
    buttonHover: "hover:bg-sky-400",
    pathColor: "#0ea5e9",
    bgPattern: `background-image: repeating-linear-gradient(0deg, transparent, transparent 58px, #cbd5e1 58px, #cbd5e1 60px), repeating-linear-gradient(90deg, transparent, transparent 58px, #cbd5e1 58px, #cbd5e1 60px);`,
    toastBg: "bg-sky-600",
    toastText: "text-white",
  },

  // 4. Botanical Wallpaper — Lush greens with off-white
  {
    name: "Botanical Wallpaper",
    bgClass: "bg-green-950",
    containerClass: "bg-green-900/80 border-green-700",
    overlayClass: "bg-green-950/50",
    cellBg: "bg-green-800 hover:bg-green-700",
    cellText: "text-lime-50",
    cellBorder: "border-green-600",
    cellSelected: "bg-lime-500 border-lime-300",
    cellFound: "bg-lime-900/50 border-lime-700",
    accentBg: "bg-lime-200",
    accentText: "text-green-900",
    accentBorder: "border-lime-400",
    progressBg: "bg-green-800",
    progressFill: "bg-lime-400",
    panelBg: "bg-green-900/90",
    panelText: "text-lime-100",
    panelBorder: "border-green-700",
    titleText: "text-lime-300",
    subtitleText: "text-green-300",
    buttonBg: "bg-lime-600",
    buttonText: "text-lime-50",
    buttonHover: "hover:bg-lime-500",
    pathColor: "#a3e635",
    bgPattern: `background-image: radial-gradient(circle at 25% 25%, rgba(132,204,22,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(132,204,22,0.08) 0%, transparent 50%), radial-gradient(circle at 50% 10%, rgba(34,197,94,0.06) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(34,197,94,0.06) 0%, transparent 40%);`,
    toastBg: "bg-lime-700",
    toastText: "text-lime-50",
  },

  // 5. Aged Leather — Rich brown leather with brass accents
  {
    name: "Aged Leather",
    bgClass: "bg-stone-900",
    containerClass: "bg-stone-800/80 border-stone-600",
    overlayClass: "bg-stone-900/50",
    cellBg: "bg-stone-700 hover:bg-stone-600",
    cellText: "text-stone-100",
    cellBorder: "border-stone-500",
    cellSelected: "bg-yellow-700 border-yellow-500",
    cellFound: "bg-yellow-900/40 border-yellow-700",
    accentBg: "bg-yellow-700",
    accentText: "text-yellow-50",
    accentBorder: "border-yellow-600",
    progressBg: "bg-stone-700",
    progressFill: "bg-yellow-500",
    panelBg: "bg-stone-800/90",
    panelText: "text-stone-200",
    panelBorder: "border-stone-600",
    titleText: "text-yellow-400",
    subtitleText: "text-stone-400",
    buttonBg: "bg-yellow-700",
    buttonText: "text-yellow-50",
    buttonHover: "hover:bg-yellow-600",
    pathColor: "#eab308",
    bgPattern: `background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm20 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 37a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10-17h20v20H20V20zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' fill='rgba(120,90,50,0.06)' fill-rule='evenodd'/%3E%3C/svg%3E");`,
    toastBg: "bg-yellow-800",
    toastText: "text-yellow-50",
  },

  // 6. Linen Bedsheets — Soft, muted pastels with lavender accents
  {
    name: "Linen Bedsheets",
    bgClass: "bg-violet-50",
    containerClass: "bg-white/80 border-violet-200",
    overlayClass: "bg-violet-50/40",
    cellBg: "bg-violet-100 hover:bg-violet-200",
    cellText: "text-violet-800",
    cellBorder: "border-violet-200",
    cellSelected: "bg-violet-500 border-violet-300 text-white",
    cellFound: "bg-violet-200 border-violet-300",
    accentBg: "bg-violet-200",
    accentText: "text-violet-800",
    accentBorder: "border-violet-300",
    progressBg: "bg-violet-200",
    progressFill: "bg-violet-500",
    panelBg: "bg-white/90",
    panelText: "text-violet-700",
    panelBorder: "border-violet-200",
    titleText: "text-violet-600",
    subtitleText: "text-violet-400",
    buttonBg: "bg-violet-500",
    buttonText: "text-white",
    buttonHover: "hover:bg-violet-400",
    pathColor: "#8b5cf6",
    bgPattern: `background-image: repeating-linear-gradient(135deg, transparent, transparent 12px, rgba(139,92,246,0.04) 12px, rgba(139,92,246,0.04) 14px);`,
    toastBg: "bg-violet-500",
    toastText: "text-white",
  },

  // 7. Terrazzo Floor — Speckled neutral with warm coral accents
  {
    name: "Terrazzo Floor",
    bgClass: "bg-neutral-200",
    containerClass: "bg-neutral-100/90 border-neutral-300",
    overlayClass: "bg-neutral-100/40",
    cellBg: "bg-neutral-50 hover:bg-white",
    cellText: "text-neutral-800",
    cellBorder: "border-neutral-300",
    cellSelected: "bg-rose-500 border-rose-300 text-white",
    cellFound: "bg-rose-100 border-rose-300",
    accentBg: "bg-rose-100",
    accentText: "text-rose-800",
    accentBorder: "border-rose-300",
    progressBg: "bg-neutral-300",
    progressFill: "bg-rose-500",
    panelBg: "bg-neutral-100/95",
    panelText: "text-neutral-700",
    panelBorder: "border-neutral-300",
    titleText: "text-rose-600",
    subtitleText: "text-neutral-500",
    buttonBg: "bg-rose-500",
    buttonText: "text-white",
    buttonHover: "hover:bg-rose-400",
    pathColor: "#f43f5e",
    bgPattern: `background-image: radial-gradient(circle at 20% 30%, rgba(251,113,133,0.15) 2px, transparent 2px), radial-gradient(circle at 60% 70%, rgba(163,163,163,0.2) 3px, transparent 3px), radial-gradient(circle at 80% 20%, rgba(251,146,60,0.12) 2px, transparent 2px), radial-gradient(circle at 40% 80%, rgba(147,197,253,0.12) 2px, transparent 2px), radial-gradient(circle at 10% 60%, rgba(163,163,163,0.15) 1.5px, transparent 1.5px), radial-gradient(circle at 90% 50%, rgba(251,113,133,0.1) 2.5px, transparent 2.5px), radial-gradient(circle at 50% 40%, rgba(209,213,219,0.18) 2px, transparent 2px), radial-gradient(circle at 70% 10%, rgba(252,165,165,0.1) 1.5px, transparent 1.5px), radial-gradient(circle at 30% 50%, rgba(156,163,175,0.12) 3px, transparent 3px);`,
    toastBg: "bg-rose-600",
    toastText: "text-white",
  },

  // 8. Velvet Curtains — Deep navy/indigo with gold accents
  {
    name: "Velvet Curtains",
    bgClass: "bg-indigo-950",
    containerClass: "bg-indigo-900/80 border-indigo-700",
    overlayClass: "bg-indigo-950/50",
    cellBg: "bg-indigo-800 hover:bg-indigo-700",
    cellText: "text-indigo-50",
    cellBorder: "border-indigo-600",
    cellSelected: "bg-amber-500 border-amber-300",
    cellFound: "bg-amber-900/40 border-amber-700",
    accentBg: "bg-amber-500",
    accentText: "text-indigo-950",
    accentBorder: "border-amber-400",
    progressBg: "bg-indigo-800",
    progressFill: "bg-amber-400",
    panelBg: "bg-indigo-900/90",
    panelText: "text-indigo-100",
    panelBorder: "border-indigo-700",
    titleText: "text-amber-400",
    subtitleText: "text-indigo-300",
    buttonBg: "bg-amber-500",
    buttonText: "text-indigo-950",
    buttonHover: "hover:bg-amber-400",
    pathColor: "#f59e0b",
    bgPattern: `background-image: repeating-linear-gradient(180deg, transparent, transparent 4px, rgba(99,102,241,0.06) 4px, rgba(99,102,241,0.06) 5px);`,
    toastBg: "bg-amber-600",
    toastText: "text-amber-50",
  },

  // 9. Woven Jute — Natural fibre tones with teal accents
  {
    name: "Woven Jute",
    bgClass: "bg-yellow-900",
    containerClass: "bg-yellow-800/80 border-yellow-700",
    overlayClass: "bg-yellow-900/50",
    cellBg: "bg-yellow-700 hover:bg-yellow-600",
    cellText: "text-yellow-50",
    cellBorder: "border-yellow-600",
    cellSelected: "bg-teal-600 border-teal-400",
    cellFound: "bg-teal-900/40 border-teal-700",
    accentBg: "bg-teal-600",
    accentText: "text-teal-50",
    accentBorder: "border-teal-400",
    progressBg: "bg-yellow-800",
    progressFill: "bg-teal-400",
    panelBg: "bg-yellow-800/90",
    panelText: "text-yellow-100",
    panelBorder: "border-yellow-700",
    titleText: "text-teal-300",
    subtitleText: "text-yellow-300",
    buttonBg: "bg-teal-600",
    buttonText: "text-teal-50",
    buttonHover: "hover:bg-teal-500",
    pathColor: "#2dd4bf",
    bgPattern: `background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(161,98,7,0.12) 3px, rgba(161,98,7,0.12) 4px), repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(161,98,7,0.08) 6px, rgba(161,98,7,0.08) 7px);`,
    toastBg: "bg-teal-700",
    toastText: "text-teal-50",
  },

  // 10. Marble Counter — Light marble with rose gold accents
  {
    name: "Marble Counter",
    bgClass: "bg-gray-100",
    containerClass: "bg-white/85 border-gray-200",
    overlayClass: "bg-gray-50/30",
    cellBg: "bg-gray-50 hover:bg-white",
    cellText: "text-gray-700",
    cellBorder: "border-gray-200",
    cellSelected: "bg-pink-400 border-pink-300 text-white",
    cellFound: "bg-pink-50 border-pink-200",
    accentBg: "bg-pink-200",
    accentText: "text-pink-900",
    accentBorder: "border-pink-300",
    progressBg: "bg-gray-200",
    progressFill: "bg-pink-400",
    panelBg: "bg-white/90",
    panelText: "text-gray-600",
    panelBorder: "border-gray-200",
    titleText: "text-pink-500",
    subtitleText: "text-gray-400",
    buttonBg: "bg-pink-400",
    buttonText: "text-white",
    buttonHover: "hover:bg-pink-300",
    pathColor: "#f472b6",
    bgPattern: `background-image: linear-gradient(135deg, rgba(209,213,219,0.3) 0%, transparent 50%, rgba(209,213,219,0.2) 100%), linear-gradient(225deg, rgba(209,213,219,0.15) 0%, transparent 40%), linear-gradient(45deg, transparent 60%, rgba(229,231,235,0.25) 100%);`,
    toastBg: "bg-pink-500",
    toastText: "text-white",
  },
];

export function getRandomTheme(): GameTheme {
  return THEMES[Math.floor(Math.random() * THEMES.length)];
}
