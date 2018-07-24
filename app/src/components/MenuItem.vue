<template>
  <div :data-highlighted="highlighted">
    <Language :color="color" :id="id" :name="name" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Language from './Language.vue';

@Component({ components: { Language } })
export default class extends Language {
  private get highlighted(): boolean {
    return this.languageID === this.id;
  }

  private get languageID(): string {
    return decodeURIComponent(this.$route.path.replace('/', ''));
  }
}
</script>

<style scoped lang="scss">
div {
  padding: 0.2em 0.4em 0em;
  border-radius: 3px;

  &[data-highlighted] {
    background: #eee;
  }
}
</style>
