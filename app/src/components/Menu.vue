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
.menu {
  display: flex;
  flex-direction: column;
  flex: 0;
  margin: 1em;
}

a {
  color: black;
  text-decoration: none;
  white-space: nowrap;
  margin: 0.1em;
}
</style>
