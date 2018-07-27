<template>
  <div>
    <Header />
    <div class="content" :data-window-small="windowSmall">
      <router-view />
      <Menu />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from './Header.vue';
import Menu from './Menu.vue';

@Component({ components: { Header, Menu } })
export default class extends Vue {
  private get windowSmall(): boolean {
    return this.$store.state.windowSmall;
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font: 16px sans-serif;
  margin: 0;
}
</style>

<style scoped lang="scss">
@import '../style.scss';

.content {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  &:not([data-window-small]) {
    padding: 1.5rem;
    @include horizontal-children-margin(1.2rem);
  }
}
</style>
