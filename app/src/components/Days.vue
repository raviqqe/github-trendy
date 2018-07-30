<template>
  <div class="days">
    <Query :query="query" :variables="{ languageID }">
      <template slot-scope="{ repositories }">
        <Day
          v-for="day of repositoriesToDays(repositories)"
          v-bind="day"
          :key="day.date.toDateString()"
        />
      </template>
    </Query>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { repositoriesToDays } from '../domain';
import { repositoriesQuery } from '../infra/apollo';
import Day from './Day.vue';
import Query from './Query.vue';

@Component({ components: { Day, Query } })
export default class extends Vue {
  private query = repositoriesQuery;
  private repositoriesToDays = repositoriesToDays;

  private get languageID(): string {
    return decodeURIComponent(this.$route.path.replace('/', ''));
  }
}
</script>

<style scoped lang="scss">
@import '../style.scss';

.days {
  flex: 1;

  > div {
    @include vertical-children-margin(2rem);
  }
}
</style>
