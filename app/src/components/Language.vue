<template>
  <div>
    <span class="ball" :color="color || 'grey'" />
    <a :href="'/' + id">{{ name }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop(String) private color: string;
  @Prop(String) private id: string;
  @Prop(String) private name: string;
}
</script>

<style scoped lang="scss">
.ball {
  width: 1em;
  height: 1em;
  border-radius: 1em;
}
</style>
