
const _createPlayer=()=>{
    const id =crypto.randomUUID()
    localStorage.setItem('player',id)
    return id;
}

const getPlayer=()=>{
    try{
        return localStorage.getItem('player') || _createPlayer();
    } catch (err){
        console.log("erro no storage",err);
    }
}
export {getPlayer};