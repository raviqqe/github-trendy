<template>
    <div>
        <a :href="url">{{ name }}</a>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ props: { name: String, url: String } })
export default class Repository extends Vue {}
</script>
