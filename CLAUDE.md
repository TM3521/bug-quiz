# VB.NET BUG HUNTER

VB.NET のソースコードを題材にしたクイズアプリ。レトロな CRT 端末風 UI で動作する React (JSX) 製のシングルページアプリ。

## 概要

あえてバグや問題のあるコードを提示し、ユーザーが該当行をクリックして回答する形式のクイズ。  
**BUG HUNT** と **REFACTORING** の 2 モードを持つ。

## モード

| モード | 内容 | 問題数 | 出題数 |
|--------|------|--------|--------|
| BUG HUNT | バグのある行を特定する | 40問 | 毎回ランダム10問 |
| REFACTORING | コードの臭い・改善点のある行を特定する | 25問 | 毎回ランダム8問 |

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
    bugQuestions.js        BUG_QUESTIONS 配列（30問）※ category フィールドあり
    smellQuestions.js      SMELL_QUESTIONS 配列（15問）
    releaseNotes.js        リリースノートデータ
  constants/
    theme.js               MODE_THEME・difficultyColor・changeTypeStyle・セッション定数
  utils/
    quiz.js                shuffle / pickBugQuestions / pickSmellQuestions / pickWeakQuestions
    weakness.js            localStorage で苦手履歴を管理（loadWeaknesses / saveWeakness / clearWeaknesses）
  components/
    GlobalStyles.jsx       CSSアニメーション・スクロールバースタイル（<style> タグ）
    TitleScreen.jsx        タイトル画面（HOME / 苦手つぶし / RELEASE NOTES タブ）
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
| `category` | string | カテゴリ（苦手つぶしモードで使用） |
| `lines` | string[] | 表示するコード行の配列 |

#### BUG_QUESTIONS カテゴリ一覧

| カテゴリ | 問題ID |
|----------|--------|
| ループ制御 | 1, 10, 21, 28, 31 |
| 配列 | 2, 22, 30, 38 |
| 文字列操作 | 3, 5, 18, 23, 25, 33, 35 |
| 条件分岐 | 4, 9, 11, 12, 24, 26, 37 |
| 変数初期化 | 6, 32 |
| 再帰 | 7 |
| 型・演算子 | 8, 13, 14, 17, 27, 29, 36, 40 |
| Null参照 | 15, 20 |
| イベント | 16 |
| 引数渡し | 19 |
| コレクション | 34, 39 |

### SMELL_QUESTIONS の各フィールド

BUG_QUESTIONS と同構造だが `bugLine` の代わりに `badLines: number[]`（複数行可）、`category: string` を持つ。

## 問題の追加方法

- **BUG HUNT に追加**: `data/bugQuestions.js` の `BUG_QUESTIONS` 配列に追記する。難易度バランス（EASY/NORMAL/HARD）に注意。
- **REFACTORING に追加**: `data/smellQuestions.js` の `SMELL_QUESTIONS` 配列に追記する。

## UI テーマ・カラー管理

カラーは CSS Custom Properties（CSS 変数）で一元管理している。

### 静的カラー変数（`components/GlobalStyles.jsx` の `:root` ブロック）

常に固定の色（コードハイライト・正誤判定・ヒント・リリースノートなど）を `--c-*` 変数として定義。  
例：`--c-wrong: #ff4466;`、`--c-code: #00aa44;`、`--c-hint-text: #ffcc00;`

### 動的カラー変数（`vb-bug-quiz.jsx` のルート `<div>` インラインスタイル）

モード（BUG HUNT / REFACTORING）に応じてアクセントカラーが変わる変数を `style` prop で注入：

| 変数名 | 内容 |
|--------|------|
| `--c-accent` | メインアクセントカラー |
| `--c-dim` | 暗めのアクセント（ラベル・説明文など） |
| `--c-accent-bg` | 薄いアクセント背景 |
| `--c-accent-88` / `--c-accent-66` / `--c-accent-14` / `--c-accent-99` | アルファ付き派生色 |

アクセントカラーの元値は `constants/theme.js` の `MODE_THEME` で管理。  
BUG HUNT は緑系（`#00ff55`）、REFACTORING は黄橙系（`#ffaa00`）。

モード選択ボタンはBUG・SMELLを同時表示するため、固定の `--c-bug-accent` / `--c-smell-accent` を使用。

## 苦手つぶしモード

BUG HUNT 専用機能。不正解時に問題ID・カテゴリ・間違え回数を localStorage（key: `vbBugHunterWeaknesses`）に蓄積する。

- タイトル画面の「苦手つぶし」タブで苦手カテゴリ分析を表示
- **WEAK SESSION** ボタンで特化セッションを開始：間違えた問題 → 同カテゴリの他問題 → 残り問題の順で10問を選択
- 「データリセット」ボタンで localStorage をクリア

## 既知の修正履歴

- `components/QuizScreen.jsx` の import 文で `SMELL_QUESTIONS` を誤って `bugQuestions.js` から import していたバグを修正。正しくは `smellQuestions.js` から import する。
- 問題ID9「条件分岐の優先順位」を再設計。3つの条件すべてが逆順で bugLine が曖昧だったため、「同じ条件 `>= 80` が2行連続する（デッドコード）」という形に変更し、bugLine=5 の1行に絞った。
- スマホ（640px以下）でASCIIアートタイトルが横スクロール（marquee）するよう変更。PCでは従来通り。

## 開発ルール

アプリを修正した場合は、必ず以下を行う：

1. **リリースノートを更新する** — 指示1件につき1バージョンエントリを `data/releaseNotes.js` に追加する。変更を1つの `changes` 配列にまとめず、必ず独立したエントリとして先頭に追記する。BUG HUNT の変更は `bugReleaseNotes`、REFACTORING の変更は `smellReleaseNotes`、両モード共通の変更は両方に追記する。バージョン番号は直前のエントリの次の番号を使う。type は `NEW`（新機能）/ `FIX`（バグ修正）/ `IMP`（改善）のいずれかを使う。
2. **CLAUDE.md を更新する** — 変更内容（新機能・仕様変更・ファイル構成の変化など）をこのファイルに反映する
3. **GitHub にコミット・プッシュする** — 修正内容を `main` ブランチに push することで GitHub Actions が自動デプロイを実行する
