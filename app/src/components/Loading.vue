<template>
  <div class="loading">↻</div>
</template>

<style scoped lang="scss">
.loading {
  animation: spin 0.7s linear infinite;
  color: grey;
  display: inline-block;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
