# Jogo de Sintonia — In-Sync (Grupo 7)

Este é um projeto acadêmico desenvolvido para a disciplina de **Projeto de Algoritmos (PA)**, com foco no paradigma de **Dividir e Conquistar**. O projeto consiste em um jogo gamificado e interativo de afinidades chamado **In-Sync**, que mede a sinergia entre duplas de jogadores baseado em suas preferências pessoais utilizando o clássico algoritmo de **Contagem de Inversões**.

---

## 🎮 O Jogo: In-Sync

No jogo, duas duplas competem para ver qual delas tem mais sinergia.
1. É escolhido um tema (ex: *Bandas de Rock*, *Fast Foods*, *Filmes de Heróis*, *Redes Sociais*).
2. O sistema gera uma lista com 10 itens daquele tema.
3. Cada jogador da dupla monta, individualmente e em segredo, o seu **Top 5** ordenado de preferências daqueles 10 itens.
4. O algoritmo calcula o número de **Inversões** entre o Top 5 de ambos os jogadores.
5. A dupla com menor quantidade de inversões (maior sinergia/sintonia) vence a competição!

---

## 🧠 Paradigma de Dividir e Conquistar: Contagem de Inversões

Para calcular a sinergia entre os dois jogadores, nós mapeamos o Top 5 de preferências do Jogador B em relação às posições escolhidas pelo Jogador A. A discrepância entre as listas é dada pela quantidade de **inversões** de ordem.

Uma **inversão** em um vetor `arr` é um par de índices `(i, j)` tal que `i < j` e `arr[i] > arr[j]`. 

### Algoritmo O(n log n)
Em vez de verificar cada par de forma ingênua em tempo quadrático $O(n^2)$, utilizamos o paradigma de **Dividir e Conquistar** adaptando o algoritmo do **Merge Sort**:

1. **Dividir**: O vetor de posições relativas é dividido ao meio.
2. **Conquistar**: Contamos recursivamente as inversões na metade esquerda e na metade direita.
3. **Combinar**: Ao mesclar (*merge*) os dois subarrays já ordenados, sempre que um elemento do subarray **direito** é menor que um elemento do subarray **esquerdo**, significa que esse elemento direito inverte sua ordem em relação a **todos os elementos restantes não consumidos** na metade esquerda. Adicionamos `(left.length - i)` inversões de uma vez só!

A complexidade final é de **$O(n \log n)$**, o que torna a análise extremamente ágil e eficiente!

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e robusta para web:
* **Core**: [Next.js 16](https://nextjs.org/) (App Router)
* **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
* **Interface**: [React 19](https://react.dev/)
* **Estilização**: [Tailwind CSS 3/4](https://tailwindcss.com/)
* **Interações**: Micro-animações nativas CSS e componentes premium.

---

## ⚙️ Como Instalar e Executar Localmente

Siga o passo a passo para rodar o projeto em sua máquina local:

1. **Acesse a pasta do projeto**:
   ```bash
   cd G7-Dividir-e-Conquistar--In-Sync
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Abra no seu navegador**:
   Acesse [http://localhost:3000](http://localhost:3000) para começar a jogar!

---

## 📂 Estrutura de Pastas Principal

```text
G7-Dividir-e-Conquistar--In-Sync/
├── public/              # Assets estáticos
├── src/
│   ├── app/             # Rotas e layouts principais do Next.js App Router
│   │   ├── api/         # Endpoints da API para cálculo da sinergia
│   │   └── page.tsx     # Página principal do jogo
│   ├── components/      # Componentes visuais do fluxo (Setup, Ranking, Cálculo, Resultados, Transição)
│   └── lib/             # Módulos de lógica do algoritmo e utilitários
│       ├── inversionCounter.ts  # Implementação em Dividir e Conquistar (Merge Sort adaptado)
│       ├── rankingUtils.ts      # Cálculo de mapeamento e pontuação
│       └── types.ts             # Definição de tipos TypeScript e presets
├── package.json         # Dependências e scripts
└── tsconfig.json        # Configuração do TypeScript
```
