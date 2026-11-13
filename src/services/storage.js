
const _createPlayer=()=>{
    const id =crypto.randomUUID()
    localStorage.setItem('player',id)
}
const getPlayer=()=>{
    try{
        return localStorage.getItem('player') || _createPlayer();
    } catch (err){
        console.log("erro no storage",err);
    }
}
export {getPlayer};