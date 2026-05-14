import { useState, useEffect } from "react";
import { pickBugQuestions, pickSmellQuestions, pickWeakQuestions } from "./utils/quiz";
import { loadWeaknesses, saveWeakness, clearWeaknesses } from "./utils/weakness";
import { MODE_THEME } from "./constants/theme";
import GlobalStyles  from "./components/GlobalStyles";
import TitleScreen   from "./components/TitleScreen";
import QuizScreen    from "./components/QuizScreen";
import ResultScreen  from "./components/ResultScreen";

export default function App() {
  const [mode,       setMode]       = useState("bug");
  const [screen,     setScreen]     = useState("title");
  const [titleTab,   setTitleTab]   = useState("home");
  const [questions,  setQuestions]  = useState(() => pickBugQuestions());
  const [currentQ,   setCurrentQ]   = useState(0);
  const [selected,   setSelected]   = useState(null);
  const [revealed,   setRevealed]   = useState(false);
  const [score,      setScore]      = useState(0);
  const [hintUsed,   setHintUsed]   = useState(false);
  const [showHint,   setShowHint]   = useState(false);
  const [answers,    setAnswers]    = useState([]);
  const [blink,      setBlink]      = useState(true);
  const [scanLine,   setScanLine]   = useState(0);
  const [weaknesses, setWeaknesses] = useState(() => loadWeaknesses());

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
    if (!correct && isBugMode) {
      setWeaknesses(saveWeakness(q.id, q.category));
    }
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

  const handleStartWeak = () => {
    setQuestions(pickWeakQuestions(weaknesses));
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setHintUsed(false);
    setShowHint(false);
    setAnswers([]);
    setScreen("quiz");
  };

  const handleClearWeaknesses = () => {
    setWeaknesses(clearWeaknesses());
  };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--c-bg-main)", display: "flex",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Courier New','Lucida Console',monospace",
      padding: "20px", position: "relative", overflow: "hidden",
      /* Dynamic CSS vars – change with mode */
      "--c-accent":    th.accent,
      "--c-dim":       th.accentDim,
      "--c-accent-bg": th.accentBg,
      "--c-accent-88": th.accent + "88",
      "--c-accent-66": th.accent + "66",
      "--c-accent-14": th.accent + "14",
      "--c-accent-99": th.accent + "99",
    }}>

      <GlobalStyles />

      {/* CRT scan line overlays */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999,
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,var(--c-crt-scan) 2px,var(--c-crt-scan) 4px)" }} />
      <div style={{ position: "fixed", left: 0, right: 0, height: "2px",
        background: "var(--c-crt-line)", top: `${scanLine}%`, pointerEvents: "none", zIndex: 9998 }} />

      <div style={{ width: "100%", maxWidth: "820px" }}>
        <div style={{ background: "var(--c-bg-panel)", border: "2px solid var(--c-dim)", borderRadius: "4px",
          boxShadow: "0 0 40px var(--c-accent-bg),inset 0 0 80px rgba(0,0,0,0.5)", overflow: "hidden",
          transition: "border-color 0.4s, box-shadow 0.4s" }}>

          {/* Title bar */}
          <div style={{ background: "var(--c-bg-titlebar)", borderBottom: "1px solid var(--c-dim)",
            padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "var(--c-accent)", fontSize: "11px", letterSpacing: "0.2em", opacity: 0.7, transition: "color 0.4s" }}>
              VB.NET {th.label} v4.0 ── TERMINAL
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.6 }} />
              ))}
            </div>
          </div>

          {/* Mode switch bar */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--c-dim)", background: "var(--c-bg-modebar)" }}>
            {[
              { key: "bug",   icon: "⚡", label: "BUG HUNT",    desc: "バグを探せ" },
              { key: "smell", icon: "🔧", label: "REFACTORING", desc: "改善点を見つけろ" },
            ].map(m => (
              <button key={m.key} onClick={() => handleModeSwitch(m.key)}
                style={{
                  flex: 1,
                  background:   mode === m.key ? (m.key === "bug" ? "var(--c-bug-bg)" : "var(--c-smell-bg)") : "transparent",
                  border:       "none",
                  borderBottom: mode === m.key ? `2px solid ${m.key === "bug" ? "var(--c-bug-accent)" : "var(--c-smell-accent)"}` : "2px solid transparent",
                  color:        mode === m.key ? (m.key === "bug" ? "var(--c-bug-accent)" : "var(--c-smell-accent)") : "var(--c-mode-inactive)",
                  padding: "10px 16px", fontSize: "12px", letterSpacing: "0.2em",
                  cursor: "pointer", marginBottom: "-1px", transition: "all 0.2s", whiteSpace: "nowrap",
                  textShadow: mode === m.key ? `0 0 10px ${m.key === "bug" ? "var(--c-bug-glow)" : "var(--c-smell-glow)"}` : "none",
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
                maxScore={maxScore} weaknesses={weaknesses}
                onStartWeak={handleStartWeak} onClearWeaknesses={handleClearWeaknesses}
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
                isBugMode={isBugMode} handleRestart={handleRestart}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
