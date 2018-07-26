<template>
  <div>
    <div
      class="background"
      :data-menu-open="menuOpen"
      :data-window-small="windowSmall"
      @click="toggleMenu"
    />
    <div class="menu" :data-open="menuOpen" :data-window-small="windowSmall">
      <Query :query="query" :variables="{ languageIDs }">
        <template slot-scope="{ languages }">
          <MenuItem color="tomato" id="" name="All" />
          <MenuItem v-for="language of languages" v-bind="language" :key="language.id" />
          <MenuItem color="grey" id="unknown" name="Unknown languages" />
        </template>
      </Query>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { languageIDs } from '../domain';
import { languagesQuery } from '../infra/apollo';
import MenuItem from './MenuItem.vue';
import Query from './Query.vue';

@Component({ components: { Query, MenuItem } })
export default class extends Vue {
  private languageIDs = languageIDs;
  private query = languagesQuery;

  private toggleMenu(): void {
    this.$store.commit('toggleMenu');
  }

  private get menuOpen(): boolean {
    return this.$store.state.menuOpen;
  }

  private get windowSmall(): boolean {
    return this.$store.state.windowSmall;
  }
}
</script>

<style scoped lang="scss">
@import '../style.scss';

.menu {
  > * {
    display: flex;
    flex-direction: column;
    flex: 0;
    @include vertical-children-margin(0.2em);
  }

  &[data-window-small] {
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

  &[data-menu-open][data-window-small] {
    opacity: 1;
    visibility: visible;
  }
}

a {
  color: black;
  text-decoration: none;
  white-space: nowrap;
}
</style>
