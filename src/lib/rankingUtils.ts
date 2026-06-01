// ============================================================
// FUNÇÕES UTILITÁRIAS DE RANKING — Top 5 de 10 itens
// ============================================================
//
// Responsabilidades:
//   - Unir os Top 5 dos dois jogadores
//   - Atribuir posição 6 para itens ausentes do Top 5 de um jogador
//   - Construir o vetor de mapeamento
//   - Computar inversões via Merge Sort (Dividir e Conquistar)
//   - Normalizar a sintonia com base no máximo dinâmico de inversões
// ============================================================

import { countInversions } from "./inversionCounter";
import {
  PlayerInput,
  ThemeResult,
  DuoResult,
} from "./types";

// Posição atribuída a itens ausentes (pior que qualquer Top 5)
const ABSENT_POSITION = 6;

// ---------------------------------------------------------------------------
// buildExpandedPositionMap:
//   Para cada item único entre os dois Top 5s, retorna sua posição
//   no ranking do jogador (1-5), ou ABSENT_POSITION se ausente.
// ---------------------------------------------------------------------------
function getPositionMap(ranking: string[]): Map<string, number> {
  const map = new Map<string, number>();
  ranking.forEach((item, idx) => {
    map.set(item.toLowerCase(), idx + 1); // posições 1-based
  });
  return map;
}

// ---------------------------------------------------------------------------
// computeThemeResult:
//   Para o tema único, calcula inversões entre dois Top 5s de 10 opções.
//
//   1. Encontra a união de itens (5 a 10 itens distintos)
//   2. Atribui posição 6 para ausentes
//   3. Cria vetor de mapeamento: para cada item na ordem do jogador 1,
//      qual é a posição que o jogador 2 deu
//   4. Conta inversões no vetor de mapeamento
// ---------------------------------------------------------------------------
export function computeThemeResult(
  themeName: string,
  player1Ranking: string[],
  player2Ranking: string[]
): ThemeResult {
  // Normalizar para comparação
  const p1Lower = player1Ranking.map((s) => s.toLowerCase());
  const p2Lower = player2Ranking.map((s) => s.toLowerCase());

  // Conjuntos
  const set1 = new Set(p1Lower);
  const set2 = new Set(p2Lower);

  // Interseção e exclusivos
  const sharedLower = p1Lower.filter((item) => set2.has(item));
  const exclusive1Lower = p1Lower.filter((item) => !set2.has(item));
  const exclusive2Lower = p2Lower.filter((item) => !set1.has(item));

  // Mapear de volta para nomes originais (usar o do jogador 1 para itens compartilhados)
  const p1LowerToOriginal = new Map<string, string>();
  player1Ranking.forEach((item) => p1LowerToOriginal.set(item.toLowerCase(), item));
  const p2LowerToOriginal = new Map<string, string>();
  player2Ranking.forEach((item) => p2LowerToOriginal.set(item.toLowerCase(), item));

  const sharedItems = sharedLower.map((l) => p1LowerToOriginal.get(l) || l);
  const exclusivePlayer1 = exclusive1Lower.map((l) => p1LowerToOriginal.get(l) || l);
  const exclusivePlayer2 = exclusive2Lower.map((l) => p2LowerToOriginal.get(l) || l);

  // União de todos os itens distintos (ordem: primeiro os do jogador 1, depois exclusivos do jogador 2)
  const allUniqueLower = [...p1Lower, ...exclusive2Lower];
  const allUniqueItems = allUniqueLower.map(
    (l) => p1LowerToOriginal.get(l) || p2LowerToOriginal.get(l) || l
  );

  // Mapas de posição (1-based, ausentes = 6)
  const pos2 = getPositionMap(player2Ranking);

  // Vetor de mapeamento: para cada item na ordem do jogador 1,
  // o valor é a posição que o jogador 2 atribuiu a esse item.
  const mappingVector = p1Lower.map(
    (item) => pos2.get(item) ?? ABSENT_POSITION
  );

  // Contar inversões
  let inversions = 0;
  let steps: { description: string }[] = [];

  if (mappingVector.length > 1) {
    const result = countInversions(mappingVector);
    inversions = result.count;
    steps = result.steps;
  }

  // Max inversões para Top 5 rankings
  const maxInversions = 10;

  // Sintonia normalizada
  let synergy = 100;
  if (maxInversions > 0) {
    synergy = Math.max(0, Math.round(((maxInversions - inversions) / maxInversions) * 100));
  }

  return {
    theme: themeName,
    player1Ranking,
    player2Ranking,
    sharedItems,
    exclusivePlayer1,
    exclusivePlayer2,
    allUniqueItems,
    mappingVector,
    inversions,
    maxInversions,
    synergy,
    sortedSteps: steps,
  };
}

// ---------------------------------------------------------------------------
// computeDuoResult:
//   Calcula o resultado da dupla para o tema único
// ---------------------------------------------------------------------------
export function computeDuoResult(
  duoId: 1 | 2,
  themeName: string,
  player1: PlayerInput,
  player2: PlayerInput
): DuoResult {
  const themeResult = computeThemeResult(
    themeName,
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
