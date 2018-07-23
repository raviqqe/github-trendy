<template>
  <div class="menu">
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

  private get initialized(): boolean {
    return this.$store.state.apolloInitialized;
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
  }
}

a {
  color: black;
  text-decoration: none;
  white-space: nowrap;
}
</style>
