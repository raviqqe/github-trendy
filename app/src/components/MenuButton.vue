<template>
  <button @click="toggleMenu">☰</button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  public toggleMenu() {
    this.$store.commit("toggleMenu");
  }
}
</script>

<style scoped lang="scss">
button {
  background: transparent;
  border: none;
  color: lightgrey;
  cursor: pointer;
  transform: scale(2.5);
}
</style>
