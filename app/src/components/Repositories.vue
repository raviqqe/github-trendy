<template>
  <ApolloQuery :query="query" :variables="{ language }">
    <template v-if="data" slot-scope="{ result: { data } }">
      <Repository
        v-for="repository of data.repositories"
        :key="repository.id"
        :name="repository.name"
        :url="repository.url"
      />
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import * as vueApollo from 'vue-apollo';
import { Component, Vue } from 'vue-property-decorator';

import Repository from './Repository.vue';

const query = gql`
  query Query($language: String) {
    repositories(language: $language) {
      id
      language
      name
      stars
      url
    }
  }
`;

@Component({
  components: { ApolloQuery: (vueApollo as any).ApolloQuery, Repository }
})
export default class Repositories extends Vue {
  private query = query;

  private get language(): string {
    return this.$route.path.replace('/', '');
  }
}
</script>

<style scoped lang="scss">
</style>
