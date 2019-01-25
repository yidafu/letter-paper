<template>
  <div class="summaryList">
    <post-summary v-for="post in posts" :key="post.id">
      <h1>{{post.title}}</h1>
      {{post.summary}}
    </post-summary>
  </div>
</template>

<script>
import Letter from './Letter';

export default {
  components: {
    'post-summary': Letter,
  },
  props: {
    posts: Array,
  },
};
</script>

<style lang="scss" scoped>
@import './style/variables.scss';
</style>
