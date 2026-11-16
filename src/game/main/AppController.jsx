// Controla o estado principal do jogo: câmera, mapa atual, movimentação do jogador e transição entre as telas do mundo.
import handleDraw from "../rendering/drawGame.js";
import { handleMove } from "../../objects/player/moves.js";
import { route1Data } from "../rendering/data/route1.js";
import { city1Data } from "../rendering/data/city1.js";
import { createAnimals } from "../../objects/animals/moves.js";
import { playerHouseData } from "../rendering/data/playerHouse.js";
import createGameLoop from "./gameLoop.js";

export default function controller(canvas, { onEncounter, onMenuChange, onHealerDialog, onChooseChicomon, player }) {
    // Obtém a função de desenho do mapa e a promessa que indica quando os sprites terminaram de carregar.
    const { drawGame, spritesLoaded } = handleDraw();
    let map = [];
    const animals = createAnimals(route1Data.animalSpawns);


    // Estado do jogador em coordenadas lógicas e de renderização suave.
    let xPlayer = player?.last_x;
    let yPlayer = player?.last_y 
    const playerPosition = { x: xPlayer, y: yPlayer, renderX: xPlayer, renderY: yPlayer };
    const tileSize = 25;
    const camera = { x: 0, y: 0 };
    let lastMoveAt = -Infinity;
    const moveCooldown = 150;
    let mapId = player?.last_map;
    let battleActive = false;
    let menuActive = false;
    let healerDialogActive = false;
    let encounterAnimal = null;

    const gameLoop = createGameLoop({
        canvas,
        tileSize,
        camera,
        playerPosition,
        animals,
        drawGame,
        getMap: () => map,
        setMap: (nextMap) => { map = nextMap; },
        getMapId: () => mapId,
        canRun: () => !battleActive,
    });

    // Detecta as teclas do teclado, evita movimento muito rápido e troca de mapa ao entrar em portas/entradas.
    function keydown(event) {
        if (event.code === "Space" && !battleActive) {
            event.preventDefault();
            if (event.repeat || menuActive || healerDialogActive) return;

            const healer = city1Data.healer;

            const isNearHealer =
                mapId === 0 &&
                Math.abs(playerPosition.x - healer.x) +
                    Math.abs(playerPosition.y - healer.y) <=1;
            

            const pokeChicos = playerHouseData.pokeChicos

            const isNearPokeChico = 
            //retorna qual esta perto
                mapId === 2 ?
                pokeChicos.find(obj =>{
                    return (  
                        Math.abs(playerPosition.x - obj.x) +
                        Math.abs(playerPosition.y - obj.y) <= 1
                    )
                }) : null
            if (isNearHealer) {
                healerDialogActive = true;
                onHealerDialog(true);
            }; 
            if (isNearPokeChico){
                onChooseChicomon(isNearPokeChico);
            }
            
            gameLoop.stop();
            return;
        }

        if (event.key.toLowerCase() === "e" && !battleActive) {
            event.preventDefault();
            if (event.repeat) return;

            if (healerDialogActive) return;

            if (menuActive) {
                menuActive = false;
                onMenuChange(false);
                gameLoop.resumeIfNeeded();
                return;
            }

            menuActive = true;
            onMenuChange(true);

            gameLoop.stop();
            return;
        }

        if (battleActive || menuActive || healerDialogActive) return;
        if (event.key.startsWith("Arrow")) event.preventDefault();

        const now = performance.now();
        if (now - lastMoveAt < moveCooldown) return;

        if (event.key.toLowerCase() === 'r'){
            onHealerDialog(false)
            onChooseChicomon(false)
            onMenuChange(false)
        }
        const onEnterMap=()=>{
            const destination = mapId === 0 ? route1Data.start : city1Data.returnStart;
            mapId = mapId === 0 ? 1 : 0;
            playerPosition.x = destination.x;
            playerPosition.y = destination.y;
            playerPosition.renderX = destination.x;
            playerPosition.renderY = destination.y;
        }
        const onAnimalColision=({tileId})=>{
            console.log('entrou aq')
            const animal = animals.find((entry) => entry.mapTileId === tileId);
            if (!animal) return;

            battleActive = true;
            menuActive = false;
            encounterAnimal = animal;
            gameLoop.stop();
            onEncounter(animal);
        }
        const onEnterHouse=()=>{
            const destination = mapId === 0 ? playerHouseData.start : city1Data.returnHouseStart;
            mapId = mapId === 0 ? 2: 0;
            //destination ta undefined
            playerPosition.x = destination.x;
            playerPosition.y = destination.y;
        }

        const moved = handleMove(
            event.key,
            map,
            playerPosition,
            onEnterMap,
            onAnimalColision,
            onEnterHouse
        );
        if (!moved) return;

        lastMoveAt = now;
        gameLoop.start();
    }

    // Ajusta o tamanho do canvas para a janela e redesenha o mapa.
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameLoop.render();
    }

    resize();
    spritesLoaded.then(gameLoop.render).catch((error) => {
        console.error("Não foi possível carregar os sprites do mapa.", error);
    });

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", keydown);

    return {
        render: gameLoop.render,
        player,
        playerPosition,
        getMapId(){
            return mapId
        },
        finishBattle(removeAnimal) {
            if (removeAnimal && encounterAnimal) {
                const animalIndex = animals.findIndex(
                    (animal) => animal.id === encounterAnimal.id
                );
                if (animalIndex !== -1) animals.splice(animalIndex, 1);
            }

            encounterAnimal = null;
            battleActive = false;
            gameLoop.render();

            if (mapId === 1 && !gameLoop.isRunning()) {
                gameLoop.start();
            }
        },
        closeMenu() {
            if (!menuActive) return;

            menuActive = false;
            onMenuChange(false);
            gameLoop.resumeIfNeeded();
        },
        closeHealerDialog() {
            if (!healerDialogActive) return;

            healerDialogActive = false;
            onHealerDialog(false);
            gameLoop.resumeIfNeeded();
        },
        cleanup() {
            window.removeEventListener("resize", resize);
            window.removeEventListener("keydown", keydown);
            gameLoop.stop();
        },
    };
}