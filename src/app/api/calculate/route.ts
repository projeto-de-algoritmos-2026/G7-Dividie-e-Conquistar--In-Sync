// ============================================================
// API ROUTE: POST /api/calculate
// ============================================================
//
// Recebe os rankings de todos os 4 jogadores (2 duplas),
// executa o algoritmo de Dividir e Conquistar para o tema único,
// e retorna os resultados completos.
//
// Request Body: GameInput
// Response: GameResult
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { GameInput, GameResult } from "@/lib/types";
import { computeDuoResult } from "@/lib/rankingUtils";

// ---------------------------------------------------------------------------
// Validação de entrada
// ---------------------------------------------------------------------------
function validateGameInput(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Corpo da requisição inválido." };
  }

  const input = body as Record<string, unknown>;

  if (typeof input.themeName !== "string" || input.themeName.trim() === "") {
    return { valid: false, error: "themeName deve ser uma string não vazia." };
  }
  if (!Array.isArray(input.duo1) || input.duo1.length !== 2) {
    return { valid: false, error: "duo1 deve ter exatamente 2 jogadores." };
  }
  if (!Array.isArray(input.duo2) || input.duo2.length !== 2) {
    return { valid: false, error: "duo2 deve ter exatamente 2 jogadores." };
  }

  const allPlayers = [...input.duo1, ...input.duo2] as Record<string, unknown>[];

  for (const player of allPlayers) {
    if (!player.name || typeof player.name !== "string") {
      return { valid: false, error: "Todos os jogadores devem ter um nome." };
    }
    if (!Array.isArray(player.ranking)) {
      return { valid: false, error: `Jogador "${player.name}" não tem um ranking válido.` };
    }

    const items = player.ranking;
    if (items.length !== 5) {
      return {
        valid: false,
        error: `Jogador "${player.name}" deve ter exatamente 5 itens no seu Top 5.`,
      };
    }
    for (const item of items) {
      if (typeof item !== "string" || item.trim() === "") {
        return {
          valid: false,
          error: `Todos os itens do jogador "${player.name}" devem ser válidos.`,
        };
      }
    }
  }

  return { valid: true };
}

// ---------------------------------------------------------------------------
// Handler POST
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido no corpo da requisição." },
      { status: 400 }
    );
  }

  // Validar a entrada
  const validation = validateGameInput(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const input = body as GameInput;

  // Calcular resultados de cada dupla
  const duo1Result = computeDuoResult(
    1,
    input.themeName,
    input.duo1[0],
    input.duo1[1]
  );
  const duo2Result = computeDuoResult(
    2,
    input.themeName,
    input.duo2[0],
    input.duo2[1]
  );

  // Determinar o vencedor com base no % de sintonia (maior vence)
  let winner: GameResult["winner"];
  let winnerMessage: string;

  if (duo1Result.averageSynergy > duo2Result.averageSynergy) {
    winner = 1;
    winnerMessage = `Dupla 1 venceu com ${duo1Result.averageSynergy}% de sintonia!`;
  } else if (duo2Result.averageSynergy > duo1Result.averageSynergy) {
    winner = 2;
    winnerMessage = `Dupla 2 venceu com ${duo2Result.averageSynergy}% de sintonia!`;
  } else {
    // Em caso de empate de % de sintonia, desempata pelo menor número de inversões
    if (duo1Result.totalInversions < duo2Result.totalInversions) {
      winner = 1;
      winnerMessage = `Dupla 1 venceu no desempate com menos inversões!`;
    } else if (duo2Result.totalInversions < duo1Result.totalInversions) {
      winner = 2;
      winnerMessage = `Dupla 2 venceu no desempate com menos inversões!`;
    } else {
      winner = "tie";
      winnerMessage = `Empate perfeito! As duas duplas têm ${duo1Result.averageSynergy}% de sintonia!`;
    }
  }

  const result: GameResult = {
    themeName: input.themeName,
    duo1Result,
    duo2Result,
    winner,
    winnerMessage,
  };

  return NextResponse.json(result, { status: 200 });
}
