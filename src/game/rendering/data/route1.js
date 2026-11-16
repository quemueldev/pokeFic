// Define a geometria e os elementos decorativos da rota 1, como árvores, flores, plantas e a posição inicial do jogador.
const width = 70;
const height = 40;
const entranceX = 30;

// Calcula a posição central da rua em cada linha da rota para fazer o caminho seguir em curva.
function getRoadCenter(y) {
    if (y < 8) return entranceX;
    if (y < 15) return entranceX - 1;
    if (y < 23) return entranceX;
    if (y < 31) return entranceX + 1;
    return entranceX;
}

// Gera árvores ao redor da estrada, com variações para dar um visual mais natural.
const trees = [];
for (let y = 3; y < height - 5; y += 3) {
    // Mantém um intervalo de 10 linhas sem árvores no centro da rota para abrir o caminho.
    const emptyRangeStart = 14;
    const emptyRangeEnd = 22;
    if (y >= emptyRangeStart && y <= emptyRangeEnd) continue;

    const rowOffset = y % 2 === 0 ? 0 : 2;

    for (let x = 2 + rowOffset; x < width - 2; x += 6) {
        const roadCenter = getRoadCenter(y);
        const variation = (x * 7 + y * 11) % 5;

        if (Math.abs(x - roadCenter) > 5 && variation !== 0) {
            trees.push({ x, y, size: 2 });
        }
    }
}

const start = { x: entranceX, y: height - 2 };
const returnEntrance = { x: entranceX, y: height - 1 };
const treeBarrierY = start.y;
for (let x = 2; x < width - 2; x++) {
    if (Math.abs(x - entranceX) > 2) {
        trees.push({ x, y: treeBarrierY, size: 2 });
    }
}

const plants = [];
const flowers = [];

// Distribui plantas e flores em posições que não bloqueiam a estrada.
for (let y = 4; y < height - 5; y += 6) {
    for (let x = 4; x < width - 4; x += 7) {
        const roadCenter = getRoadCenter(y);
        if (Math.abs(x - roadCenter) < 4) continue;

        const variation = (x * 13 + y * 17) % 4;
        if (variation === 0) plants.push({ x, y });
        if (variation === 1) flowers.push({ x, y });
    }
}
const caranga = {
    minCount: 2,
    maxCount: 6,
    lanes: [14, 15, 17, 18, 19, 20, 21],
    sides: [
        { minX: 5, maxX: 22 },
        { minX: 38, maxX: 65 },
    ],
    speed: 1.5,
    species: "Caranga", //o erro e que tava com c maiosculo
}
const carcaraptor = {
    minCount: 1,
    maxCount: 3,
    lanes: [10, 13, 21, 23, 25, 26],
    sides: [
        { minX: 10, maxX: 18 },
        { minX: 44, maxX: 62 },
    ],
    speed: 1.5,
    species: "Carcaraptor", 
}
const gatorio = {
    minCount: 1,
    maxCount: 2,
    lanes: [11, 12, 22, 24,],
    sides: [
        { minX: 10, maxX: 18 },
        { minX: 44, maxX: 62 },
    ],
    speed: 1.5,
    species: "Gatorio", 
}
const patochos = {
    minCount: 1,
    maxCount: 1,
    lanes: [28],
    sides: [
        { minX: 10, maxX: 18 },
        { minX: 44, maxX: 62 },
    ],
    speed: 1.5,
    species: "Patocha", 
}
const pilocos = {
    minCount: 2,
    maxCount: 4,
    lanes: [8, 9, 21,],
    sides: [
        { minX: 10, maxX: 18 },
        { minX: 44, maxX: 62 },
    ],
    speed: 1.5,
    species: "Piloco", 
}

export const route1Data = {
    width,
    height,
    entrance: { x: entranceX, y: 0 },
    returnEntrance,
    start,
    animalSpawns: { 
        caranga: caranga, 
        carcaraptor: carcaraptor,
        gatochas: gatorio,
        patochos: patochos,
        pilocos:pilocos
    },
    roadCenterAt: getRoadCenter,
    trees,
    plants,
    flowers,
};
