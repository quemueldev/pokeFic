import { setMapTile } from "../utils.js";

// Define os padrões de tiles das casas e ranchos para desenhar prédios no mapa e bloquear o caminho em volta deles.
const houseTiles = [
    [180, 181, 181, 183, 182],
    [192, 193, 195, 193, 194],
    [204, 205, 217, 205, 207],
];
const playerHouseTiles = [
    [180, 181, 181, 183, 182],
    [192, 193, 195, 193, 194],
    [204, 205, 218, 219, 207],
];

const ranchTiles = [
    [93, 94, 95],
    [105, 106, 107],
    [117, 118, 119],
    [102, 91, 104],
    [114, 127, 116],
];
const house2Tiles = [
    [184, 185, 185, 187, 186],
    [196, 197, 199, 197, 198],
    [208, 220, 221, 209, 211],
];

const tinyHouseTiles = [
    [180,  181, 182],
    [192, 195,  194],
    [205,217, 207],
]
const houseTowerTiles = [
    [180,181,182],
    [192, 193, 194],
    [204,  216, 205],
    [204,  205,  205],
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
export function drawBigHouse(ctx, x, y, size, sprites, mapa){
    _drawStructure(ctx, mapa, x, y, size, sprites, houseTowerTiles);
    _drawStructure(ctx, mapa, x+3, y+1, size, sprites, tinyHouseTiles);
}
export function drawPlayerHouse(ctx,map,x, y, size, sprites){
    _drawStructure(ctx,map,x,y,size,sprites, playerHouseTiles)
}

function _drawStructure(ctx, mapa, x, y, size, sprites, tiles) {
    _placeHouse(x, y, mapa, tiles);

    // Desenha cada tile da estrutura no canvas, criando o desenho da casa/rancho em sua localização no mapa.
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
    // Atualiza a matriz do mapa para que a construção seja tratada como obstáculo e não seja atravessada pelo jogador.
    for (let row = 0; row < tiles.length; row++) {
        for (let col = 0; col < tiles[row].length; col++) {
            setMapTile(mapa, x + col, y + row, tiles[row][col]);
        }
    }
}
