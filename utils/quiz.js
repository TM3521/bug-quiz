import { BUG_QUESTIONS }  from "../data/bugQuestions";
import { SMELL_QUESTIONS } from "../data/smellQuestions";
import { BUG_PER_SESSION, SMELL_PER_SESSION } from "../constants/theme";

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickBugQuestions() {
  const easy   = shuffle(BUG_QUESTIONS.filter(q => q.difficulty === "EASY"));
  const normal = shuffle(BUG_QUESTIONS.filter(q => q.difficulty === "NORMAL"));
  const hard   = shuffle(BUG_QUESTIONS.filter(q => q.difficulty === "HARD"));
  return shuffle([...easy.slice(0, 3), ...normal.slice(0, 4), ...hard.slice(0, 3)]);
}

export function pickSmellQuestions() {
  return shuffle(SMELL_QUESTIONS).slice(0, SMELL_PER_SESSION);
}
