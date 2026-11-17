// Cria o mapa da rota 1, com estrada, árvores, plantas, flores e a posição do jogador sobre o cenário.
import { sprites } from "./data/tiles.js";
import { drawPlayer } from "../../objects/player/draw.js";
import { drawFences } from "../../objects/environment/fence.js";
import { drawGround, getVisibleTileBounds } from "../../objects/environment/ground.js";
import { drawRouteExit, drawRouteRoad } from "../../objects/environment/road.js";
import { drawTrees } from "../../objects/environment/trees.js";
import {
    drawFlowers,
    drawGrassTiles,
    drawMushrooms,
    drawPlants,
    drawTallGrassPatches,
} from "../../objects/environment/vegeta.js";
import { route1Data } from "./data/route1.js";

function drawRoute1(ctx, tileSize, camera, canvas, player) {
    const map = Array.from(
        { length: route1Data.height },
        () => Array(route1Data.width).fill(132)
    );
    const bounds = getVisibleTileBounds(map, camera, canvas, tileSize);

    drawGround(ctx, map, tileSize, sprites, bounds);
    drawGrassTiles(ctx, map, route1Data.grass, tileSize, sprites);
    drawRouteRoad(map, ctx, tileSize, sprites, route1Data.roadCenterAt, route1Data.entrance.y);
    drawTrees(ctx, map, route1Data.trees, tileSize, sprites);
    drawRouteExit(map, ctx, tileSize, sprites, route1Data.returnEntrance, bounds);
    drawPlants(ctx, map, route1Data.plants, tileSize, sprites);
    drawFlowers(ctx, map, route1Data.flowers, tileSize, sprites);
    drawMushrooms(ctx, map, route1Data.mushrooms, tileSize, sprites);
    drawFences(ctx, map, route1Data.fences, tileSize, sprites);
    drawTallGrassPatches(ctx, map, route1Data.grassPatches, tileSize, sprites, bounds);

    drawPlayer(ctx, player, tileSize, sprites);

    return map;
}

export default drawRoute1;