import { getPlayer } from "./storage"
import { supabaseFetch } from "./decorator";
import { saveParty } from "./pokeChico_db";



export const saveGame = async(id,x,y,map,party)=>{
    console.log('pelo menos cheogu')
    try{
        const partyResult = await saveParty(id, party);
        if (!partyResult.ok) return partyResult;
        await updateLocalization(id, x, y,map);
        return partyResult;
    } catch (err){
        console.log('weeoe',err)
        return { ok: false, error: err };
    }
}
export const updateLocalization = async (id, x, y, mapId) => {
    try {
        console.log("Entrou no update", x, y, mapId);

        const response = await supabaseFetch(
            `player?id=eq.${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Prefer": "return=representation"
                },
                body: JSON.stringify({
                    last_x: x,
                    last_y: y,
                    last_map: mapId
                })
            }
        );

        console.log("Status:", response.status);
        console.log("Resposta:", await response.text());

    } catch (error) {
        console.log("Erro no update:", error);
    }
};

export const getPlayerOrCreate = async ()=>{
    const id = getPlayer();
    const existingPlayer = await getPlayerData(id);
    if (existingPlayer) return existingPlayer;

    const response = await supabaseFetch(
        'player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },
            body: JSON.stringify({
                id,
            })
        }
    );
    if (!response.ok) throw new Error('Erro ao criar player');

    const data = await response.json();
    return data[0] ?? { id };
}

const getPlayerData = async (id) => {
    try {
        const response = await supabaseFetch(
            `player?id=eq.${id}&select=*`
        )
        if (!response.ok) throw new Error('Erro ao buscar player')
        const data = await response.json()
        if (data.length > 0) return data[0] || null
        return null
    } catch (err) {
        console.log(err)
        return null
    }
}