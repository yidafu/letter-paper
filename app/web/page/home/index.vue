<template>
  <Layout description="vue server side render" keywords="egg, vue, webpack, server side render">
    
    <div class="home">
      <s-button>Button</s-button>
    </div>
  </Layout>
</template>
<style>
  @import "index.css";
</style>
<script type="text/babel">
import Button from 'squid/Button';
  export default {
    components: {
      's-button': Button,
    },
  }
</script>

