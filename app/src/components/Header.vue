<template>
  <div class="header">
    <img class="icon" src="/icon.svg" />
    <div>
      GitHub <span class="trendy">Trendy</span>
    </div>
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
  @include horizontal-children-margin(0.4em);
  position: relative;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  background: #24292e;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 1.25em;

  &:hover {
    animation: shake 0.8s ease-in-out;
  }

  @keyframes shake {
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: rotate(10deg);
    }

    20%,
    40%,
    60%,
    80% {
      transform: rotate(-10deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
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
