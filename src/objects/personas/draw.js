import { getSprite, drawParams, setMapTile } from "../utils.js";

export function drawHealer(ctx, map, x, y, tileSize, sprites) {
    const sprite = getSprite(sprites, 108);
    setMapTile(map, x, y, 108);

    if (sprite) {
        ctx.drawImage(...drawParams(sprite, x, y, tileSize));
    }
}