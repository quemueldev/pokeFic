import { useState } from "react";
import { sprites } from "../../rendering/data/tiles.js";
import { getPokemonStats, addExperience } from "../../../objects/pokemon/stats.js";
import "./BattleScreen.css";

function HealthBar({ pokemon, health, label }) {
    const { maxHealth } = getPokemonStats(pokemon);

    return (
        <div className="battle-status">
            <div className="battle-name">
                <strong>{pokemon.name}</strong>
                <span>NV. {pokemon.level}</span>
            </div>
            <div
                className="health-track"
                role="progressbar"
                aria-label={`Vida ${label}`}
                aria-valuemin={0}
                aria-valuemax={maxHealth}
                aria-valuenow={health}
            >
                <span
                    className="health-fill"
                    style={{ width: `${(health / maxHealth) * 100}%` }}
                />
            </div>
            <span className="health-label">{health}/{maxHealth}</span>
        </div>
    );
}

function BattleScreen({ animal, pokemon, onFinish }) {
    const enemyStats = getPokemonStats(animal);
    const [playerHealth, setPlayerHealth] = useState(pokemon.health);
    const [enemyHealth, setEnemyHealth] = useState(enemyStats.maxHealth);
    const [message, setMessage] = useState(`Um ${animal.name} apareceu!`);
    const [result, setResult] = useState(null);
    const [xpGained, setXpGained] = useState(0);
    const [updatedPokemon, setUpdatedPokemon] = useState(null);
    const playerSprite = sprites[pokemon.spriteId];
    const enemySprite = sprites[animal.spriteId];

    function attack() {
        if (result) return;

        const playerStats = getPokemonStats(pokemon);
        const damage = Math.max(1, playerStats.attack + Math.floor(Math.random() * 4));
        const remainingEnemyHealth = Math.max(0, enemyHealth - damage);
        setEnemyHealth(remainingEnemyHealth);

        if (remainingEnemyHealth === 0) {
            const experience = animal.xpReward;
            const hurtPokemon = { ...pokemon, health: playerHealth };
            const { pokemon: nextPokemon, leveledUp } = addExperience(hurtPokemon, experience);
            setXpGained(experience);
            setUpdatedPokemon(nextPokemon);
            setResult("win");
            setMessage(
                leveledUp
                    ? `${pokemon.name} venceu e subiu para o nível ${nextPokemon.level}!`
                    : `${pokemon.name} venceu! Ganhou ${experience} XP.`
            );
            return;
        }

        const enemyAttack = getPokemonStats(animal).attack;
        const remainingPlayerHealth = Math.max(0, playerHealth - enemyAttack);
        setPlayerHealth(remainingPlayerHealth);

        if (remainingPlayerHealth === 0) {
            setResult("loss");
            setMessage(`${animal.name} venceu. ${pokemon.name} precisa descansar.`);
        } else {
            setMessage(
                `${pokemon.name} causou ${damage} de dano. ` +
                `${animal.name} respondeu com ${enemyAttack} de dano.`
            );
        }
    }

    function finishBattle(fled) {
        onFinish({
            pokemon: updatedPokemon ?? { ...pokemon, health: playerHealth },
            defeated: result === "win",
            fled,
        });
    }

    return (
        <main className="battle-screen" aria-label="Tela de batalha">
            <section className="battle-panel">
                <header className="battle-header">
                    <span>ENCONTRO</span>
                    <h1>Batalha</h1>
                </header>

                <div className="battle-arena">
                    <div className="battle-opponent">
                        <HealthBar pokemon={animal} health={enemyHealth} label="adversário" />
                        {enemySprite?.src && (
                            <img className="battle-animal enemy-sprite" src={enemySprite.src} alt={animal.name} />
                        )}
                    </div>
                    <div className="battle-player">
                        {playerSprite?.src && (
                            <img className="battle-animal player-sprite" src={playerSprite.src} alt={pokemon.name} />
                        )}
                        <HealthBar pokemon={pokemon} health={playerHealth} label="do jogador" />
                    </div>
                </div>

                <div className="battle-dialog" aria-live="polite">
                    <p>{message}</p>
                    <div className="battle-actions">
                        {result ? (
                            <button onClick={() => finishBattle(false)}>
                                Continuar{xpGained ? ` (+${xpGained} XP)` : ""}
                            </button>
                        ) : (
                            <>
                                <button onClick={attack}>{pokemon.name} atacar</button>
                                <button className="secondary" onClick={() => finishBattle(true)}>
                                    Fugir
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default BattleScreen;
