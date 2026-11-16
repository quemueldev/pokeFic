import { pokemonSpecies } from "./data";

export function getPokemonStats(pokemon) {

    const base = getPokemon(pokemon.specie || pokemon.name);
    const levelBonus = Math.max(0, pokemon.level - 1);
    const maxHealth = base.baseHealth + levelBonus * 8;

    return {
        name: pokemon.specie,
        maxHealth,
        attack: base.baseAttack + levelBonus * 2,
        xpToNextLevel: pokemon.level * 50,
        tile: base.spriteId
    };
}
export function getPokemon(name){
    return pokemonSpecies[name]
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
