<template>
  <div class="contianer" @click="handleClick">
    <!-- {{log(rippleStyle)}} -->
    <!-- <span class="circle" :class="{wave: isWave}" :style="rippleStyle"></span> -->
    <s-wave v-for="ripple in ripples" :key="ripple.uuid" :style="ripple.style" />
    <slot />
  </div>
</template>

<script>
import shortid from 'shortid';
import Wave from './Wave.vue';

const DURATION = 550;

export default {
  components: {
    's-wave': Wave,
  },
  data: () => ({
    ripples: [], // {style, uuid, timer}
    isWave: false,
  }),
  destroyed() {
    this.ripples.forEach(wave => window.clearTimeout(wave.timer));
  },
  methods: {
    getStyle(e) {
      const elRect = this.$el.getBoundingClientRect();
      const { width, height } = elRect;
      const { offsetX, offsetY } = e;

      const mouseOffsetX = Math.max(offsetX, width - offsetX);
      const mouseOffsetY = Math.max(offsetY, height - offsetY);

      const radius = Math.sqrt(mouseOffsetX ** 2 + mouseOffsetY ** 2);
      const diameter = Math.round(radius * 2) + 'px';

      const top = Math.round(offsetY - radius) + 'px';
      const left =  Math.round(offsetX - radius) + 'px';

      return {
        width: diameter,
        height: diameter,
        top,
        left,
      };
    },
    handleClick(e) {
      const style = this.getStyle(e);
      const uuid = shortid.generate();
      const timer = window.setTimeout(() => this.clearWave(uuid), DURATION);
      this.ripples.push({
        style,
        uuid,
        timer,
      });
    },
    clearWave(uuid) {
      this.ripples = this.ripples.filter(wave => wave.uuid !== uuid);
    },
  },
};
</script>

<style lang="scss" scoped>
  .contianer {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  .circle {
    position: absolute;
    display: inline-block;
    border-radius: 50%;
  }
  .wave {
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
      opacity: 0.3;
    }
    100% {
      // transform: scale(0);
      opacity: 0;
    }
  }
</style>
