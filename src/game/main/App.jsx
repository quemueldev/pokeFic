// Componente principal da tela do jogo: cria o canvas do mapa e inicia o controlador de input/renderização quando a tela é montada.
import { useEffect, useRef, useState } from "react";
import "./App.css";
import controller from "./AppController.jsx";
import BattleScreen from "../screens/battle/BattleScreen.jsx";
import GameMenu from "../screens/menu/GameMenu.jsx";
import VirtualDPad from "./VirtualDPad.jsx";
import { getPlayerOrCreate, saveGame } from "../../services/db.js";
import ChooseChicomonScreen from "../screens/chooseChicomon/choose.jsx";
import { getParty } from "../../services/pokeChico_db.js";
import { usePlayerParty } from "./usePlayerParty.js";
import { playerHouseData } from "../rendering/data/playerHouse.js";
import { createPartyMember } from "../../objects/player/party.js";

function App() {

    const canvasRef = useRef(null);
    const gameRef = useRef(null);
    const [encounter, setEncounter] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [healerDialog, setHealerDialog] = useState(null);
    const [battleNotice, setBattleNotice] = useState(false);
    const [interactionHint, setInteractionHint] = useState(null);
    const { party, partyRef, loadParty, replaceParty, healParty: healTeam } = usePlayerParty();

    const [chooseChicomon, setChicomon] = useState(null);
    
    useEffect(() => {
    let game;
    let cancelled = false;

    

    async function initGame() {
        const player = await getPlayerOrCreate();

        
        const partyData = await getParty(player?.id);

        if (cancelled) return;
        const loadedParty = loadParty(partyData);
        if (loadedParty.length > 0) {
            playerHouseData.pokeChicos.length = 0;
        }


        if (cancelled || !canvasRef.current) return;

        game = controller(canvasRef.current, {
            onEncounter: (animal) => {
                if (!partyRef.current.some((member) => member.health > 0)) {
                    setBattleNotice(true);
                    requestAnimationFrame(() => gameRef.current?.finishBattle(false));
                    return;
                }

                setEncounter(animal);
            },
            onMenuChange: setMenuOpen,
            onHealerDialog: (isOpen) => setHealerDialog(isOpen ? "offer" : null),
            onChooseChicomon: setChicomon,
            onInteractionHint: setInteractionHint,
            canChooseStarter: () => partyRef.current.length === 0,
            player
        });

        gameRef.current = game;
    }

    initGame();

    return () => {
        cancelled = true;
        game?.cleanup();
        gameRef.current = null;
    };
}, [loadParty, partyRef]);

    function finishBattle(outcome) {
        const nextParty = [...outcome.party];
        if (outcome.capturedPokemon) {
            nextParty.push(outcome.capturedPokemon);
        }

        replaceParty(nextParty);
        gameRef.current?.finishBattle(outcome.removeAnimal);
        setEncounter(null);
    }

    async function chooseStarter(pokemon) {
        if (partyRef.current.length > 0) {
            throw new Error("Você já tem um Pokémon na party.");
        }

        const game = gameRef.current;
        if (!game?.player?.id) throw new Error("O jogador ainda não foi carregado.");

        const nextParty = [...partyRef.current, createPartyMember(pokemon)];

        const { playerPosition } = game;
        const result = await saveGame(
            game.player.id,
            playerPosition.x,
            playerPosition.y,
            game.getMapId(),
            nextParty
        );
        if (!result.ok) throw result.error;

        replaceParty(nextParty);
        loadParty(nextParty)
        gameRef.current.render()
        gameRef.current.refreshInteractionHint()
    }
    //localStorage.clear()
    
    function heal() {
        healTeam();
        setHealerDialog("healed");
    }

    
    async function save() {
        const game = gameRef.current;
        if (!game?.player) return;

        const { playerPosition } = game;
        const result = await saveGame(
            game.player.id,
            playerPosition.x,
            playerPosition.y,
            game.getMapId(),
            partyRef.current
        );
        if (result.ok) game.closeMenu();
    }

    function closeHealerDialog() {
        gameRef.current?.closeHealerDialog();
    }

    function closeMenu() {
        gameRef.current?.closeMenu();
    }

    return (
        <div className="game-container">
        
            <canvas ref={canvasRef} className="game-canvas" />
            {!menuOpen && !encounter && !healerDialog && !chooseChicomon && !battleNotice && (
                <VirtualDPad
                    onDirection={(direction) => gameRef.current?.handleInput(direction)}
                    interactionHint={interactionHint}
                    onInteract={() => gameRef.current?.handleInput("Space")}
                />
            )}
            {interactionHint && !menuOpen && !encounter && !healerDialog && !chooseChicomon && !battleNotice && (
                <div className="interaction-hint" role="status" aria-live="polite">
                    <kbd>ESPAÇO</kbd>
                    <span>{interactionHint}</span>
                </div>
            )}
            {encounter && (
                <BattleScreen
                    key={encounter.id}
                    animal={encounter}
                    party={party}
                    onFinish={finishBattle}
                />
            )}
            {battleNotice && (
                <section className="healer-dialog" role="alertdialog" aria-modal="true" aria-labelledby="battle-notice-title">
                    <div className="healer-dialog-panel">
                        <h1 id="battle-notice-title">Equipe sem Pokémon saudável</h1>
                        <p>Procure a curandeira antes de enfrentar outro animal.</p>
                        <button onClick={() => setBattleNotice(false)}>Continuar</button>
                    </div>
                </section>
            )}
            {menuOpen && !encounter && (
                <GameMenu onSave={save} party={party} onClose={closeMenu} />
            )}
            {healerDialog && (
                <section className="healer-dialog" role="dialog" aria-modal="true" aria-labelledby="healer-title">
                    <div className="healer-dialog-panel">
                        <span className="healer-kicker">CENTRO POKÉMON</span>
                        <h1 id="healer-title">Curandeira</h1>
                        <p>
                            {healerDialog === "offer"
                                ? "Quer que eu recupere a vida de toda a sua equipe?"
                                : "Pronto! Seus Pokémon estão com a vida cheia."}
                        </p>
                        {healerDialog === "offer" ? (
                            <div className="healer-dialog-actions">
                                <button onClick={heal}>Curar equipe</button>
                                <button className="secondary" onClick={closeHealerDialog}>Agora não</button>
                            </div>
                        ) : (
                            <button onClick={closeHealerDialog}>Continuar</button>
                        )}
                    </div>
                </section>
            )}
            {chooseChicomon && party.length === 0 && (
                <ChooseChicomonScreen
                    chooseChicomon={chooseChicomon}
                    onChoose={chooseStarter}
                    onClose={() => setChicomon(false)}
                    onRender={()=>gameRef.current?.render()}
                />
            )}
                        
    </div>
    );
}

export default App;
