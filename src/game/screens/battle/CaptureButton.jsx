function CaptureButton({ enemyHealth, maxHealth, onCapture, onFailure }) {
    function attemptCapture() {
        const remainingHealthRatio = Math.max(0, Math.min(1, enemyHealth / maxHealth));
        const captureChance = Math.min(0.9, 0.2 + (1 - remainingHealthRatio) * 0.65);

        if (Math.random() < captureChance) {
            onCapture();
        } else {
            onFailure();
        }
    }

    return <button onClick={attemptCapture}>Capturar</button>;
}

export default CaptureButton;