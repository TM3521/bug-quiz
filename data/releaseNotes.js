export const releaseNotes = [
  {
    version: "v4.1", date: "2026-05-14", tag: "LATEST", tagColor: "#00ff88",
    changes: [
      { type: "FIX", text: "GitHub Pages の黒画面バグを修正（QuizScreen の import エラー・Pages ソース設定の誤り）" },
      { type: "IMP", text: "問題ID9「条件分岐の優先順位」を再設計：バグ箇所が曖昧だったため、デッドコード形式の1行バグに変更" },
      { type: "IMP", text: "問題ID18「文字列の切り出しミス」を再設計：4行の自明な問題から日付パース形式の8行問題に変更" },
      { type: "NEW", text: "スマホでASCIIタイトルが自動横スクロール（marquee）表示されるよう実装" },
      { type: "IMP", text: "ASCIIタイトルのスクロール速度を1.5倍に調整（22秒→15秒）" },
      { type: "FIX", text: "ASCIIタイトルの初期表示遅延を解消（animation-delay で即時表示）" },
    ],
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
