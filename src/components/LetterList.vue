<template>
  <transition-group name="slide-in" tag="span">
    <post-summary v-for="post in posts" :key="post.id" :data="post" @click="handleClick" />
  </transition-group>
</template>

<script>
import Letter from './Letter';
import { mapActions, mapGetters } from 'vuex';

export default {

  components: {
    'post-summary': Letter,
  },
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapGetters([
      'currentPost',
    ]),
    ...mapGetters({
      statePosts: 'posts',
    })
  },
  watch: {
    posts(newPost, oldPost) {
      console.log('posts changed');
      console.log(newPost, oldPost);
    }
  },
  async created() {
    if (this.$route.path.indexOf('/post') !== -1) {
      await this.getPosts();
    }
    this.posts = this.statePosts;
  },

  methods: {
    async handleClick(event, id) {
      let postIdx = this.posts.findIndex(post => post.id === id);

      let fullPostData = { ...this.posts[postIdx] };
      if (!fullPostData.content) {
        await this.getPostByID(id);
        fullPostData = {
          ...this.posts[postIdx],
          ...this.currentPost(id),
        };
      }
      fullPostData.status = fullPostData.status === 'fulltext' ? 'summary' : 'fulltext';

      // change clicked post display status
      const statusChangedPosts = this.posts.map(
        post => {
          post.status = 'summary';
          return { ...post };
        }
      );
      statusChangedPosts[postIdx] = fullPostData;
      // console.log(statusChangedPosts)
      this.posts = statusChangedPosts;
    },
    // enter(el, done) {

    // },
    ...mapActions([
      'getPosts',
      'getPostByID',
    ])
  },

};
</script>

<style lang="scss" scoped>
// .slide-in-enter {
//   transform: opacity .5s;
// }
.slide-in-enter {
  animation: bounce-in .5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
