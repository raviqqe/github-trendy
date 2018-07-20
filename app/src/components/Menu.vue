<template>
  <div class="menu">
    <Language v-for="language of languages" v-bind="language" :key="language.id" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { languages } from '../domain';
import Language from './Language.vue';

@Component({ components: { Language } })
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
