function PartySwitch({ party, activePokemonId, onSwitch }) {
    const availablePokemon = party.filter(
        (member) => member.id !== activePokemonId && member.health > 0
    );

    if (availablePokemon.length === 0) return null;

    return (
        <div className="battle-switches" aria-label="Trocar Pokémon">
            {availablePokemon.map((member) => (
                <button key={member.id} onClick={() => onSwitch(member.id)}>
                    {member.name} ({member.health} PV)
                </button>
            ))}
        </div>
    );
}

export default PartySwitch;