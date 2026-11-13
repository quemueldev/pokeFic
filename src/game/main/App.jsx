// Componente principal da tela do jogo: cria o canvas do mapa e inicia o controlador de input/renderização quando a tela é montada.
import { useEffect, useRef, useState } from "react";
import "./App.css";
import controller from "./AppController.jsx";
import BattleScreen from "../screens/battle/BattleScreen.jsx";
import GameMenu from "../screens/menu/GameMenu.jsx";
import { playerParty } from "../../objects/player/party.js";
import { getPokemonStats } from "../../objects/pokemon/stats.js";
import { getPlayerOrCreate } from "../../services/db.js";

function App() {

    getPlayerOrCreate()
    const canvasRef = useRef(null);
    const gameRef = useRef(null);
    const [encounter, setEncounter] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [healerDialog, setHealerDialog] = useState(null);
    const [party, setParty] = useState(() => playerParty.map((pokemon) => ({ ...pokemon })));

    useEffect(() => {
        const game = controller(canvasRef.current, {
            onEncounter: setEncounter,
            onMenuChange: setMenuOpen,
            onHealerDialog: (isOpen) => setHealerDialog(isOpen ? "offer" : null),
        });
        gameRef.current = game;

        return () => {
            game.cleanup();
            gameRef.current = null;
        };
    }, []);

    function finishBattle(outcome) {
        setParty((currentParty) => currentParty.map((pokemon) => (
            pokemon.id === outcome.pokemon.id ? outcome.pokemon : pokemon
        )));
        gameRef.current?.finishBattle(outcome.defeated);
        setEncounter(null);
    }

    function healParty() {
        setParty((currentParty) =>
            currentParty.map((pokemon) => ({
                ...pokemon,
                health: getPokemonStats(pokemon).maxHealth,
            }))
        );
        setHealerDialog("healed");
    }

    function closeMenu() {
        gameRef.current?.closeMenu();
    }

    function closeHealerDialog() {
        gameRef.current?.closeHealerDialog();
    }

    return (
        <>
            <canvas ref={canvasRef} className="game-canvas" />
            {encounter && (
                <BattleScreen
                    key={encounter.id}
                    animal={encounter}
                    pokemon={party[0]}
                    onFinish={finishBattle}
                />
            )}
            {menuOpen && !encounter && (
                <GameMenu party={party} onClose={closeMenu} />
            )}
            {healerDialog && (
                <section className="healer-dialog" role="dialog" aria-modal="true" aria-labelledby="healer-title">
                    <div className="healer-dialog-panel">
                        <h1 id="healer-title">Curandeira</h1>
                        <p>
                            {healerDialog === "offer"
                                ? "Quer que eu recupere a vida de toda a sua equipe?"
                                : "Pronto! Seus Pokémon estão com a vida cheia."}
                        </p>
                        {healerDialog === "offer" ? (
                            <div className="healer-dialog-actions">
                                <button onClick={healParty}>Curar equipe</button>
                                <button className="secondary" onClick={closeHealerDialog}>Agora não</button>
                            </div>
                        ) : (
                            <button onClick={closeHealerDialog}>Continuar</button>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}

export default App;
