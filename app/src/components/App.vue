<template>
  <div>
    <Header />
    <div class="content">
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
export default class extends Vue {}
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
  padding: 1.2rem;
  @include horizontal-children-margin(1.2rem);
}
</style>
