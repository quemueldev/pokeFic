// Controla o estado principal do jogo: câmera, mapa atual, movimentação do jogador e transição entre as telas do mundo.
import handleDraw from "../rendering/drawGame.js";
import { handleMove } from "../../objects/player/moves.js";
import { route1Data } from "../rendering/data/route1.js";
import { city1Data } from "../rendering/data/city1.js";
import { createAnimals, moveAnimals } from "../../objects/animals/moves.js";

export default function controller(canvas, { onEncounter, onMenuChange, onHealerDialog }) {
    // Obtém a função de desenho do mapa e a promessa que indica quando os sprites terminaram de carregar.
    const { drawGame, spritesLoaded } = handleDraw();
    let map = [];
    const animals = createAnimals(route1Data.animalSpawns);

    // Estado do jogador em coordenadas lógicas e de renderização suave.
    const playerPosition = { x: 10, y: 10, renderX: 10, renderY: 10 };
    const tileSize = 25;
    const camera = { x: 0, y: 0 };
    let animationFrame = null;
    let previousFrameTime = null;
    let lastMoveAt = -Infinity;
    const moveCooldown = 150;
    let mapId = 0;
    let battleActive = false;
    let menuActive = false;
    let healerDialogActive = false;
    let encounterAnimal = null;

    function render() {
        // Ajusta a câmera para manter o jogador centralizado e evitar que a tela ultrapasse os limites do mapa.
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

        // Redesenha o mapa com a câmera e o personagem na nova posição.
        map = drawGame(canvas, tileSize, playerPosition, camera, mapId, animals);
    }

    function resumeAnimationIfNeeded() {
        const playerIsMoving =
            Math.abs(playerPosition.x - playerPosition.renderX) >= 0.001 ||
            Math.abs(playerPosition.y - playerPosition.renderY) >= 0.001;

        if (animationFrame === null && (mapId === 1 || playerIsMoving)) {
            previousFrameTime = null;
            animationFrame = requestAnimationFrame(animate);
        }
    }

    // Anima a movimentação do personagem usando interpolação suave para criar o efeito de transição entre tiles.
    function animate(timestamp) {
        if (battleActive) {
            animationFrame = null;
            return;
        }

        const deltaTime = previousFrameTime === null
            ? 0
            : Math.min((timestamp - previousFrameTime) / 1000, 0.3);
        previousFrameTime = timestamp;

        if (mapId === 1) {
            moveAnimals(animals, deltaTime);
        }

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

        if (settled && mapId !== 1) {
            animationFrame = null;
            previousFrameTime = null;
        } else {
            animationFrame = requestAnimationFrame(animate);
        }
    }

    // Detecta as teclas do teclado, evita movimento muito rápido e troca de mapa ao entrar em portas/entradas.
    function keydown(event) {
        if (event.code === "Space" && !battleActive) {
            event.preventDefault();
            if (event.repeat || menuActive || healerDialogActive) return;

            const healer = city1Data.healer;
            const isNearHealer =
                mapId === 0 &&
                Math.abs(playerPosition.x - healer.x) +
                    Math.abs(playerPosition.y - healer.y) <=
                    1;

            if (!isNearHealer) return;

            healerDialogActive = true;
            onHealerDialog(true);
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
                previousFrameTime = null;
            }
            return;
        }

        if (event.key.toLowerCase() === "e" && !battleActive) {
            event.preventDefault();
            if (event.repeat) return;

            if (healerDialogActive) return;

            if (menuActive) {
                menuActive = false;
                onMenuChange(false);
                resumeAnimationIfNeeded();
                return;
            }

            menuActive = true;
            onMenuChange(true);

            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
                previousFrameTime = null;
            }
            return;
        }

        if (battleActive || menuActive || healerDialogActive) return;
        if (event.key.startsWith("Arrow")) event.preventDefault();

        const now = performance.now();
        if (now - lastMoveAt < moveCooldown) return;

        const moved = handleMove(
            event.key,
            map,
            playerPosition,
            () => {
                const destination = mapId === 0 ? route1Data.start : city1Data.returnStart;
                mapId = mapId === 0 ? 1 : 0;
                playerPosition.x = destination.x;
                playerPosition.y = destination.y;
                playerPosition.renderX = destination.x;
                playerPosition.renderY = destination.y;
            },
            ({ tileId }) => {
                const animal = animals.find((entry) => entry.mapTileId === tileId);
                if (!animal) return;

                battleActive = true;
                menuActive = false;
                encounterAnimal = animal;
                if (animationFrame !== null) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
                onEncounter(animal);
            }
        );
        if (!moved) return;

        lastMoveAt = now;
        if (animationFrame === null) {
            previousFrameTime = null;
            animationFrame = requestAnimationFrame(animate);
        }
    }

    // Ajusta o tamanho do canvas para a janela e redesenha o mapa.
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

    return {
        finishBattle(removeAnimal) {
            if (removeAnimal && encounterAnimal) {
                const animalIndex = animals.findIndex(
                    (animal) => animal.id === encounterAnimal.id
                );
                if (animalIndex !== -1) animals.splice(animalIndex, 1);
            }

            encounterAnimal = null;
            battleActive = false;
            previousFrameTime = null;
            render();

            if (mapId === 1 && animationFrame === null) {
                animationFrame = requestAnimationFrame(animate);
            }
        },
        closeMenu() {
            if (!menuActive) return;

            menuActive = false;
            onMenuChange(false);
            resumeAnimationIfNeeded();
        },
        closeHealerDialog() {
            if (!healerDialogActive) return;

            healerDialogActive = false;
            onHealerDialog(false);
            resumeAnimationIfNeeded();
        },
        cleanup() {
            window.removeEventListener("resize", resize);
            window.removeEventListener("keydown", keydown);
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }
        },
    };
}