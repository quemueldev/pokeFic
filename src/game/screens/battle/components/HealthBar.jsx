import { getPokemonStats } from "../../../../objects/pokemon/stats.js";

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

export default HealthBar;