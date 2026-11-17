import { setMapTile } from "../utils.js";

export const lakeTiles = [
    [282, 283, 283, 283, 283, 283, 283, 283, 283, 284],
    [300, 301, 301, 301, 301, 301, 301, 301, 301, 302],
    [300, 301, 301, 301, 301, 301, 301, 301, 301, 302],
    [300, 301, 301, 301, 301, 301, 301, 301, 301, 302],
    [300, 301, 301, 356, 357, 301, 301, 301, 301, 302, null, 282, 283,283,284],
    [300, 301, 301, 355, 338, 301, 301, 301, 301, 302, null, 300, 301,301,302],
    [300, 301, 301, 301, 301, 301, 301, 301, 301, 302, null, 300, 301,301,302],
    [318, 319, 319, 319, 319, 319, 319, 319, 319, 320, null,318, 319,319, 320],
];

export default function drawLake(ctx, map, x, y, size, sprites) {
    for (let row = 0; row < lakeTiles.length; row++) {
        for (let col = 0; col < lakeTiles[row].length; col++) {
            const tileId = lakeTiles[row][col];
            if (tileId === null || !setMapTile(map, x + col, y + row, tileId)) {
                continue;
            }

            const sprite = sprites[tileId];
            if (!sprite?.complete || sprite.naturalWidth === 0) {
                continue;
            }

            ctx.drawImage(
                sprite,
                (x + col) * size,
                (y + row) * size,
                size,
                size
            );
        }
    }
}
