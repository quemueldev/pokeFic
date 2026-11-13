# `components/pokemon/`

Dados de espécies e regras derivadas de status dos Pokémon. Animais encontrados na rota reutilizam o catálogo de espécies.

| Arquivo | Responsabilidade e dependências |
|---|---|
| `data.js` | Exporta `pokemonSpecies` com nome, `spriteId`, vida/ataque base e recompensa de XP. Usado por `player/party.js` e `animals/moves.js`. |
| `stats.js` | `getPokemonStats` calcula vida máxima, ataque e XP necessário; `addExperience` consome XP, sobe níveis e ajusta vida. Usado pela batalha, menu e cura. |

## Modelo de dados

Um Pokémon do jogador contém identificador da instância e os dados da espécie, além de `species`, `level`, `xp` e `health`. `health` é a vida atual; `getPokemonStats(pokemon).maxHealth` é calculada a partir da vida base e nível.

```text
data.js → party.js → App.jsx.party
data.js → animals/moves.js → animais da rota
stats.js → BattleScreen.jsx / GameMenu.jsx / App.jsx (cura)
```

Ao mudar uma regra em `stats.js`, confira todos os consumidores. A barra de batalha, a tela do menu, a progressão de nível e a cura precisam usar a mesma definição de vida máxima.
