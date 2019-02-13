<template>
  <div class="home">
    <navbar></navbar>
    <!-- <router-link to="/">Jump to home</router-link> -->
    <letter-list />
  </div>
</template>

<script>
// @ is an alias to /src
import Button from 'squid/Button';
// import Image from 'squid/Image';
import LetterList from 'component/LetterList';
import Navbar from 'component/Navbar';

export default {
  name: 'post',
  components: {
    's-button': Button,
    LetterList,
    Navbar,
    // graph: Image,
  },
};
</script>

<style lang="scss">
  .home {
    position: relative;
    // padding-top: 10em;
    min-width: 1000px;
    background: url(../../asset/images/rain-slim.jpg) no-repeat fixed;
    background-size: cover;
    // min-width: 1000px;
  }
</style>
