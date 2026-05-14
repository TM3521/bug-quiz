# VB.NET BUG HUNTER

VB.NET のソースコードを題材にしたクイズアプリ。レトロな CRT 端末風 UI で動作する React (JSX) 製のシングルページアプリ。

## 概要

あえてバグや問題のあるコードを提示し、ユーザーが該当行をクリックして回答する形式のクイズ。  
**BUG HUNT** と **REFACTORING** の 2 モードを持つ。

## モード

| モード | 内容 | 問題数 | 出題数 |
|--------|------|--------|--------|
| BUG HUNT | バグのある行を特定する | 20問 | 毎回ランダム10問 |
| REFACTORING | コードの臭い・改善点のある行を特定する | 15問 | 毎回ランダム8問 |

### BUG HUNT の難易度と配点

| 難易度 | 出題数 | 正解時ポイント |
|--------|--------|----------------|
| EASY   | 3問    | 10pt           |
| NORMAL | 4問    | 20pt           |
| HARD   | 3問    | 30pt           |

ヒントを使用した場合は各難易度のポイントが半減（×0.5）。

### REFACTORING の配点

全問一律 10pt。ヒント使用時は 5pt。`badLines` に複数行が設定されており、そのうちいずれかを選択すれば正解。

## ファイル構成

```
BUGクイズ/
  vb-bug-quiz.jsx          メイン App（状態管理・ハンドラ・画面ルーティング）
  data/
    bugQuestions.js        BUG_QUESTIONS 配列（20問）
    smellQuestions.js      SMELL_QUESTIONS 配列（15問）
    releaseNotes.js        リリースノートデータ
  constants/
    theme.js               MODE_THEME・difficultyColor・changeTypeStyle・セッション定数
  utils/
    quiz.js                shuffle / pickBugQuestions / pickSmellQuestions
  components/
    GlobalStyles.jsx       CSSアニメーション・スクロールバースタイル（<style> タグ）
    TitleScreen.jsx        タイトル画面（HOME タブ / RELEASE NOTES タブ）
    QuizScreen.jsx         出題・回答・判定画面
    ResultScreen.jsx       結果・ランク表示画面
```

## 画面遷移

```
title → quiz → result → title（PLAY AGAIN）
```

- `screen` state で管理（`"title"` / `"quiz"` / `"result"`）
- モード切り替え時はすべての state をリセットして `"title"` に戻る

## 問題データの構造

### BUG_QUESTIONS の各フィールド

| フィールド | 型 | 説明 |
|------------|-----|------|
| `id` | number | 一意ID |
| `title` | string | 問題タイトル（回答後に公開） |
| `description` | string | 問題の説明文 |
| `bugLine` | number | バグのある行番号（1始まり） |
| `bugDescription` | string | 正解の説明 |
| `explanation` | string | 解説文 |
| `hint` | string | ヒントテキスト |
| `difficulty` | `"EASY"` \| `"NORMAL"` \| `"HARD"` | 難易度 |
| `lines` | string[] | 表示するコード行の配列 |

### SMELL_QUESTIONS の各フィールド

BUG_QUESTIONS と同構造だが `bugLine` の代わりに `badLines: number[]`（複数行可）、`category: string` を持つ。

## 問題の追加方法

- **BUG HUNT に追加**: `data/bugQuestions.js` の `BUG_QUESTIONS` 配列に追記する。難易度バランス（EASY/NORMAL/HARD）に注意。
- **REFACTORING に追加**: `data/smellQuestions.js` の `SMELL_QUESTIONS` 配列に追記する。

## UI テーマ

`constants/theme.js` の `MODE_THEME` でモードごとのアクセントカラーを管理。  
BUG HUNT は緑系（`#00ff55`）、REFACTORING は黄橙系（`#ffaa00`）。
