import { useState } from "react";
import { playerHouseData, request } from "../../rendering/data/playerHouse";
import { sprites } from "../../rendering/data/tiles.js";

function ChooseChicomonScreen({ chooseChicomon, onChoose, onClose, onRender }) {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const sprite = sprites[chooseChicomon.tile];

  async function chooseStarter() {
    if (saving) return;

    setSaving(true);
    setSaveError("");
    try {
      await onChoose(chooseChicomon);
      request.chico_claimed = true;
      playerHouseData.pokeChicos.length = 0;
      onRender();
      onClose();
    } catch (error) {
      setSaveError(error.message || "Não foi possível salvar o Pokémon. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="choose-chicomon" aria-label="Escolha de Pokémon">
      <section className="choose-chicomon-panel">
        <header className="choose-chicomon-header">
          <span>POKÉMON INICIAL</span>
          <h1>Escolher Pokémon</h1>
        </header>

        <div className="choose-pokemon-preview">
          <div className="choose-sprite-frame">
            {sprite?.src && <img src={sprite.src} alt={chooseChicomon.name} />}
          </div>
          <div className="choose-pokemon-info">
            <h2>{chooseChicomon.name}</h2>
            <span>NÍVEL 1</span>
          </div>
        </div>

        <footer className="choose-chicomon-footer">
          <span>UM NOVO COMPANHEIRO</span>
          <button onClick={onClose} disabled={saving}>Sair</button>
          <button onClick={chooseStarter} disabled={saving}>
            {saving ? "Salvando..." : `Escolher ${chooseChicomon.name}`}
          </button>
        </footer>
        {saveError && <p className="choose-save-error" role="alert">{saveError}</p>}
      </section>
    </main>
  );
}

export default ChooseChicomonScreen;