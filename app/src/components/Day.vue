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
  color: dimgray;
  font-size: 1.8em;
  font-weight: bold;
  padding-bottom: 0.2em;
  border-bottom: 1px solid darkgray;
}

.repositories {
  @include vertical-children-margin(0.6rem);
}
</style>
