import { setMapTile } from "../utils.js";

const roadTileIds = new Set([156, 157, 158, 168, 169, 170, 171, 172, 173, 174]);
const topTiles = [156];
const bottomTiles = [158];
const centerTiles = [157,171,174,173];

function getTile(tiles, x, y) {
    return tiles[(x * 31 + y * 17) % tiles.length];
}

function drawTile(ctx, sprite, x, y, size, rotated) {
    if (!ctx || !sprite?.complete || !sprite.naturalWidth) return;

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

function putTile(map, ctx, size, sprites, x, y, id, rotated = false) {
    const tileId = roadTileIds.has(map[y][x]) ? 157 : id;
    if (!setMapTile(map, x, y, tileId)) return;
    drawTile(ctx, sprites?.[tileId], x, y, size, rotated && tileId !== 157);
}

//city1

export default function drawRoad(
    map,
    ctx,
    size,
    sprites,
    startX = 3,
    startY = 10,
    turnX = 30,
    endY = 0
) {
    const mapWidth = map[0]?.length ?? 0;
    if (
        !mapWidth ||
        size <= 0 ||
        startY < 1 ||
        startY >= map.length - 1 ||
        endY < 0 ||
        endY >= startY ||
        startX < 0 ||
        startX >= mapWidth ||
        turnX <= startX ||
        turnX + 1 >= mapWidth ||
        turnX - 5 < 0 ||
        startY + 11 >= map.length
    ) {
        throw new RangeError("O caminho da estrada precisa estar dentro dos limites do mapa.");
    }

    const place = (x, y, id, rotated = false) =>
        putTile(map, ctx, size, sprites, x, y, id, rotated);

    for (let x = startX; x <= 50 ; x++) {
        place(x, startY - 1, getTile(topTiles, x, startY), true);
        place(x, startY, getTile(centerTiles, x, startY), true);
        place(x, startY + 1, getTile(bottomTiles, x, startY), true);
    }

    for (let y = startY + 1; y >= endY; y--) {
        place(turnX - 1, y, getTile(topTiles, turnX, y));
        place(turnX, y, getTile(centerTiles, turnX, y));
        place(turnX + 1, y, getTile(bottomTiles, turnX, y));
    }
    for (let x = startX+24; x <= 50 ; x++) {
        place(x, startY +9, getTile(topTiles, x, startY), true);
        place(x, startY+10, getTile(centerTiles, x, startY), true);
        place(x, startY +11, getTile(bottomTiles, x, startY), true);
    }
    for (let x = startX; x <= 25 ; x++) {
        place(x, startY +15, getTile(topTiles, x, startY), true);
        place(x, startY+16, getTile(centerTiles, x, startY), true);
        place(x, startY +17, getTile(bottomTiles, x, startY), true);
    }

    for (let y = startY + 17; y >= endY + 11; y--) {
        place(turnX - 5, y, getTile(topTiles, turnX, y));
        place(turnX - 4, y, getTile(centerTiles, turnX, y));
        place(turnX - 3, y, getTile(bottomTiles, turnX, y));
    }

    return roadTileIds;
}

export function drawRouteRoad(map, ctx, size, sprites, roadCenterAt, startY = 0) {
    const mapWidth = map[0]?.length ?? 0;
    if (!mapWidth || size <= 0 || typeof roadCenterAt !== "function" || startY < 0 || startY >= map.length) {
        throw new RangeError("A estrada da rota precisa estar dentro dos limites do mapa.");
    }

    for (let y = startY; y < map.length; y++) {
        const centerX = roadCenterAt(y);
        if (centerX < 1 || centerX >= mapWidth - 1) {
            throw new RangeError("A estrada da rota precisa estar dentro dos limites do mapa.");
        }

        putTile(map, ctx, size, sprites, centerX - 1, y, 156, );
        putTile(map, ctx, size, sprites, centerX, y, 157, );
        putTile(map, ctx, size, sprites, centerX + 1, y, 158,);
    }

    return roadTileIds;
}

export function drawRouteExit(map, ctx, size, sprites, entrance, bounds, tileIds = [201, 202, 203]) {
    tileIds.forEach((tileId, index) => {
        const x = entrance.x - 1 + index;
        setMapTile(map, x, entrance.y, tileId);

        if (
            x < bounds.startX || x >= bounds.endX ||
            entrance.y < bounds.startY || entrance.y >= bounds.endY
        ) return;

        drawTile(ctx, sprites?.[tileId], x, entrance.y, size, false);
    });
}

//route1

export { roadTileIds };
