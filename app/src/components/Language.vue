<template>
  <div><a :href="'/' + path">{{ name }}</a></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop(String) private name: string;
  @Prop(String) private path: string;
}
</script>
