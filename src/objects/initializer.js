// Centraliza os métodos de desenho usados em todos os mapas para facilitar a chamada de cada elemento visual.
import { drawBigHouse, drawHouse, drawHouse2, drawRanch } from "./environment/house.js";
import drawFence from "./environment/fence.js";
import drawLake from "./environment/lake.js";
import { drawPlayer } from "./player/draw";
import drawRoad from "./environment/road.js";
import drawTree from "./environment/trees.js";
import { drawPlant, drawFlower, drawMushroom, drawGrass } from "./environment/vegeta.js";
import { drawAnimal } from "./animals/draw.js";
import { drawHealer } from "./personas/draw.js";

export default function drawController() {
    return {
        drawHouse,
        drawBigHouse,
        drawHouse2,
        drawRanch,
        drawFence,
        drawLake,
        drawRoad,
        drawPlayer,
        drawTree,
        drawPlant,
        drawFlower,
        drawMushroom,
        drawGrass,
        drawAnimal,
        drawHealer,
    };
}