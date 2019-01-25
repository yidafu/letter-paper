<template>
  <div class="home">
    <navbar></navbar>
    <summary-list :posts="posts" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import Button from 'squid/Button';
import Image from 'squid/Image';
import SummaryList from 'components/SummaryList';
import Navbar from 'components/Navbar';

export default {
  name: 'home',
  components: {
    's-button': Button,
    SummaryList,
    Navbar,
    graph: Image,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters([
      'posts'
    ])
  },
  created() {
    this.getPosts();
  },
  methods: {
    ...mapActions(
      [
        'getPosts'
      ]
    )
  }
};
</script>

<style lang="scss">
  .home {
    position: relative;
    // padding-top: 10em;
    min-width: 1000px;
    background: url(../../assets/rain-slim.jpg) no-repeat fixed;
    background-size: cover;
    // min-width: 1000px;
  }
</style>
