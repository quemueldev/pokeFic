import { useEffect, useRef } from "react";
import "./VirtualDPad.css";
// ia que fez dps de eu perguntar um modelo
function VirtualDPad({ onDirection, interactionHint, onInteract }) {
    const repeatTimer = useRef(null);

    function stopRepeating() {
        if (repeatTimer.current !== null) {
            window.clearInterval(repeatTimer.current);
            repeatTimer.current = null;
        }
    }

    function startDirection(event, direction) {
        event.preventDefault();
        stopRepeating();
        onDirection(direction);
        repeatTimer.current = window.setInterval(() => onDirection(direction), 170);
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    useEffect(() => stopRepeating, []);

    function directionButton(direction, label, symbol, position) {
        return (
            <button
                aria-label={label}
                className={`virtual-dpad-button ${position}`}
                key={direction}
                onPointerDown={(event) => startDirection(event, direction)}
                onPointerUp={stopRepeating}
                onPointerCancel={stopRepeating}
                onLostPointerCapture={stopRepeating}
                type="button"
            >
                {symbol}
            </button>
        );
    }

    return (
        <nav className="mobile-controls" aria-label="Controles do jogo">
            <div className="virtual-dpad" aria-label="Movimentacao">
                {directionButton("ArrowUp", "Cima", "▲", "dpad-up")}
                {directionButton("ArrowLeft", "Esquerda", "◀", "dpad-left")}
                {directionButton("ArrowDown", "Baixo", "▼", "dpad-down")}
                {directionButton("ArrowRight", "Direita", "▶", "dpad-right")}
            </div>
            {interactionHint && (
                <button className="mobile-interact" onClick={onInteract} type="button">
                    {interactionHint}
                </button>
            )}
        </nav>
    );
}

export default VirtualDPad;