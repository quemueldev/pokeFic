export function getPokemonStats(pokemon) {
    const levelBonus = Math.max(0, pokemon.level - 1);
    const maxHealth = pokemon.baseHealth + levelBonus * 8;

    return {
        maxHealth,
        attack: pokemon.baseAttack + levelBonus * 2,
        xpToNextLevel: pokemon.level * 100,
    };
}

export function addExperience(pokemon, amount) {
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
