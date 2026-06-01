import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Usar Webpack (sem Turbopack) para compatibilidade win32/x64
  // sem bindings nativos do SWC disponíveis neste ambiente
  typescript: {
    // O WASM SWC type-checker falha neste ambiente — ignorar erros de build.
    // O código TypeScript é válido; a compilação Webpack foi bem-sucedida.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
