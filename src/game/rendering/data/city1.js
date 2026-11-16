
// Define a cidade 1, incluindo dimensões do mapa, casas, árvores e pontos de entrada/saída para a rota.
import {  bigHouse1Fence, roadFence } from "../../../objects/environment/fence.js";

const fences = [
    //{ id: "fence1", x: 5, y: 12, pattern: fencePattern },
    {id: "fence2", x:28, y:15, pattern: bigHouse1Fence},
    {id:'roadFence', x:3, y:11, pattern: roadFence }
];

export const city1Data = {
    width: 70,
    height: 40,
    entrance: { x: 30, y: 0 },
    returnStart: { x: 30, y: 1 },
    returnHouseStart: {x:37,y: 8},
    healer: { x: 25, y: 7 },
    lake: { x: 6, y: 14 },
    fences,
};

// Localiza as construções principais da cidade.
const houses = [
   {x: 4, y : 5},
    {x:20, y: 5},
   // {x:4, y:292}
];
const bigHouse =[
    {x :28, y :12}
]
const houses2 =[
    {x:14, y:5},
    {x:28, y:22}
];
const ranches =[
    {x: 10, y: 3}
];
const playerHouse = {x:34, y : 5}

// Gera uma cerca de árvores ao redor do mapa para emoldurar o cenário urbano.
const trees = [
    {x: 0, y: 0, size: 2},
    {x: 0, y: 1, size: 2},
    {x: 0, y: 2, size: 2},
    {x: 0, y: 3, size: 2},
    {x: 0, y: 4, size: 2},
    {x: 0, y: 5, size: 2},
    {x: 0, y: 6, size: 2},
    {x: 0, y: 7, size: 2},
    {x: 0, y: 8, size: 2},
    {x: 0, y: 9, size: 2},
    {x: 0, y: 10, size: 2},
    {x: 0, y: 11, size: 2},
    {x: 0, y: 12, size: 2},
    {x: 0, y: 13, size: 2},
    {x: 0, y: 14, size: 2},
    {x: 0, y: 15, size: 2},
    {x: 0, y: 16, size: 2},
    {x: 0, y: 17, size: 2},
    {x: 0, y: 18, size: 2},
    {x: 0, y: 19, size: 2},
    {x: 0, y: 20, size: 2},
    {x: 0, y: 21, size: 2},
    {x: 0, y: 22, size: 2},
    {x: 0, y: 23, size: 2},
    {x: 0, y: 24, size: 2},
    {x: 0, y: 25, size: 2},
    {x: 0, y: 26, size: 2},
    {x: 0, y: 27, size: 2},
    {x: 0, y: 28, size: 2},
    {x: 0, y: 29, size: 2},
    {x: 0, y: 30, size: 2},
    {x: 0, y: 31, size: 2},
    {x: 0, y: 32, size: 2},
    {x: 0, y: 33, size: 2},
    {x: 0, y: 34, size: 2},
    {x: 0, y: 35, size: 2},
    {x: 0, y: 36, size: 2},
    {x: 0, y: 37, size: 2},
    {x: 0, y: 38, size: 2},
    {x: 0, y: 39, size: 2},
    {x: 0, y: 40, size: 2},

    {x: 1, y: 0, size: 2},
    {x: 2, y: 0, size: 2},
    {x: 3, y: 0, size: 2},
    {x: 4, y: 0, size: 2},
    {x: 5, y: 0, size: 2},
    {x: 6, y: 0, size: 2},
    {x: 7, y: 0, size: 2},
    {x: 8, y: 0, size: 2},
    {x: 9, y: 0, size: 2},
    {x: 10, y: 0, size: 2},
    {x: 11, y: 0, size: 2},
    {x: 12, y: 0, size: 2},
    {x: 12, y: 0, size: 2},
    {x: 13, y: 0, size: 2},
    {x: 14, y: 0, size: 2},
    {x: 15, y: 0, size: 2},
    {x: 16, y: 0, size: 2},
    {x: 17, y: 0, size: 2},
    {x: 18, y: 0, size: 2},
    {x: 19, y: 0, size: 2},
    {x: 20, y: 0, size: 2},
    {x: 21, y: 0, size: 2},
    {x: 22, y: 0, size: 2},
    {x: 23, y: 0, size: 2},
    {x: 24, y: 0, size: 2},
    {x: 25, y: 0, size: 2},
    {x: 26, y: 0, size: 2},
    {x: 27, y: 0, size: 2},
    {x: 28, y: 0, size: 2},

    {x: 32, y: 0, size: 2},
    {x: 33, y: 0, size: 2},
    {x: 34, y: 0, size: 2},
    {x: 35, y: 0, size: 2},
    {x: 36, y: 0, size: 2},
    {x: 37, y: 0, size: 2},
    {x: 38, y: 0, size: 2},
    {x: 39, y: 0, size: 2},
    {x: 40, y: 0, size: 2},
    {x: 41, y: 0, size: 2},
];

const plants = [];
const flowers = [];
const mushrooms = [];
const grasses = [];

export { 
    trees, houses, plants, flowers, 
    mushrooms, grasses, houses2, ranches,
    bigHouse, playerHouse
};