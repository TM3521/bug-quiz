import { BUG_QUESTIONS, SMELL_QUESTIONS } from "../data/bugQuestions";
import { difficultyColor } from "../constants/theme";

export default function QuizScreen({
  th, q, currentQ, questions,
  isBugMode, isSmellMode,
  selected, revealed, score,
  hintUsed, showHint, answers,
  handleSubmit, handleNext, handleLineClick,
  setHintUsed, setShowHint,
}) {
  const G  = th.accent;
  const GD = th.accentDim;

  const isSmellBad = (idx) => isSmellMode && q.badLines && q.badLines.includes(idx + 1);

  const correct = revealed
    ? (isBugMode ? selected + 1 === q.bugLine : q.badLines.includes(selected + 1))
    : null;

  const pts        = answers[answers.length - 1]?.points;
  const verdictCls = correct
    ? (isBugMode ? "verdict-c-bug" : "verdict-c-smell")
    : "verdict-w";
  const boxCls     = correct
    ? (isBugMode ? "rbox-c-bug" : "rbox-c-smell")
    : "rbox-w";
  const accentC    = correct ? G : "#ff4466";
  const accentBgC  = correct ? th.accentBg : "rgba(255,68,102,0.07)";
  const borderC    = correct
    ? (isBugMode ? "rgba(0,255,136,0.4)" : "rgba(255,170,0,0.4)")
    : "rgba(255,68,102,0.4)";

  return (
    <div>
      {/* Progress bar */}
      <div style={{ height: "2px", background: "#0a1a0a", marginBottom: "20px" }}>
        <div style={{ height: "100%", background: G, boxShadow: `0 0 8px ${G}99`,
          transition: "width 0.4s ease, background 0.4s",
          width: `${(currentQ / questions.length) * 100}%` }} />
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <div style={{ color: GD, fontSize: "11px", letterSpacing: "0.2em" }}>
            {th.label}  {currentQ + 1} / {questions.length}
            <span style={{ opacity: 0.5, marginLeft: "10px", fontSize: "10px" }}>
              （{isSmellMode ? `${SMELL_QUESTIONS.length}問プール` : `${BUG_QUESTIONS.length}問プール`}よりランダム）
            </span>
          </div>

          {revealed ? (
            <div style={{ color: G, fontSize: "17px", letterSpacing: "0.08em",
              textShadow: `0 0 12px ${G}66`, marginTop: "4px" }}>{q.title}</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
              <div style={{ color: GD, fontSize: "17px", letterSpacing: "0.3em", fontFamily: "monospace" }}>{"? ? ? ? ? ? ? ? ?"}</div>
              <div style={{ color: GD, fontSize: "10px", letterSpacing: "0.15em",
                border: `1px solid ${GD}`, padding: "2px 7px", opacity: 0.7 }}>回答後に公開</div>
            </div>
          )}

          {isSmellMode ? (
            revealed && (
              <div style={{ display: "inline-block", color: "#ffaa00",
                border: "1px solid rgba(255,170,0,0.5)", fontSize: "10px",
                padding: "2px 8px", letterSpacing: "0.15em", marginTop: "6px",
                textShadow: "0 0 8px rgba(255,170,0,0.5)" }}>{q.category}</div>
            )
          ) : (
            <div style={{ display: "inline-block", color: difficultyColor[q.difficulty],
              border: `1px solid ${difficultyColor[q.difficulty]}`,
              fontSize: "10px", padding: "2px 8px", letterSpacing: "0.2em", marginTop: "6px",
              textShadow: `0 0 8px ${difficultyColor[q.difficulty]}` }}>{q.difficulty}</div>
          )}
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ color: GD, fontSize: "10px", letterSpacing: "0.2em" }}>SCORE</div>
          <div style={{ color: G, fontSize: "22px", textShadow: `0 0 10px ${G}66` }}>{score}</div>
        </div>
      </div>

      {/* Description */}
      <div style={{ color: "#007733", fontSize: "12px", marginBottom: "14px",
        borderLeft: `2px solid ${GD}`, paddingLeft: "12px" }}>&gt; {q.description}</div>

      {!revealed && (
        <div style={{ color: GD, fontSize: "11px", marginBottom: "12px", letterSpacing: "0.15em" }}>
          {isSmellMode
            ? "── リファクタリングが必要な行をクリックして選択してください ──"
            : "── バグのある行をクリックして選択してください ──"}
        </div>
      )}

      {/* Code block */}
      <div className="code-scroll" style={{ background: "#060e06", border: "1px solid #142814",
        borderRadius: "2px", marginBottom: "16px", overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ minWidth: "max-content" }}>
          {q.lines.map((line, idx) => {
            const lineNo     = idx + 1;
            const isProblem  = isBugMode ? lineNo === q.bugLine : isSmellBad(idx);
            const isSelected = selected === idx;

            const rowBg = revealed && isProblem
              ? (isBugMode ? "rgba(255,68,102,0.15)" : "rgba(255,170,0,0.12)")
              : isSelected && !revealed ? `${G}14` : "transparent";
            const rowBL = revealed && isProblem
              ? (isBugMode ? "3px solid #ff4466" : "3px solid #ffaa00")
              : isSelected && !revealed ? `3px solid ${G}` : "3px solid transparent";
            const numColor = revealed && isProblem
              ? (isBugMode ? "#ff4466" : "#ffaa00")
              : isSelected && !revealed ? G : "#1a4a1a";
            const codeColor = revealed && isProblem
              ? (isBugMode ? "#ff8899" : "#ffcc66")
              : isSelected && !revealed ? "#ccffee" : "#00aa44";

            return (
              <div key={idx} className={!revealed ? "line-row" : ""} onClick={() => handleLineClick(idx)}
                style={{ display: "flex", alignItems: "center",
                  cursor: revealed ? "default" : "pointer", background: rowBg, borderLeft: rowBL }}>
                <span style={{ color: numColor, fontSize: "11px", padding: "5px 14px 5px 8px",
                  minWidth: "36px", textAlign: "right", userSelect: "none", flexShrink: 0 }}>{lineNo}</span>
                <span style={{ color: codeColor, fontSize: "12.5px", padding: "5px 48px 5px 0",
                  whiteSpace: "nowrap", fontFamily: "'Courier New',monospace" }}>{line || " "}</span>
                {revealed && isProblem && (
                  <span style={{ color: isBugMode ? "#ff4466" : "#ffaa00", fontSize: "11px",
                    padding: "5px 12px 5px 0", flexShrink: 0, whiteSpace: "nowrap" }}>
                    {isBugMode ? "◄ BUG" : "◄ HERE"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div style={{ background: "rgba(255,204,0,0.05)", border: "1px solid rgba(255,204,0,0.25)",
          padding: "12px 16px", marginBottom: "16px" }}>
          <div style={{ color: "#aa8800", fontSize: "10px", letterSpacing: "0.2em", marginBottom: "4px" }}>HINT (−5 pts)</div>
          <div style={{ color: "#ffcc00", fontSize: "12px" }}>&gt; {q.hint}</div>
        </div>
      )}

      {/* Controls */}
      {!revealed && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <button onClick={handleSubmit} disabled={selected === null}
            style={{ flex: 1, background: "transparent",
              border: `1px solid ${selected !== null ? G : "#333"}`,
              color: selected !== null ? G : "#444",
              padding: "10px 20px", fontSize: "11px", letterSpacing: "0.2em",
              cursor: selected !== null ? "pointer" : "not-allowed",
              textShadow: selected !== null ? `0 0 8px ${G}88` : "none",
              transition: "all 0.15s" }}>▶ SUBMIT ANSWER</button>
          {!hintUsed && (
            <button className="hint-btn" onClick={() => { setHintUsed(true); setShowHint(true); }}
              style={{ background: "transparent", border: "1px solid rgba(255,204,0,0.5)",
                color: "#ffcc00", padding: "10px 20px", fontSize: "11px",
                letterSpacing: "0.2em", cursor: "pointer", transition: "all 0.15s" }}>? HINT</button>
          )}
        </div>
      )}

      {/* Verdict */}
      {revealed && (
        <>
          <div className={boxCls} style={{ background: accentBgC,
            border: `1px solid ${borderC}`, borderRadius: "2px", marginBottom: "14px", overflow: "hidden" }}>
            <div style={{ background: correct
                ? (isBugMode ? "rgba(0,255,136,0.12)" : "rgba(255,170,0,0.12)")
                : "rgba(255,68,102,0.12)",
              borderBottom: `1px solid ${borderC}`,
              padding: "18px 20px", display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span className={verdictCls} style={{ fontSize: "36px", lineHeight: 1, display: "inline-block" }}>
                  {correct ? "✓" : "✗"}
                </span>
                <div>
                  <div className={verdictCls}
                    style={{ color: accentC, fontSize: "20px", fontWeight: "bold", letterSpacing: "0.25em" }}>
                    {correct ? "CORRECT!" : "INCORRECT"}
                  </div>
                  <div style={{ color: correct ? (isBugMode ? "#00aa55" : "#bb7700") : "#cc3355",
                    fontSize: "11px", letterSpacing: "0.15em", marginTop: "2px" }}>
                    {correct
                      ? (isBugMode ? "よく見つけました" : "改善点を見つけました")
                      : `正解は ${isBugMode ? q.bugLine : q.badLines.join("・")} 行目でした`}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", border: `1px solid ${borderC}`,
                padding: "8px 16px", flexShrink: 0, background: accentBgC }}>
                <div style={{ color: accentC, fontSize: "24px" }}>{correct ? `+${pts}` : "+0"}</div>
                <div style={{ color: correct ? (isBugMode ? "#007744" : "#885500") : "#883344",
                  fontSize: "10px", letterSpacing: "0.2em" }}>pts</div>
              </div>
            </div>
            <div style={{ padding: "14px 20px" }}>
              <div style={{ color: "#00cc44", fontSize: "11.5px", marginBottom: "8px",
                fontFamily: "monospace", borderLeft: "2px solid #1a6a1a", paddingLeft: "10px" }}>
                {isBugMode ? "BUG" : "改善点"}: {isBugMode ? q.bugDescription : q.badDescription}
              </div>
              <div style={{ color: "#007733", fontSize: "11.5px", lineHeight: "1.75" }}>
                {q.explanation}
              </div>
            </div>
          </div>

          <button className="action-btn" onClick={handleNext}
            style={{ width: "100%", background: "transparent", border: `1px solid ${G}`,
              color: G, padding: "12px", fontSize: "12px", letterSpacing: "0.3em",
              cursor: "pointer", textShadow: `0 0 8px ${G}88`, transition: "all 0.2s" }}>
            {currentQ + 1 >= questions.length ? "▶ SHOW RESULT" : "▶ NEXT QUESTION"}
          </button>
        </>
      )}
    </div>
  );
}
