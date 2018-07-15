<template>
    <ApolloQuery :query="query">
      <template slot-scope="{ result: { data } }">
        <div v-if="data">
          <Repository
            v-for="repository of data.repositories"
            :key="repository.id"
            :name="repository.name"
            :url="repository.url"
          />
        </div>
      </template>
    </ApolloQuery>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import * as vueApollo from 'vue-apollo';
import { Component, Vue } from 'vue-property-decorator';

import Repository from './Repository.vue';

const query = gql`
  query {
    repositories {
      id
      name
      url
    }
  }
`;

@Component({
  components: { ApolloQuery: (vueApollo as any).ApolloQuery, Repository }
})
export default class Repositories extends Vue {
  private query = query;
}
</script>

<style scoped lang="scss">
</style>
