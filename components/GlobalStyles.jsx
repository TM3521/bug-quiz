export default function GlobalStyles() {
  return (
    <style>{`
      .code-scroll::-webkit-scrollbar { height:6px; }
      .code-scroll::-webkit-scrollbar-track { background:#060e06; }
      .code-scroll::-webkit-scrollbar-thumb { background:#2a5a2a; border-radius:3px; }
      .code-scroll::-webkit-scrollbar-thumb:hover { background:#3a8a3a; }
      .notes-scroll::-webkit-scrollbar { width:4px; }
      .notes-scroll::-webkit-scrollbar-track { background:transparent; }
      .notes-scroll::-webkit-scrollbar-thumb { background:#1a4a1a; border-radius:2px; }
      .tab-btn:hover  { opacity:0.85; }
      .action-btn { transition:all 0.2s; }
      .action-btn:hover { opacity:0.85; box-shadow:0 0 24px rgba(255,255,255,0.15) !important; }
      .line-row { transition:background 0.1s; }
      .hint-btn:hover { opacity:0.8; }
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
