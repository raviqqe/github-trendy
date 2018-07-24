<template>
  <router-link :to="'/' + encodeURIComponent(id)">
    <span class="ball" :style="{ color: color || 'grey' }">⬤</span>
    {{ name }}
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop(String) protected id: string;
  @Prop(String) private color: string;
  @Prop(String) private name: string;
}
</script>

<style scoped lang="scss">
a {
  color: inherit;
  text-decoration: none;

  &:visited {
    color: inherit;
  }
}
</style>
