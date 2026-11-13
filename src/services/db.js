import { getPlayer } from "./storage"
import { supabaseFetch } from "./decorator";


export const getPlayerOrCreate = async ()=>{
    if (await getPlayerData()){
        console.log('caiu aq', await getPlayerData())
        return getPlayerData();
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
    console.log('texto', await resp.text())
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