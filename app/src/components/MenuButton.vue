<template>
  <button @click="toggleMenu">
    <Icon name="bars" />
  </button>
</template>

<script lang="ts">
import Icon from 'vue-awesome';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { Icon } })
export default class extends Vue {
  public toggleMenu() {
    this.$store.commit('toggleMenu');
  }
}
</script>

<style scoped lang="scss">
button {
  background: transparent;
  border: none;
  line-height: 0;
  color: lightgrey;
  transform: scale(1.5);
}
</style>
