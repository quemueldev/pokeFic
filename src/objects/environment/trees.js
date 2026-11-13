
import { getSprite, drawParams, setMapTile } from "../utils.js";
// Desenha uma árvore no mapa, podendo ser de tamanho simples (1 tile) ou alto (2 tiles) conforme a cena do cenário.
export default function drawTree(ctx, map, x, y, size, sprites, treeSize = 1) {
    const sprite = getSprite(sprites, 160);
    const spriteSize = [
        getSprite(sprites, 136),
        getSprite(sprites, 148),
    ];

    if (treeSize === 1) {
        setMapTile(map, x, y, 160);
        if (sprite) {
            ctx.drawImage(...drawParams(sprite, x, y, size));
        }

    } else {
        for (let i = 0; i < 2; i++) {
            const tileId = i === 0 ? 136 : 148;
            const treeSprite = spriteSize[i];
            setMapTile(map, x, y + i, tileId);
            if (treeSprite) {
                ctx.drawImage(...drawParams(treeSprite, x, y + i, size));
            }
        }
    }
}