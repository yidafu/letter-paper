<template>
  <span class="wave"></span>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  .wave {
    position: absolute;
    display: inline-block;
    border-radius: 50%;
    animation: ripple 550ms ease-out 1;
  }
  @keyframes ripple {
    0% {
      background-color: #000;
      transform: scale(0);
      opacity: 0.1;
    }
    80% {
      transform: scale(1);
      opacity: 0.4;
    }
    100% {
      // transform: scale(0);
      opacity: 0;
    }
  }
</style>