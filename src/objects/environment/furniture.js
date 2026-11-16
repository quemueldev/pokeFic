import { getSprite, drawParams, setMapTile } from "../utils.js";
//tornar essas fn global

export function drawBed(ctx, map, x, y, size, sprites) {
    setMapTile(map, x, y, 490);
    const sprite = getSprite(sprites, 490);
    if (sprite) ctx.drawImage(...drawParams(sprite, x, y, size));
}
export function drawRug(ctx, map,x,y,size, sprites){
     for (let i = 0; i < 2; i++) {
            const tileId = i === 0 ? 488 : 489;
            const sprite = sprites[tileId]
            
            setMapTile(map, x, y + i, tileId);
            if (sprite) {
                ctx.drawImage(...drawParams(sprite, x+i, y, size));
            }
        }
}
//export function draw