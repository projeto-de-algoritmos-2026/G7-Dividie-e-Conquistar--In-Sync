// ============================================================
// ALGORITMO DE CONTAGEM DE INVERSÕES — Dividir e Conquistar
// ============================================================
//
// Uma INVERSÃO é um par (i, j) onde i < j e arr[i] > arr[j].
//
// Ideia central (baseada no Merge Sort):
//   1. DIVIDE: Partir o vetor ao meio.
//   2. CONQUISTA: Recursivamente contar inversões em cada metade.
//   3. COMBINA: Ao fazer o merge das metades já ordenadas, cada vez
//      que um elemento da metade DIREITA é menor que um elemento da
//      metade ESQUERDA (ainda não consumido), TODOS os elementos
//      restantes da esquerda formam inversões com esse elemento da
//      direita — contamos (left.length - i) de uma vez.
//
// Complexidade: O(n log n) — muito mais eficiente que O(n²) da
// abordagem ingênua de checar todos os pares.
//
// Para n=5: máximo de inversões = n*(n-1)/2 = 10
// ============================================================

import { MergeSortStep } from "./types";

export interface InversionResult {
  count: number;
  steps: MergeSortStep[];
}

// ---------------------------------------------------------------------------
// merge: Une dois subarrays ordenados, contando inversões cruzadas.
// Retorna { sorted, count } e coleta o passo em `steps`.
// ---------------------------------------------------------------------------
function merge(
  left: number[],
  right: number[],
  steps: MergeSortStep[]
): { sorted: number[]; count: number } {
  const merged: number[] = [];
  let count = 0;
  let i = 0;
  let j = 0;
  let inversionsInStep = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      // Nenhuma inversão: left[i] está na posição correta
      merged.push(left[i]);
      i++;
    } else {
      // left[i] > right[j]: todos os elementos left[i..] são maiores que right[j]
      // Portanto (left.length - i) inversões são contadas de uma vez.
      count += left.length - i;
      inversionsInStep += left.length - i;
      merged.push(right[j]);
      j++;
    }
  }

  // Adicionar elementos restantes (já não geram novas inversões cruzadas)
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);

  // Registrar passo para visualização acadêmica
  steps.push({
    left: [...left],
    right: [...right],
    merged: [...merged],
    inversionsInStep,
    description: buildStepDescription(left, right, merged, inversionsInStep),
  });

  return { sorted: merged, count };
}

// ---------------------------------------------------------------------------
// mergeSort: Recursão principal do Divide and Conquer.
// ---------------------------------------------------------------------------
function mergeSort(
  arr: number[],
  steps: MergeSortStep[]
): { sorted: number[]; count: number } {
  // Caso base: array de 0 ou 1 elemento — sem inversões
  if (arr.length <= 1) {
    return { sorted: arr, count: 0 };
  }

  const mid = Math.floor(arr.length / 2);

  // Fase DIVIDE
  const leftHalf = arr.slice(0, mid);
  const rightHalf = arr.slice(mid);

  // Fase CONQUISTA (recursão)
  const leftResult = mergeSort(leftHalf, steps);
  const rightResult = mergeSort(rightHalf, steps);

  // Fase COMBINA — contando inversões cruzadas
  const mergeResult = merge(leftResult.sorted, rightResult.sorted, steps);

  return {
    sorted: mergeResult.sorted,
    count: leftResult.count + rightResult.count + mergeResult.count,
  };
}

// ---------------------------------------------------------------------------
// countInversions: Ponto de entrada público do algoritmo.
// Recebe um array de inteiros e retorna { count, steps }.
// ---------------------------------------------------------------------------
export function countInversions(arr: number[]): InversionResult {
  const steps: MergeSortStep[] = [];
  const { count } = mergeSort([...arr], steps);
  return { count, steps };
}

// ---------------------------------------------------------------------------
// Helpers de descrição para exibição acadêmica
// ---------------------------------------------------------------------------
function buildStepDescription(
  left: number[],
  right: number[],
  merged: number[],
  inversions: number
): string {
  const leftStr = `[${left.join(", ")}]`;
  const rightStr = `[${right.join(", ")}]`;
  const mergedStr = `[${merged.join(", ")}]`;
  const invStr =
    inversions === 0
      ? "0 inversões cruzadas"
      : inversions === 1
      ? "1 inversão cruzada"
      : `${inversions} inversões cruzadas`;
  return `merge(${leftStr}, ${rightStr}) → ${mergedStr} · ${invStr}`;
}
