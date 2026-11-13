import { pokemonSpecies } from "../pokemon/data.js";

const starter = pokemonSpecies.chiquito;

export const playerParty = [
    {
        id: "starter-chiquito",
        ...starter,
        species: "chiquito",
        level: 1,
        xp: 0,
        health: starter.baseHealth,
    },
];
//trocar por dados do banco