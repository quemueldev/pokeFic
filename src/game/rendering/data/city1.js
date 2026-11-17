
// Define a cidade 1, incluindo dimensões do mapa, casas, árvores e pontos de entrada/saída para a rota.
import {  bigHouse1Fence, roadFence } from "../../../objects/environment/fence.js";
import { generateRandomPositions } from "../../../objects/utils.js";

const fences = [
    //{ id: "fence1", x: 5, y: 12, pattern: fencePattern },
    {x:28, y:15, pattern: bigHouse1Fence},
    {x:3, y:11, pattern: roadFence }
];

export const city1Data = {
    width: 70,
    height: 40,
    entrance: { x: 30, y: 0 },
    returnStart: { x: 30, y: 1 },
    returnHouseStart: {x:37,y: 8},
    healer: { x: 25, y: 8 },
    lake: { x: 6, y: 14 },
    fences,
};

// Localiza as construções principais da cidade.
const houses = [
   {x: 3, y : 5},
    {x:22, y: 5},
   // {x:4, y:292}
];
const bigHouse =[
    {x :28, y :12},
    {x:40, y:4},
    {x:9, y:4}
]
const houses2 =[
    {x:16, y:5},
    {x:35, y:13},
    {x:47, y:5}
];
const ranches =[
   // {x: 10, y: 3}
];
const playerHouse = {x:34, y : 5}

// Gera uma cerca de árvores ao redor do mapa para emoldurar o cenário urbano.
const trees = [
    
];
for (let i = 0; i < 70; i++) {
    if (i <= 28 || i >= 32) {
        trees.push({ x: i, y: 0, size: 2 });
    }
    trees.push({ x: i, y: 39, size: 2 });
    // Lateral esquerda
    trees.push({ x: 0, y: i, size: 2 });

    // Lateral direita
    trees.push({ x: 69, y: i, size: 2 });
}


const plants = generateRandomPositions(33, 456);
const flowers = generateRandomPositions(300, 456);
const mushrooms = generateRandomPositions(20, 456);
const grasses = generateRandomPositions(600, 321);


export { 
    trees, houses, plants, flowers, 
    mushrooms, grasses, houses2, ranches,
    bigHouse, playerHouse
};