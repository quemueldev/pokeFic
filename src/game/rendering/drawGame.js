// Seleciona qual mapa será desenhado na tela e centraliza a renderização do jogo em um único ponto de entrada.
import { spritesLoaded } from "./data/tiles.js";
import { drawMap as drawCity1 } from "./drawCity1.js";
import { drawPlayerHome } from "./drawPlayerHome.js";
import drawRoute1 from "./drawRoute1.js";

export default function HandleDraw() {
    // Desenha o mapa atual, limpando a tela e aplicando a deslocamento da câmera antes de renderizar.
    function drawGame(canvas, tileSize, player, camera, mapId) {
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(
            -Math.round(camera.x * tileSize),
            -Math.round(camera.y * tileSize)
        );

        let map;
        switch (mapId) {
            case 0:
                map = drawCity1(ctx, tileSize, camera, canvas, player);
                break;
            case 1:
                map = drawRoute1(ctx, tileSize, camera, canvas, player);
                break;
            case 2:
                map = drawPlayerHome(ctx,tileSize,canvas,player);
                break;
            default:
                map = drawCity1(ctx, tileSize, camera, canvas, player);
                break;
        }

        ctx.restore();

        return map;
    }

    return { drawGame, spritesLoaded };
}
