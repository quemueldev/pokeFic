
import { supabaseFetch } from "./decorator";

export const saveParty = async (id_player, party) => {
    if (!Array.isArray(party)) 
        return { ok: false, error: new Error("A party está inválida.") };

    try {
        for (const pokemon of party) {
            const isSaved = pokemon.databaseId != null;
            const endpoint = isSaved
                ? `pokechicos?id=eq.${encodeURIComponent(pokemon.databaseId)}&id_player=eq.${encodeURIComponent(id_player)}`
                : "pokechicos";
            const health = Number(pokemon.health ?? pokemon.baseHealth ?? pokemon.maxHealth ?? 50);
            const response = await supabaseFetch(endpoint, {
                method: isSaved ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Prefer: "return=representation"
                },
                body: JSON.stringify({
                    id_player,
                    specie: pokemon.name ?? pokemon.specie ?? "Piloco",
                    level: pokemon.level ?? 1,
                    xp: pokemon.xp ?? 0,
                    health: Number.isFinite(health) ? health : 50,
                })
            });
            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(`Supabase ${response.status}: ${responseText}`);
            }

            const data = responseText ? JSON.parse(responseText) : [];
            if (!isSaved && data[0]?.id != null) pokemon.databaseId = data[0].id;
        }

        return { ok: true };
    } catch (error) {
        console.error("Erro ao salvar party:", error);
        return { ok: false, error };
    }
};

export const getParty = async (id) => {

    try {
        const response = await supabaseFetch(
            `pokechicos?id_player=eq.${id}&select=*`
        )
        if (!response.ok) throw new Error('Erro ao buscar player')
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
        return []
    }
}
