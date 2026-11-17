export default function createGameLoop({
    canvas,
    tileSize,
    camera,
    playerPosition,
    drawGame,
    getMap,
    setMap,
    getMapId,
    canRun,
}) {
    let animationFrame = null;
    let previousFrameTime = null;

    function render() {
        const map = getMap();
        if (map.length > 0) {
            const viewportWidth = Math.ceil(canvas.width / tileSize);
            const viewportHeight = Math.ceil(canvas.height / tileSize);
            camera.x = Math.max(
                0,
                Math.min(
                    playerPosition.renderX - Math.floor(viewportWidth / 2),
                    map[0].length - viewportWidth
                )
            );
            camera.y = Math.max(
                0,
                Math.min(
                    playerPosition.renderY - Math.floor(viewportHeight / 2),
                    map.length - viewportHeight
                )
            );
        }

        setMap(drawGame(canvas, tileSize, playerPosition, camera, getMapId()));
    }

    function animate(timestamp) {
        if (!canRun()) {
            animationFrame = null;
            return;
        }

        const deltaTime = previousFrameTime === null
            ? 0
            : Math.min((timestamp - previousFrameTime) / 1000, 0.3);
        previousFrameTime = timestamp;

        const interpolation = 1 - Math.exp(-18 * deltaTime);
        playerPosition.renderX += (playerPosition.x - playerPosition.renderX) * interpolation;
        playerPosition.renderY += (playerPosition.y - playerPosition.renderY) * interpolation;

        const settled =
            Math.abs(playerPosition.x - playerPosition.renderX) < 0.001 &&
            Math.abs(playerPosition.y - playerPosition.renderY) < 0.001;

        if (settled) {
            playerPosition.renderX = playerPosition.x;
            playerPosition.renderY = playerPosition.y;
        }

        render();

        if (settled) {
            animationFrame = null;
            previousFrameTime = null;
        } else {
            animationFrame = requestAnimationFrame(animate);
        }
    }

    function start() {
        if (animationFrame !== null) return;
        previousFrameTime = null;
        animationFrame = requestAnimationFrame(animate);
    }

    function stop() {
        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        previousFrameTime = null;
    }

    function resumeIfNeeded() {
        const playerIsMoving =
            Math.abs(playerPosition.x - playerPosition.renderX) >= 0.001 ||
            Math.abs(playerPosition.y - playerPosition.renderY) >= 0.001;

        if (animationFrame === null && playerIsMoving) {
            start();
        }
    }

    return {
        render,
        start,
        stop,
        resumeIfNeeded,
        isRunning: () => animationFrame !== null,
    };
}