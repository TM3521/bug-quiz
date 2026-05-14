import { useState, useEffect } from "react";
import { pickBugQuestions, pickSmellQuestions } from "./utils/quiz";
import { MODE_THEME } from "./constants/theme";
import GlobalStyles  from "./components/GlobalStyles";
import TitleScreen   from "./components/TitleScreen";
import QuizScreen    from "./components/QuizScreen";
import ResultScreen  from "./components/ResultScreen";

export default function App() {
  const [mode,      setMode]      = useState("bug");
  const [screen,    setScreen]    = useState("title");
  const [titleTab,  setTitleTab]  = useState("home");
  const [questions, setQuestions] = useState(() => pickBugQuestions());
  const [currentQ,  setCurrentQ]  = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [revealed,  setRevealed]  = useState(false);
  const [score,     setScore]     = useState(0);
  const [hintUsed,  setHintUsed]  = useState(false);
  const [showHint,  setShowHint]  = useState(false);
  const [answers,   setAnswers]   = useState([]);
  const [blink,     setBlink]     = useState(true);
  const [scanLine,  setScanLine]  = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBlink(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setScanLine(v => (v + 1) % 100), 30);
    return () => clearInterval(t);
  }, []);

  const th          = MODE_THEME[mode];
  const q           = questions[currentQ];
  const isBugMode   = mode === "bug";
  const isSmellMode = mode === "smell";

  const maxScore = isBugMode
    ? questions.reduce((a, q) => a + 10 * { EASY: 1, NORMAL: 2, HARD: 3 }[q.difficulty], 0)
    : questions.length * 10;

  const handleLineClick = (idx) => { if (!revealed) setSelected(idx); };

  const handleSubmit = () => {
    if (selected === null || revealed) return;
    const correct = isBugMode
      ? selected + 1 === q.bugLine
      : q.badLines.includes(selected + 1);
    const mult   = isBugMode ? { EASY: 1, NORMAL: 2, HARD: 3 }[q.difficulty] : 1;
    const points = correct ? (hintUsed ? 5 : 10) * mult : 0;
    setScore(s => s + points);
    setAnswers(a => [...a, { correct, hintUsed, points }]);
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setScreen("result");
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setRevealed(false);
      setHintUsed(false);
      setShowHint(false);
    }
  };

  const handleRestart = () => {
    const qs = isBugMode ? pickBugQuestions() : pickSmellQuestions();
    setQuestions(qs);
    setScreen("title");
    setTitleTab("home");
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setHintUsed(false);
    setShowHint(false);
    setAnswers([]);
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    const qs = newMode === "bug" ? pickBugQuestions() : pickSmellQuestions();
    setQuestions(qs);
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setHintUsed(false);
    setShowHint(false);
    setAnswers([]);
    setScreen("title");
    setTitleTab("home");
  };

  const G  = th.accent;
  const GD = th.accentDim;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Courier New','Lucida Console',monospace",
      padding: "20px", position: "relative", overflow: "hidden" }}>

      <GlobalStyles />

      {/* CRT scan line overlays */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999,
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,100,0.012) 2px,rgba(0,255,100,0.012) 4px)" }} />
      <div style={{ position: "fixed", left: 0, right: 0, height: "2px",
        background: "rgba(0,255,100,0.07)", top: `${scanLine}%`, pointerEvents: "none", zIndex: 9998 }} />

      <div style={{ width: "100%", maxWidth: "820px" }}>
        <div style={{ background: "#0d1a0d", border: `2px solid ${GD}`, borderRadius: "4px",
          boxShadow: `0 0 40px ${th.accentBg},inset 0 0 80px rgba(0,0,0,0.5)`, overflow: "hidden",
          transition: "border-color 0.4s, box-shadow 0.4s" }}>

          {/* Title bar */}
          <div style={{ background: "#0a140a", borderBottom: `1px solid ${GD}`,
            padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: G, fontSize: "11px", letterSpacing: "0.2em", opacity: 0.7, transition: "color 0.4s" }}>
              VB.NET {th.label} v4.0 ── TERMINAL
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.6 }} />
              ))}
            </div>
          </div>

          {/* Mode switch bar */}
          <div style={{ display: "flex", borderBottom: `1px solid ${GD}`, background: "#080f08" }}>
            {[
              { key: "bug",   icon: "⚡", label: "BUG HUNT",    desc: "バグを探せ" },
              { key: "smell", icon: "🔧", label: "REFACTORING", desc: "改善点を見つけろ" },
            ].map(m => (
              <button key={m.key} onClick={() => handleModeSwitch(m.key)}
                style={{
                  flex: 1,
                  background: mode === m.key
                    ? (m.key === "bug" ? "rgba(0,255,80,0.08)" : "rgba(255,170,0,0.08)")
                    : "transparent",
                  border: "none",
                  borderBottom: mode === m.key
                    ? `2px solid ${m.key === "bug" ? "#00ff55" : "#ffaa00"}`
                    : "2px solid transparent",
                  color: mode === m.key
                    ? (m.key === "bug" ? "#00ff55" : "#ffaa00")
                    : "#2a4a2a",
                  padding: "10px 16px", fontSize: "12px", letterSpacing: "0.2em",
                  cursor: "pointer", marginBottom: "-1px", transition: "all 0.2s",
                  textShadow: mode === m.key
                    ? `0 0 10px ${m.key === "bug" ? "rgba(0,255,80,0.5)" : "rgba(255,170,0,0.5)"}`
                    : "none",
                }}>
                <span style={{ marginRight: "8px" }}>{m.icon}</span>{m.label}
                <span style={{ marginLeft: "8px", fontSize: "10px", opacity: 0.6 }}>{m.desc}</span>
              </button>
            ))}
          </div>

          {/* Screen body */}
          <div style={{ padding: "24px 32px" }}>
            {screen === "title" && (
              <TitleScreen
                blink={blink} th={th} titleTab={titleTab} setTitleTab={setTitleTab}
                setScreen={setScreen} isBugMode={isBugMode} isSmellMode={isSmellMode}
                maxScore={maxScore}
              />
            )}
            {screen === "quiz" && (
              <QuizScreen
                th={th} q={q} currentQ={currentQ} questions={questions}
                isBugMode={isBugMode} isSmellMode={isSmellMode}
                selected={selected} revealed={revealed} score={score}
                hintUsed={hintUsed} showHint={showHint} answers={answers}
                handleSubmit={handleSubmit} handleNext={handleNext}
                handleLineClick={handleLineClick}
                setHintUsed={setHintUsed} setShowHint={setShowHint}
              />
            )}
            {screen === "result" && (
              <ResultScreen
                score={score} maxScore={maxScore} answers={answers}
                th={th} isBugMode={isBugMode} handleRestart={handleRestart}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
