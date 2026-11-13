# `pages/main/`

Raiz do jogo em React e controlador de estado/interação do mundo.

| Arquivo | Responsabilidade e relações |
|---|---|
| `App.jsx` | Monta o canvas, mantém `party`, encontro, menu e diálogo de cura; instancia o controlador; renderiza `BattleScreen` e `GameMenu`; recebe resultados e atualiza o estado da equipe. |
| `AppController.jsx` | Controla mapa, jogador, câmera, animais, teclado, animação, colisão, encontro, menu e interação com a curandeira. Exporta métodos imperativos usados por `App.jsx`. |
| `App.css` | Estilo do canvas e diálogo de cura React. |

## Ponte React/controlador

`App.jsx` chama `controller(canvas, callbacks)` em `useEffect`. O controlador chama os callbacks `onEncounter`, `onMenuChange` e `onHealerDialog` para pedir mudanças visuais ao React. A referência `gameRef` permite ao React terminar uma batalha, fechar o menu/diálogo e limpar os listeners.

## Estados em cada camada

React guarda dados que devem persistir entre renderizações de tela: `party`, `encounter`, `menuOpen` e `healerDialog`. O controlador guarda o estado do mundo: `playerPosition`, `mapId`, `map`, `animals`, câmera, animação e flags de interação.

### Eventos e resultados

- Batalha: `BattleScreen.onFinish(outcome)` → `App.finishBattle` atualiza `party` e chama `game.finishBattle`.
- Menu: callback `onMenuChange` abre o menu; botão/tecla chama `game.closeMenu`.
- Cura: proximidade de um tile e tecla Espaço (`event.code === "Space"`) → `onHealerDialog`; botão altera `party`; fechar chama `game.closeHealerDialog`.
- Menu: tecla `E` abre/fecha o menu quando o diálogo de cura não está aberto.
- Movimento: teclado → `handleMove`; mudança da grade pode resultar em movimento, encontro ou transição.

Ao alterar callbacks ou os métodos expostos pelo controlador, mantenha os nomes/formatos sincronizados entre este par de arquivos. No teardown, `cleanup` remove listeners e cancela a animação.
