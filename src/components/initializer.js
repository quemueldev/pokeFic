import { drawHouse, drawHouse2, drawRanch } from "./house";
import { drawPlayer } from "./player/draw";
import drawRoad from "./road.js";
import drawTree from "./trees.js";
import { drawPlant, drawFlower, drawMushroom, drawGrass } from "./vegeta.js";

export default function drawController(){
    return {
        drawHouse,
        drawHouse2,
        drawRanch,
        drawRoad,
        drawPlayer,
        drawTree,
        drawPlant,
        drawFlower,
        drawMushroom,
        drawGrass,
    };
};