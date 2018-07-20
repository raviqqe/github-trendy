<template>
  <div class="repository">
    <a class="name" :href="url" target="_blank">{{ name }}</a>
    <div class="description" v-if="description">{{ description }}</div>
    <div class="properties">
      <span v-if="language">{{ language }}</span>
      <span><span class="star">★</span> {{ stars }}</span>
      <span><span class="clock">◷</span> {{ date.toLocaleString() }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop(Date) private date: Date;
  @Prop(String) private description?: string;
  @Prop(String) private language?: string;
  @Prop(String) private name: string;
  @Prop(Number) private stars: number;
  @Prop(String) private url: string;
}
</script>

<style scoped lang="scss">
@import '../style.scss';

.repository {
  padding: 0.6em;
  border: 1px solid darkgrey;
  border-radius: 2px;
  @include vertical-children-margin(0.4rem);
}

.name {
  $color: lightseagreen;

  display: block;
  color: $color;
  font-size: 1.4em;
  font-weight: bold;
  text-decoration: none;

  &:visited {
    color: $color;
  }
}

.description {
  color: dimgrey;
}

.properties {
  color: dimgrey;
  font-size: 0.95em;
  @include horizontal-children-margin(1em);
}

.star {
  color: gold;
}

.clock {
  color: black;
}
</style>
