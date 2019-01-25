<template>
  <article class="letter">
    <slot></slot>
  </article>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import './style/variables.scss';
/*
A4 size: 209mm×296mm ref: wps
  |  |  |  |  |
  V  V  V  V  V
padding 2.54cm 3.18cm -> 15px

2.54cm 3.18cm
*/
  .letter {
    position: relative;
    /* top: -50px; */

    margin: 0 auto;
    box-sizing: border-box;
    padding: $a4-padding-top $a4-padding-left;
    width: $a4-width;
    /* height: 296mm; */

    background-color: #f8f0dd;

    box-shadow: 2px 0 1em 2px #000;
  }
  // .letter:not(:first-child),
  .letter:not(:last-child) {
    // top: - $a4-padding-top - 5mm;
    padding-bottom: 0;

    // background-color: #000 !important;
  }
</style>
