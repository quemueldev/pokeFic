export function createPartyMember(pokemon, options = {}) {
	const level = options.level ?? 1;
	const xp = options.xp ?? 0;
	const health = Number(
		options.health ?? pokemon.health ?? pokemon.baseHealth ?? pokemon.maxHealth ?? 50
	);
	const speciesName = pokemon.name || pokemon.specie;

	return {
		...pokemon,
		id: crypto.randomUUID(),
		databaseId: null,
		name: speciesName,
		specie: speciesName,
		species: speciesName,
		level,
		xp,
		health: Number.isFinite(health) ? health : 50,
	};
}