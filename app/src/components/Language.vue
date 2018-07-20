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
  @Prop(String) private color: string;
  @Prop(String) private id: string;
  @Prop(String) private name: string;
}
</script>

<style scoped lang="scss">
a {
  $color: dimgrey;

  color: $color;
  text-decoration: none;

  &:visited {
    color: $color;
  }
}
</style>
