const _validateSprite= (sprite)=>{
    if (!sprite?.complete || sprite.naturalWidth === 0) {
        return;
    }
}
export function drawFlower(ctx, map, x,y,size,sprites){
    const sprite = sprites[134]
    _validateSprite(sprite)

    ctx.drawImage(
        sprite,
        x*size,
        y*size,
        size,
        size
    )
}
export function drawPlant(ctx, map, x,y,size,sprites){
   
    const sprite = sprites[149]
    _validateSprite(sprite)

    ctx.drawImage(
        sprite,
        x*size,
        y*size,
        size,
        size
    )
}
export function drawMushroom(ctx, map, x,y,size,sprites){
   
    const sprite = sprites[161]
    _validateSprite(sprite)

    ctx.drawImage(
        sprite,
        x*size,
        y*size,
        size,
        size
    )
}
export function drawGrass(ctx, map, x,y,size,sprites){
   
    const sprite = sprites[133]
    map[y][x]
    _validateSprite(sprite)

    ctx.drawImage(
        sprite,
        x*size,
        y*size,
        size,
        size
    )
}