<template>
  <div class="header">
    GitHub <span class="trendy">Trendy</span>
    <div class="menu-button">
      <MenuButton />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MenuButton from "./MenuButton.vue";

@Component({ components: { MenuButton } })
export default class extends Vue {}
</script>

<style scoped lang="scss">
@import "../style.scss";

.header {
  position: relative;
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

.menu-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1em;

  @media not all and (max-width: $widthThreshold) {
    display: none;
  }
}
</style>
