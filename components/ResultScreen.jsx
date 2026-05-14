export default function ResultScreen({ score, maxScore, answers, th, isBugMode, handleRestart }) {
  const G  = th.accent;
  const GD = th.accentDim;

  const getRank = (s) => {
    const p = s / maxScore;
    if (p >= 0.9) return isBugMode ? "S  ── MASTER DEBUGGER"   : "S  ── REFACTORING GURU";
    if (p >= 0.7) return isBugMode ? "A  ── SENIOR DEVELOPER"  : "A  ── CLEAN CODER";
    if (p >= 0.5) return isBugMode ? "B  ── JUNIOR DEVELOPER"  : "B  ── CODE REVIEWER";
    if (p >= 0.3) return isBugMode ? "C  ── INTERN"            : "C  ── APPRENTICE";
    return               isBugMode ? "D  ── STILL LEARNING"    : "D  ── COPY-PASTE CODER";
  };

  const stats = [
    { val: answers.filter(a => a.correct).length,   lbl: "CORRECT"    },
    { val: answers.filter(a => !a.correct).length,  lbl: "INCORRECT"  },
    { val: answers.filter(a => a.hintUsed).length,  lbl: "HINTS USED" },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ color: GD, fontSize: "11px", letterSpacing: "0.2em", marginBottom: "12px" }}>
        ── MISSION COMPLETE ──
      </div>
      <div style={{ color: G, fontSize: "20px", letterSpacing: "0.2em",
        textShadow: `0 0 20px ${G}66`, marginBottom: "8px" }}>FINAL RESULT</div>
      <div style={{ color: G, fontSize: "52px", textShadow: `0 0 30px ${G}88`,
        lineHeight: 1, marginBottom: "4px" }}>{score}</div>
      <div style={{ color: GD, fontSize: "13px", marginBottom: "28px" }}>/ {maxScore} pts</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
        {stats.map(s => (
          <div key={s.lbl} style={{ border: `1px solid ${GD}`, padding: "14px 10px", background: th.accentBg }}>
            <div style={{ color: G, fontSize: "24px", textShadow: `0 0 10px ${G}66` }}>{s.val}</div>
            <div style={{ color: GD, fontSize: "10px", letterSpacing: "0.15em", marginTop: "4px" }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{ border: `1px solid ${GD}`, padding: "16px", marginBottom: "12px", background: th.accentBg }}>
        <div style={{ color: GD, fontSize: "10px", letterSpacing: "0.2em", marginBottom: "8px" }}>YOUR RANK</div>
        <div style={{ color: G, fontSize: "22px", letterSpacing: "0.1em",
          textShadow: `0 0 15px ${G}66` }}>{getRank(score)}</div>
      </div>

      <div style={{ color: GD, fontSize: "11px", marginBottom: "20px", letterSpacing: "0.1em" }}>
        次回は別の問題が出題されます
      </div>

      <button className="action-btn" onClick={handleRestart}
        style={{ width: "100%", background: "transparent", border: `1px solid ${G}`, color: G,
          padding: "12px", fontSize: "12px", letterSpacing: "0.3em",
          cursor: "pointer", textShadow: `0 0 8px ${G}88`, transition: "all 0.2s" }}>
        ▶ PLAY AGAIN
      </button>
    </div>
  );
}
