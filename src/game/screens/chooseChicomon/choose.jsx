import { playerHouseData, request } from "../../rendering/data/playerHouse";

function ChooseChicomonScreen({ chooseChicomon, onChoose, onClose, onRender }) {
  return (
    <main className="choose-chicomon">
      <section className="choose-chicomon-panel">
        <header>
          <h1>Escolher Pokémon</h1>
          
        </header>

        <p>Este é {chooseChicomon.name}</p>
        <p>Pressione R para sair</p>

        <button onClick={() =>{
          onChoose(chooseChicomon);
          request.chico_claimed = true;
          playerHouseData.pokeChicos.length = 0;
          onRender();
          onClose();
        }}>
          Escolher esse
        </button>
      </section>
    </main>
  );
}

export default ChooseChicomonScreen;