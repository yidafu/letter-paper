import Vue from 'vue';
import Vuex from 'vuex';
import * as HomeReq from '@/views/Home/services';
import { SET_POSTS_COUNT, SET_POSTS } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coount: 0,
    posts: [
      /** {
       *   category,
       *   date,
       *   id,
       *   summary,
       *   tag,
       *   title,
       *   status, summay, fulltext , hidden,
       * }
       */
    ],
    tags: [],
    archive: [],
  },
  mutations: {
    [SET_POSTS_COUNT](state, newCount) {
      state.count = newCount;
      state.posts = Array(newCount);
      // console.log(state);
    },
    [SET_POSTS](state, posts) {
      console.log('SET_POSTS', posts);
      for (const post of posts) {
        state.posts[post.id] = {
          status: 'summary',
          ...state.posts[post.id],
          ...post,
        };
      }
    }
  },
  actions: {
    async getPosts({ commit }) {
      const homeData = await HomeReq.getPosts();
      commit(SET_POSTS_COUNT, homeData.count);
      commit(SET_POSTS, homeData.posts);
    },
    async getPostByID({ commit }, id) {
      const postData = await HomeReq.getPostByID(id);
      // this because Mock.mock('@id) will generate random ID
      if (process.env.NODE_ENV === 'development') {
        postData.id = id;
      }
      commit(SET_POSTS, [postData]);
    }
  },
  getters: {
    currentPost(state) {
      return (id) => state.posts[id];
    },
    posts(state) {
      return state.posts.filter(post => !!post);
    }
  }

});
