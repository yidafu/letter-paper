<template>
  <s-ripple>
    <button class="squid-btn squid-btn-primary">
      <slot />
    </button>
  </s-ripple>
</template>

<script>
import Ripple from './Ripple.vue';

export default {
  components: {
    's-ripple': Ripple,
  }
};
</script>

<style lang="scss">
@import '../scss/variables.scss';

/**
 * @see https://css-tricks.com/overriding-default-button-styles/
 */

@keyframes btn-active {
  50% {
    box-shadow: 0 0.5em 5px 0px #aaa;
  }
  100% {
    box-shadow: 0px 0.1em 5px 0px #aaa;
  }
}
.squid-btn:not(:disabled) {
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
  // image size limit to 32x32
  cursor: /*url(../asset/pointer-outline.png) ,*/ pointer;
}
.squid-btn {
  display: inline-block;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  padding: 0.5em 1em;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: .25em;
  box-shadow: 0px 2px 5px 0px #aaa;
}

.squid-btn:hover {
  opacity: 0.7;
}

.squid-btn:focus,
.squid-btn:active {
  outline: none;
}
// .squid-btn:active {
//   animation: btn-active;
//   animation-duration: 100ms;
//   animation-iteration-count: 1;
//   animation-timing-function: ease;
// }

.squid-btn-primary {
  background-color: $primary-color;
  color: #fff;
}

</style>
