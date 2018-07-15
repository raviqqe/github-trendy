<template>
  <div>
    <Repositories />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Repositories from '../components/Repositories.vue';

@Component({
  components: {
    Repositories
  }
})
export default class Home extends Vue {}
</script>
