import { BUG_QUESTIONS }  from "../data/bugQuestions";
import { SMELL_QUESTIONS } from "../data/smellQuestions";
import { bugReleaseNotes, smellReleaseNotes } from "../data/releaseNotes";
import { BUG_PER_SESSION, SMELL_PER_SESSION, difficultyColor, changeTypeStyle } from "../constants/theme";

export default function TitleScreen({ blink, th, titleTab, setTitleTab, setScreen, isBugMode, isSmellMode, maxScore, weaknesses, onStartWeak, onClearWeaknesses }) {
  const G  = th.accent;
  const GD = th.accentDim;
  const notes = isBugMode ? bugReleaseNotes : smellReleaseNotes;

  const infoItems = isBugMode ? [
    { label: "QUESTION POOL", value: `${BUG_QUESTIONS.length} 問` },
    { label: "PER SESSION",   value: `${BUG_PER_SESSION} 問（ランダム）` },
    { label: "MAX SCORE",     value: `${maxScore} pts` },
    { label: "DIFFICULTY",    value: "EASY 3 / NRM 4 / HARD 3" },
  ] : [
    { label: "QUESTION POOL", value: `${SMELL_QUESTIONS.length} 問` },
    { label: "PER SESSION",   value: `${SMELL_PER_SESSION} 問（ランダム）` },
    { label: "MAX SCORE",     value: `${maxScore} pts` },
    { label: "SCORING",       value: "1問 10pt（ヒント使用 5pt）" },
  ];

  // Weakness stats
  const catStats = {};
  Object.values(weaknesses).forEach(w => {
    catStats[w.category] = (catStats[w.category] || 0) + 1;
  });
  const sortedCats = Object.entries(catStats).sort((a, b) => b[1] - a[1]);
  const maxCatCount = sortedCats.length > 0 ? sortedCats[0][1] : 1;
  const wrongCount  = Object.keys(weaknesses).length;

  const tabs = [
    { id: "home",  label: "▸ HOME" },
    ...(isBugMode ? [{ id: "weak",  label: "▸ 苦手つぶし" }] : []),
    { id: "notes", label: "▸ RELEASE NOTES" },
  ];

  return (
    <div>
      {/* ASCII art */}
      <div className="ascii-outer" style={{ marginBottom: "16px" }}>
        <span className="ascii-inner" style={{ color: G, fontSize: "9.5px", lineHeight: "1.3",
          textShadow: `0 0 10px ${th.accentBg}`, whiteSpace: "pre", transition: "color 0.4s" }}>
{`██████╗ ██╗   ██╗ ██████╗     ██╗  ██╗██╗   ██╗███╗   ██╗████████╗███████╗██████╗
██╔══██╗██║   ██║██╔════╝     ██║  ██║██║   ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
██████╔╝██║   ██║██║  ███╗    ███████║██║   ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝
██╔══██╗╚██╗ ██╔╝██║   ██║    ██╔══██║██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
██████╔╝ ╚████╔╝ ╚██████╔╝    ██║  ██║╚██████╔╝██║ ╚████║   ██║   ███████╗██║  ██║
╚═════╝   ╚═══╝   ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`}
        </span>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "18px" }}>
        <div style={{ color: G, fontSize: "22px", letterSpacing: "0.15em",
          textShadow: `0 0 20px ${th.accentBg}`, transition: "color 0.4s" }}>
          VB.NET {th.label}
        </div>
        <div style={{ color: GD, fontSize: "12px", letterSpacing: "0.3em", marginTop: "4px", transition: "color 0.4s" }}>
          ── {th.sub} ──
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${GD}`, marginBottom: "20px" }}>
        {tabs.map(tab => (
          <button key={tab.id} className="tab-btn" onClick={() => setTitleTab(tab.id)}
            style={{
              background:   titleTab === tab.id ? th.accentBg : "transparent",
              border:       "none",
              borderBottom: titleTab === tab.id ? `2px solid ${G}` : "2px solid transparent",
              color:        titleTab === tab.id ? G : GD,
              padding: "8px 22px", fontSize: "11px", letterSpacing: "0.2em",
              cursor: "pointer", marginBottom: "-1px", transition: "all 0.15s",
              textShadow: titleTab === tab.id ? `0 0 8px ${G}88` : "none",
            }}>{tab.label}</button>
        ))}
      </div>

      {/* HOME tab */}
      {titleTab === "home" && (
        <div style={{ textAlign: "center" }}>
          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px", textAlign: "left" }}>
            {infoItems.map(item => (
              <div key={item.label} style={{ border: `1px solid ${GD}`, padding: "12px 16px", background: th.accentBg }}>
                <div style={{ color: GD, fontSize: "10px", letterSpacing: "0.2em", marginBottom: "4px" }}>{item.label}</div>
                <div style={{ color: G, fontSize: "13px" }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Smell categories */}
          {isSmellMode && (
            <div style={{ marginBottom: "20px", textAlign: "left" }}>
              <div style={{ color: GD, fontSize: "10px", letterSpacing: "0.2em", marginBottom: "8px" }}>CATEGORIES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {[...new Set(SMELL_QUESTIONS.map(q => q.category))].map(cat => (
                  <span key={cat} style={{ border: `1px solid ${GD}`, padding: "3px 10px",
                    fontSize: "10px", color: G, letterSpacing: "0.1em", background: th.accentBg }}>{cat}</span>
                ))}
              </div>
            </div>
          )}

          {/* Difficulty pills */}
          {isBugMode && (
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "24px" }}>
              {[
                { d: "EASY",   n: BUG_QUESTIONS.filter(q => q.difficulty === "EASY").length },
                { d: "NORMAL", n: BUG_QUESTIONS.filter(q => q.difficulty === "NORMAL").length },
                { d: "HARD",   n: BUG_QUESTIONS.filter(q => q.difficulty === "HARD").length },
              ].map(({ d, n }) => (
                <div key={d} style={{ border: `1px solid ${difficultyColor[d]}44`,
                  padding: "6px 14px", fontSize: "11px", letterSpacing: "0.15em",
                  color: difficultyColor[d], background: `${difficultyColor[d]}0a` }}>
                  {d} × {n}
                </div>
              ))}
            </div>
          )}

          {isSmellMode && <div style={{ marginBottom: "24px" }} />}

          <button className="action-btn" onClick={() => setScreen("quiz")}
            style={{ background: "transparent", border: `1px solid ${G}`, color: G,
              padding: "14px 48px", fontSize: "14px", letterSpacing: "0.3em",
              cursor: "pointer", textShadow: `0 0 10px ${G}88`,
              boxShadow: `0 0 20px ${th.accentBg}`, transition: "all 0.2s" }}>
            {blink ? "▶  START" : "▷  START"}
          </button>
        </div>
      )}

      {/* 苦手つぶし tab */}
      {titleTab === "weak" && (
        <div>
          {wrongCount === 0 ? (
            <div style={{ textAlign: "center", padding: "36px 0" }}>
              <div style={{ color: GD, fontSize: "32px", marginBottom: "14px", opacity: 0.5 }}>◎</div>
              <div style={{ color: G, fontSize: "13px", letterSpacing: "0.1em", marginBottom: "10px" }}>記録なし</div>
              <div style={{ color: GD, fontSize: "11px", lineHeight: "1.9" }}>
                通常モードで問題を解くと<br />
                間違えた問題がここに記録されます
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ color: GD, fontSize: "10px", letterSpacing: "0.2em" }}>苦手カテゴリ分析</div>
                <div style={{ color: GD, fontSize: "10px" }}>
                  間違え問題数: <span style={{ color: G }}>{wrongCount} 問</span>
                </div>
              </div>

              {/* Category list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "22px" }}>
                {sortedCats.map(([cat, count]) => (
                  <div key={cat} style={{ display: "flex", alignItems: "center", gap: "10px",
                    border: `1px solid ${GD}`, padding: "8px 12px", background: th.accentBg }}>
                    <span style={{ color: G, fontSize: "12px", flex: 1 }}>{cat}</span>
                    <span style={{ color: "#ff8866", fontSize: "11px", minWidth: "32px", textAlign: "right" }}>
                      {count}問
                    </span>
                    <div style={{ width: "72px", height: "4px", background: "#0d200d", borderRadius: "2px", flexShrink: 0 }}>
                      <div style={{ height: "100%", background: "#ff4466", borderRadius: "2px",
                        width: `${Math.round((count / maxCatCount) * 100)}%`,
                        boxShadow: "0 0 4px rgba(255,68,102,0.6)" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <button className="action-btn" onClick={onStartWeak}
                  style={{ background: "transparent", border: `1px solid ${G}`, color: G,
                    padding: "14px 48px", fontSize: "14px", letterSpacing: "0.3em",
                    cursor: "pointer", textShadow: `0 0 10px ${G}88`,
                    boxShadow: `0 0 20px ${th.accentBg}`, transition: "all 0.2s" }}>
                  {blink ? "▶  WEAK SESSION" : "▷  WEAK SESSION"}
                </button>
                <button onClick={onClearWeaknesses}
                  style={{ background: "transparent", border: `1px solid ${GD}`, color: GD,
                    padding: "5px 18px", fontSize: "10px", letterSpacing: "0.15em",
                    cursor: "pointer", transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  データリセット
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RELEASE NOTES tab */}
      {titleTab === "notes" && (
        <div className="notes-scroll" style={{ maxHeight: "360px", overflowY: "auto", paddingRight: "6px" }}>
          {notes.map((rel, ri) => (
            <div key={ri}>
              <div style={{ borderLeft: `2px solid ${ri === 0 ? "#00ff55" : "#2a6a2a"}`, paddingLeft: "16px", paddingBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                  <span style={{ color: ri === 0 ? "#00ff88" : "#00bb44", fontSize: "15px", letterSpacing: "0.1em",
                    textShadow: ri === 0 ? "0 0 12px rgba(0,255,136,0.4)" : "none" }}>{rel.version}</span>
                  {rel.tag && (
                    <span style={{ color: rel.tagColor, border: `1px solid ${rel.tagColor}`,
                      fontSize: "9px", padding: "1px 7px", letterSpacing: "0.15em" }}>{rel.tag}</span>
                  )}
                  <span style={{ color: "#4a8a4a", fontSize: "10px", marginLeft: "auto" }}>{rel.date}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {rel.changes.map((ch, ci) => {
                    const st = changeTypeStyle[ch.type];
                    return (
                      <div key={ci} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                        <span style={{ color: st.color, border: st.border, background: st.bg,
                          fontSize: "9px", padding: "1px 6px", letterSpacing: "0.1em",
                          whiteSpace: "nowrap", flexShrink: 0 }}>{ch.type}</span>
                        <span style={{ color: "#00aa44", fontSize: "12px", lineHeight: "1.5" }}>{ch.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {ri < notes.length - 1 && (
                <div style={{ borderBottom: "1px dashed #1a3a1a", marginBottom: "18px", marginLeft: "18px" }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
