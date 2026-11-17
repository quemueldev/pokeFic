// Controla a movimentação do jogador em tiles, validando limites, colisões e portas de transição entre mapas.
import { fenceTileIds } from "../environment/fence.js";

const blockedTiles = [
    180, 181, 182, 183,
    192, 193, 194, 195,
    204, 205, 207, 217,
    184, 185, 186, 187,
    196, 197, 198, 199,
    208, 209, 211, 220, 221,
    91, 93, 94, 95, 102, 104,
    105, 106, 107, 114, 116, 117, 118, 119, 127,
    136, 160, 148,
    108,
    301,302,300,283,284,282, 
    ...fenceTileIds,
    491,
];
const entrances = [201, 202, 203];

const houseDoor = [471, 472];
const houseEntrance = [218,219];

export function handleMove(key, map, player, onEnterMap, onEnterHouse, onGrassEncounter) {
    if (!map.length || !map[0].length) return;

    const width = map[0].length;
    const height = map.length;
    const direction = key.toLowerCase();

    let nextX = player.x;
    let nextY = player.y;

    switch (direction) {
        case "w":
        case "arrowup":
            nextY--;
            break;

        case "s":
        case "arrowdown":
            nextY++;
            break;

        case "a":
        case "arrowleft":
            nextX--;
            break;

        case "d":
        case "arrowright":
            nextX++;
            break;

        default:
            return;
    }

    // Impede que o personagem saia dos limites do mapa.
    if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
        return;
    }

    const tileId = map[nextY][nextX];
    // Entradas de mapa ficam nas bordas; tiles iguais dentro do cenário podem ser aberturas.
    if (
        entrances.includes(tileId) &&
        (nextY === 0 || nextY === height - 1)
    ) {
        onEnterMap?.(tileId);
        return true;
    }
    if (houseEntrance.includes(tileId) || houseDoor.includes(tileId)){
        onEnterHouse?.(tileId)
        return true;
    }

    // Bloqueia a passagem por objetos ou construções que não podem ser atravessadas.
    if (blockedTiles.includes(tileId)) {
        return;
    }

    player.x = nextX;
    player.y = nextY;
    if (tileId === 39) onGrassEncounter?.();
    return true;
}