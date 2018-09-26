<template>
  <div class="container">
    <div class="title">All languages</div>
    <MenuItem
      v-for="language of languages"
      v-bind="language"
      :key="language.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { ILanguage } from "../domain";
import MenuItem from "./MenuItem.vue";

@Component({ components: { MenuItem } })
export default class extends Vue {
  @Prop(Array)
  private languages: ILanguage[];
}
</script>

<style scoped lang="scss">
@import "../style.scss";

.container {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.title {
  @include title;
  margin: 0.5em;

  @media not all and (max-width: $widthThreshold) {
    display: none;
  }
}
</style>
