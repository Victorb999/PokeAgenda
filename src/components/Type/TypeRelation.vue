<template>
  <div class="tipopokemon-div-relacao">
    <div class="container">
      <h3>Type relations</h3>

      <div
        v-if="props.retornoTipo.damage_relations.double_damage_from.length > 0"
      >
        <h4>Double damage from:</h4>
        <span
          v-for="(damage, index) in retornoTipo.damage_relations
            .double_damage_from"
          :key="index + 'a'"
        >
          <span class="badge tipo-badge" :class="damage.name">{{
            damage.name
          }}</span>
        </span>
      </div>
      <div
        v-if="props.retornoTipo.damage_relations.double_damage_to.length > 0"
      >
        <h4>Double damage to:</h4>
        <span
          v-for="(damage2, index) in retornoTipo.damage_relations
            .double_damage_to"
          :key="index + 'b'"
        >
          <span class="badge tipo-badge" :class="damage2.name">{{
            damage2.name
          }}</span>
        </span>
      </div>
      <div v-if="props.retornoTipo.damage_relations.no_damage_from.length > 0">
        <h4>No damage from:</h4>
        <span
          v-for="(damage2, index) in retornoTipo.damage_relations
            .no_damage_from"
          :key="index + 'c'"
        >
          <span class="badge tipo-badge" :class="damage2.name">{{
            damage2.name
          }}</span>
        </span>
      </div>
      <div v-if="props.retornoTipo.damage_relations.no_damage_to.length > 0">
        <h4>No damage to:</h4>
        <span
          v-for="(damage2, index) in retornoTipo.damage_relations.no_damage_to"
          :key="index + 'd'"
        >
          <span class="badge tipo-badge" :class="damage2.name">{{
            damage2.name
          }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PokeType } from "@/store/interfaces";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TypesRelation",
  props: {
    retornoTipo: {
      type: Object as PropType<PokeType>,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
