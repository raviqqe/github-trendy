<template>
  <div>
    <div>
      <router-link
        v-for="{ name, path } in languages"
        :key="name"
        :to="'/' + path"
      >
        {{ name }}
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { languages } from './domain';

@Component
export default class extends Vue {
  private languages = languages;
}
</script>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
