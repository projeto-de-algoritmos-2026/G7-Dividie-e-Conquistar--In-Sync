"use client";

import { useState } from "react";
import SetupScreen from "@/components/SetupScreen";
import TransitionScreen from "@/components/TransitionScreen";
import RankingScreen from "@/components/RankingScreen";
import CalculatingScreen from "@/components/CalculatingScreen";
import ResultsScreen from "@/components/ResultsScreen";
import { GameResult } from "@/lib/types";

// ============================================================
// MÁQUINA DE ESTADO DO JOGO
// ============================================================

export type GamePhase =
  | "SETUP"
  | "PLAYER_TURN"
  | "TRANSITION"
  | "CALCULATING"
  | "RESULTS";

export interface SetupData {
  playerNames: [string, string, string, string]; // [1A, 1B, 2A, 2B]
  themeName: string; // TEMA ÚNICO!
  themeItems: string[]; // 5 itens do tema
}

export interface GameState {
  phase: GamePhase;
  setup: SetupData;
  rankings: (string[] | null)[]; // rankings[0..3]
  currentPlayer: 0 | 1 | 2 | 3;
  result: GameResult | null;
}

const initialSetup: SetupData = {
  playerNames: ["Jogador A", "Jogador B", "Jogador C", "Jogador D"],
  themeName: "",
  themeItems: [],
};

export default function GameApp() {
  const [gameState, setGameState] = useState<GameState>({
    phase: "SETUP",
    setup: initialSetup,
    rankings: [null, null, null, null],
    currentPlayer: 0,
    result: null,
  });

  // ── SETUP → PLAYER 0 ────────────────────────────────────
  function handleSetupComplete(setup: SetupData) {
    setGameState((prev) => ({
      ...prev,
      setup,
      phase: "PLAYER_TURN",
      currentPlayer: 0,
      rankings: [null, null, null, null],
    }));
  }

  // ── PLAYER FINALIZOU SEU RANKING ────────────────────────
  function handleRankingComplete(ranking: string[]) {
    setGameState((prev) => {
      const newRankings = [...prev.rankings];
      newRankings[prev.currentPlayer] = ranking;

      const nextPlayer = (prev.currentPlayer + 1) as 0 | 1 | 2 | 3;

      if (prev.currentPlayer === 3) {
        // Todos os jogadores finalizaram → calcular
        return { ...prev, rankings: newRankings, phase: "CALCULATING" };
      }

      return {
        ...prev,
        rankings: newRankings,
        phase: "TRANSITION",
        currentPlayer: nextPlayer,
      };
    });
  }

  // ── TRANSIÇÃO → PRÓXIMO JOGADOR ─────────────────────────
  function handleTransitionContinue() {
    setGameState((prev) => ({ ...prev, phase: "PLAYER_TURN" }));
  }

  // ── CALCULATING → RESULTS ───────────────────────────────
  async function handleCalculating() {
    const { setup, rankings } = gameState;
    const [r0, r1, r2, r3] = rankings as string[][];

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          themeName: setup.themeName,
          themeItems: setup.themeItems,
          duo1: [
            { name: setup.playerNames[0], ranking: r0 },
            { name: setup.playerNames[1], ranking: r1 },
          ],
          duo2: [
            { name: setup.playerNames[2], ranking: r2 },
            { name: setup.playerNames[3], ranking: r3 },
          ],
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erro ao calcular sintonia.");
      }

      const result: GameResult = await response.json();
      setGameState((prev) => ({ ...prev, result, phase: "RESULTS" }));
    } catch (err) {
      console.error("Erro ao calcular:", err);
      alert("Ocorreu um erro ao calcular a sintonia. Tente novamente.");
      setGameState((prev) => ({ ...prev, phase: "SETUP" }));
    }
  }

  // ── RESTART ─────────────────────────────────────────────
  function handleRestart() {
    setGameState({
      phase: "SETUP",
      setup: initialSetup,
      rankings: [null, null, null, null],
      currentPlayer: 0,
      result: null,
    });
  }

  // ── RENDER ──────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {gameState.phase === "SETUP" && (
        <SetupScreen
          initialSetup={gameState.setup}
          onComplete={handleSetupComplete}
        />
      )}

      {gameState.phase === "PLAYER_TURN" && (
        <RankingScreen
          playerName={gameState.setup.playerNames[gameState.currentPlayer]}
          playerIndex={gameState.currentPlayer}
          duoName={gameState.currentPlayer < 2 ? "Dupla 1" : "Dupla 2"}
          themeName={gameState.setup.themeName}
          themeItems={gameState.setup.themeItems}
          onComplete={handleRankingComplete}
        />
      )}

      {gameState.phase === "TRANSITION" && (
        <TransitionScreen
          nextPlayerName={
            gameState.setup.playerNames[gameState.currentPlayer]
          }
          nextPlayerIndex={gameState.currentPlayer}
          duoName={gameState.currentPlayer < 2 ? "Dupla 1" : "Dupla 2"}
          onContinue={handleTransitionContinue}
        />
      )}

      {gameState.phase === "CALCULATING" && (
        <CalculatingScreen onReady={handleCalculating} />
      )}

      {gameState.phase === "RESULTS" && gameState.result && (
        <ResultsScreen result={gameState.result} onRestart={handleRestart} />
      )}
    </main>
  );
}
