export const BUG_PER_SESSION   = 10;
export const SMELL_PER_SESSION = 8;

export const difficultyColor = {
  EASY:   "#00ff88",
  NORMAL: "#ffcc00",
  HARD:   "#ff4466",
};

export const MODE_THEME = {
  bug: {
    accent:    "#00ff55",
    accentDim: "#4a8a4a",
    accentBg:  "rgba(0,255,80,0.07)",
    label:     "BUG HUNT",
    sub:       "バグを見つけろ",
  },
  smell: {
    accent:    "#ffaa00",
    accentDim: "#997700",
    accentBg:  "rgba(255,170,0,0.07)",
    label:     "REFACTORING",
    sub:       "改善点を見つけろ",
  },
};

export const changeTypeStyle = {
  NEW: { color: "#00ff88", border: "1px solid rgba(0,255,136,0.4)",   bg: "rgba(0,255,136,0.06)" },
  FIX: { color: "#ff8866", border: "1px solid rgba(255,136,102,0.4)", bg: "rgba(255,136,102,0.06)" },
  IMP: { color: "#88ccff", border: "1px solid rgba(136,204,255,0.4)", bg: "rgba(136,204,255,0.06)" },
};
