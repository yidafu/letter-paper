import Vue from 'vue';
import Vuex from 'vuex';
import * as PostReq from '@/views/Post/services';
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
       *   status, boolean false -> summary, true -> content
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
    },
    [SET_POSTS](state, posts) {
      for (const post of posts) {
        state.posts[post.id] = {
          status: false,
          ...state.posts[post.id],
          ...post,
        };
      }
    }
  },
  actions: {
    async getPosts({ commit }) {
      const homeData = await PostReq.getPosts();
      commit(SET_POSTS_COUNT, homeData.count);
      commit(SET_POSTS, homeData.posts);
    },
    async getPostByID({ commit }, id) {
      const postData = await PostReq.getPostByID(id);
      commit(SET_POSTS, [postData]);
    },
    updatePosts({ commit }, posts) {
      commit(SET_POSTS, posts);
    }
  },
  getters: {
    currentPost(state) {
      return (id) => {
        return state.posts[id];
      };
    },
    postIdx(state) {
      return (postID) => state.posts.filter(post => !!post).findIndex(
        post => {
          return post.id === Number(postID);
        }
      );
    },
    posts(state) {
      return state.posts.filter(post => !!post);
    },
    postIDs(state) {
      return state.posts.filter(post => !!post).map(post => Number(post.id));
    },
  }

});
