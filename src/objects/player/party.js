export function createPartyMember(pokemon, { level = 1, xp = 0, health = pokemon.baseHealth } = {}) {
	return {
		...pokemon,
		id: crypto.randomUUID(),
		databaseId: null,
		specie: pokemon.name,
		species: pokemon.name,
		level,
		xp,
		health,
	};
}