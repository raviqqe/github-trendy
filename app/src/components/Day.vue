<template>
  <div class="day">
    <div class="date">{{ formattedDate }}</div>
    <div class="repositories">
      <Repository
        v-for="repository of repositories"
        v-bind="repository"
        :key="repository.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Repository from "./Repository.vue";

@Component({ components: { Repository } })
export default class extends Vue {
  @Prop(Date)
  private date: Date;
  @Prop(Array)
  private repositories: object[];

  private get formattedDate(): string {
    const date = this.date.toLocaleDateString();

    return date === new Date().toLocaleDateString() ? "Today" : date;
  }
}
</script>

<style scoped lang="scss">
@import "../style.scss";

.day {
  @include vertical-children-margin(0.6rem);
}

.date {
  @include title;
  font-size: 1.8em;
}

.repositories {
  @include vertical-children-margin(0.6rem);
}
</style>
