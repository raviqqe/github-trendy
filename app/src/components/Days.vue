<template>
  <div class="days">
    <Query :query="query" :variables="{ languageID }">
      <template slot-scope="{ days }">
        <Day
          v-for="day of days"
          v-bind="day"
          :date="new Date(day.date)"
          :key="day.date"
        />
      </template>
    </Query>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { daysQuery } from '../infra/apollo';
import Day from './Day.vue';
import Query from './Query.vue';

@Component({ components: { Day, Query } })
export default class extends Vue {
  private query = daysQuery;

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
