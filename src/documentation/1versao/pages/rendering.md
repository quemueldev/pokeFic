# `pages/rendering/`

Seleção de mapas, desenho no canvas e dados de cenário.

| Arquivo | Responsabilidade |
|---|---|
| `drawGame.js` | Limpa o canvas, aplica o deslocamento da câmera e escolhe cidade/rota pelo `mapId`. Expõe `spritesLoaded` ao controlador. |
| `drawCity1.js` | Constrói e desenha a grade da cidade, estrada, entrada, entidades e jogador; devolve a matriz ao controlador. |
| `drawRoute1.js` | Constrói e desenha grade, estrada, obstáculos, animais e jogador; devolve a matriz de colisão. |
| `data/city1.js` | Geometria e entidades da cidade, inclusive coordenadas da curandeira. |
| `data/route1.js` | Geometria, elementos e configuração de surgimento dos animais na rota. |
| `data/tiles.js` | Carrega arquivos PNG como `Image`, indexa-os por ID e exporta catálogo e promessa de carregamento. |

## Relação de execução

```text
AppController → drawGame(mapId, ...)
  ├─ mapId 0 → drawCity1
  │    ├─ city1.js fornece posição e listas de entidades
  │    ├─ initializer.js fornece os desenhadores
  │    └─ tiles.js fornece os sprites
  └─ mapId 1 → drawRoute1
       ├─ route1.js fornece geometria e spawns
       ├─ animals/main.js grava encontros na grade
       ├─ initializer.js fornece os desenhadores
       └─ tiles.js fornece os sprites
```

O retorno do renderizador é usado por `components/player/moves.js`. Se um objeto desenhado deve bloquear movimento ou iniciar encontro, ele também precisa ser codificado na matriz com um ID reconhecido.

## IDs e camadas de desenho

As imagens vêm de `src/assets/farm/tile_NNNN.png`; o número forma a chave em `sprites`. `drawCity1.js` e `drawRoute1.js` desenham terreno e entidades em camadas. `roadTileIds` de `components/environment/road.js` permite diferenciar tiles da estrada do chão.

As transições usam IDs 201–203 nos dois mapas. O controlador detecta esse grupo e troca para `route1Data.start` ou `city1Data.returnStart`; ao mudar as entradas, revise os dados e ambos os renderizadores em conjunto.
