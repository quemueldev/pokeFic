// Controla o estado principal do jogo: câmera, mapa atual, movimentação do jogador e transição entre as telas do mundo.
import handleDraw from "../rendering/drawGame.js";
import { handleMove } from "../../objects/player/moves.js";
import { route1Data } from "../rendering/data/route1.js";
import { city1Data } from "../rendering/data/city1.js";
import { createWildEncounter } from "../../objects/animals/moves.js";
import { playerHouseData } from "../rendering/data/playerHouse.js";
import createGameLoop from "./gameLoop.js";
import { getPokemonStats } from "../../objects/pokemon/stats.js";

export default function controller(canvas, { onEncounter, onMenuChange, onHealerDialog, onChooseChicomon, onInteractionHint, canChooseStarter, player }) {
    // Obtém a função de desenho do mapa e a promessa que indica quando os sprites terminaram de carregar.
    const { drawGame, spritesLoaded } = handleDraw();
    let map = [];
    // Estado do jogador em coordenadas lógicas e de renderização suave.
    let xPlayer = player?.last_x;
    let yPlayer = player?.last_y 
    const playerPosition = { x: xPlayer, y: yPlayer, renderX: xPlayer, renderY: yPlayer };
    const tileSize = 40
    const camera = { x: 0, y: 0 };
    let lastMoveAt = -Infinity;
    const moveCooldown = 150;
    let mapId = player?.last_map;
    let battleActive = false;
    let menuActive = false;
    let healerDialogActive = false;

    const gameLoop = createGameLoop({
        canvas,
        tileSize,
        camera,
        playerPosition,
        drawGame,
        getMap: () => map,
        setMap: (nextMap) => { map = nextMap; },
        getMapId: () => mapId,
        canRun: () => !battleActive,
    });

    function getInteractionHint() {
        if (mapId === 0) {
            const healer = city1Data.healer;
            const distance = Math.abs(playerPosition.x - healer.x) + Math.abs(playerPosition.y - healer.y);
            if (distance <= 1) return "Falar com a curandeira";
        }

        if (mapId === 2 && canChooseStarter?.()) {
            const nearbyPokemon = playerHouseData.pokeChicos.find((pokemon) => (
                Math.abs(playerPosition.x - pokemon.x) + Math.abs(playerPosition.y - pokemon.y) <= 1
            ));
            if (nearbyPokemon) return `Escolher ${nearbyPokemon.name}`;
        }

        return null;
    }

    function updateInteractionHint() {
        onInteractionHint?.(getInteractionHint());
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
            if (isNearPokeChico && canChooseStarter?.()) {
                const chicomon = getPokemonStats(isNearPokeChico)
                console.log('antes de enviar', chicomon)
                onChooseChicomon(chicomon);
            }
            updateInteractionHint();
            
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
        const onGrassEncounter = () => {
            if (mapId !== 1 || Math.random() >= 0.12) return;

            const animal = createWildEncounter(route1Data.animalSpawns);
            if (!animal) return;

            battleActive = true;
            menuActive = false;
            playerPosition.renderX = playerPosition.x;
            playerPosition.renderY = playerPosition.y;
            gameLoop.stop();
            gameLoop.render();
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
            onEnterHouse,
            onGrassEncounter
        );
        if (!moved) return;

        lastMoveAt = now;
        updateInteractionHint();
        if (battleActive) {
            onInteractionHint?.(null);
            return;
        }
        gameLoop.start();
    }

    function handleInput(key) {
        const isSpace = key === "Space";
        keydown({
            key: isSpace ? " " : key,
            code: isSpace ? "Space" : key,
            repeat: false,
            preventDefault() {},
        });
    }

    // Ajusta o tamanho do canvas para a janela e redesenha o mapa.
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameLoop.render();
    }

    resize();
    updateInteractionHint();
    spritesLoaded.then(gameLoop.render).catch((error) => {
        console.error("Não foi possível carregar os sprites do mapa.", error);
    });

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", keydown);

    return {
        render: gameLoop.render,
        handleInput,
        player,
        playerPosition,
        getMapId(){
            return mapId
        },
        finishBattle() {
            battleActive = false;
            gameLoop.render();
            updateInteractionHint();
        },
        closeMenu() {
            if (!menuActive) return;

            menuActive = false;
            onMenuChange(false);
            updateInteractionHint();
            gameLoop.resumeIfNeeded();
        },
        closeHealerDialog() {
            if (!healerDialogActive) return;

            healerDialogActive = false;
            onHealerDialog(false);
            updateInteractionHint();
            gameLoop.resumeIfNeeded();
        },
        refreshInteractionHint: updateInteractionHint,
        cleanup() {
            window.removeEventListener("resize", resize);
            window.removeEventListener("keydown", keydown);
            gameLoop.stop();
        },
    };
}