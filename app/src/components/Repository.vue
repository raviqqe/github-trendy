<template>
    <div>
        <a :href="url" target="_blank">{{ name }}</a>
        <div v-if="description">{{ description }}</div>
        <div>{{ stars }}</div>
        <div v-if="language">{{ language }}</div>
        <div>{{ date.toLocaleString() }}</div>
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
