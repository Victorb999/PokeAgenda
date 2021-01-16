import { reactive, toRefs } from "vue";
import { Pokedex } from "@/store/interfaces";
interface Pokemon {
  pokeresposta: Pokedex;
}
const state = reactive({
  pokeresposta: {} as Pokedex,
  colors: {
    normal: "#d3d3af",
    fighting: "#d56723",
    flying: "#a1d1f8",
    poison: "#7fa8c9",
    ground: "#7c7e29",
    rock: "#a38c21",
    bug: "#729f3f",
    ghost: "#7b62a3",
    steel: "#9eb7b8",
    fire: "#fd7d24",
    water: "#4592c4",
    grass: "#9bcc50",
    electric: "#eed535",
    psychic: "#f366b9",
    ice: "#51c4e7",
    dragon: "#3d167c",
    dark: "#303030",
    fairy: "#fdb9e9",
    unknown: "#000",
    shadow: "#333",
  },
}) as Pokemon;
export default function createStore() {
  function setPokeresposta(x: Pokedex) {
    state.pokeresposta = x;
  }

  // function getPokeresposta() {
  //   console.log(state.pokeresposta);
  //   return state.pokeresposta;
  // }

  return { ...toRefs(state), setPokeresposta };
}
