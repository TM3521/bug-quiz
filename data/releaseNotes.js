export const bugReleaseNotes = [
  {
    version: "v4.8", date: "2026-05-14", tag: "LATEST", tagColor: "#00ff88",
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
    version: "v4.6", date: "2026-05-14", tag: "LATEST", tagColor: "#00ff88",
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
