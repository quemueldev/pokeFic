import { sprites } from "../../../rendering/data/tiles.js";
import HealthBar from "./HealthBar.jsx";

function BattleArena({ animal, pokemon, enemyHealth, playerHealth }) {
    const enemySprite = sprites[animal.spriteId];
    const playerSprite = sprites[pokemon.spriteId];

    return (
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
    );
}

export default BattleArena;