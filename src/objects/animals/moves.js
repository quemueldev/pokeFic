import { pokemonSpecies } from "../pokemon/data.js";

let encounterId = 0;

export function createWildEncounter(spawns, random = Math.random) {
    const weightedSpecies = Object.values(spawns)
        .map((spawn) => ({
            species: pokemonSpecies[spawn.species],
            weight: Math.max(1, (spawn.minCount + spawn.maxCount) / 2),
        }))
        .filter((entry) => entry.species);
    const totalWeight = weightedSpecies.reduce((total, entry) => total + entry.weight, 0);

    if (totalWeight === 0) return null;

    let selection = random() * totalWeight;
    const chosen = weightedSpecies.find((entry) => {
        selection -= entry.weight;
        return selection < 0;
    }) ?? weightedSpecies.at(-1);
    const species = chosen.species;

    return {
        ...species,
        id: `wild-${++encounterId}`,
        specie: species.name,
        type: species.name,
        level: 1,
        xp: 0,
        health: species.baseHealth,
    };
}
