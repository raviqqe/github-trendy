<template>
  <div class="repositories">
    <Query :query="query" :variables="{ languageID }">
      <template slot-scope="{ repositories }">
        <Repository
          v-for="{ id, date, description, language, name, stars, url } of repositories"
          :key="id"
          :date="new Date(date)"
          :description="description"
          :language="language"
          :name="name"
          :stars="stars"
          :url="url"
        />
      </template>
    </Query>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { Component, Vue } from 'vue-property-decorator';

import Query from './Query.vue';
import Repository from './Repository.vue';

const query = gql`
  query Query($languageID: ID) {
    repositories(languageID: $languageID) {
      id
      date
      description
      language {
        color
        id
        name
      }
      name
      stars
      url
    }
  }
`;

@Component({ components: { Query, Repository } })
export default class extends Vue {
  private query = query;

  private get languageID(): string {
    return decodeURIComponent(this.$route.path.replace('/', ''));
  }
}
</script>

<style scoped lang="scss">
@import '../style.scss';

.repositories {
  flex: 1;

  > div {
    @include vertical-children-margin(1rem);
  }
}
</style>
