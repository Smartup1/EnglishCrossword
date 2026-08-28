# 🧩 English Crossword

Um jogo mobile de palavras cruzadas desenvolvido para ajudar pessoas a aprender inglês de forma divertida, gamificada e progressiva.

O objetivo do projeto é combinar **Crossword + aprendizado de inglês + gamificação**, criando uma experiência onde o jogador aprende novas palavras enquanto resolve desafios.

---

# 🎮 Conceito do Jogo

O jogador recebe uma grade de palavras cruzadas e precisa descobrir palavras em inglês através de pistas.

Exemplo:

**Clue:**

> A place where you learn.

**Answer:**

> SCHOOL

Após completar uma palavra, o jogo poderá apresentar:

* Tradução
* Pronúncia
* Exemplo de uso
* Categoria da palavra

Exemplo:

```text
SCHOOL

Meaning: Escola

Pronunciation:
 /skuːl/

Example:
I go to school every day.
```

O objetivo é fazer com que o jogador **aprenda inglês jogando**, e não apenas resolva palavras cruzadas.

---

# 🚀 Stack Tecnológica

O projeto utiliza:

* React Native
* Expo
* Expo Router
* TypeScript

Inicialmente o projeto funcionará localmente, sem necessidade de backend.

No futuro poderão ser adicionados:

* AsyncStorage
* Supabase ou Firebase
* Sistema de autenticação
* Ranking global
* Daily Challenge online
* Inteligência Artificial para geração de conteúdo

---

# 📁 Estrutura do Projeto

```text
EnglishCrossword/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── game.tsx
│
├── components/
│   ├── CrosswordCell.tsx
│   ├── CrosswordGrid.tsx
│   ├── ClueList.tsx
│   └── Keyboard.tsx
│
├── data/
│   ├── words.ts
│   └── puzzles.ts
│
├── game/
│   └── crosswordGenerator.ts
│
├── hooks/
│   └── useCrosswordGame.ts
│
├── types/
│   └── crossword.ts
│
├── README.md
├── package.json
├── app.json
└── tsconfig.json
```

---

# 🧠 Arquitetura

## app/

Contém as telas do aplicativo.

### index.tsx

Tela inicial do jogo.

Responsabilidades:

* Botão Play
* Daily Challenge
* Exibição de nível
* XP
* Palavras aprendidas

### game.tsx

Tela principal da partida.

Responsabilidades:

* Renderizar a cruzadinha
* Mostrar pistas
* Mostrar teclado
* Controlar interação do jogador
* Detectar conclusão do puzzle

---

# 🧩 components/

Componentes reutilizáveis da interface.

### CrosswordGrid.tsx

Responsável por renderizar a grade completa da palavra cruzada.

### CrosswordCell.tsx

Representa uma única célula da cruzadinha.

Cada célula pode possuir:

```typescript
{
  letter: string | null;
  value: string;
  wordIds: string[];
}
```

Onde:

* `letter` = resposta correta
* `value` = letra digitada pelo jogador
* `wordIds` = palavras que utilizam aquela célula

---

# 📚 data/

Contém os dados do jogo.

### words.ts

Banco de palavras disponíveis.

Exemplo:

```typescript
{
  id: "school",
  answer: "SCHOOL",
  clue: "A place where you learn."
}
```

Cada palavra deve possuir:

```typescript
type CrosswordWord = {
  id: string;
  answer: string;
  clue: string;
  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
};
```

No futuro cada palavra poderá possuir:

```typescript
{
  translation: "escola",
  pronunciation: "/skuːl/",
  example: "I go to school every day."
}
```

---

# ⚙️ game/

Contém o motor do jogo.

### crosswordGenerator.ts

Responsável por:

1. Receber uma lista de palavras
2. Encontrar letras compatíveis
3. Cruzar palavras horizontalmente
4. Cruzar palavras verticalmente
5. Criar a grade final
6. Validar posições
7. Evitar conflitos

Exemplo:

```text
    S
    C
A P P L E
    H
W A T E R
    O
    O
    L
```

No estado atual existe uma implementação inicial baseada em posições pré-definidas.

O objetivo futuro é criar um algoritmo automático.

---

# 🧠 Objetivo do Gerador de Crossword

A função futura deverá funcionar assim:

```typescript
generateCrossword(words)
```

Entrada:

