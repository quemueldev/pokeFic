# `components/`

Código reutilizável do jogo: regras de movimento, dados de Pokémon, criação/desenho de entidades e elementos do mundo. Os componentes de tela React ficam em `pages/screens/`; esta pasta concentra módulos de domínio e desenho no canvas.

## Subpastas e módulos

- [`animals/`](../components/animals.md): criação, movimentação, desenho e colisão de animais.
- [`environment/`](../components/environment.md): casas, estrada, árvores e vegetação.
- [`personas/`](../components/personas.md): desenho da curandeira e módulos ainda vazios.
- [`player/`](../components/player.md): movimento/desenho do jogador e equipe inicial.
- [`pokemon/`](../components/pokemon.md): catálogo de espécies e cálculo de status.
- [`initializer.js` e `utils.js`](../components/shared.md): agregador de desenhadores e helpers de sprite.

## Relações gerais

`pages/main/AppController.jsx` usa o movimento do jogador e a fábrica de animais. Os mapas são desenhados por módulos em `pages/rendering/`, que reutilizam os desenhadores daqui. A equipe inicial vem de `player/party.js`; os modelos base vêm de `pokemon/data.js`; as telas consultam `pokemon/stats.js`.

Ao alterar um desenhador, verifique se o agregador `initializer.js` o expõe e se os mapas chamam a função com a mesma ordem de argumentos.
