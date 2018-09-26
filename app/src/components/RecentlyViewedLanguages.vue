<template>
  <div class="container">
    <div class="title">Recently viewed</div>
    <MenuItem
      v-for="language of recentlyViewedLanguages"
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

  private get recentlyViewedLanguages(): ILanguage[] {
    return this.languages.filter(
      ({ id }: ILanguage) => id in this.$store.state.recentlyViewedLanguageIDs
    );
  }
}
</script>

<style scoped lang="scss">
@import "../style.scss";

.container {
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  @media not all and (max-width: $widthThreshold) {
    border: 1px solid darkgrey;
  }
}

.title {
  color: dimgrey;
  font-weight: bold;
  margin: 0.5em;
  border-bottom: 1px solid darkgrey;

  @media (max-width: $widthThreshold) {
    border-color: tomato;
    color: tomato;
  }
}
</style>
