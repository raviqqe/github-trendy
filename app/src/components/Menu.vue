<template>
  <div>
    <div
      class="background"
      :data-menu-open="menuOpen"
      @click="toggleMenu"
    />
    <div class="menu" :data-open="menuOpen">
      <Query :query="query" :variables="{ languageIDs }">
        <template slot-scope="{ languages }">
          <RecentlyViewedLanguages
            :languages="[specialLanguages.all, ...languages, specialLanguages.unknown]"
          />
          <AllLanguages
            :languages="[specialLanguages.all, ...languages, specialLanguages.unknown]"
          />
        </template>
      </Query>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { ILanguage, languageIDs, specialLanguages } from "../domain";
import { languagesQuery } from "../infra/apollo";
import AllLanguages from "./AllLanguages.vue";
import MenuItem from "./MenuItem.vue";
import Query from "./Query.vue";
import RecentlyViewedLanguages from "./RecentlyViewedLanguages.vue";

@Component({
  components: { AllLanguages, MenuItem, Query, RecentlyViewedLanguages }
})
export default class extends Vue {
  private languageIDs = languageIDs;
  private query = languagesQuery;
  private readonly specialLanguages = specialLanguages;

  private toggleMenu(): void {
    this.$store.commit("toggleMenu");
  }

  private get menuOpen(): boolean {
    return this.$store.state.menuOpen;
  }
}
</script>

<style scoped lang="scss">
@import "../style.scss";

.menu {
  > * {
    display: flex;
    flex-direction: column;
    flex: 0;
    @include vertical-children-margin(0.2em);
  }

  @media (max-width: $widthThreshold) {
    font-size: 1.1em;
    background: white;
    height: 100vh;
    overflow-y: auto;
    padding: 1rem;
    position: fixed;
    right: 0;
    top: 0;

    $shadow-size: 1rem;

    box-shadow: 0 0 $shadow-size rgba(0, 0, 0, 0.5);
    transform: translateX(calc(100% + #{$shadow-size}));
    transition: transform $duration;

    &[data-open] {
      transform: unset;
    }
  }
}

.background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  transition: opacity $duration, visibility $duration;
  opacity: 0;
  visibility: hidden;

  &[data-menu-open] {
    @media (max-width: $widthThreshold) {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
