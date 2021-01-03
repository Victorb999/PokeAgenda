<template>
  <div
    class="modal fade"
    id="modal-1"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ move.name }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div v-if="state.carregado" class="modal-body">
          <h4 v-if="state.moveObj.type" :class="state.moveObj.type.name">
            Type : {{ state.moveObj.type.name }}
          </h4>

          <div class="descricaomove" v-if="state.moveObj">
            <h3>Description</h3>
            <h5>{{ state.shortdescricao }}</h5>
            <span class="my-4">
              {{ state.descricao }}
            </span>
          </div>

          <div
            v-if="state.moveObj.type"
            :class="state.moveObj.type.name"
            class="statsmove"
          >
            <h3>Stats</h3>
            <h5 v-if="state.moveObj.damage_class">
              Class : {{ state.moveObj.damage_class.name }}
            </h5>
            <h5 v-if="state.moveObj.power">
              Power : {{ state.moveObj.power }}
            </h5>
            <h5 v-if="state.moveObj.pp">PP : {{ state.moveObj.pp }}</h5>
            <h5 v-if="state.moveObj.accuracy">
              Accuracy : {{ state.moveObj.accuracy }}
            </h5>
            <h5 v-if="state.moveObj.priority">
              Priority : {{ state.moveObj.priority }}
            </h5>
          </div>
        </div>
        <div v-else class="loading">
          <img
            src="https://cdn.dribbble.com/users/1771704/screenshots/6124573/attachments/1313609/pokeball.gif"
            alt="Loading"
            class="pokeloading"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ApiPokemon from "@/core/ApiPokemon";
import { reactive, defineComponent, watch } from "vue";

export default defineComponent({
  name: "MovesDescription",
  props: {
    move: Object
  },
  setup(props) {
    interface Move {
      descricao: string;
      shortdescricao: string;
      moveObj: object;
      carregado: boolean;
    }
    const state = reactive({
      descricao: "",
      shortdescricao: "",
      moveObj: {},
      carregado: false
    }) as Move;

    async function BuscaTipo() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const move: any = props.move;

      let numeroString = move.url.replace(
        "https://pokeapi.co/api/v2/move/",
        ""
      );
      numeroString = numeroString.replace("/", "");
      const request = new ApiPokemon();
      await request
        .getMove(numeroString, "move")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          state.descricao = response.effect_entries[0].effect.replace(
            /\$effect_chance/g,
            response.effect_chance
          );
          state.shortdescricao = response.effect_entries[0].short_effect.replace(
            /\$effect_chance/g,
            response.effect_chance
          );

          state.moveObj = response;
          state.carregado = true;
          // console.log(response.data.effect_chance)
        })
        .catch(err => {
          state.carregado = false;
          state.descricao = err;
        });
    }

    watch(
      () => props.move,
      async () => {
        state.carregado = false;
        BuscaTipo();
      }
    );

    return {
      state
    };
  }
});
</script>
