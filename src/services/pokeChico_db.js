
import { supabaseFetch } from "./decorator";

export const saveParty = async (id_player, party) => {
    try {
        if (!Array.isArray(party) || party.length === 0) {
            console.log("A party está vazia!");
            return;
        }

        const responses = await Promise.all(
            party.map(async (chicomon) => {
                const isSaved = chicomon.databaseId != null;
                const endpoint = isSaved
                    ? `pokechicos?id=eq.${encodeURIComponent(chicomon.databaseId)}&id_player=eq.${encodeURIComponent(id_player)}`
                    : "pokechicos";
                const response = await supabaseFetch(endpoint, {
                    method: isSaved ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Prefer: "return=representation"
                    },
                    body: JSON.stringify({
                        id_player: id_player,
                        specie: chicomon.name,
                        level: chicomon.level,
                        xp: chicomon.xp,
                        health: chicomon.health
                    })
                });

                const responseText = await response.text();

                console.log("Status:", response.status);
                console.log("Resposta:", responseText);

                if (!response.ok) {
                    throw new Error(responseText);
                }

                const data = responseText ? JSON.parse(responseText) : [];
                if (!isSaved && data[0]?.id != null) {
                    chicomon.databaseId = data[0].id;
                }

                return data;
            })
        );

        console.log("Party salva:", responses);

    } catch (erro) {
        console.log("Erro ao salvar party:", erro);
    }
};
export const getParty=async(id)=>{
    
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
