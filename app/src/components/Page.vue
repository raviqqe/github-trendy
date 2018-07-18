<template>
  <Repositories />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Repositories from '../components/Repositories.vue';

@Component({ components: { Repositories } })
export default class extends Vue {}
</script>
