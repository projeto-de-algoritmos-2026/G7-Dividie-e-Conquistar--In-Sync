"use client";

interface Props {
  nextPlayerName: string;
  nextPlayerIndex: 0 | 1 | 2 | 3;
  duoName: string;
  onContinue: () => void;
}

const duoColors = [
  "text-gradient-duo1",
  "text-gradient-duo1",
  "text-gradient-duo2",
  "text-gradient-duo2",
];

const duoGlow = [
  "glow-duo1 border-cyan-500/30",
  "glow-duo1 border-cyan-500/30",
  "glow-duo2 border-purple-500/30",
  "glow-duo2 border-purple-500/30",
];

export default function TransitionScreen({
  nextPlayerName,
  nextPlayerIndex,
  duoName,
  onContinue,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center animate-fade-in">

        {/* Glass card */}
        <div className={`glass rounded-3xl p-10 border ${duoGlow[nextPlayerIndex]}`}>
          <p className="text-white/50 text-sm font-medium uppercase tracking-widest mb-3">
            Próximo Turno
          </p>

          <h2 className={`text-4xl font-black mb-2 ${duoColors[nextPlayerIndex]}`}>
            {nextPlayerName}
          </h2>

          <p className="text-white/40 text-sm mb-8">
            {duoName}
          </p>

          <div className="border-t border-white/10 pt-6 mb-8">
            <p className="text-white/70 text-base leading-relaxed">
              Passe o dispositivo para{" "}
              <span className="text-white font-semibold">{nextPlayerName}</span>{" "}
              e clique em <span className="text-white font-semibold">"Estou pronto!"</span>{" "}
              quando estiver só.
            </p>
          </div>

          <button
            id="transition-ready-btn"
            onClick={onContinue}
            className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-all duration-200 active:scale-95 hover:opacity-90 ${
              nextPlayerIndex < 2 ? "bg-duo1 glow-duo1" : "bg-duo2 glow-duo2"
            }`}
          >
            Estou pronto! →
          </button>
        </div>

        {/* Indicador de progresso */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < nextPlayerIndex
                  ? "w-8 bg-white/60"
                  : i === nextPlayerIndex
                  ? "w-8 bg-white"
                  : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
