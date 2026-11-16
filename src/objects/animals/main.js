export function isAnimalTile(tileId) {
    return Number.isInteger(tileId) && tileId < 0;
}

export function placeAnimalsOnMap(animals, map) {
    animals.forEach((animal) => {
        const x = Math.round(animal.x);
        const cells = [];

        for (let offsetY = 0; offsetY < 2; offsetY++) {
            for (let offsetX = 0; offsetX < 2; offsetX++) {
                const cellX = x + offsetX;
                const cellY = animal.y + offsetY;
                const row = map[cellY];

                if (!row || cellX < 0 || cellX >= row.length || row[cellX] !== 132) {
                    return;
                }

                cells.push({ row, x: cellX });
            }
        }

        cells.forEach(({ row, x: cellX }) => {
            row[cellX] = animal.mapTileId;
        });
    });
}
