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

export { getSprite, drawParams, setMapTile };