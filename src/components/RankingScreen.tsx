"use client";

import { useState } from "react";

interface Props {
  playerName: string;
  playerIndex: 0 | 1 | 2 | 3;
  duoName: string;
  themeName: string;
  themeItems: string[]; // 10 itens disponíveis
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
  // Top 5 slots (null = vazio)
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null, null]);

  // Itens que já foram colocados nos slots
  const usedItems = new Set(slots.filter((s): s is string => s !== null));

  // Pool = itens disponíveis que ainda não estão nos slots
  const pool = themeItems.filter((item) => !usedItems.has(item));

  // Adicionar item da pool ao próximo slot vazio
  function addToSlot(item: string) {
    const newSlots = [...slots];
    const emptyIdx = newSlots.findIndex((s) => s === null);
    if (emptyIdx !== -1) {
      newSlots[emptyIdx] = item;
      setSlots(newSlots);
    }
  }

  // Remover item de um slot (devolver à pool)
  function removeFromSlot(slotIndex: number) {
    const newSlots = [...slots];
    newSlots[slotIndex] = null;
    setSlots(newSlots);
  }

  // Mover item entre slots (reordenar)
  function swapSlots(fromIdx: number, toIdx: number) {
    if (fromIdx === toIdx) return;
    const newSlots = [...slots];
    const temp = newSlots[fromIdx];
    newSlots[fromIdx] = newSlots[toIdx];
    newSlots[toIdx] = temp;
    setSlots(newSlots);
  }

  // Mover slot para cima
  function moveUp(idx: number) {
    if (idx <= 0) return;
    swapSlots(idx, idx - 1);
  }

  // Mover slot para baixo
  function moveDown(idx: number) {
    if (idx >= 4) return;
    swapSlots(idx, idx + 1);
  }

  // Confirmar — só permite se todos os 5 slots estão preenchidos
  const allFilled = slots.every((s) => s !== null);

  function handleConfirm() {
    if (!allFilled) return;
    onComplete(slots as string[]);
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
            Clique nos itens abaixo para montar o seu <span className="text-white font-semibold">Top 5</span>.
            Use as setas para reordenar. Clique num slot preenchido para remover.
          </p>

          {/* ═══ TOP 5 SLOTS ═══ */}
          <div className="space-y-2 mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Seu Top 5</p>
            {slots.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-0 rounded-xl border transition-all duration-200 ${
                  item
                    ? slotColors[idx]
                    : "border-dashed border-white/15 bg-white/[0.02]"
                }`}
              >
                {/* Posição */}
                <div className={`flex items-center justify-center w-12 h-14 rounded-l-xl font-black text-lg border-r ${
                  item ? "border-inherit" : "border-white/10"
                }`}>
                  {idx + 1}º
                </div>

                {/* Conteúdo do slot */}
                {item ? (
                  <button
                    onClick={() => removeFromSlot(idx)}
                    className="flex-1 text-left py-3 px-3 font-medium select-none hover:opacity-70 transition-opacity cursor-pointer"
                    title="Clique para remover"
                  >
                    {item}
                    <span className="text-[10px] ml-2 opacity-40">(remover)</span>
                  </button>
                ) : (
                  <div className="flex-1 py-3 px-3 text-white/20 text-sm italic select-none">
                    Vazio — clique num item abaixo
                  </div>
                )}

                {/* Controles de Subir/Descer */}
                {item && (
                  <div className="flex flex-col border-l border-inherit h-14">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="flex-1 px-3 hover:bg-white/10 rounded-tr-xl disabled:opacity-20 transition-colors text-white/50"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === 4}
                      className="flex-1 px-3 hover:bg-white/10 rounded-br-xl disabled:opacity-20 transition-colors text-white/50"
                    >
                      ▼
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ═══ POOL DE ITENS ═══ */}
          <div className="mb-8">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
              Itens Disponíveis ({pool.length})
            </p>
            {pool.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {pool.map((item) => (
                  <button
                    key={item}
                    onClick={() => addToSlot(item)}
                    disabled={allFilled}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      allFilled
                        ? "bg-white/5 border-white/10 text-white/30 cursor-not-allowed"
                        : "bg-white/5 border-white/15 text-white hover:bg-white/15 hover:border-white/30 active:scale-95 cursor-pointer"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-sm italic">Todos os itens foram selecionados.</p>
            )}
          </div>

          {/* Botão de confirmar */}
          <button
            id="ranking-confirm-btn"
            onClick={handleConfirm}
            disabled={!allFilled}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all active:scale-95 uppercase tracking-wider ${
              allFilled
                ? `${btnColor(playerIndex)} hover:opacity-90`
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            {allFilled ? "Confirmar Top 5" : `Selecione mais ${5 - slots.filter((s) => s !== null).length} item(ns)`}
          </button>
        </div>
      </div>
    </div>
  );
}
