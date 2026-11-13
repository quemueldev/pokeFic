# `components/personas/`

Subpasta destinada a personagens não-jogadores (personas). Nesta versão, o único desenho conectado ao mundo é a curandeira.

| Caminho | Responsabilidade e estado |
|---|---|
| `draw.js` | `drawHealer` desenha o sprite 121 e escreve seu ID na matriz da cidade, bloqueando a passagem pelo tile. É exportada por `initializer.js` e chamada por `drawCity1.js`. |
| `actions.js` | Arquivo vazio; nenhuma ação está implementada ou importada pelo fluxo principal. |
| `data/objs.js` | Arquivo vazio; não há dados de personas definidos nele. |

## Interação da curandeira

O desenho usa `city1Data.healer` em `pages/rendering/data/city1.js`. O mesmo ponto é lido por `AppController.jsx` quando Espaço (`event.code === "Space"`) é pressionado para decidir se o jogador está a até um tile ortogonal da persona. O callback `onHealerDialog` abre o diálogo React em `pages/main/App.jsx`; o botão de cura atualiza `party` e o fechamento chama `closeHealerDialog` no controlador. A tecla `E` continua reservada ao menu.

```text
city1Data.healer → drawCity1.js → drawHealer
                 └→ AppController → callback → App.jsx → cura da equipe
```

Mover a curandeira exige manter a posição de desenho e a verificação de proximidade apontando para a mesma propriedade. O texto e o visual do diálogo pertencem a `pages/main/App.jsx` e `pages/main/App.css`, não a esta pasta.
