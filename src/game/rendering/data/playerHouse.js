import { pokemonSpecies } from "../../../objects/pokemon/data"

const size ={ height: 15, widht: 15}

const start ={x:7, y:13}
const playerHouseDefault = {
  size,
  start,
  bed: { x: 13, y: 2 },
  pokeChicos: [
    { id: 1, x: 7, y: 7, ...pokemonSpecies.Caranga },
    { id: 2, x: 9, y: 7, ...pokemonSpecies.Carcaraptor },
    { id: 5, x: 11, y: 7, ...pokemonSpecies.Piloco }
  ]
};
export let request={chico_claimed:false}
export const playerHouseData = {
  ...playerHouseDefault,
  pokeChicos: request.chico_claimed
    ? []
    : playerHouseDefault.pokeChicos
};