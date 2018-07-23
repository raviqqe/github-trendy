<template>
  <div>
    <div class="background" :data-menu-open="menuOpen" @click="toggleMenu" />
    <div class="menu" :data-open="menuOpen" :data-window-small="windowSmall">
      <Language color="tomato" id="" name="All" />
      <ApolloQuery :query="query" :variables="{ languageIDs }" :skip="!initialized">
        <template slot-scope="{ result: { data, loading } }">
          <template v-if="loading || !data">Loading...</template>
          <template v-else>
            <Language v-for="language of data.languages" v-bind="language" :key="language.id" />
          </template>
        </template>
      </ApolloQuery>
      <Language color="grey" id="unknown" name="Unknown languages" />
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import * as vueApollo from 'vue-apollo';
import { Component, Vue } from 'vue-property-decorator';

import { languageIDs } from '../domain';
import Language from './Language.vue';

const query = gql`
  query Query($languageIDs: [ID]!) {
    languages(languageIDs: $languageIDs) {
      id
      color
      name
    }
  }
`;

@Component({
  components: { ApolloQuery: (vueApollo as any).ApolloQuery, Language }
})
export default class extends Vue {
  private languageIDs = languageIDs;
  private query = query;

  private toggleMenu(): void {
    this.$store.commit('toggleMenu');
  }

  private get initialized(): boolean {
    return this.$store.state.apolloInitialized;
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

@mixin languages-container {
  display: flex;
  flex-direction: column;
  @include vertical-children-margin(0.2em);
}

.menu {
  flex: 0;
  @include languages-container;

  > :nth-child(2) {
    @include languages-container;
    flex-shrink: 0;
  }

  &[data-window-small='true'] {
    background: white;
    height: 100vh;
    overflow-y: auto;
    padding: 1em;
    position: fixed;
    right: 0;
    top: 0;
    transform: translateX(100%);
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
  background: rgba(0, 0, 0, 0.5);
  transition: opacity $duration, visibility $duration;
  opacity: 0;
  visibility: hidden;

  &[data-menu-open] {
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
