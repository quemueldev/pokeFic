// Cria o mapa da rota 1, com estrada, árvores, plantas, flores e a posição do jogador sobre o cenário.
import { sprites } from "./data/tiles.js";
import drawController from "../../objects/initializer.js";
import { drawRouteRoad } from "../../objects/environment/road.js";
import { isAnimalTile, placeAnimalsOnMap } from "../../objects/animals/main.js";
import { setMapTile } from "../../objects/utils.js";
import { route1Data } from "./data/route1.js";

function drawRoute1(ctx, tileSize, camera, canvas, player, animals) {
    const { drawTree, drawPlayer, drawPlant, drawFlower, drawAnimal } = drawController();
    const map = Array.from(
        { length: route1Data.height },
        () => Array(route1Data.width).fill(132)
    );

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
    const ground = sprites[132];

    if (ground?.complete && ground.naturalWidth > 0) {
        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                ctx.drawImage(ground, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    drawRouteRoad(
        map,
        ctx,
        tileSize,
        sprites,
        route1Data.roadCenterAt,
        route1Data.entrance.y
    );

    route1Data.trees.forEach((tree) => {
        drawTree(ctx, map, tree.x, tree.y, tileSize, sprites, tree.size);
    });

    [201, 202, 203].forEach((tileId, index) => {
        const returnX = route1Data.returnEntrance.x - 1 + index;
        setMapTile(map, returnX, route1Data.returnEntrance.y, tileId);

        const sprite = sprites[tileId];
        if (
            returnX >= startX && returnX < endX &&
            route1Data.returnEntrance.y >= startY && route1Data.returnEntrance.y < endY &&
            sprite?.complete && sprite.naturalWidth > 0
        ) {
            ctx.drawImage(sprite, returnX * tileSize, route1Data.returnEntrance.y * tileSize, tileSize, tileSize);
        }
    });

    route1Data.plants.forEach(({ x, y }) => {
        drawPlant(ctx, map, x, y, tileSize, sprites);
    });
    route1Data.flowers.forEach(({ x, y }) => {
        drawFlower(ctx, map, x, y, tileSize, sprites);
    });
    placeAnimalsOnMap(animals, map);

    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            if (isAnimalTile(map[y][x]) && ground?.complete && ground.naturalWidth > 0) {
                ctx.drawImage(ground, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    // Depois de basear o mapa, desenha as entidades decorativas e o jogador por cima.
    Object.values(animals).forEach((animal) => {
        drawAnimal(ctx, animal, tileSize, sprites);
    });
    drawPlayer(ctx, player, tileSize, sprites);

    return map;
}

export default drawRoute1;