"use client";

import { useState } from "react";

interface Props {
  playerName: string;
  playerIndex: 0 | 1 | 2 | 3;
  duoName: string;
  themeName: string;
  themeItems: string[]; // 5 itens fixos
  onComplete: (ranking: string[]) => void;
}

const accentColor = (playerIndex: number) =>
  playerIndex < 2
    ? "border-cyan-500/50 text-gradient-duo1"
    : "border-purple-500/50 text-gradient-duo2";

const btnColor = (playerIndex: number) =>
  playerIndex < 2 ? "bg-duo1 glow-duo1" : "bg-duo2 glow-duo2";

const slotColors = [
  "text-amber-400 border-amber-400/40 bg-amber-400/10",    // 1º
  "text-slate-300 border-slate-300/40 bg-slate-300/10",     // 2º
  "text-amber-600 border-amber-600/40 bg-amber-600/10",    // 3º
  "text-white/80 border-white/30 bg-white/10",              // 4º
  "text-white/60 border-white/20 bg-white/5",               // 5º
];

export default function RankingScreen({
  playerName,
  playerIndex,
  duoName,
  themeName,
  themeItems,
  onComplete,
}: Props) {
  // Todos os 5 itens já estão nos slots desde o início
  const [slots, setSlots] = useState<string[]>([...themeItems]);

  // Mover item entre slots (reordenar)
  function swapSlots(fromIdx: number, toIdx: number) {
    if (fromIdx === toIdx) return;
    const newSlots = [...slots];
    const temp = newSlots[fromIdx];
    newSlots[fromIdx] = newSlots[toIdx];
    newSlots[toIdx] = temp;
    setSlots(newSlots);
  }

  function moveUp(idx: number) {
    if (idx <= 0) return;
    swapSlots(idx, idx - 1);
  }

  function moveDown(idx: number) {
    if (idx >= 4) return;
    swapSlots(idx, idx + 1);
  }

  function handleConfirm() {
    onComplete(slots);
  }

  // Embaralhar aleatoriamente para demonstrações
  function fillRandomly() {
    const shuffled = [...themeItems].sort(() => 0.5 - Math.random());
    setSlots(shuffled);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up py-6">

        {/* Header do jogador */}
        <div className="text-center mb-6">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-1">{duoName}</p>
          <h2 className={`text-3xl font-black ${accentColor(playerIndex)}`}>
            {playerName}
          </h2>
        </div>

        {/* Card principal */}
        <div className="glass rounded-3xl p-6 border border-white/10">

          {/* Tema atual */}
          <div className="mb-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
              Tema da Rodada
            </p>
            <h3 className="text-2xl font-black text-white leading-tight">
              {themeName}
            </h3>
          </div>

          {/* Instrução */}
          <p className="text-white/60 text-sm mb-5 border-l-2 border-white/20 pl-3">
            Reordene os itens abaixo usando as setas para montar o seu{" "}
            <span className="text-white font-semibold">Top 5</span>.
          </p>

          {/* TOP 5 SLOTS */}
          <div className="space-y-2 mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Seu Top 5</p>
            {slots.map((item, idx) => (
              <div
                key={`${item}-${idx}`}
                className={`flex items-center gap-0 rounded-xl border transition-all duration-200 ${slotColors[idx]}`}
              >
                {/* Posição */}
                <div className={`flex items-center justify-center w-12 h-14 rounded-l-xl font-black text-lg border-r border-inherit`}>
                  {idx + 1}º
                </div>

                {/* Conteúdo do slot */}
                <div className="flex-1 py-3 px-3 font-medium select-none">
                  {item}
                </div>

                {/* Controles de Subir/Descer */}
                <div className="flex flex-col border-l border-inherit h-14">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="flex-1 px-3 hover:bg-white/10 rounded-tr-xl disabled:opacity-20 transition-colors text-white/50 cursor-pointer"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === 4}
                    className="flex-1 px-3 hover:bg-white/10 rounded-br-xl disabled:opacity-20 transition-colors text-white/50 cursor-pointer"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-3">
            <button
              id="ranking-confirm-btn"
              onClick={handleConfirm}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all active:scale-95 uppercase tracking-wider ${btnColor(playerIndex)} hover:opacity-90 cursor-pointer`}
            >
              Confirmar Top 5
            </button>

            <button
              onClick={fillRandomly}
              className="w-full py-3 rounded-xl font-bold text-sm text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all active:scale-95 uppercase tracking-wider cursor-pointer"
            >
              Embaralhar Aleatoriamente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
