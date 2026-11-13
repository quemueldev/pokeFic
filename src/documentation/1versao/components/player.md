# `components/player/`

Lógica e dados do jogador controlável, além do grupo de Pokémon inicial.

| Arquivo | Responsabilidade e relações |
|---|---|
| `draw.js` | Desenha o jogador com o sprite 109 usando coordenadas interpoladas; chamado pelos renderizadores dos mapas. |
| `moves.js` | `handleMove` interpreta WASD/setas, valida limites, bloqueios, animais e entradas. `AppController.jsx` passa callbacks para encontros e transições. |
| `party.js` | Define o grupo inicial (Chiquito nível 1) a partir do catálogo `pokemon/data.js`. `App.jsx` clona os objetos para o estado React `party`. |
| `main.js` | Agregador legado sem uso no fluxo atual. Importa `UseMove`, que não é exportado por `moves.js` (o nome exportado é `handleMove`). Não conecte esse módulo sem corrigir a interface. |

## Fluxo de movimento

```text
AppController.keydown → handleMove(event.key, map, playerPosition, callbacks)
  ├─ blockedTiles → impede movimento
  ├─ isAnimalTile → solicita encontro ao controlador
  ├─ entrance IDs 201–203 → controlador altera mapId e coordenadas
  └─ tile livre → atualiza posição lógica; animate interpola posição de desenho
```

`map` é a grade retornada pelo renderizador atual. Obstáculos desenhados precisam aparecer nela com IDs reconhecidos por `blockedTiles`, caso devam impedir a passagem.

## Equipe e vida

`party.js` só define os dados iniciais. Durante a sessão, o estado real da equipe está em `pages/main/App.jsx`. A vida atual é `pokemon.health`; a vida máxima vem de `pokemon/stats.js`. A batalha devolve mudanças via `onFinish`, e a curandeira cura por `setParty`.
