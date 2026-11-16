// Monta o cenário da cidade principal, incluindo casas, árvores, grama, rua e acesso ao mapa da rota.
import { sprites, spritesLoaded } from "./data/tiles.js";

import drawController from "../../objects/initializer.js";
import { playerHouseData } from "./data/playerHouse.js";
import { setMapTile } from "../../objects/utils.js";
import { drawBed, drawRug } from "../../objects/environment/furniture.js";

function _drawGround(ground, ctx, tamanho, canvasWidth, canvasHeight) {

     for (let y = 0; y <canvasHeight; y++) {
        for (let x = 0; x < canvasWidth; x++) {
            const tileId = ground[y][x];
            const sprite=sprites[tileId]

            if (sprite?.complete && sprite.naturalWidth > 0) {
                ctx.drawImage(
                    sprite,
                    x * tamanho,
                    y * tamanho,
                    tamanho,
                    tamanho
                );
            }
        }
    } 
}


function drawPlayerHome(ctx, tileSize, canvas, player) {
    // Cria uma matriz vazia da cidade, preenchida inicialmente por terreno comum (grama/chão).
    const ground = Array.from(
        { length: playerHouseData.size.height },
        () => Array(playerHouseData.size.widht).fill(474)
    );
   

    _drawGround(ground, ctx, tileSize, ground[0].length, ground.length);
    const {
        drawPlayer
    } = drawController()
    const start = [471,472]
    start.forEach((tileId, index) => {
        const x = playerHouseData.start.x - 1 + index;
        const sprite = sprites[tileId];
        setMapTile(ground, x, playerHouseData.start.y+1, tileId);

        if (sprite?.complete && sprite.naturalWidth > 0) {
            ctx.drawImage(
                sprite,
                x * tileSize,
                (playerHouseData.start.y+1) * tileSize,
                tileSize,
                tileSize
            );
        }
    }); 
    drawBed(ctx,ground,playerHouseData.bed.x, playerHouseData.bed.y, tileSize, sprites);
    drawRug(ctx, ground, 3,3 ,tileSize, sprites)
    drawPlayer(ctx, player, tileSize, sprites);

    //as pokenbolas
    
    playerHouseData.pokeChicos?.forEach(poke =>{
        const sprite = sprites[491]
        setMapTile(ground,poke.x,poke.y, 491)
        ctx.drawImage(sprite,poke.x*tileSize, poke.y*tileSize, tileSize, tileSize)
    })
    

    return ground;
}

export { drawPlayerHome, spritesLoaded };