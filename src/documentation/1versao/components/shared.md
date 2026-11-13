# `components/initializer.js` e `components/utils.js`

Módulos compartilhados diretamente na raiz de `components/`.

## `initializer.js`

Importa os desenhadores de `environment/`, `animals/`, `personas/` e `player/` e os expõe em um único objeto. `drawCity1.js` e `drawRoute1.js` chamam esse agregador para obter as funções de desenho de que precisam.

Se uma nova entidade tiver um desenhador reutilizado pelos mapas, adicione seu import/export aqui e use o nome exportado nos consumidores. Uma função presente no arquivo mas ausente no objeto retornado não estará disponível aos mapas.

## `utils.js`

- `getSprite(sprites, tileId)`: consulta o sprite numérico e só o retorna quando carregado.
- `drawParams(sprite, x, y, size)`: retorna os argumentos de `drawImage` para posicionar uma imagem em coordenadas de tile.

Desenhadores como árvore, vegetação e curandeira reutilizam esses helpers. O formato dos argumentos é importante: primeiro o catálogo completo, depois o ID do tile.
