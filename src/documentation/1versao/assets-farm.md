# `assets/farm/`

Contém 462 imagens PNG, de `tile_0000.png` a `tile_0461.png`. Cada sprite é associado ao número em seu nome.

## Carregamento e consumidores

```text
assets/farm/tile_NNNN.png
  → pages/rendering/data/tiles.js
      → sprites[NNNN] e spritesLoaded
          ├─ renderizadores de cidade/rota
          ├─ desenhadores de entidades
          ├─ menu da equipe
          └─ batalha
```

O Vite descobre os arquivos por `import.meta.glob`. `tiles.js` converte o nome em chave numérica e cria `Image`; a promessa `spritesLoaded` indica quando as imagens estão disponíveis.

## Ao substituir ou adicionar uma imagem

- Preserve o padrão `tile_NNNN.png` e use o ID correspondente no código.
- O desenho do mundo usa as imagens como tiles; `components/utils.js` valida se estão carregadas antes de desenhar.
- Alguns IDs ligados diretamente à lógica: 109 jogador; 121 curandeira/Rugão; 122 Chiquito; 132 chão; 133/134/149/161 vegetação; 136/148/160 árvores; 156–158 e 168–174 estrada; 201–203 transições.
- Estruturas usam subconjuntos dos IDs 180–221 definidos em `components/environment/house.js`.

Os arquivos de imagem não contêm a lógica do jogo: a associação de cada ID com seu uso é mantida nos módulos de desenho e nos dados de espécies/mapas.
