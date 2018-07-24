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
          <Language color="tomato" id="" name="All" />
          <Language v-for="language of languages" v-bind="language" :key="language.id" />
          <Language color="grey" id="unknown" name="Unknown languages" />
        </template>
      </Query>
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { Component, Vue } from 'vue-property-decorator';

import { languageIDs } from '../domain';
import Language from './Language.vue';
import Query from './Query.vue';

const query = gql`
  query Query($languageIDs: [ID]!) {
    languages(languageIDs: $languageIDs) {
      id
      color
      name
    }
  }
`;

@Component({ components: { Query, Language } })
export default class extends Vue {
  private languageIDs = languageIDs;
  private query = query;

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
    background: white;
    height: 100vh;
    overflow-y: auto;
    padding: 1em;
    position: fixed;
    right: 0;
    top: 0;
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.5);
    transform: translateX(calc(100% + 1em));
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
