import { attacks, pokemonSpecies } from "./data";

export function getPokemonStats(pokemon) {
    console.log(pokemon)

    const base = getPokemon(pokemon);
    const levelBonus = Math.max(0, pokemon.level - 1);
    const maxHealth = base.baseHealth + levelBonus * 8;
    console.log('aqui',base, pokemon)
    return {
        name: pokemon.specie || base.name,
        maxHealth,
        attack: base.baseAttack + levelBonus * 2,
        moves: base.attacks.map((attackId) => ({ id: attackId, ...attacks[attackId] })),
        xpToNextLevel: pokemon.level * 50,
        tile: base.spriteId || pokemon.spriteId
    };
}
export function getPokemon(name){
    const speciesName = typeof name === "string" ? name : name?.specie || name?.name;
    if (speciesName) return pokemonSpecies[speciesName];

    const speciesId = typeof name === "number" ? name : name?.id;
    return Object.values(pokemonSpecies).find((species) => species.id === speciesId);
}

export function addExperience(pokemon, amount) {
    console.log('vem receber xp ', pokemon)
        console.log('amount ', amount)

    let updated = { ...pokemon, xp: pokemon.xp + amount };
    let stats = getPokemonStats(updated);
    let leveledUp = false;

    while (updated.xp >= stats.xpToNextLevel) {
        updated.xp -= stats.xpToNextLevel;
        updated.level += 1;
        updated.health += 8;
        leveledUp = true;
        stats = getPokemonStats(updated);
    }

    updated.maxHealth = stats.maxHealth;
    updated.health = Math.min(updated.health, updated.maxHealth);

    return { pokemon: updated, leveledUp };
}
