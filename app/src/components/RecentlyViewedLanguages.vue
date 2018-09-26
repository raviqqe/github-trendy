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
.container {
  border: solid 1px darkgrey;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.title {
  color: dimgrey;
  font-weight: bold;
  margin: 0.5em;
  border-bottom: solid 1px darkgrey;
}
</style>
