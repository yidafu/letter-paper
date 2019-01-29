<template>
  <div class="post-list">
    <post-summary v-for="(ID,index) in postIDs" :key="ID" :index="index" :post-id="ID" @click="handleClick" />
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
      'currentPost',
      'posts',
      'postIDs',
      'postIdx',
    ]),
  },
  watch: {
    '$route': 'routerChange'
  },
  async created() {
    await this.getPosts();
    // this.posts = this.statePosts
    // console.log('created');
  },


  methods: {
    handleClick(e, id) {
      this.$router.push(`/post/${id}`);

      this.updatePost(id);

    },
    async updatePost(postID, partialPost = {}) {

      let postIdx = this.postIdx(postID);

      // get new copy without `__ob__`
      let postCopy = { ...this.currentPost(postID), ...partialPost };

      if (!partialPost.hasOwnProperty('status')) {
        postCopy.status = !this.currentPost(postID).status;
      }

      let statusChangedPosts = this.posts.map(post => ({ ...post, status: false }));
      statusChangedPosts[postIdx] = postCopy;
      // console.log(postCopy)
      // this.posts = statusChangedPosts;
      this.updatePosts(statusChangedPosts);
    },
    ...mapActions([
      'getPosts',
      'getPostByID',
      'updatePosts',
    ]),
    async routerChange() {
      // this.posts = this.statePosts

      if (this.$route.path.indexOf('/post') !== -1) {
        const postID = this.$route.params.id;
        await this.getPostByID(postID);
        this.updatePost(postID, { status: true });
      }
    },

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
