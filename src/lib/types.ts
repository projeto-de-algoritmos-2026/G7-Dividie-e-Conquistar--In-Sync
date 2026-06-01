// ============================================================
// TYPES & CONSTANTS: Jogo de Sintonia — Top 5 de 10
// ============================================================

export type PlayerRanking = string[]; // Exatamente 5 itens ordenados (Top 5)

export interface PlayerInput {
  name: string;
  ranking: PlayerRanking; // 5 itens
}

// Preset de um tema para o Setup (10 itens)
export interface ThemePreset {
  themeName: string;
  items: string[]; // length = 10
}

export const DEFAULT_THEME_PRESETS: ThemePreset[] = [
  {
    themeName: "Top 5 Bandas/Artistas",
    items: [
      "Queen", "Beatles", "Michael Jackson", "Madonna", "Metallica",
      "Coldplay", "Nirvana", "Led Zeppelin", "Pink Floyd", "AC/DC",
    ],
  },
  {
    themeName: "Top 5 Fast Foods",
    items: [
      "McDonalds", "Burger King", "KFC", "Subway", "Pizza Hut",
      "Taco Bell", "Dominos", "Popeyes", "Wendys", "Chick-fil-A",
    ],
  },
  {
    themeName: "Top 5 Filmes de Herois",
    items: [
      "Homem-Aranha", "Batman", "Vingadores", "Superman", "Mulher-Maravilha",
      "Homem de Ferro", "X-Men", "Pantera Negra", "Guardioes da Galaxia", "Deadpool",
    ],
  },
  {
    themeName: "Top 5 Redes Sociais",
    items: [
      "Instagram", "TikTok", "Twitter", "YouTube", "Facebook",
      "LinkedIn", "Pinterest", "Snapchat", "Reddit", "WhatsApp",
    ],
  },
];

export interface GameInput {
  themeName: string;
  duo1: [PlayerInput, PlayerInput];
  duo2: [PlayerInput, PlayerInput];
}

export interface MergeStep {
  description: string;
}

// Tipo detalhado para o passo do Merge Sort (usado internamente)
export interface MergeSortStep extends MergeStep {
  left: number[];
  right: number[];
  merged: number[];
  inversionsInStep: number;
}

export interface ThemeResult {
  theme: string;
  player1Ranking: string[]; // Top 5 do jogador 1
  player2Ranking: string[]; // Top 5 do jogador 2

  // Análise de interseção
  sharedItems: string[];       // itens em ambos os Top 5
  exclusivePlayer1: string[];  // só no Top 5 do jogador 1
  exclusivePlayer2: string[];  // só no Top 5 do jogador 2
  allUniqueItems: string[];    // união de ambos os Top 5

  // Resultado do algoritmo
  mappingVector: number[];
  inversions: number;
  maxInversions: number; // Máximo absoluto de inversões possíveis (35)
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
