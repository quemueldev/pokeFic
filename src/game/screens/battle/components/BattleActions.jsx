import CaptureButton from "../CaptureButton.jsx";
import PartySwitch from "./PartySwitch.jsx";

function BattleActions({
    result,
    waitingForEnemy,
    xpGained,
    pokemon,
    party,
    enemyHealth,
    maxEnemyHealth,
    onAttack,
    onCapture,
    onCaptureFailure,
    onSwitch,
    onFlee,
    onContinue,
}) {
    return (
        <div className="battle-controls">
            <div className="battle-actions">
                {result ? (
                    <button onClick={onContinue}>
                        Continuar{xpGained ? ` (+${xpGained} XP)` : ""}
                    </button>
                ) : waitingForEnemy ? (
                    <span className="battle-turn-message">Turno do adversário...</span>
                ) : (
                    <>
                        <button onClick={onAttack}>{pokemon.name} atacar</button>
                        <CaptureButton
                            enemyHealth={enemyHealth}
                            maxHealth={maxEnemyHealth}
                            onCapture={onCapture}
                            onFailure={onCaptureFailure}
                        />
                        <button className="secondary" onClick={onFlee}>
                            Fugir
                        </button>
                    </>
                )}
            </div>
            {!result && (
                <PartySwitch
                    party={party}
                    activePokemonId={pokemon.id}
                    onSwitch={onSwitch}
                />
            )}
        </div>
    );
}

export default BattleActions;