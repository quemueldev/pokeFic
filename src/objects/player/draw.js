import { drawParams, getSprite } from "../utils";

function drawPlayer(ctx, player, size, sprites) {
    const sprite = getSprite(sprites, 109);
    const x = (player.renderX ?? player.x);
    const y = (player.renderY ?? player.y);
    if (sprite?.complete && sprite.naturalWidth > 0) {
        ctx.drawImage(...drawParams(sprite, x,y,size));
    }
}

export { drawPlayer };