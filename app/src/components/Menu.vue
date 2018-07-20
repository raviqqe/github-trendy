<template>
  <div class="menu">
    <router-link
      v-for="{ name, path } in languages"
      :key="name"
      :to="'/' + encodeURIComponent(path)"
    >
      {{ name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { languages } from '../domain';

@Component
export default class extends Vue {
  private languages = languages;
}
</script>

<style scoped lang="scss">
@import '../style.scss';

.menu {
  display: flex;
  flex-direction: column;
  flex: 0;
  @include vertical-children-margin(0.2em);
}

a {
  color: black;
  text-decoration: none;
  white-space: nowrap;
}
</style>
