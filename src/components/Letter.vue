<template>
    <article
      @click="$emit('click', $event, data.id)"
      :id="`article-${data.id}`"
      :data-article-id="data.id"
      class="letter"
      :class="{'pull-back': shrink}"
    >
      <h1 >{{data.title}}</h1>
      <!-- {{log(content)}} -->
      <div class="content">
        {{content}}
      </div>
    </article>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'letter',
  props: {
    postId: Number,
    index: Number,
  },
  data() {
    // const data =
    return {
      // content: '',
      shrink: false,
      data: {},
      firstRect: {},
      lastRect: {},
    };
  },
  computed: {
    content() {
      const { data } = this;
      return data.status ? data.content : data.summary;
    },
    ...mapGetters([
      'currentPost',
    ]),
  },
  watch: {
    '$route'() {
      if (this.$route.path === '/') { // Index page

      } else if (this.$route.path.indexOf('/post') !== -1) { // post page
        this.firstRect = this.$el.getBoundingClientRect();
        if (this.$route.params.id === this.data.id) { // id matched
          this.data.status = true;
          this.shrink = false;
        } else { // id not matched
          // this.firstRect = {height: '20px'}
          // this.slideArticle()
          this.shrink = true;
          this.data.status = false;
        }
      }
    }
  },

  created() {
    this.data = this.currentPost(this.postId);
  },
  updated() {
    // trigger animation after content updated
    this.slideArticle();
  },
  methods: {
    log(...arg) {
      console.log(...arg);
    },
    slideArticle() {
      const { firstRect } = this;
      const articleElm = this.$el;


      const lastRect = articleElm.getBoundingClientRect();

      // TODO More friendly user interaction when toggle a new post
      // const duration = firstRect.height > lastRect.height ? 100 : 500;
      // const baseTop = window.pageYOffset + firstRect.top;

      const animateHandle = articleElm.animate([
        { height: firstRect.height + 'px' },
        { height: lastRect.height + 'px' },
      ], {
        duration: 500,
      });
      animateHandle.onfinish = function() {
        console.log('animation finshed:', this);
      };
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

.pull-back {
  padding-top: $a4-padding-left - 10mm;
  height: 0;
}
</style>
