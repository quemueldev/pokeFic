export function drawAnimal(ctx, animal, tileSize, sprites) {
    const sprite = sprites[animal.spriteId];
    if (!sprite?.complete || sprite.naturalWidth === 0) {
        return;
    }

    ctx.drawImage(
        sprite,
        animal.x * tileSize,
        animal.y * tileSize,
        tileSize*2,
        tileSize*2
    );
}