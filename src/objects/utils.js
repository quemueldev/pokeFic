const getSprite = (sprites, tileId) => {
    const sprite = sprites[tileId];
    if (!sprite?.complete || sprite.naturalWidth === 0) {
        return;
    }
    return sprite;
};

function drawParams(sprite, x, y, size) {
    return [
        sprite,
        x * size,
        y * size,
        size,
        size
    ];
}

function setMapTile(map, x, y, tileId) {
    if (!Array.isArray(map) || !Number.isInteger(x) || !Number.isInteger(y)) {
        return false;
    }

    const row = map[y];
    if (!row || x < 0 || x >= row.length) {
        return false;
    }

    row[x] = tileId;
    return true;
}

function seededRandom(seed) {
    let value = seed;

    return function () {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
    };
}

function generateRandomPositions(amount, seed) {
    const random = seededRandom(seed);
    const positions = [];

    for (let i = 0; i < amount; i++) {
        positions.push({
            x: Math.floor(random() * 69),
            y: Math.floor(random() * 39)
        });
    }

    return positions;
}

export { getSprite, drawParams, setMapTile, generateRandomPositions };