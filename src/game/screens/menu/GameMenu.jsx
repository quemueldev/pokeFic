import { useState } from "react";
import { sprites } from "../../rendering/data/tiles.js";
import { getPokemonStats } from "../../../objects/pokemon/stats.js";
import "./GameMenu.css";


function GameMenu({ onSave, party = [],onClose}) {
    const [page, setPage] = useState("home");

    return (
        <main className="game-menu" aria-label="Menu do jogo">
            <section className="game-menu-panel">
                <header className="game-menu-header">
                    <div>
                        <span className="game-menu-kicker">POKE CHICO / PAUSA</span>
                        <h1>{page === "home" ? "Menu" : "Pokémons"}</h1>
                    </div>
                    <div className="container-btns">
                        <button onClick={()=>onClose()} className="menu-out">Sair</button>
                        <button className="menu-save" onClick={() => onSave()}>Salvar</button>
                    </div>
                </header>

                {page === "home" ? (
                    <button
                        className="menu-option"
                        onClick={() => setPage("pokemons")}
                    >
                        Pokémons
                        <span>›</span>
                    </button>
                ) : (
                    <>
                        <div className="pokemon-list">
                            {party.length === 0 ? (
                                <p className="pokemon-empty">Sua equipe está vazia.</p>
                            ) : party.map((pokemon) => {
                                const sprite = sprites[pokemon.spriteId];
                                const { maxHealth, attack, xpToNextLevel } = getPokemonStats(pokemon);
                                return (
                                    <article className="pokemon-card" key={pokemon.id}>
                                        {sprite?.src && (
                                            <img src={sprite.src} alt="" />
                                        )}
                                        <div className="pokemon-info">
                                            <strong>{pokemon.name}</strong>
                                            <span>Nível {pokemon.level}</span>
                                            <span>
                                                Vida {pokemon.health}/{maxHealth}
                                            </span>
                                            <span>Ataque {attack}</span>
                                            <span>XP {pokemon.xp}/{xpToNextLevel}</span>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                        <button
                            className="menu-back"
                            onClick={() => setPage("home")}
                        >
                            Voltar
                        </button>
                    </>
                )}
            </section>
        </main>
    );
}

export default GameMenu;
