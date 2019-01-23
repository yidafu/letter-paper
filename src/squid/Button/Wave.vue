<template>
  <div class="contianer" @click="handleClick">
    <!-- {{log(rippleStyle)}} -->
    <span class="circle" :class="{wave: isWave}" :style="rippleStyle"></span>
    <slot />
  </div>
</template>

<script>
  export default {
    data: () => ({
      ripple: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      isWave: false,
    }),
    computed: {
      rippleStyle() {
        return {...this.ripple}
      }
    },
    methods: {
      handleClick(e) {
        const elRect = this.$el.getBoundingClientRect()
        const { width, height } = elRect
        const { offsetX, offsetY } = e

        const mouseOffsetX = Math.max( offsetX, width - offsetX )
        const mouseOffsetY = Math.max( offsetY, height - offsetY )

        const radius = Math.sqrt( mouseOffsetX ** 2 + mouseOffsetY ** 2) 
        const diameter = Math.round( radius * 2 ) + 'px'

        const top = Math.round( offsetY - radius ) + 'px'
        const left =  Math.round( offsetX - radius ) + 'px'
        
        this.ripple = {
          width: diameter,
          height: diameter,
          top,
          left,
        }
        this.isWave = true;
      },
      log(...arg) {
        console.log("logger: ", ...arg);
      }
    },
  }
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
    background-color: #000;
  }
  .wave {
    animation: ripple 550ms ease-out 1;
  }
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0.1;
    }
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
  }
</style>