<template>
    <article
      @click="handleClick"
      :id="`article-${data.id}`"
      :data-article-id="data.id"
      class="letter"
      :class="{'pull-back': shrink}"
    >
      <h1>{{data.title}}</h1>
      <div class="content">
        {{content}}
      </div>
    </article>
</template>

<script>

export default {
  name: 'letter',
  props: {
    postId: Number,
    index: Number,
  },
  data() {
    return {
      shrink: false,
      data: {}, // doesn't has content property
    };
  },
  computed: {
    content() {
      const { data } = this;
      return data.summary;
    },
  },

  methods: {

    log(...arg) {
      console.log(...arg);
    },
  },
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
  overflow-y: hidden;

  /* top: -50px; */

  margin: 0 auto;
  box-sizing: border-box;
  padding: $a4-padding-top $a4-padding-left 0 $a4-padding-left;
  width: $a4-width;
  /* height: 296mm; */

  background-color: #f8f0dd;

  box-shadow: 2px 0 1em 2px #000;
}
.letter:last-child {
  padding-bottom: $a4-padding-left;
}

.pull-back {
  padding-top: $a4-padding-left - 20mm;
  height: 0;
}
</style>
