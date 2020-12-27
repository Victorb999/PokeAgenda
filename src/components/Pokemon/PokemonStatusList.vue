<template>
  <div class="status-box-container">
    <h1>Base status</h1>

    <div>
      <div
        v-for="(status, index) in pokeresposta"
        :key="index"
        class="lista-status"
      >
        <span>{{ status.stat.name }}</span>
        <div class="progress">
          <div
            class="progress-bar"
            :class="color[0].type.name"
            role="progressbar"
            :style="`width: ${status.base_stat / 2}%;`"
            :aria-valuenow="status.base_stat"
            aria-valuemin="0"
            aria-valuemax="200"
          >
            {{ status.base_stat }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokeresposta: Array,
    color: Array
  }
};
</script>
