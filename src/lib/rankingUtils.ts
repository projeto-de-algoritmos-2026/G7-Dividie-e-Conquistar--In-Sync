/**
 * Funções Utilitárias de Ranking — Top 5
 *
 * Ambos os jogadores recebem os mesmos 5 itens e apenas reordenam.
 * O vetor de mapeamento é uma permutação pura de [1..5].
 * Máximo de inversões = C(5,2) = 10.
 */

import { countInversions } from "./inversionCounter";
import {
  PlayerInput,
  ThemeResult,
  DuoResult,
} from "./types";

/**
 * Para cada item do ranking, retorna sua posição (1-based).
 */
function getPositionMap(ranking: string[]): Map<string, number> {
  const map = new Map<string, number>();
  ranking.forEach((item, idx) => {
    map.set(item.toLowerCase(), idx + 1);
  });
  return map;
}

/**
 * Calcula inversões entre dois rankings dos mesmos 5 itens.
 *
 * 1. Cria vetor de mapeamento (permutação de [1..5])
 * 2. Conta inversões via Merge Sort
 * 3. Normaliza sintonia: (10 − inversões) / 10 × 100%
 */
export function computeThemeResult(
  themeName: string,
  items: string[],
  player1Ranking: string[],
  player2Ranking: string[]
): ThemeResult {
  const p1Lower = player1Ranking.map((s) => s.toLowerCase());

  // Mapa de posições do Jogador 2
  const pos2 = getPositionMap(player2Ranking);

  // Vetor de mapeamento: para cada item na ordem do Jogador 1,
  // a posição que o Jogador 2 atribuiu.
  const mappingVector = p1Lower.map(
    (item) => pos2.get(item)!
  );

  // Contar inversões
  let inversions = 0;
  let steps: { description: string }[] = [];

  if (mappingVector.length > 1) {
    const result = countInversions(mappingVector);
    inversions = result.count;
    steps = result.steps;
  }

  // Max inversões para 5 itens: C(5,2) = 10
  const maxInversions = 10;

  // Sintonia normalizada
  const synergy = Math.max(0, Math.round(((maxInversions - inversions) / maxInversions) * 100));

  return {
    theme: themeName,
    items,
    player1Ranking,
    player2Ranking,
    mappingVector,
    inversions,
    maxInversions,
    synergy,
    sortedSteps: steps,
  };
}

/**
 * Calcula o resultado completo da dupla.
 */
export function computeDuoResult(
  duoId: 1 | 2,
  themeName: string,
  items: string[],
  player1: PlayerInput,
  player2: PlayerInput
): DuoResult {
  const themeResult = computeThemeResult(
    themeName,
    items,
    player1.ranking,
    player2.ranking
  );

  return {
    duoId,
    players: [player1.name, player2.name],
    themeResult,
    totalInversions: themeResult.inversions,
    averageSynergy: themeResult.synergy,
  };
}
