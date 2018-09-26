<template>
  <router-link :data-highlighted="highlighted" :to="path" @click.native="viewLanguage">
    <Language :color="color" :name="name" />
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

  private get path(): string {
    return "/" + encodeURIComponent(this.id);
  }

  private viewLanguage(): void {
    this.$store.commit("viewLanguage", this.id);
  }
}
</script>

<style scoped lang="scss">
a {
  border-radius: 3px;
  color: black;
  line-height: 1em;
  padding: 0.4em;
  text-decoration: none;
  white-space: nowrap;

  &[data-highlighted] {
    background: #eee;
  }
}
</style>
