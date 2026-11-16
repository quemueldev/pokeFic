// Monta o cenário da cidade principal, incluindo casas, árvores, grama, rua e acesso ao mapa da rota.
import { sprites, spritesLoaded } from "./data/tiles.js";
import {
    city1Data,
    trees,
    houses,
    plants,
    flowers,
    mushrooms,
    grasses,
    houses2,
    ranches,
    bigHouse,
    playerHouse,
} from "./data/city1.js";
import drawController from "../../objects/initializer.js";
import { roadTileIds } from "../../objects/environment/road.js";
import { setMapTile } from "../../objects/utils.js";

const treeTileIds = new Set([136, 148, 160]);

// Desenha o chão base do mapa na região visível pela câmera, ignorando partes da estrada para não sobrepor a rua.
function _drawMap(mapa, ctx, tamanho, pov, canvasWidth, canvasHeight) {
    const startX = Math.max(0, Math.floor(pov.x));
    const startY = Math.max(0, Math.floor(pov.y));
    const endX = Math.min(mapa[0].length, startX + Math.ceil(canvasWidth / tamanho) + 1);
    const endY = Math.min(mapa.length, startY + Math.ceil(canvasHeight / tamanho) + 1);

    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            const tileId = mapa[y][x];
            if (roadTileIds.has(tileId)) {
                continue;
            }
            const sprite = sprites[treeTileIds.has(tileId) ? 132 : tileId];

            if (sprite?.complete && sprite.naturalWidth > 0) {
                ctx.drawImage(
                    sprite,
                    x * tamanho,
                    y * tamanho,
                    tamanho,
                    tamanho
                );
            }
        }
    }
}

function drawMap(ctx, tileSize, camera, canvas, player) {
    // Cria uma matriz vazia da cidade, preenchida inicialmente por terreno comum (grama/chão).
    const map = Array.from(
        { length: city1Data.height },
        () => Array(city1Data.width).fill(132)
    );

    const {
        drawHouse,
        drawTree,
        drawPlayer,
        drawPlant,
        drawFlower,
        drawMushroom,
        drawGrass,
        drawHouse2,
        drawRanch,
        drawFence,
        drawLake,
        drawRoad,
        drawHealer,
        drawBigHouse,
        drawPlayerHouse
    } = drawController();

    _drawMap(map, ctx, tileSize, camera, canvas.width, canvas.height);
    drawRoad(map, ctx, tileSize, sprites);

    // Desenha a entrada principal da cidade com os tiles de transição de mapa.
    [201, 202, 203].forEach((tileId, index) => {
        const x = city1Data.entrance.x - 1 + index;
        const sprite = sprites[tileId];
        setMapTile(map, x, city1Data.entrance.y, tileId);

        if (sprite?.complete && sprite.naturalWidth > 0) {
            ctx.drawImage(
                sprite,
                x * tileSize,
                city1Data.entrance.y * tileSize,
                tileSize,
                tileSize
            );
        }
    });

    // Coloca todos os elementos decorativos e construções por cima do mapa base.
    trees.forEach((tree) => {
        drawTree(ctx, map, tree.x, tree.y, tileSize, sprites, tree.size);
    });
    plants.forEach((plant) => {
        drawPlant(ctx, map, plant.x, plant.y, tileSize, sprites);
    });
    flowers.forEach((flower) => {
        drawFlower(ctx, map, flower.x, flower.y, tileSize, sprites);
    });
    grasses.forEach((grass) => {
        drawGrass(ctx, map, grass.x, grass.y, tileSize, sprites);
    });
    mushrooms.forEach((mushroom) => {
        drawMushroom(ctx, map, mushroom.x, mushroom.y, tileSize, sprites);
    });
    houses.forEach((house) => {
        drawHouse(ctx, house.x, house.y, tileSize, sprites, map);
    });
    bigHouse.forEach((house) => {
        drawBigHouse(ctx, house.x, house.y, tileSize, sprites, map);
    });
    houses2.forEach((house) => {
        drawHouse2(ctx, map, house.x, house.y, tileSize, sprites);
    });
    ranches.forEach((ranch) => {
        drawRanch(ctx, map, ranch.x, ranch.y, tileSize, sprites);
    });
    city1Data.fences.forEach((fence) => {
        drawFence(ctx,map,fence.x,fence.y,tileSize,sprites,fence.pattern);
    });

    drawLake(ctx, map, city1Data.lake.x, city1Data.lake.y, tileSize, sprites);
    drawHealer(ctx,map,city1Data.healer.x,city1Data.healer.y,tileSize,sprites);
    drawPlayerHouse(ctx, map, playerHouse.x, playerHouse.y, tileSize, sprites);
    drawPlayer(ctx, player, tileSize, sprites);

    return map;
}

export { drawMap, spritesLoaded };