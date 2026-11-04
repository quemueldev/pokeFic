const width = 70;
const height = 40;
const entranceX = 30;

function getRoadCenter(y) {
    if (y < 8) return entranceX;
    if (y < 15) return entranceX - 1;
    if (y < 23) return entranceX;
    if (y < 31) return entranceX + 1;
    return entranceX;
}

const trees = [];
for (let y = 3; y < height - 5; y += 3) {
    const rowOffset = y % 2 === 0 ? 0 : 2;

    for (let x = 2 + rowOffset; x < width - 2; x += 4) {
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
for (let y = 4; y < height - 5; y += 6) {
    for (let x = 4; x < width - 4; x += 7) {
        const roadCenter = getRoadCenter(y);
        if (Math.abs(x - roadCenter) < 4) continue;

        const variation = (x * 13 + y * 17) % 4;
        if (variation === 0) plants.push({ x, y });
        if (variation === 1) flowers.push({ x, y });
    }
}

export const route1Data = {
    width,
    height,
    entrance: { x: entranceX, y: 0 },
    returnEntrance,
    start,
    roadCenterAt: getRoadCenter,
    trees,
    plants,
    flowers,
};
