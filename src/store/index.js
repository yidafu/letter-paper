import Vue from 'vue';
import Vuex from 'vuex';
import * as HomeReq from '@/views/Home/services';
import { SET_POSTS_COUNT, SET_POSTS } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coount: 0,
    posts: [],
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
      for (const post of posts) {
        state.posts[post.id] = post;
      }
      console.log(state);
    }
  },
  actions: {
    async getPosts({ commit }) {
      const homeData = await HomeReq.getPosts();
      commit(SET_POSTS_COUNT, homeData.count);
      commit(SET_POSTS, homeData.posts);
    }
  },
  getters: {
    getPostByID(state) {
      return (id) => state;
    },
    posts(state) {
      return state.posts.filter(post => !!post);
    }
  }

});
