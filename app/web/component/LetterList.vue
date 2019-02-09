<template>
  <div class="post-list">
    <post-summary v-for="(ID,index) in postIDs" :key="ID" :index="index" :post-id="ID" />
  </div>
</template>

<script>
import Letter from './Letter';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'letter-list',

  components: {
    'post-summary': Letter,
  },
  computed: {
    ...mapGetters([
      'postIDs',
    ]),
  },
  async created() {
    await this.getPosts();
  },


  methods: {

    ...mapActions([
      'getPosts',
    ]),

  }
};
</script>

<style lang="scss" scoped>
/*
 * @see https://stackoverflow.com/questions/23425962/css-transitions-for-layout-changes-as-other-elements-are-revealed-in-the-dom
 *   @see https://css-tricks.com/animating-layouts-with-the-flip-technique/
 * @see https://aerotwist.com/blog/flip-your-animations/
 */
/**
  * enter
  * enter-active
  * enter-to
  * leave
  * leave-active
  * leave-to
  */
.slide-move {
  transition: transform .5s;
}
.post-list {
  // position: relative;
}
</style>