```text
SCHOOL
APPLE
WATER
HOUSE
BOOK
```

Saída:

```typescript
{
  grid: [...],
  placedWords: [...]
}
```

O algoritmo deverá:

1. Escolher uma palavra inicial.
2. Colocar a palavra no centro da grade.
3. Procurar palavras com letras em comum.
4. Tentar cruzar horizontalmente e verticalmente.
5. Validar colisões.
6. Garantir que palavras não se sobreponham incorretamente.
7. Tentar diferentes combinações caso uma palavra não possa ser posicionada.
8. Retornar o melhor resultado encontrado.

O algoritmo deve priorizar:

* Maior número de palavras conectadas
* Menor espaço vazio
* Grade equilibrada
* Evitar palavras isoladas

---

# 🎯 Mecânica do Jogo

Fluxo da partida:

```text
Jogador inicia
        ↓
Crossword é carregado
        ↓
Jogador seleciona uma palavra
        ↓
Pista é destacada
        ↓
Jogador digita letras
        ↓
Cursor avança automaticamente
        ↓
Palavra é completada
        ↓
Sistema valida resposta
        ↓
Nova palavra é selecionada
        ↓
Todas as palavras completas
        ↓
Vitória
        ↓
Jogador recebe XP e moedas
```

---

# 🔤 Sistema de Seleção

Quando o jogador tocar em uma célula:

1. A célula é selecionada.
2. A palavra horizontal ou vertical correspondente é identificada.
3. Todas as células da palavra recebem destaque.
4. A pista correspondente fica ativa.
5. O teclado permite digitar letras.
6. Após digitar uma letra, o cursor avança automaticamente.

Ao tocar novamente na mesma célula:

* Alternar entre palavra horizontal.
* Palavra vertical.

Caso a célula pertença a duas palavras.

---

# ⌨️ Sistema de Teclado

O teclado virtual deve conter:

```text
Q W E R T Y U I O P

A S D F G H J K L

Z X C V B N M

⌫
```

Funcionalidades:

* Inserir letra
* Apagar letra
* Avançar automaticamente
* Pular células já preenchidas
* Manter foco na palavra selecionada

---

# 🏆 Sistema de Progressão

O jogo terá:

## XP

O jogador recebe experiência por:

* Completar palavras
* Completar puzzles
* Jogar diariamente
* Completar desafios sem usar dicas

Exemplo:

```text
Completar palavra: +10 XP

Completar puzzle: +100 XP

Sem dicas: +50 XP

Daily Challenge: +200 XP
```

---

# 🪙 Moedas

As moedas poderão ser utilizadas para comprar dicas.

Exemplo:

```text
Mostrar uma letra: 20 moedas

Revelar palavra: 100 moedas

Remover letras erradas: 50 moedas
```

---

# 🔥 Streak Diário

O jogador terá uma sequência de dias jogados.

Exemplo:

```text
🔥 1 dia
🔥 2 dias
🔥 3 dias
🔥 7 dias
🔥 30 dias
```

Quanto maior a sequência, maiores as recompensas.

---

# 📚 Categorias

As palavras serão organizadas por categorias.

Exemplos:

```text
🏠 Home
🍔 Food
🌎 Travel
👨‍👩‍👧 Family
⚽ Sports
💼 Business
🎬 Movies
💻 Technology
❤️ Feelings
📚 Education
```

---

# 📈 Níveis de Dificuldade

## Beginner

Características:

* Palavras simples
* 3 a 5 letras
* Vocabulário básico
* Pistas simples

Exemplos:

```text
CAT
DOG
BOOK
SUN
FOOD
HOUSE
```

## Intermediate

Características:

* Palavras maiores
* Pistas mais elaboradas
* Verbos e adjetivos

Exemplos:

```text
COMPUTER
TRAVEL
IMPORTANT
BEAUTIFUL
```

## Advanced

Características:

* Vocabulário avançado
* Sinônimos
* Expressões
* Phrasal verbs

Exemplos:

```text
ACHIEVEMENT
ENVIRONMENT
OPPORTUNITY
DEVELOPMENT
```

---

# 📅 Daily Challenge

Todos os dias o jogador recebe uma nova cruzadinha.

Características:

* Puzzle único do dia
* Recompensa especial
* XP adicional
* Streak diário
* Ranking futuro

---

# 🤖 Uso de Inteligência Artificial

