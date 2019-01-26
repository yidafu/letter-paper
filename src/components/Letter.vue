<template>
  <article @click="$emit('click', $event, data.id)" class="letter" >
    <router-link :to="`/post/${data.id}`">
      <h1 >{{data.title}}</h1>
    </router-link>

    <div>{{data.summary}}</div>
    <div v-if="data.status === 'fulltext'">
      {{data.content}}
    </div>
    <div v-else>
      {{ data.summary }}
    </div>
  </article>
</template>

<script>

export default {
  components: {
  },
  props: {
    data: Object,
  },
  watch: {
  },
  beforeUpdate() {
    console.log('before update', this.data.id, this.data);
  },
  methods: {
    log(...arg) {
      console.log(...arg);
    }
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

  .zoom-out {
    animation-name: shrink;
    animation-duration: 5s;
  }
    .zoom-in {
    animation-name: expend;
    animation-duration: 5s;
  }
  @keyframes shrink {

    100% {
      height: 0;
    }
  }
    @keyframes expend {
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
  }
</style>
