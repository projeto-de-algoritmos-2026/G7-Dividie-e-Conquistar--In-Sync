"use client";

import dynamic from "next/dynamic";
// Desativa SSR completamente para evitar hydration mismatch,
// já que o jogo depende de estado client-side puro.
const GameApp = dynamic(() => import("@/components/GameApp"), { ssr: false });

export default function Page() {
  return <GameApp />;
}