A IA poderá ser utilizada para auxiliar na criação de conteúdo.

A IA NÃO deve controlar diretamente a lógica principal da partida.

A arquitetura recomendada é:

```text
IA
 ↓
Gera palavras
 ↓
Gera pistas
 ↓
Gera tradução
 ↓
Gera exemplos
 ↓
Conteúdo é validado
 ↓
Salvo no banco de dados
 ↓
Gerador de Crossword
 ↓
Puzzle
```

A IA poderá gerar objetos neste formato:

```json
{
  "word": "SCHOOL",
  "translation": "escola",
  "difficulty": "beginner",
  "category": "education",
  "clue": "A place where students learn.",
  "pronunciation": "/skuːl/",
  "example": "I go to school every day."
}
```

---

# 🤖 INSTRUÇÕES PARA IA QUE FOR TRABALHAR NO PROJETO

Este projeto é um jogo mobile desenvolvido com React Native, Expo e TypeScript.

A IA deve seguir as seguintes regras:

## 1. Não alterar arquivos sem necessidade

Antes de modificar código:

* Analisar a estrutura existente.
* Identificar os arquivos relacionados.
* Evitar alterar componentes não relacionados.
* Não substituir arquivos inteiros sem necessidade.

---

## 2. Manter TypeScript

Todo código deve possuir tipagem.

Evitar:

```typescript
any
```

Sempre que possível utilizar interfaces e types.

---

## 3. Separação de Responsabilidades

Seguir a arquitetura:

```text
UI
↓
Components

Lógica
↓
Hooks

Motor do jogo
↓
game/

Dados
↓
data/

Tipos
↓
types/
```

Não colocar lógica complexa dentro dos componentes visuais.

---

## 4. Motor da Cruzadinha

O gerador de crossword deve ficar isolado dentro de:

```text
game/
```

O componente visual nunca deve ser responsável por calcular a posição das palavras.

A responsabilidade deve ser:

```text
crosswordGenerator.ts
```

---

## 5. Não quebrar funcionalidades existentes

Antes de implementar uma nova funcionalidade:

1. Verificar dependências.
2. Manter compatibilidade com a estrutura existente.
3. Evitar mudanças desnecessárias.
4. Corrigir erros de TypeScript.
5. Não introduzir bibliotecas grandes sem necessidade.

---

## 6. Código Reutilizável

Preferir:

```typescript
function
component
hook
utility
```

ao invés de duplicar lógica.

---

# 🗺️ Roadmap

## Fase 1 — MVP

* [x] Criar projeto Expo
* [x] Criar tela inicial
* [x] Criar tela do jogo
* [x] Criar grade
* [x] Criar pistas
* [x] Criar teclado
* [x] Validar puzzle

---

## Fase 2 — Melhorar Jogabilidade

* [ ] Seleção de palavras
* [ ] Destacar palavra completa
* [ ] Alternar horizontal/vertical
* [ ] Cursor automático
* [ ] Verificar palavras completas
* [ ] Feedback visual

---

## Fase 3 — Gerador Automático

* [ ] Algoritmo de posicionamento
* [ ] Cruzamento automático
* [ ] Validação de colisões
* [ ] Backtracking
* [ ] Sistema de pontuação do puzzle
* [ ] Melhor seleção de grade

---

## Fase 4 — Aprendizado

* [ ] Tradução
* [ ] Pronúncia
* [ ] Exemplos
* [ ] Histórico de palavras aprendidas

---

## Fase 5 — Gamificação

* [ ] XP
* [ ] Níveis
* [ ] Moedas
* [ ] Dicas
* [ ] Achievements
* [ ] Streak

---

## Fase 6 — Online

* [ ] Login
* [ ] Cloud Save
* [ ] Daily Challenge
* [ ] Ranking
* [ ] Perfil

---

# 🎯 Visão Final

O objetivo não é criar apenas mais um jogo de palavras cruzadas.

O objetivo é criar uma plataforma gamificada de aprendizado de inglês onde o jogador aprende:

* Vocabulário
* Significados
* Pronúncia
* Contexto
* Expressões

Tudo através de uma experiência de jogo rápida, divertida e progressiva.

A experiência ideal pode ser resumida assim:

```text
Duolingo
+
Crossword
+
Gamificação
+
Progressão
+
Daily Challenge
=
English Crossword
```
