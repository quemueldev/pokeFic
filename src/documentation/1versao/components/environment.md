# `components/environment/`

Desenhadores de cenário compartilhados pelos mapas. As estruturas e árvores também gravam seus IDs na matriz do mapa; assim, o mesmo conteúdo visual informa colisões.

| Arquivo | Responsabilidade e relação |
|---|---|
| `house.js` | Matrizes de tiles para casas/ranchos; desenha cada sprite e preenche a grade com IDs que impedem passagem. Chamado por `initializer.js` e `drawCity1.js`. |
| `road.js` | Gera/desenha segmentos rotacionados de estrada e exporta `roadTileIds`. `drawCity1.js` usa o desenhador; os renderizadores consultam o conjunto para distinguir estrada de chão. |
| `trees.js` | Desenha árvores de um ou dois tiles e escreve seus IDs na matriz. Usado em ambos os mapas por meio do agregador. |
| `vegeta.js` | Desenha flor, planta, cogumelo e grama. Usa os helpers de imagem; no estado atual esses elementos são decorativos e não registram obstáculos na grade. |

## Caminho de desenho

```text
pages/rendering/drawCity1.js / drawRoute1.js
  → components/initializer.js
    → funções desta pasta
      → components/utils.js e sprites de rendering/data/tiles.js
```

Os caminhos antigos `components/house.js`, `components/road.js`, `components/trees.js` e `components/vegeta.js` foram substituídos por esta subpasta. Ao adicionar um elemento sólido, atualize o mapa e confira `components/player/moves.js` para garantir que a passagem seja bloqueada.

`roadTileIds` é um contrato compartilhado: se mudar a seleção de IDs, revise como os mapas ignoram o chão sob a estrada e como definem colisões.
