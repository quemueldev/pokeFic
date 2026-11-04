const roadTileIds = new Set([156, 157, 158, 168, 169, 170, 171, 172, 173, 174]);
const horizontalTopTiles = [156, 168, 171, 174];
const horizontalBottomTiles = [158, 170, 172, 173];
const centerTiles = [157, 157, 157, 169, 173];

//peguei da ia
function getTile(tiles, x, y) {
    return tiles[Math.abs(x * 31 + y * 17) % tiles.length];
}

function drawTile(ctx, sprite, x, y, size, rotated) {
    if (!ctx || !sprite?.complete || sprite.naturalWidth === 0) {
        return;
    }

    if (rotated) {
        ctx.save();
        ctx.translate((x + 1) * size, y * size);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(sprite, 0, 0, size, size);
        ctx.restore();
        return;
    }

    ctx.drawImage(sprite, x * size, y * size, size, size);
}

function putTile(mapa, ctx, size, sprites, tile, visible) {
    mapa[tile.y][tile.x] = tile.id;

    if (visible) {
        drawTile(ctx, sprites?.[tile.id], tile.x, tile.y, size, tile.rotated);
    }
}

export default function drawRoad(
    mapa,
    ctx,
    size,
    sprites,
    pov = { x: 0, y: 0 },
    viewportWidth = Infinity,
    viewportHeight = Infinity,
    startX = 3,
    startY = 10,
    turnX = 30,
    endY = 0
) {
    const mapWidth = mapa[0]?.length ?? 0;
    if (
        !mapWidth ||
        startY < 1 ||
        startY >= mapa.length ||
        endY < 0 ||
        endY >= startY ||
        startX < 0 ||
        startX >= mapWidth ||
        turnX + 1 >= mapWidth ||
        turnX <= startX
    ) {
        throw new RangeError("O caminho da estrada precisa estar dentro dos limites do mapa.");
    }

    const visibleStartX = pov.x - 1;
    const visibleStartY = pov.y - 1;
    const visibleEndX = pov.x + viewportWidth / size + 1;
    const visibleEndY = pov.y + viewportHeight / size + 1;
    const isVisible = (x, y) =>
        x >= visibleStartX && x <= visibleEndX &&
        y >= visibleStartY && y <= visibleEndY;

    for (let x = startX; x <= turnX; x++) {
        const topY = startY - 1;
        const bottomY = startY + 1;
        const topId = getTile(horizontalTopTiles, x, startY);
        const centerId = getTile(centerTiles, x, startY);
        const bottomId = getTile(horizontalBottomTiles, x, startY);

        putTile(mapa, ctx, size, sprites, {
            x, y: topY, id: topId, rotated: true,
        }, isVisible(x, topY));
        putTile(mapa, ctx, size, sprites, {
            x, y: startY, id: centerId, rotated: true,
        }, isVisible(x, startY));
        putTile(mapa, ctx, size, sprites, {
            x, y: bottomY, id: bottomId, rotated: true,
        }, isVisible(x, bottomY));
    }

    for (let y = startY; y >= endY; y--) {
        const leftX = turnX - 1;
        const rightX = turnX + 1;
        const leftId = getTile(horizontalTopTiles, turnX, y);
        const centerId = getTile(centerTiles, turnX, y);
        const rightId = getTile(horizontalBottomTiles, turnX, y);

        putTile(mapa, ctx, size, sprites, {
            x: leftX, y, id: leftId, rotated: false,
        }, isVisible(leftX, y));
        putTile(mapa, ctx, size, sprites, {
            x: turnX, y, id: centerId, rotated: false,
        }, isVisible(turnX, y));
        putTile(mapa, ctx, size, sprites, {
            x: rightX, y, id: rightId, rotated: false,
        }, isVisible(rightX, y));
    }

    return roadTileIds;
}

export { roadTileIds };
