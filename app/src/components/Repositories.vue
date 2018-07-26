<template>
  <div class="repositories">
    <Query :query="query" :variables="{ languageID }">
      <template slot-scope="{ repositories }">
        <Repository
          v-for="repository of repositories"
          v-bind="repository"
          :key="repository.id"
        />
      </template>
    </Query>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { repositoriesQuery } from '../infra/apollo';
import Query from './Query.vue';
import Repository from './Repository.vue';

@Component({ components: { Query, Repository } })
export default class extends Vue {
  private query = repositoriesQuery;

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
