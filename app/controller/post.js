// 2019-02-13 created by Dov Yih
const { Controller } = require('egg');

module.exports = class PostController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('post/index.js', { msg: 'test message' });
  }
  async show() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = {};
  }

};
