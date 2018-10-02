<template>
  <button @click="toggleMenu">≡</button>
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
  font-size: 2em;
}
</style>
