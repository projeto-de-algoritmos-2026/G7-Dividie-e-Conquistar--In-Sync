"use client";

import { useState } from "react";
import { GameResult, ThemeResult, DuoResult } from "@/lib/types";

interface Props {
  result: GameResult;
  onRestart: () => void;
}

// Barra de progresso de sintonia
function SynergyBar({ synergy, color }: { synergy: number; color: "duo1" | "duo2" }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color === "duo1" ? "bg-duo1" : "bg-duo2"} transition-all duration-1000`}
          style={{ width: `${synergy}%` }}
        />
      </div>
      <span className="text-white font-black text-lg w-14 text-right">{synergy}%</span>
    </div>
  );
}

// Seção de detalhes do algoritmo
function AlgorithmDetail({ themeResult, duoName }: { themeResult: ThemeResult; duoName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
      >
        <span className="text-white/70 text-sm font-medium">
          Analise de Merge Sort — {duoName}
        </span>
        <span className="text-white/30 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 animate-slide-up">
          {/* Vetor de mapeamento */}
          <div className="glass rounded-xl p-3 mt-2">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Vetor de Mapeamento</p>
            <div className="flex gap-2 flex-wrap">
              {themeResult.mappingVector.map((val, i) => (
                <span key={i} className="bg-white/10 text-white text-xs px-2 py-1 rounded font-mono">
                  {val}
                </span>
              ))}
            </div>

            <p className="text-white/40 text-xs mt-2">
              {themeResult.inversions} inversão(ões) · Máx: {themeResult.maxInversions}
            </p>
          </div>

          {/* Passos do Merge Sort */}
          {themeResult.sortedSteps.length > 0 && (
            <div className="glass rounded-xl p-3">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                Passos do Merge Sort
              </p>
              <div className="space-y-2">
                {themeResult.sortedSteps.map((step, i) => (
                  <div key={i} className="text-xs font-mono">
                    <span className="text-cyan-400/70">Passo {i + 1}:</span>{" "}
                    <span className="text-white/60">{step.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Card de resultado de uma dupla
function DuoCard({ duoResult, duoLabel, isWinner, color }: {
  duoResult: DuoResult;
  duoLabel: string;
  isWinner: boolean;
  color: "duo1" | "duo2";
}) {
  const borderClass = isWinner
    ? "border-amber-400/50 glow-gold"
    : color === "duo1"
    ? "border-cyan-500/20"
    : "border-purple-500/20";

  return (
    <div className={`glass rounded-3xl p-6 border ${borderClass}`}>
      {isWinner && (
        <div className="text-center mb-4">
          <span className="bg-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Vencedores
          </span>
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-4 h-4 rounded-full bg-${color}`} />
        <h2 className="text-white font-black text-2xl">{duoLabel}</h2>
      </div>
      <p className="text-white/50 text-sm mb-6">
        {duoResult.players.join(" & ")}
      </p>

      <div className="mb-6">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Sintonia Final</p>
        <SynergyBar synergy={duoResult.averageSynergy} color={color} />
        <p className="text-white/30 text-xs mt-2 text-right">
          {duoResult.totalInversions} inversão(ões) · Máx: {duoResult.themeResult.maxInversions}
        </p>
      </div>

      {/* Comparativo de Rankings */}
      <div className="border-t border-white/10 pt-5">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Ordem de cada jogador</p>
        <div className="flex gap-4 text-sm">
          <div className="flex-1">
            <p className="text-white/60 font-semibold mb-2 truncate">{duoResult.players[0]}</p>
            <ol className="list-decimal list-inside space-y-1">
              {duoResult.themeResult.player1Ranking.map((item, idx) => (
                <li key={idx} className="truncate text-white/80">
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="w-px bg-white/10"></div>
          <div className="flex-1">
            <p className="text-white/60 font-semibold mb-2 truncate">{duoResult.players[1]}</p>
            <ol className="list-decimal list-inside space-y-1">
              {duoResult.themeResult.player2Ranking.map((item, idx) => (
                <li key={idx} className="truncate text-white/80">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsScreen({ result, onRestart }: Props) {
  const { themeName, duo1Result, duo2Result, winner, winnerMessage } = result;
  const [showAlgorithm, setShowAlgorithm] = useState(false);

  const isTie = winner === "tie";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">

        {/* Header vencedor */}
        <div className="text-center mb-8">
          <p className="text-white/50 text-sm uppercase tracking-widest mb-1">
            Tema Analisado: {themeName}
          </p>
          <h1 className="text-4xl font-black text-white mb-4">
            {isTie ? "Empate!" : "Resultado Final"}
          </h1>
          <p className={`text-xl font-bold ${
            winner === 1 ? "text-gradient-duo1" : winner === 2 ? "text-gradient-duo2" : "text-white"
          }`}>
            {winnerMessage}
          </p>
        </div>

        {/* Cards das duplas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DuoCard duoResult={duo1Result} duoLabel="Dupla 1" isWinner={winner === 1} color="duo1" />
          <DuoCard duoResult={duo2Result} duoLabel="Dupla 2" isWinner={winner === 2} color="duo2" />
        </div>

        {/* Seção acadêmica: visualização do algoritmo */}
        <div className="glass rounded-3xl border border-white/10 mt-8">
          <button
            id="toggle-algorithm-btn"
            onClick={() => setShowAlgorithm(!showAlgorithm)}
            className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors rounded-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="text-left">
                <p className="text-white font-bold text-lg">Visualização do Algoritmo</p>
                <p className="text-white/50 text-sm">
                  Merge Sort (Contagem de Inversões)
                </p>
              </div>
            </div>
            <span className="text-white/40">{showAlgorithm ? "▲" : "▼"}</span>
          </button>

          {showAlgorithm && (
            <div className="px-6 pb-6 space-y-6 animate-slide-up">
              <div className="glass rounded-xl p-5 text-sm text-white/70 leading-relaxed border border-cyan-500/20">
                <p className="font-mono text-cyan-400 mb-3 font-semibold">{"// Como Funciona?"}</p>
                <ul className="space-y-3 list-disc pl-5">
                  <li>
                    <strong className="text-white">Mesmos 5 Itens:</strong> Ambos os jogadores da dupla recebem os mesmos 5 itens e apenas reordenam de acordo com sua preferência.
                  </li>
                  <li>
                    <strong className="text-white">Vetor de Mapeamento:</strong> Para cada item na ordem do Jogador 1, registramos a posição que o Jogador 2 atribuiu. O resultado é uma permutação de [1, 2, 3, 4, 5].
                  </li>
                  <li>
                    <strong className="text-white">Merge Sort (Inversões):</strong> Aplicamos o algoritmo de Dividir e Conquistar para contar inversões. O número máximo possível é <strong className="text-cyan-400">10</strong> (C(5,2) = 5×4/2).
                  </li>
                  <li>
                    <strong className="text-white">Sintonia Final:</strong> Normalizada linearmente: <em>(10 − inversões) / 10 × 100%</em>. Ordem idêntica = 100%, completamente invertida = 0%.
                  </li>
                </ul>
              </div>

              <AlgorithmDetail themeResult={duo1Result.themeResult} duoName={"Dupla 1"} />
              <AlgorithmDetail themeResult={duo2Result.themeResult} duoName={"Dupla 2"} />
            </div>
          )}
        </div>

        {/* Botão restart */}
        <button
          id="restart-btn"
          onClick={onRestart}
          className="w-full py-5 mt-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xl transition-all active:scale-95 uppercase tracking-wider"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}
