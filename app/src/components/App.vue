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

import { languages } from '../domain';

@Component
export default class extends Vue {
  private languages = languages;
}
</script>

<style scoped lang="scss">
</style>
