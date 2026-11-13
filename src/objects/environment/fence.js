import { setMapTile } from "../utils.js";


export const roadFence =[
    [212, 213, 214, null, 212, 213, 213, 213, 213, 213, 213, 213, 213, 177, 177, 213, 213, 213, 213, 213, 213, 178],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,189,null,null,null,null,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,73,null,85,null,null,null,217,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226,null,null,null,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,110,111,null,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, 190],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, 190],

] 
export const bigHouse1Fence=[
    [179,null,null,null,null, 179],
    [188, null, null ,null,null, 190],
    [200, 213,213, null, 213, 202]
]

export const fenceTileIds = [
    176, 177, 178, 179,
    188, 189, 190, 191,
    200, 202, 213, 215,
];

export function drawFence(ctx, map, x, y, tileSize, sprites, pattern) {
    if (!Array.isArray(pattern)) {
        throw new TypeError("A fence pattern must be an array of tile rows.");
    }

    pattern.forEach((row, rowIndex) => {
        if (!Array.isArray(row)) {
            throw new TypeError("Each fence pattern row must be an array.");
        }

        row.forEach((tileId, columnIndex) => {
            if (tileId === null) return;
            if (!Number.isInteger(tileId)) {
                throw new TypeError("Fence pattern tiles must be integer IDs or null.");
            }

            const tileX = x + columnIndex;
            const tileY = y + rowIndex;
            if (!setMapTile(map, tileX, tileY, tileId)) return;

            const sprite = sprites[tileId];
            if (sprite?.complete && sprite.naturalWidth > 0) {
                ctx.drawImage(
                    sprite,
                    tileX * tileSize,
                    tileY * tileSize,
                    tileSize,
                    tileSize
                );
            }
        });
    });
}

export default drawFence;
