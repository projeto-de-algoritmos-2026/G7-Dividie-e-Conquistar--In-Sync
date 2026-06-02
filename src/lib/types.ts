/**
 * Types and interfaces for the Top 5 synergy game.
 */

export type PlayerRanking = string[];

export interface PlayerInput {
  name: string;
  ranking: PlayerRanking;
}

/** Preset themes — each has exactly 5 items */
export interface ThemePreset {
  themeName: string;
  items: string[];
}

export const DEFAULT_THEME_PRESETS: ThemePreset[] = [
  {
    themeName: "Top 5 Bandas/Artistas",
    items: ["Queen", "Beatles", "Michael Jackson", "Madonna", "Metallica"],
  },
  {
    themeName: "Top 5 Fast Foods",
    items: ["McDonalds", "Burger King", "KFC", "Subway", "Bobs"],
  },
  {
    themeName: "Top 5 Filmes de Herois",
    items: ["Homem-Aranha", "Batman", "Vingadores", "Superman", "Mulher-Maravilha"],
  },
  {
    themeName: "Top 5 Redes Sociais",
    items: ["Instagram", "TikTok", "Twitter", "YouTube", "Facebook"],
  },
];

export interface GameInput {
  themeName: string;
  themeItems: string[];
  duo1: [PlayerInput, PlayerInput];
  duo2: [PlayerInput, PlayerInput];
}

export interface MergeStep {
  description: string;
}

export interface MergeSortStep extends MergeStep {
  left: number[];
  right: number[];
  merged: number[];
  inversionsInStep: number;
}

export interface ThemeResult {
  theme: string;
  items: string[];
  player1Ranking: string[];
  player2Ranking: string[];

  // Resultado do algoritmo
  mappingVector: number[];
  inversions: number;
  maxInversions: number; // 10 para Top 5
  synergy: number; // 0 a 100
  sortedSteps: MergeStep[];
}

export interface DuoResult {
  duoId: 1 | 2;
  players: [string, string];
  themeResult: ThemeResult;
  totalInversions: number;
  averageSynergy: number;
}

export interface GameResult {
  themeName: string;
  duo1Result: DuoResult;
  duo2Result: DuoResult;
  winner: 1 | 2 | "tie";
  winnerMessage: string;
}
