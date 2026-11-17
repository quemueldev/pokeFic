import CaptureButton from "../CaptureButton.jsx";
import PartySwitch from "./PartySwitch.jsx";

function BattleActions({
    result,
    waitingForEnemy,
    xpGained,
    pokemon,
    moves,
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
            <div className="battle-move-grid">
                {result ? (
                    <button className="battle-command continue-command" onClick={onContinue}>
                        <span className="move-category">RESULTADO</span>
                        <span className="move-name">Continuar{xpGained ? ` (+${xpGained} XP)` : ""}</span>
                    </button>
                ) : waitingForEnemy ? (
                    <span className="battle-wait-message" role="status">Turno do adversário...</span>
                ) : (
                    moves.map((move) => (
                            <button
                                className={`battle-command move-${move.type === "magia" ? "magic" : "physical"}`}
                                key={move.id}
                                onClick={() => onAttack(move)}
                            >
                                <span className="move-category">
                                    {move.type === "magia" ? "MAGIA" : "CORPO A CORPO"}
                                </span>
                                {move.name}
                                <span className="move-power">POD. {move.power}</span>
                            </button>
                    ))
                )}
            </div>
            {!result && !waitingForEnemy && (
                <div className="battle-utility-actions">
                        <CaptureButton
                            enemyHealth={enemyHealth}
                            maxHealth={maxEnemyHealth}
                            onCapture={onCapture}
                            onFailure={onCaptureFailure}
                        />
                        <button className="battle-utility-button" onClick={onFlee}>
                            Fugir
                        </button>
                </div>
            )}
            {!result && (
                <div className="battle-party-row">
                    <span>RESERVA</span>
                    <PartySwitch
                        party={party}
                        activePokemonId={pokemon.id}
                        onSwitch={onSwitch}
                    />
                </div>
            )}
        </div>
    );
}

export default BattleActions;