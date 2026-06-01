Temas:
 - Algoritmos Ambiciosos

# Dungeon Adventure — Mochila da Fortuna

**Conteúdo da Disciplina**: Algoritmos Ambiciosos (Greedy)<br>

## Alunos

| Matrícula  | Aluno                     |
| ---------- | ------------------------- |
| 232014638  | Caio Soares de Andrade    |
| 231011408  | Guilherme Flyan Araujo    |

## Sobre

O **Dungeon Adventure** é uma aplicação web interativa e pedagógica que demonstra o funcionamento do **algoritmo ambicioso da Mochila Fracionária (Fractional Knapsack)**. O jogador assume o papel de um aventureiro que encontra 9 relíquias mágicas em uma dungeon e precisa escolher quais levar em sua mochila de **74 kg** de capacidade, maximizando o valor total.

## Screenshots

<img width="452" height="550" alt="image" src="https://github.com/user-attachments/assets/46d357a7-e451-48dd-9712-e8ec03661536" />
<img width="351" height="394" alt="image" src="https://github.com/user-attachments/assets/5330d6a9-1706-4f18-9b46-135bab5f78ba" />
<img width="387" height="436" alt="image" src="https://github.com/user-attachments/assets/94ef8c21-6240-46d5-ae8e-c72ab1fc08f3" />
<img width="646" height="401" alt="image" src="https://github.com/user-attachments/assets/39270d1c-9646-42e1-84df-1418c60f6e45" />


## Instalação

**Linguagem**: TypeScript<br>
**Framework**: Next.js 16 (App Router)<br>
**Estilização**: Tailwind CSS 4<br>
**Pré-Requisitos**: Node.js v20+<br>
### Acesso deploy
[Link da aventura](https://g7-greed-pa-26-1-dungeon-adventure.vercel.app/)

### Como rodar localmente

```bash
# 1. clone o repositório
git clone https://github.com/projeto-de-algoritmos-2026/G7_Greed_PA-26.1-Dungeon-Adventure.git

# 2. entre na pasta do projeto
cd G7_Greed_PA-26.1-Dungeon-Adventure

# 3. instale as dependências
npm install

# 4. inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**.

## Uso

Ao abrir a aplicação:

1. Na **tela inicial**, o personagem apresenta a história. Clique no botão para avançar.
2. Na **galeria de relíquias**, veja todos os 9 itens disponíveis. Clique no botão para continuar.
3. Na **tela de escolha**, selecione o algoritmo **Knapsack** (as outras opções ficam em vermelho indicando que estão erradas). Após selecionar corretamente, o botão de avançar aparece.
4. Na **tela de execução**, clique em **INICIAR** e depois em **PRÓXIMO PASSO** para ver cada decisão do algoritmo ambicioso em tempo real. Uma barra de progresso mostra a capacidade sendo preenchida e a fortuna sendo acumulada.
5. Ao final, a **tela de resultado** exibe a mochila completa com todos os itens selecionados e o valor total obtido.


## Outros

O projeto **não utiliza backend separado** — toda a lógica do algoritmo roda nas API Routes do Next.js (server-side), mantendo a arquitetura unificada em um único framework.

## Video explicativo
[vÍDEO](https://www.youtube.com/watch?v=arIWizzSzdQ)

