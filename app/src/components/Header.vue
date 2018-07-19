<template>
  <div class="header">
    GitHub <span class="trendy">Trendy</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style scoped lang="scss">
.header {
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  background: #24292e;
  padding: 0.5em;
  text-align: center;
}

.trendy {
  color: tomato;
}
</style>
