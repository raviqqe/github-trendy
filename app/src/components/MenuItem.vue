<template>
  <router-link :data-highlighted="highlighted" :to="path" @click.native="viewLanguage">
    <Language :color="color" :name="name" />
    <div v-if="loading" class="loading">↻</div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Language from "./Language.vue";

@Component({ components: { Language } })
export default class extends Language {
  @Prop(String)
  private id: string;

  private get highlighted(): boolean {
    return this.id === decodeURIComponent(this.$route.path.replace("/", ""));
  }

  private get loading(): boolean {
    return this.$store.state.loading[this.id];
  }

  private get path(): string {
    return "/" + encodeURIComponent(this.id);
  }

  private viewLanguage(): void {
    this.$store.commit("viewLanguage", this.id);
  }
}
</script>

<style scoped lang="scss">
@import "../style.scss";

a {
  @include horizontal-children-margin(1em);
  border-radius: 3px;
  color: black;
  display: flex;
  justify-content: space-between;
  line-height: 1em;
  padding: 0.4em;
  text-decoration: none;
  white-space: nowrap;

  &[data-highlighted] {
    background: #eee;
  }
}

.loading {
  animation: spin 0.7s linear infinite;
  color: grey;
  display: inline-block;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
