<template>
  <div>
    <div class="information">
      <div><a class="name" :href="url" rel="noopener" target="_blank">{{ name }}</a></div>
      <div class="description" v-if="description">{{ description }}</div>
    </div>
    <div class="properties">
      <span v-if="language"><Language v-bind="language" /></span>
      <span><span class="star">🟊</span> {{ stars }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Language from "./Language.vue";

@Component({ components: { Language } })
export default class extends Vue {
  @Prop(String)
  private description?: string;
  @Prop(Object)
  private language?: object;
  @Prop(String)
  private name: string;
  @Prop(Number)
  private stars: number;
  @Prop(String)
  private url: string;
}
</script>

<style scoped lang="scss">
@import "../style.scss";

.information {
  padding: 0.6rem;
  @include vertical-children-margin(0.4rem);

  .name {
    $color: lightseagreen;

    color: $color;
    font-size: 1.4em;
    font-weight: bold;
    text-decoration: none;
    word-break: break-word;

    &:visited {
      color: $color;
    }
  }

  .description {
    color: dimgrey;
    word-break: break-word;
  }
}

.properties {
  background: whitesmoke;
  color: dimgrey;
  font-size: 0.9em;
  padding: 0.2rem 0.6rem;
  @include horizontal-children-margin(1em);
}

.star {
  color: gold;
  display: inline-block;
  margin-right: 0.1em;
  transform: scale(1.5) translateY(0.05em);
}
</style>
