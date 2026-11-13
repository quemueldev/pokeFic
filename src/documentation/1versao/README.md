# Poke Chico — versão 1

Mapa de navegação do código dentro de `src/`. Cada pasta importante tem uma explicação separada; os nomes dos documentos indicam a pasta descrita.

## Índice por pasta

- [`components/`](./components/README.md)
  - [`components/animals/`](./components/animals.md)
  - [`components/environment/`](./components/environment.md)
  - [`components/personas/`](./components/personas.md)
  - [`components/player/`](./components/player.md)
  - [`components/pokemon/`](./components/pokemon.md)
  - [`components/initializer.js` e `components/utils.js`](./components/shared.md)
- [`pages/`](./pages/README.md)
  - [`pages/main/`](./pages/main.md)
  - [`pages/rendering/`](./pages/rendering.md)
  - [`pages/screens/`](./pages/screens.md)
  - [`pages/route1/`](./pages/route1.md)
- [`assets/farm/`](./assets-farm.md)
- [Arquivos de entrada e configuração do projeto](./root.md)

## Arquitetura em uma frase

O React inicia `App.jsx`, que monta as telas e coordena o estado duradouro da equipe; `AppController.jsx` controla teclado, movimento e ciclo do mundo desenhado em canvas; os renderizadores dos mapas devolvem a matriz de tiles, que também é usada para colisão e transição entre áreas.

## Fluxos principais

### Inicialização e desenho

```text
index.html → src/main.jsx → pages/main/App.jsx
                              └─ AppController.jsx
                                  └─ rendering/drawGame.js
                                      ├─ rendering/drawCity1.js (mapId 0)
                                      └─ rendering/drawRoute1.js (mapId 1)
```

`drawGame.js` escolhe qual mapa desenhar, limpa o canvas e aplica a câmera. Cada mapa compõe o chão, as entidades e o jogador e retorna uma matriz de IDs de tile ao controlador. A matriz é parte do modelo de colisão, não apenas uma representação visual.

### Teclado, colisões e mudança de mapa

```text
AppController.keydown
  ├─ Espaço perto da curandeira (tile 108) → onHealerDialog → App.jsx renderiza o diálogo
  ├─ E → onMenuChange → App.jsx renderiza/fecha o menu
  └─ WASD/setas → player/moves.js
       ├─ tile bloqueado → não move
       ├─ ID negativo → animals/main.js reconhece animal → batalha
       ├─ ID 201–203 → muda entre cidade e rota
       └─ tile livre → atualiza posição e anima
```

O controlador expõe métodos que `App.jsx` chama via `gameRef`: `finishBattle`, `closeMenu`, `closeHealerDialog` e `cleanup`.

### Batalha, equipe e cura

```text
pokemon/data.js → player/party.js → estado party em App.jsx
                                    ├─ GameMenu mostra status
                                    ├─ BattleScreen atualiza vida/XP
                                    │    └─ onFinish salva o resultado em App.jsx
                                    └─ diálogo da curandeira cura a equipe
                                         └─ pokemon/stats.js calcula maxHealth
```

`health` é a vida atual; `getPokemonStats(pokemon).maxHealth` calcula a vida máxima. A batalha devolve o Pokémon atualizado via callback, e `App.jsx` grava a atualização no estado React.

### Dados do mapa e sprites

```text
rendering/data/city1.js ──→ drawCity1.js
rendering/data/route1.js ─→ AppController + drawRoute1.js
assets/farm/tile_NNNN.png → rendering/data/tiles.js → mapas, menu e batalha
```

Os IDs de sprites conectam a imagem ao código. As coordenadas de mundo são em tiles; os desenhadores convertem para pixels usando `tileSize` (atualmente 25).

## Onde alterar

| Objetivo | Comece por |
|---|---|
| Adicionar Pokémon, mudar equipe ou status | [`components/pokemon/`](./components/pokemon.md), [`components/player/`](./components/player.md) |
| Mudar movimento, colisão ou controles | [`components/player/`](./components/player.md), [`pages/main/`](./pages/main.md) |
| Mudar cidade, rota ou transições | [`pages/rendering/`](./pages/rendering.md), [`pages/main/`](./pages/main.md) |
| Mudar encontros e comportamento de animais | [`components/animals/`](./components/animals.md), [`pages/rendering/`](./pages/rendering.md) |
| Mudar batalha, menu ou diálogo | [`pages/screens/`](./pages/screens.md), [`pages/main/`](./pages/main.md) |
| Mudar desenhos reutilizados | [`components/environment/`](./components/environment.md), [`components/personas/`](./components/personas.md) |
| Trocar imagens | [`assets/farm/`](./assets-farm.md) |

## Regras de integração importantes

1. Se criar um obstáculo, atualize o desenho **e** a matriz de tiles; o movimento consulta a matriz.
2. Se mudar IDs de tiles, confira renderizadores, `blockedTiles`, `roadTileIds`, transições e nomes das imagens.
3. Mantenha os callbacks de `AppController.jsx` em sincronia com as props/handlers de `App.jsx`.
4. Não misture vida atual (`health`) com vida máxima (`maxHealth`).
5. Os IDs negativos identificam animais somente na matriz da rota.
6. Para sprites, use a interface `getSprite(sprites, tileId)` e não desenhe a imagem antes de ela carregar.

## Limites documentados

- `components/player/main.js`, `components/personas/actions.js`, `components/personas/data/objs.js` e `pages/route1/index.jsx` não fazem parte do fluxo principal atual. Consulte as páginas correspondentes para detalhes.
- O estado da equipe e do mundo fica em memória; não há persistência entre recargas.
- Não há suíte de testes automatizados declarada. Os comandos disponíveis incluem `npm run build` e `npm run lint`.
- `dist/` e `node_modules/` são gerados/instalados e não são fonte do comportamento do jogo.
