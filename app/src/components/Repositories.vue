<template>
  <ApolloQuery :query="query" :variables="{ language }" :skip="!initialized">
    <template slot-scope="{ result: { data, loading } }">
      <template v-if="loading || !data">Loading...</template>
      <template v-else>
        <Repository
          v-for="{ id, date, description, language, name, stars, url } of data.repositories"
          :key="id"
          :date="new Date(date)"
          :description="description"
          :language="language"
          :name="name"
          :stars="stars"
          :url="url"
        />
      </template>
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
      date
      description
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
export default class extends Vue {
  private query = query;

  private get language(): string {
    return decodeURIComponent(this.$route.path.replace('/', ''));
  }

  private get initialized(): boolean {
    return this.$store.state.apolloInitialized;
  }
}
</script>

<style scoped lang="scss">
</style>
