import { getSprite } from "../utils.js";
//unico enviroment da ia
export function getVisibleTileBounds(map, camera, canvas, tileSize) {
    const startX = Math.max(0, Math.floor(camera.x));
    const startY = Math.max(0, Math.floor(camera.y));

    return {
        startX,
        startY,
        endX: Math.min(map[0]?.length ?? 0, startX + Math.ceil(canvas.width / tileSize) + 1),
        endY: Math.min(map.length, startY + Math.ceil(canvas.height / tileSize) + 1),
    };
}

export function drawGround(ctx, map, tileSize, sprites, bounds, tileId = 132) {
    const ground = getSprite(sprites, tileId);
    if (!ground) return;

    for (let y = bounds.startY; y < bounds.endY; y++) {
        for (let x = bounds.startX; x < bounds.endX; x++) {
            ctx.drawImage(ground, x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}