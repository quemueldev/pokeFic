# `pages/`

Camada que liga a interface React ao mundo do jogo, escolhe mapas e compõe as telas.

## Subpastas

- [`main/`](../pages/main.md): raiz React e controlador do mundo.
- [`rendering/`](../pages/rendering.md): mapas, seleção de renderizador e dados de mundo/sprites.
- [`screens/`](../pages/screens.md): componentes React de batalha e menu.
- [`route1/`](../pages/route1.md): arquivo de tela/rota legado, vazio nesta versão.

## Dependências

`main/App.jsx` cria o controlador e escolhe quais telas React aparecem. O controlador chama `rendering/drawGame.js`; este roteia para um renderizador de mapa. Renderizadores consomem dados em `rendering/data/` e funções de desenho em `components/`.

As telas React não desenham o mundo no canvas: aparecem como elementos HTML/CSS sobre ele e enviam os resultados para `App.jsx` via props/callbacks.
