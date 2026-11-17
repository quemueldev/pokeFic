import { setMapTile } from "../utils.js";


export const roadFence = Array.from({ length: 12 }, (_, y) => {
    if (y === 0) 
        return [176, 213, 214, null, 212, ...Array(8).fill(213), 177, 177, ...Array(6).fill(213), 178];
    if (y === 11) 
        return [200, ...Array(20).fill(213), 202];

    return [188, ...Array(20).fill(null), 190];
});
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
export const routefenceRoad = Array.from({ length: 38 }, (_, y) => {
    if (y === 0) return [179, null, null, null,null, null, 179];
    if (y === 37) return [203, null, null, null, null,null, 203];
    if (y >15 && y < 25) return Array(7).fill(null);
    if (y === 25) return [179, null, null,null, null, null, 179];
    if (y === 15) return [203, null, null, null, null,null, 203];

    return [191, null, null, null, null, null, 191];
});

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

export function drawFences(ctx, map, fences, tileSize, sprites) {
    fences.forEach((fence) => {
        drawFence(ctx, map, fence.x, fence.y, tileSize, sprites, fence.pattern);
    });
}

export default drawFence;
