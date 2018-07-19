<template>
  <div>
    <div>
      <Header />
      <router-link
        v-for="{ name, path } in languages"
        :key="name"
        :to="'/' + encodeURIComponent(path)"
      >
        {{ name }}
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { languages } from '../domain';
import Header from './Header.vue';

@Component({ components: { Header } })
export default class extends Vue {
  private languages = languages;
}
</script>

<style lang="scss">
body {
  font-family: sans-serif;
  margin: 0;
}
</style>
