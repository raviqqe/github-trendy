<template>
  <span>
    <span :style="{ color: color || 'grey' }">⬤</span>
    {{ name }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop(String) private color: string;
  @Prop(String) private name: string;
}
</script>
