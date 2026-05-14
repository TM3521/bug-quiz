export default function GlobalStyles() {
  return (
    <style>{`
      /* =============================================
         CSS Custom Properties – single source of truth
         Dynamic vars (--c-accent etc.) are injected
         on the root div in vb-bug-quiz.jsx.
         ============================================= */
      :root {
        /* Backgrounds */
        --c-bg-main:         #0a0a0f;
        --c-bg-panel:        #0d1a0d;
        --c-bg-titlebar:     #0a140a;
        --c-bg-modebar:      #080f08;
        --c-bg-code:         #060e06;
        --c-bg-code-border:  #142814;
        --c-bg-progress:     #0a1a0a;

        /* Mode selector – fixed per-mode colors (buttons show both at once) */
        --c-bug-accent:      #00ff55;
        --c-bug-dim:         #4a8a4a;
        --c-bug-bg:          rgba(0,255,80,0.08);
        --c-bug-glow:        rgba(0,255,80,0.5);
        --c-smell-accent:    #ffaa00;
        --c-smell-dim:       #997700;
        --c-smell-bg:        rgba(255,170,0,0.08);
        --c-smell-glow:      rgba(255,170,0,0.5);
        --c-smell-border:    rgba(255,170,0,0.5);
        --c-mode-inactive:   #3a6a3a;

        /* Code block */
        --c-code:            #00aa44;
        --c-code-sel:        #ccffee;
        --c-code-bug-hl:     #ff8899;
        --c-code-smell-hl:   #ffcc66;

        /* Line highlights */
        --c-line-bug:              #ff4466;
        --c-line-smell:            #ffaa00;
        --c-code-bg-bug-hl:       rgba(255,68,102,0.15);
        --c-code-bg-smell-hl:     rgba(255,170,0,0.12);
        --c-code-border-bug-hl:   3px solid #ff4466;
        --c-code-border-smell-hl: 3px solid #ffaa00;

        /* Wrong / Incorrect */
        --c-wrong:           #ff4466;
        --c-wrong-text:      #ff5577;
        --c-wrong-bg:        rgba(255,68,102,0.07);
        --c-wrong-bg-deep:   rgba(255,68,102,0.12);
        --c-wrong-border:    rgba(255,68,102,0.4);

        /* Correct */
        --c-correct-bug-border:   rgba(0,255,136,0.4);
        --c-correct-smell-border: rgba(255,170,0,0.4);
        --c-correct-bug-bg:       rgba(0,255,136,0.12);
        --c-correct-smell-bg:     rgba(255,170,0,0.12);
        --c-verdict-text:         #00cc44;
        --c-verdict-border:       #336633;
        --c-correct-bug-sub:      #33cc77;
        --c-correct-smell-sub:    #ddaa00;

        /* Hint */
        --c-hint-bg:         rgba(255,204,0,0.05);
        --c-hint-border:     rgba(255,204,0,0.25);
        --c-hint-label:      #aa8800;
        --c-hint-text:       #ffcc00;

        /* Release Notes (always terminal-green) */
        --c-notes-ver-new:    #00ff88;
        --c-notes-ver-old:    #00bb44;
        --c-notes-border-new: #00ff55;
        --c-notes-border-old: #2a6a2a;
        --c-notes-date:       #4a8a4a;
        --c-notes-text:       #00aa44;
        --c-notes-divider:    #1a3a1a;

        /* Weakness tab */
        --c-weak-count:      #ff8866;
        --c-weak-bar-bg:     #0d200d;
        --c-weak-bar-glow:   rgba(255,68,102,0.6);

        /* Disabled controls */
        --c-disabled-text:   #555;
        --c-disabled-border: #444;

        /* CRT overlay */
        --c-crt-scan:        rgba(0,255,100,0.012);
        --c-crt-line:        rgba(0,255,100,0.07);
      }

      /* Scrollbars */
      .code-scroll::-webkit-scrollbar { height:6px; }
      .code-scroll::-webkit-scrollbar-track { background:var(--c-bg-code); }
      .code-scroll::-webkit-scrollbar-thumb { background:#2a5a2a; border-radius:3px; }
      .code-scroll::-webkit-scrollbar-thumb:hover { background:#3a8a3a; }
      .notes-scroll::-webkit-scrollbar { width:4px; }
      .notes-scroll::-webkit-scrollbar-track { background:transparent; }
      .notes-scroll::-webkit-scrollbar-thumb { background:#1a4a1a; border-radius:2px; }

      /* Interactive elements */
      .tab-btn:hover  { opacity:0.85; }
      .action-btn { transition:all 0.2s; }
      .action-btn:hover { opacity:0.85; box-shadow:0 0 24px rgba(255,255,255,0.15) !important; }
      .line-row { transition:background 0.1s; }
      .hint-btn:hover { opacity:0.8; }

      /* ASCII marquee */
      @keyframes marquee-x {
        from { transform: translateX(100%); }
        to   { transform: translateX(-100%); }
      }
      .ascii-outer { overflow: hidden; text-align: center; }
      .ascii-inner { display: inline-block; animation: marquee-x 15s linear -7.5s infinite; }

      /* Verdict animations */
      @keyframes verdict-in {
        0%  { opacity:0; transform:scale(0.7) translateY(-8px); }
        60% { transform:scale(1.06) translateY(2px); }
        100%{ opacity:1; transform:scale(1) translateY(0); }
      }
      @keyframes flash-correct-bug {
        0%  { box-shadow:0 0 0 rgba(0,255,136,0); }
        30% { box-shadow:0 0 60px rgba(0,255,136,0.35),inset 0 0 40px rgba(0,255,136,0.08); }
        100%{ box-shadow:0 0 20px rgba(0,255,136,0.1); }
      }
      @keyframes flash-correct-smell {
        0%  { box-shadow:0 0 0 rgba(255,170,0,0); }
        30% { box-shadow:0 0 60px rgba(255,170,0,0.35),inset 0 0 40px rgba(255,170,0,0.08); }
        100%{ box-shadow:0 0 20px rgba(255,170,0,0.1); }
      }
      @keyframes flash-wrong {
        0%  { box-shadow:0 0 0 rgba(255,68,102,0); }
        30% { box-shadow:0 0 60px rgba(255,68,102,0.35),inset 0 0 40px rgba(255,68,102,0.08); }
        100%{ box-shadow:0 0 20px rgba(255,68,102,0.08); }
      }
      @keyframes glow-c-bug   { 0%,100%{text-shadow:0 0 14px rgba(0,255,136,0.6);} 50%{text-shadow:0 0 32px rgba(0,255,136,1);} }
      @keyframes glow-c-smell { 0%,100%{text-shadow:0 0 14px rgba(255,170,0,0.6);} 50%{text-shadow:0 0 32px rgba(255,170,0,1);} }
      @keyframes glow-w       { 0%,100%{text-shadow:0 0 14px rgba(255,68,102,0.6);} 50%{text-shadow:0 0 32px rgba(255,68,102,1);} }
      .verdict-c-bug   { animation:verdict-in .35s cubic-bezier(.22,1,.36,1) forwards, glow-c-bug   1.4s ease-in-out .35s infinite; }
      .verdict-c-smell { animation:verdict-in .35s cubic-bezier(.22,1,.36,1) forwards, glow-c-smell 1.4s ease-in-out .35s infinite; }
      .verdict-w       { animation:verdict-in .35s cubic-bezier(.22,1,.36,1) forwards, glow-w       1.4s ease-in-out .35s infinite; }
      .rbox-c-bug   { animation:flash-correct-bug   .7s ease-out forwards; }
      .rbox-c-smell { animation:flash-correct-smell .7s ease-out forwards; }
      .rbox-w       { animation:flash-wrong         .7s ease-out forwards; }
    `}</style>
  );
}
