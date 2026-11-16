import { getPlayer } from "./storage"
import { supabaseFetch } from "./decorator";
import { saveParty } from "./pokeChico_db";



export const saveGame = async(id,x,y,map,party)=>{
    console.log('pelo menos cheogu')
    try{
        await saveParty(id, party);
        await updateLocalization(id, x, y,map);
    } catch (err){
        console.log('weeoe',err)
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
    if (await getPlayerData()){
        const data = await getPlayerData();
       // console.log('caiu aq', data)
        return data
    }
    const resp = await supabaseFetch(
        'player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },
            body: JSON.stringify({
                id: getPlayer(),
            })
        }
    )
    return resp
}

const getPlayerData = async () => {
    try {
        const id = getPlayer()
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