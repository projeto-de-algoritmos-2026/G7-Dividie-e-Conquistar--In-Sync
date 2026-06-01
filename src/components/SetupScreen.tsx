"use client";

import { useState } from "react";
import { SetupData } from "@/app/page";
import { DEFAULT_THEME_PRESETS, ThemePreset } from "@/lib/types";

interface Props {
  initialSetup: SetupData;
  onComplete: (setup: SetupData) => void;
}

export default function SetupScreen({ initialSetup, onComplete }: Props) {
  const [playerNames, setPlayerNames] = useState<[string, string, string, string]>([
    ...initialSetup.playerNames,
  ]);
  const [themeName, setThemeName] = useState<string>(initialSetup.themeName);
  const [themeItems, setThemeItems] = useState<string[]>(
    initialSetup.themeItems.length === 10
      ? initialSetup.themeItems
      : ["", "", "", "", "", "", "", "", "", ""]
  );
  const [errors, setErrors] = useState<string[]>([]);

  function validate(): boolean {
    const errs: string[] = [];
    playerNames.forEach((n, i) => {
      if (!n.trim()) errs.push(`Nome do Jogador ${i + 1} é obrigatório.`);
    });
    if (!themeName.trim()) {
      errs.push("Você precisa escolher ou digitar um tema para o jogo.");
    }
    if (themeItems.some((i) => !i.trim())) {
      errs.push("Todos os 10 itens do tema precisam estar preenchidos.");
    }

    // Check for unique items
    const unique = new Set(themeItems.map((i) => i.trim().toLowerCase()));
    if (unique.size !== 10 && !themeItems.some((i) => !i.trim())) {
      errs.push("Os 10 itens devem ser diferentes entre si.");
    }

    setErrors(errs);
    return errs.length === 0;
  }

  function handleStart() {
    if (!validate()) return;
    onComplete({
      playerNames,
      themeName: themeName.trim(),
      themeItems: themeItems.map((i) => i.trim()),
    });
  }

  function handlePresetClick(preset: ThemePreset) {
    setThemeName(preset.themeName);
    setThemeItems([...preset.items]);
  }

  function handleItemChange(index: number, value: string) {
    const newItems = [...themeItems];
    newItems[index] = value;
    setThemeItems(newItems);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in py-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
            Jogo de <span className="text-gradient-duo1">Sintonia</span>
          </h1>
          <p className="text-white/50 text-lg">
            Descubra qual dupla está mais em sintonia!
          </p>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="glass border border-red-500/30 rounded-2xl p-4 mb-6 animate-slide-up">
            {errors.map((e, i) => (
              <p key={i} className="text-red-400 text-sm">
                {e}
              </p>
            ))}
          </div>
        )}

        {/* Escolha do Tema */}
        <div className="glass rounded-2xl p-6 mb-6 border border-amber-500/30 glow-gold">
          <h3 className="text-white font-bold text-xl mb-2">
            Tema do Jogo
          </h3>
          <p className="text-white/60 text-sm mb-4">
            Escolha uma sugestão ou crie seu próprio tema com <span className="text-amber-400 font-semibold">10 itens</span>. Cada jogador escolherá o seu Top 5.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {DEFAULT_THEME_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(preset)}
                className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                  themeName === preset.themeName
                    ? "bg-amber-500/20 border-amber-500 text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {preset.themeName}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              placeholder="Nome do Tema..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors font-medium text-lg"
            />
          </div>

          <p className="text-white/50 text-sm mb-3">
            Defina os 10 itens que estarão disponíveis para os jogadores escolherem:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {themeItems.map((item, idx) => (
              <input
                key={idx}
                type="text"
                value={item}
                onChange={(e) => handleItemChange(idx, e.target.value)}
                placeholder={`Item ${idx + 1}`}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500/30 transition-colors"
              />
            ))}
          </div>
        </div>

        {/* Duplas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Dupla 1 */}
          <div className="glass rounded-2xl p-6 border border-cyan-500/20 glow-duo1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-duo1"></div>
              <h2 className="text-white font-bold text-lg">Dupla 1</h2>
            </div>
            <input
              id="player-1a-name"
              type="text"
              value={playerNames[0]}
              onChange={(e) =>
                setPlayerNames([e.target.value, playerNames[1], playerNames[2], playerNames[3]])
              }
              placeholder="Nome do Jogador A"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 mb-3 transition-colors"
            />
            <input
              id="player-1b-name"
              type="text"
              value={playerNames[1]}
              onChange={(e) =>
                setPlayerNames([playerNames[0], e.target.value, playerNames[2], playerNames[3]])
              }
              placeholder="Nome do Jogador B"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          {/* Dupla 2 */}
          <div className="glass rounded-2xl p-6 border border-purple-500/20 glow-duo2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-duo2"></div>
              <h2 className="text-white font-bold text-lg">Dupla 2</h2>
            </div>
            <input
              id="player-2a-name"
              type="text"
              value={playerNames[2]}
              onChange={(e) =>
                setPlayerNames([playerNames[0], playerNames[1], e.target.value, playerNames[3]])
              }
              placeholder="Nome do Jogador C"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 mb-3 transition-colors"
            />
            <input
              id="player-2b-name"
              type="text"
              value={playerNames[3]}
              onChange={(e) =>
                setPlayerNames([playerNames[0], playerNames[1], playerNames[2], e.target.value])
              }
              placeholder="Nome do Jogador D"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          id="start-game-btn"
          onClick={handleStart}
          className="w-full bg-duo1 text-white font-black text-xl py-5 rounded-2xl hover:opacity-90 active:scale-95 transition-all duration-200 glow-duo1 shadow-2xl uppercase tracking-wider"
        >
          Iniciar Jogo
        </button>
      </div>
    </div>
  );
}
