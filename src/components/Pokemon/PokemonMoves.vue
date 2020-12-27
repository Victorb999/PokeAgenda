<template>
  <div class="attacks-box-container container">
    Moves:
    <span v-for="(moves, index) in state.pokeresposta.moves" :key="index">
      <span
        type="button"
        class="badge badge-secondary"
        @click="setaMove(moves.move)"
        data-toggle="modal"
        data-target="#modal-1"
        >{{ moves.move.name }}</span
      >
    </span>
    <PokemonMoveDescription :move="state.moveselecionado" />
  </div>
</template>
<script lang="ts">
import { reactive, defineComponent, computed } from "vue";
import PokemonMoveDescription from "@/components/Pokemon/PokemonMoveDescription.vue";
import store from "@/store/store";

export default defineComponent({
  name: "Moves",
  components: {
    PokemonMoveDescription
  },
  setup() {
    interface Move {
      moveselecionado: object;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pokeresposta: any;
    }
    const state = reactive({
      moveselecionado: {},
      pokeresposta: computed(() => store().pokeresposta.value)
    }) as Move;

    function setaMove(move: object) {
      console.log(move);
      state.moveselecionado = move;
    }

    return {
      state,
      setaMove
    };
  }
});
</script>
