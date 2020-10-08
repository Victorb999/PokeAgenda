import { reactive, toRefs } from "vue";

interface Pokemon {
  pokeresposta: object;
}
const state = reactive({
  pokeresposta: {}
}) as Pokemon;
export default function createStore() {
  function setPokeresposta(x: object) {
    state.pokeresposta = x;
  }

  // function getPokeresposta() {
  //   console.log(state.pokeresposta);
  //   return state.pokeresposta;
  // }

  return { ...toRefs(state), setPokeresposta };
}
