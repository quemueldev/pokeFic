import { useCallback, useRef, useState } from "react";
import { createPartyMember } from "../../objects/player/party.js";
import { getPokemon, getPokemonStats } from "../../objects/pokemon/stats.js";

export function usePlayerParty() {
    const [party, setParty] = useState([]);
    const partyRef = useRef([]);

    const replaceParty = useCallback((nextParty) => {
        partyRef.current = nextParty;
        setParty(nextParty);
    }, []);

    const loadParty = useCallback((rows) => {
        const loadedParty = rows.flatMap((row) => {
            const species = getPokemon(row.specie);
            if (!species) return [];

            const stats = getPokemonStats(row);
            return [{
                ...species,
                id: row.id,
                databaseId: row.id,
                specie: row.specie,
                level: row.level,
                xp: row.xp,
                maxHealth: stats.maxHealth,
                health: Math.min(
                    Math.max(Number(row.health ?? stats.maxHealth), 0),
                    stats.maxHealth
                ),
                attack: stats.attack,
                spriteId: stats.tile,
            }];
        });

        replaceParty(loadedParty);
        return loadedParty;
    }, [replaceParty]);

    const addPartyMember = useCallback((pokemon) => {
        replaceParty([...partyRef.current, createPartyMember(pokemon)]);
    }, [replaceParty]);

    const healParty = useCallback(() => {
        replaceParty(partyRef.current.map((pokemon) => ({
            ...pokemon,
            health: getPokemonStats(pokemon).maxHealth,
        })));
    }, [replaceParty]);

    return {
        party,
        partyRef,
        loadParty,
        replaceParty,
        addPartyMember,
        healParty,
    };
}