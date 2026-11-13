# `components/animals/`

Subpasta responsável pelo modelo de animais encontrados na rota, sua movimentação, desenho e representação na matriz do mapa.

| Arquivo | Responsabilidade |
|---|---|
| `draw.js` | Desenha cada animal nas coordenadas contínuas `x/y`, usando `spriteId`. O chamador é `pages/rendering/drawRoute1.js`. |
| `main.js` | `isAnimalTile` reconhece IDs inteiros negativos; `placeAnimalsOnMap` grava o ID do animal em tiles livres. Usado por `player/moves.js` e `drawRoute1.js`. |
| `moves.js` | `createAnimals` cria entidades aleatórias a partir dos dados de surgimento e das espécies; `moveAnimals` as move entre `minX` e `maxX`. Usado por `AppController.jsx`. |

## Fluxo e dependências

```text
rendering/data/route1.js (animalSpawns) ──┐
pokemon/data.js (espécie e sprite base) ───┴→ animals/moves.js → AppController.animals
                                                             ├→ drawRoute1.js → animals/main.js escreve IDs negativos na grade
                                                             ├→ animals/draw.js desenha os sprites
                                                             └→ player/moves.js detecta colisão → batalha
```

Cada `mapTileId` é negativo e único. `player/moves.js` passa o ID atingido ao controlador, que procura o animal correspondente por `mapTileId` e envia a entidade para a tela de batalha.

Para mudar a quantidade/faixas/espécie, altere `pages/rendering/data/route1.js`; para mudar o catálogo, altere `components/pokemon/data.js`. Mantenha coerentes o ID da grade e a busca do controlador.
