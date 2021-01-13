<template>
  <div class="tipopokemon-div-atak">
    <div class="container">
      <h3>Moves</h3>

      <div v-if="props.retornoTipo">
        <span
          v-for="(moves, index) in props.retornoTipo.moves"
          :key="index + 'e'"
        >
          <span
            class="badge tipo-move"
            data-toggle="modal"
            data-target="#modal-1"
            @click="setaMove(moves)"
            >{{ moves.name }}</span
          >
          <pokemon-move-description :move="state.moveselecionado" />
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PokeType } from "@/store/interfaces";
import { reactive, defineComponent, PropType } from "vue";
import PokemonMoveDescription from "../Pokemon/PokemonMoveDescription.vue";

export default defineComponent({
  components: { PokemonMoveDescription },
  name: "TypesMoves",
  props: {
    retornoTipo: {
      type: Object as PropType<PokeType>,
      required: true,
    },
  },
  setup(props) {
    interface Move {
      moveselecionado: object;
    }
    const state = reactive({
      moveselecionado: {},
    }) as Move;
    function setaMove(move: object) {
      state.moveselecionado = move;
    }
    return {
      props,
      state,
      setaMove,
    };
  },
});
</script>
