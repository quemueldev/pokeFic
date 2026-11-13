import { pokemonSpecies } from "../pokemon/data.js";

function randomBetween(min, max, random) {
    return Math.floor(random() * (max - min + 1)) + min;
}

export function createAnimals(spawnData, random = Math.random) {
    const count = randomBetween(spawnData.minCount, spawnData.maxCount, random);
    const lanes = [...spawnData.lanes];

    for (let index = lanes.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(random() * (index + 1));
        [lanes[index], lanes[swapIndex]] = [lanes[swapIndex], lanes[index]];
    }

    return Array.from({ length: count }, (_, index) => {
        const side = spawnData.sides[randomBetween(0, spawnData.sides.length - 1, random)];
        const species = pokemonSpecies[spawnData.species];
        const minX = side.minX;
        const maxX = side.maxX;

        return {
            id: `chiquito-${index + 1}`,
            ...species,
            type: spawnData.species,
            level: 1,
            xp: 0,
            health: species.baseHealth,
            mapTileId: -(index + 1),
            x: randomBetween(minX, maxX, random),
            y: lanes[index],
            minX,
            maxX,
            speed: spawnData.speed,
            direction: random() < 0.5 ? -1 : 1,
        };
    });
}

export function moveAnimals(animals, deltaTime) {
    animals.forEach((animal) => {
        animal.x += animal.speed * animal.direction * deltaTime;

        if (animal.x >= animal.maxX) {
            animal.x = animal.maxX;
            animal.direction = -1;
        } else if (animal.x <= animal.minX) {
            animal.x = animal.minX;
            animal.direction = 1;
        }
    });
}
