import { sprites } from "./data/tiles.js";
import drawController from "../../components/initializer.js";
import { roadTileIds } from "../../components/road.js";
import { route1Data } from "./data/route1.js";

function drawRoute1(ctx, tileSize, camera, canvas, player) {
    const map = Array.from(
        { length: route1Data.height },
        () => Array(route1Data.width).fill(132)
    );

    route1Data.trees.forEach(({ x, y }) => {
        map[y][x] = 136;
        map[y + 1][x] = 148;
    });

    for (let y = route1Data.entrance.y; y < route1Data.height; y++) {
        const centerX = route1Data.roadCenterAt(y);
        map[y][centerX - 1] = 156;
        map[y][centerX] = 157;
        map[y][centerX + 1] = 158;
    }

    [201, 202, 203].forEach((tileId, index) => {
        const x = route1Data.entrance.x - 1 + index;
        map[route1Data.entrance.y][x] = tileId;

        const returnX = route1Data.returnEntrance.x - 1 + index;
        map[route1Data.returnEntrance.y][returnX] = tileId;
    });

    const startX = Math.max(0, Math.floor(camera.x));
    const startY = Math.max(0, Math.floor(camera.y));
    const endX = Math.min(
        map[0].length,
        startX + Math.ceil(canvas.width / tileSize) + 1
    );
    const endY = Math.min(
        map.length,
        startY + Math.ceil(canvas.height / tileSize) + 1
    );
    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            const tileId = map[y][x];
            if ([201, 202, 203].includes(tileId)) {
                const sprite = sprites[tileId];
                if (sprite?.complete && sprite.naturalWidth > 0) {
                    ctx.drawImage(sprite, x * tileSize, y * tileSize, tileSize, tileSize);
                }
                continue;
            }

            const isRoad = roadTileIds.has(tileId);
            const sprite = sprites[isRoad ? tileId : 132];

            if (sprite?.complete && sprite.naturalWidth > 0) {
                if (isRoad) {
                    ctx.save();
                    ctx.translate((x + 1) * tileSize, y * tileSize);
                    ctx.rotate(Math.PI / 2);
                }
                ctx.drawImage(
                    sprite,
                    isRoad ? 0 : x * tileSize,
                    isRoad ? 0 : y * tileSize,
                    tileSize,
                    tileSize
                );
                if (isRoad) {
                    ctx.restore();
                }
            }
        }
    }

    const { drawTree, drawPlayer, drawPlant, drawFlower } = drawController();
    route1Data.trees.forEach((tree) => {
        drawTree(ctx, map, tree.x, tree.y, tileSize, sprites, tree.size);
    });
    route1Data.plants.forEach(({ x, y }) => {
        drawPlant(ctx, map, x, y, tileSize, sprites);
    });
    route1Data.flowers.forEach(({ x, y }) => {
        drawFlower(ctx, map, x, y, tileSize, sprites);
    });
    drawPlayer(ctx, player, tileSize, sprites);

    return map;
}

export default drawRoute1;