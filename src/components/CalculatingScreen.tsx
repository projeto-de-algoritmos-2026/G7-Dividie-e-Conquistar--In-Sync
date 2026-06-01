"use client";

import { useEffect } from "react";

interface Props {
  onReady: () => void;
}

export default function CalculatingScreen({ onReady }: Props) {
  // Dispara o cálculo assim que o componente monta
  useEffect(() => {
    onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">

        <h2 className="text-3xl font-black text-white mb-3">
          Calculando Sintonia...
        </h2>

        <p className="text-white/50 mb-8 max-w-sm mx-auto">
          Aplicando o algoritmo de <span className="text-cyan-400 font-semibold">Dividir e Conquistar</span> para analisar os rankings...
        </p>

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-amber-400 rounded-full animate-spin" />
        </div>

        {/* Steps */}
        <div className="mt-10 space-y-2 text-left max-w-xs mx-auto">
          {[
            "Comparando as listas exatas...",
            "Construindo vetores de mapeamento cruzado...",
            "Executando Merge Sort para contar inversões...",
            "Calculando métrica de sintonia final...",
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-white/40"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
