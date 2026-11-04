import handleDraw from "../rendering/drawGame.js";
import { handleMove } from "../../components/player/moves.js";
import { route1Data } from "../rendering/data/route1.js";
import { city1Data } from "../rendering/data/city1.js";


export default function controller(canvas) {
    const { drawGame, spritesLoaded } = handleDraw();
    let map = [];
    const playerPosition = { x: 3, y: 5, renderX: 3, renderY: 5 };
    const tileSize = 25;
    const camera = { x: 0, y: 0 };
    let animationFrame = null;
    let previousFrameTime = null;
    let lastMoveAt = -Infinity;
    const moveCooldown = 150;
    let mapId = 0

    function render() {
        if (map.length > 0) {
            const viewportWidth = Math.ceil(canvas.width / tileSize);
            const viewportHeight = Math.ceil(canvas.height / tileSize);
            camera.x = Math.max(
                0,
                Math.min(
                    playerPosition.renderX - Math.floor(viewportWidth / 2),
                    map[0].length - viewportWidth
                )
            );
            camera.y = Math.max(
                0,
                Math.min(
                    playerPosition.renderY - Math.floor(viewportHeight / 2),
                    map.length - viewportHeight
                )
            );
        }

        map = drawGame(canvas, tileSize, playerPosition, camera, mapId);
    }
    //tendi prr nenhuma peguei da ia
    //separar para entender dps
    function animate(timestamp) {
        const deltaTime = previousFrameTime === null
            ? 0
            : Math.min((timestamp - previousFrameTime) / 1000, 0.3);
        previousFrameTime = timestamp;

        const interpolation = 1 - Math.exp(-18 * deltaTime);
        playerPosition.renderX += (playerPosition.x - playerPosition.renderX) * interpolation;
        playerPosition.renderY += (playerPosition.y - playerPosition.renderY) * interpolation;

        const settled =
            Math.abs(playerPosition.x - playerPosition.renderX) < 0.001 &&
            Math.abs(playerPosition.y - playerPosition.renderY) < 0.001;

        if (settled) {
            playerPosition.renderX = playerPosition.x;
            playerPosition.renderY = playerPosition.y;
        }

        render();

        if (settled) {
            animationFrame = null;
            previousFrameTime = null;
        } else {
            animationFrame = requestAnimationFrame(animate);
        }
    }

    function keydown(event) {
        if (event.key.startsWith("Arrow")) event.preventDefault();
        

        const now = performance.now();
        if (now - lastMoveAt < moveCooldown) return;
      

        const moved = handleMove(event.key, map, playerPosition, () => {
            const destination = mapId === 0 ? route1Data.start : city1Data.returnStart;
            mapId = mapId === 0 ? 1 : 0;
            playerPosition.x = destination.x;
            playerPosition.y = destination.y;
            playerPosition.renderX = destination.x;
            playerPosition.renderY = destination.y;
        });
        if (!moved) return;

        lastMoveAt = now;
        if (animationFrame === null) {
            previousFrameTime = null;
            animationFrame = requestAnimationFrame(animate);
        }
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    }
    
    resize();
    spritesLoaded.then(render).catch((error) => {
        console.error("Não foi possível carregar os sprites do mapa.", error);
    });

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", keydown);

    return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("keydown", keydown);
        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
        }
    };
}