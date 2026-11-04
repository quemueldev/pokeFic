

export default function drawTree(ctx,map, x, y, size, sprites, treeSize = 1) {

    const sprite = sprites[160];
    const spriteSize = [
        sprites[136],sprites[148]
    ]

    const placeTreeTile = (tileX, tileY, tileId) => {
        if (map[tileY] && tileX >= 0 && tileX < map[tileY].length) {
            map[tileY][tileX] = tileId;
        }
    };
    
    if (!sprite?.complete || sprite.naturalWidth === 0) {
        return;
    }
    if (treeSize ==1){
        placeTreeTile(x, y, 160);
        ctx.drawImage(
        sprite,
        x * size,
        y * size,
        size,
        size
      )
    } else{
        for (let i=0; i< 2; i++){
            const sprite = spriteSize[i]
            placeTreeTile(x, y + i, i === 0 ? 136 : 148);
            ctx.drawImage(
            sprite,
            x * size,
            (y+i) * size ,
            size,
            size
        )
        }
        
    }
    
   
}