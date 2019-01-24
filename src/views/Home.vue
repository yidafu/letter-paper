<template>
  <div class="home">
    <h1>Home</h1>
    <s-button>button</s-button>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from 'squid/Button';

export default {
  name: 'home',
  components: {
    's-button': Button,
  }
};
</script>
