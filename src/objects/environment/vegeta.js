// Desenha pequenos elementos vegetais do cenário, como flores, plantas, cogumelos e grama, para deixar o mapa mais vivo.
import { getSprite, drawParams, setMapTile } from "../utils.js";
//tornar essas fn global

export function drawFlower(ctx, map, x, y, size, sprites) {
    setMapTile(map, x, y, 134);
    const sprite = getSprite(sprites, 134);
    if (sprite) ctx.drawImage(...drawParams(sprite, x, y, size));
}

export function drawPlant(ctx, map, x, y, size, sprites) {
    setMapTile(map, x, y, 149);
    const sprite = getSprite(sprites, 149);
    if (sprite) ctx.drawImage(...drawParams(sprite, x, y, size));
}

export function drawMushroom(ctx, map, x, y, size, sprites) {
    setMapTile(map, x, y, 161);
    const sprite = getSprite(sprites, 161);
    if (sprite) ctx.drawImage(...drawParams(sprite, x, y, size));
}

export function drawGrass(ctx, map, x, y, size, sprites) {
    setMapTile(map, x, y, 133);
    const sprite = getSprite(sprites, 133);
    if (sprite) ctx.drawImage(...drawParams(sprite, x, y, size));
}