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

export function drawGrassTiles(ctx, map, positions, size, sprites) {
    positions.forEach(({ x, y }) => drawGrass(ctx, map, x, y, size, sprites));
}

export function drawPlants(ctx, map, positions, size, sprites) {
    positions.forEach(({ x, y }) => drawPlant(ctx, map, x, y, size, sprites));
}

export function drawFlowers(ctx, map, positions, size, sprites) {
    positions.forEach(({ x, y }) => drawFlower(ctx, map, x, y, size, sprites));
}

export function drawMushrooms(ctx, map, positions, size, sprites) {
    positions.forEach(({ x, y }) => drawMushroom(ctx, map, x, y, size, sprites));
}

export function drawTallGrassPatches(ctx, map, patches, size, sprites, bounds) {
    const sprite = getSprite(sprites, 39);
    if (!sprite) return;

    patches.forEach(({ x, y, width, height }) => {
        for (let grassY = y; grassY < y + height; grassY++) {
            const row = map[grassY];
            if (!row) continue;

            for (let grassX = x; grassX < x + width; grassX++) {
                //if (row[grassX] !== 132 && row[grassX] !== 133) continue;

                setMapTile(map, grassX, grassY, 39);
                if (
                    grassX >= bounds.startX && grassX < bounds.endX &&
                    grassY >= bounds.startY && grassY < bounds.endY
                ) {
                    ctx.drawImage(sprite, grassX * size, grassY * size, size, size);
                }
            }
        }
    });
}