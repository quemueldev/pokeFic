const houseTiles = [
    [180, 181, 181, 183, 182],
    [192, 193, 195, 193, 194],
    [204, 205, 217, 205, 207],
]
const ranchTiles =[
    [93, 94, 95],
    [105, 106,107],
    [117, 118, 119],
    [102, 91, 104],
    [114, 127, 116]
]
const house2Tiles = [
    [184,185,185,187,186],
    [196,197, 199,197,198],
    [208, 220,221,209,211]
]

export function drawHouse(ctx, x, y, size, sprites, mapa) {
    _drawStructure(ctx, mapa, x, y, size, sprites, houseTiles);
}

export function drawRanch(ctx, map, x, y, size, sprites) {
    _drawStructure(ctx, map, x, y, size, sprites, ranchTiles);
}

export function drawHouse2(ctx, map, x, y, size, sprites) {
    _drawStructure(ctx, map, x, y, size, sprites, house2Tiles);
}

function _drawStructure(ctx, mapa, x, y, size, sprites, tiles) {
    _placeHouse(x, y, mapa, tiles);

    for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < tiles[row].length; col++) {
            const sprite = sprites[tiles[row][col]];
            if (!sprite?.complete || sprite.naturalWidth === 0) {
                continue;
            }

            ctx.drawImage(
                sprite,
                (x + col) * size,
                (y + row) * size,
                size,
                size
            );
        }
    }
}

function _placeHouse(x, y, mapa, tiles) {
    for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < tiles[row].length; col++) {
            const mapRow = mapa[y + row];
            if (mapRow && x + col >= 0 && x + col < mapRow.length) {
                mapRow[x + col] = tiles[row][col];
            }
        }
    }
}
