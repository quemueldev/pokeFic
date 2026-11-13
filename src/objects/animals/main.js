export function isAnimalTile(tileId) {
    return Number.isInteger(tileId) && tileId < 0;
}

export function placeAnimalsOnMap(animals, map) {
    animals.forEach((animal) => {
        const x = Math.round(animal.x);
        const row = map[animal.y];

        if (row && x >= 0 && x < row.length && row[x] === 132) {
            row[x] = animal.mapTileId;
        }
    });
}
