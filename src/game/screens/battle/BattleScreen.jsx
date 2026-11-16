import { useState } from "react";
import { getPokemonStats, addExperience } from "../../../objects/pokemon/stats.js";
import { createPartyMember } from "../../../objects/player/party.js";
import BattleActions from "./components/BattleActions.jsx";
import BattleArena from "./components/BattleArena.jsx";
import "./BattleScreen.css";

function BattleScreen({ animal, party, onFinish }) {
    const enemyStats = getPokemonStats(animal);
    const [battleParty, setBattleParty] = useState(() => party.map((member) => ({ ...member })));
    const [activePokemonId, setActivePokemonId] = useState(
        () => party.find((member) => member.health > 0)?.id
    );
    const [enemyHealth, setEnemyHealth] = useState(enemyStats.maxHealth);
    const [message, setMessage] = useState(`Um ${animal.name} apareceu!`);
    const [result, setResult] = useState(null);
    const [waitingForEnemy, setWaitingForEnemy] = useState(false);
    const [xpGained, setXpGained] = useState(0);
    const [updatedPokemon, setUpdatedPokemon] = useState(null);
    const [capturedPokemon, setCapturedPokemon] = useState(null);
    const pokemon = battleParty.find((member) => member.id === activePokemonId);

    function enemyTurn(failureMessage, targetPokemon = pokemon) {
        if (!targetPokemon) return;

        const enemyAttack = getPokemonStats(animal).attack;
        const remainingPlayerHealth = Math.max(0, targetPokemon.health - enemyAttack);
        setBattleParty((currentParty) => currentParty.map((member) => (
            member.id === targetPokemon.id
                ? { ...member, health: remainingPlayerHealth }
                : member
        )));

        if (remainingPlayerHealth === 0) {
            const nextPokemon = battleParty.find(
                (member) => member.id !== targetPokemon.id && member.health > 0
            );

            if (nextPokemon) {
                setActivePokemonId(nextPokemon.id);
                setMessage(`${targetPokemon.name} desmaiou. ${nextPokemon.name} entrou na batalha.`);
                return;
            } else {
                setResult("loss");
                setMessage(`${animal.name} venceu. Sua equipe precisa descansar.`);
                return;
            }
        }

        setMessage(failureMessage);
    }

    function scheduleEnemyTurn(failureMessage) {
        setWaitingForEnemy(true);
        window.setTimeout(() => {
            enemyTurn(failureMessage);
            setWaitingForEnemy(false);
        }, 700);
    }

    function attack() {
        if (result || waitingForEnemy || !pokemon || pokemon.health <= 0) return;

        const playerStats = getPokemonStats(pokemon);
        const damage = Math.max(1, playerStats.attack + Math.floor(Math.random() * 4));
        const remainingEnemyHealth = Math.max(0, enemyHealth - damage);
        setEnemyHealth(remainingEnemyHealth);

        if (remainingEnemyHealth === 0) {
            const experience = animal.xpReward;
                const hurtPokemon = { ...pokemon };
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

        scheduleEnemyTurn(
            `${pokemon.name} causou ${damage} de dano. ` +
            `${animal.name} respondeu com ${getPokemonStats(animal).attack} de dano.`
        );
    }

    function handleCapture() {
        setCapturedPokemon(createPartyMember(animal, { health: enemyHealth }));
        setResult("captured");
        setMessage(`${animal.name} foi capturado!`);
    }

    function switchPokemon(nextPokemonId) {
        if (result) return;

        const nextPokemon = battleParty.find((member) => member.id === nextPokemonId);
        if (!nextPokemon || nextPokemon.health <= 0 || nextPokemon.id === pokemon?.id) return;

        setActivePokemonId(nextPokemon.id);
        setMessage(`${nextPokemon.name} entrou na batalha.`);
    }

    function finishBattle(fled) {
        const finalParty = battleParty.map((member) => (
            member.id === updatedPokemon?.id ? updatedPokemon : member
        ));

        onFinish({
            party: finalParty,
            pokemon: updatedPokemon ?? pokemon,
            defeated: result === "win",
            capturedPokemon,
            removeAnimal: result === "win" || result === "captured",
            fled,
        });
    }

    return (
        <main className="battle-screen" aria-label="Tela de batalha">
            <section className="battle-panel">
                <header className="battle-header">
                    <span>ENCONTROU {enemyStats.name}</span>
                    <h1>Batalha</h1>
                </header>

                <BattleArena
                    animal={animal}
                    pokemon={pokemon}
                    enemyHealth={enemyHealth}
                    playerHealth={pokemon.health}
                />

                <div className="battle-dialog" aria-live="polite">
                    <p>{message}</p>
                    <BattleActions
                        result={result}
                        waitingForEnemy={waitingForEnemy}
                        xpGained={xpGained}
                        pokemon={pokemon}
                        party={battleParty}
                        enemyHealth={enemyHealth}
                        maxEnemyHealth={enemyStats.maxHealth}
                        onAttack={attack}
                        onCapture={handleCapture}
                        onCaptureFailure={() => scheduleEnemyTurn(`A captura falhou! ${animal.name} atacou.`)}
                        onSwitch={switchPokemon}
                        onFlee={() => finishBattle(true)}
                        onContinue={() => finishBattle(false)}
                    />
                </div>
            </section>
        </main>
    );
}

export default BattleScreen;
