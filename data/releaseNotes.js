export const bugReleaseNotes = [
  {
    version: "v4.17", date: "2026-05-15", tag: "LATEST", tagColor: "#00ff88",
    changes: [{ type: "FIX", text: "スマホ表示でモード切り替えボタン「BUG HUNT バグを探せ」が途中改行されていた問題を修正（white-space: nowrap を追加）" }],
  },
  {
    version: "v4.16", date: "2026-05-15", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "カラー管理を CSS Custom Properties に一元化：全コンポーネントのインライン色指定を CSS 変数（var(--c-*)）に置き換え。GlobalStyles.jsx の :root ブロックと App ルート要素のインライン変数注入のみを編集すれば全体の配色が変わる保守性に改善" }],
  },
  {
    version: "v4.15", date: "2026-05-15", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "UI 全体のコントラスト改善：accentDim カラーを #1a4a1a → #4a8a4a に変更（コントラスト比 1.75:1 → 4.37:1）。リリースノート・説明文・行番号など暗すぎたテキストを読みやすく修正" }],
  },
  {
    version: "v4.14", date: "2026-05-15", tag: "", tagColor: "",
    changes: [{ type: "NEW", text: "BUG HUNT 問題を 20問 → 30問に増加（EASY +3 / NORMAL +4 / HARD +3）。追加カテゴリ：ループ制御・配列・文字列操作・条件分岐・型演算子の VB.NET 固有バグ" }],
  },
  {
    version: "v4.13", date: "2026-05-15", tag: "", tagColor: "",
    changes: [{ type: "NEW", text: "「苦手つぶしモード」タブを追加：不正解問題を localStorage に蓄積し、同カテゴリを優先出題するセッションを開始できる（BUG HUNT 専用）" }],
  },
  {
    version: "v4.12", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "問題ID8「整数除算の誤差」のコードを修正：`a \\ b`（a÷b）から `(a + b) \\ 2`（平均計算）に変更し、問題文・期待値・解説を整合させた" }],
  },
  {
    version: "v4.11", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "問題ID6「フラグ初期値の誤り」を再設計：配列検索シナリオに変更し、答えが透けない問題文・矛盾のないコードに修正" }],
  },
  {
    version: "v4.10", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "問題ID6「フラグ初期値の誤り」を再設計（isEmpty版）：コードに実際のバグがなく説明も誤りだったため修正（さらに改善の余地あり）" }],
  },
  {
    version: "v4.9", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "問題ID8「整数除算の誤差」を再設計：VB.NETでは/は浮動小数点除算のため、整数除算演算子\\を使ったバグに変更" }],
  },
  {
    version: "v4.8", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "リリースノートを指示ごとの1エントリ形式に変更" }],
  },
  {
    version: "v4.7", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "リリースノートを BUG HUNT / REFACTORING モード別に分離" }],
  },
  {
    version: "v4.6", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "問題ID18「文字列の切り出しミス」を日付パース形式の8行問題に再設計" }],
  },
  {
    version: "v4.5", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "問題ID9「条件分岐の優先順位」をデッドコード形式の1行バグに再設計" }],
  },
  {
    version: "v4.4", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "ASCIIタイトルの初期表示遅延を解消（animation-delay で即時表示）" }],
  },
  {
    version: "v4.3", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "ASCIIタイトルのスクロール速度を1.5倍に調整（22秒→15秒）" }],
  },
  {
    version: "v4.2", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "NEW", text: "ASCIIタイトルが自動横スクロール（marquee）表示されるよう実装" }],
  },
  {
    version: "v4.1", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "GitHub Pages の黒画面バグを修正（importエラー・Pages設定の誤り）" }],
  },
  {
    version: "v4.0", date: "2026-05-14", tag: "", tagColor: "",
    changes: [
      { type: "NEW", text: "「リファクタリングクイズ」モードを別タブで追加（15問プール・8問ランダム）" },
      { type: "NEW", text: "モード切り替えタブをタイトル画面に追加" },
      { type: "FIX", text: "Try-Catch握り潰し問題をバグモードからリファクタリングモードへ移動" },
    ],
  },
  {
    version: "v3.0", date: "2026-05-10", tag: "", tagColor: "",
    changes: [
      { type: "NEW", text: "問題数を20問に増加、毎回ランダム10問出題" },
      { type: "IMP", text: "回答前はタイトルを非表示に変更" },
    ],
  },
  {
    version: "v2.6", date: "2026-04-20", tag: "", tagColor: "",
    changes: [
      { type: "NEW", text: "リリースノートタブを追加" },
      { type: "FIX", text: "コードブロックに横スクロールを実装" },
      { type: "IMP", text: "正解/不正解判定をフラッシュアニメーションで強調表示" },
    ],
  },
  {
    version: "v1.0", date: "2025-12-01", tag: "INITIAL", tagColor: "#008833",
    changes: [
      { type: "NEW", text: "VB.NET バグ発見クイズ 初回リリース" },
      { type: "NEW", text: "レトロCRT端末風UIデザインを採用" },
    ],
  },
];

export const smellReleaseNotes = [
  {
    version: "v4.9", date: "2026-05-15", tag: "LATEST", tagColor: "#00ff88",
    changes: [{ type: "FIX", text: "スマホ表示でモード切り替えボタン「REFACTORING 改善点を見つけろ」が途中改行されていた問題を修正（white-space: nowrap を追加）" }],
  },
  {
    version: "v4.8", date: "2026-05-15", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "カラー管理を CSS Custom Properties に一元化：全コンポーネントのインライン色指定を CSS 変数（var(--c-*)）に置き換え。GlobalStyles.jsx の :root ブロックと App ルート要素のインライン変数注入のみを編集すれば全体の配色が変わる保守性に改善" }],
  },
  {
    version: "v4.7", date: "2026-05-15", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "UI 全体のコントラスト改善：accentDim カラーを #4a3a00 → #997700 に変更（コントラスト比 1.75:1 → 4.37:1）。タブ・ラベル・説明文など暗すぎたテキストを読みやすく修正" }],
  },
  {
    version: "v4.6", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "リリースノートを指示ごとの1エントリ形式に変更" }],
  },
  {
    version: "v4.5", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "リリースノートを BUG HUNT / REFACTORING モード別に分離" }],
  },
  {
    version: "v4.4", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "ASCIIタイトルの初期表示遅延を解消（animation-delay で即時表示）" }],
  },
  {
    version: "v4.3", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "IMP", text: "ASCIIタイトルのスクロール速度を1.5倍に調整（22秒→15秒）" }],
  },
  {
    version: "v4.2", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "NEW", text: "ASCIIタイトルが自動横スクロール（marquee）表示されるよう実装" }],
  },
  {
    version: "v4.1", date: "2026-05-14", tag: "", tagColor: "",
    changes: [{ type: "FIX", text: "GitHub Pages の黒画面バグを修正（importエラー・Pages設定の誤り）" }],
  },
  {
    version: "v4.0", date: "2026-05-14", tag: "INITIAL", tagColor: "#008833",
    changes: [
      { type: "NEW", text: "「リファクタリングクイズ」モードを追加（15問プール・8問ランダム）" },
      { type: "NEW", text: "モード切り替えタブをタイトル画面に追加" },
      { type: "FIX", text: "Try-Catch握り潰し問題をバグモードからリファクタリングモードへ移動" },
    ],
  },
];
