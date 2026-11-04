const blockedTiles = [
    180, 181, 182, 183,
    192, 193, 194, 195,
    204, 205, 207, 217,
    184, 185, 186, 187,
    196, 197, 198, 199,
    208, 209, 211, 220, 221,
    91, 93, 94, 95, 102, 104,
    105, 106, 107, 114, 116, 117, 118, 119, 127,
    136,160,148
];
const entrances = [201, 202, 203];


export function handleMove(key, map, player, onEnterMap) {
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
    // Limites do mapa
    if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
        return;
    }

    // Colisão
    if (blockedTiles.includes(map[nextY][nextX])) {
        return;
    }
    if (entrances.includes(map[nextY][nextX])) {
        onEnterMap?.(map[nextY][nextX]);
        return true;
    }

    player.x = nextX;
    player.y = nextY;
    return true;
}