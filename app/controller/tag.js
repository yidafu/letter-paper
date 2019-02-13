// 2019-02-13 created by Dov Yih
const { Controller } = require('egg');

module.exports = class TagsController extends Controller {
  async index() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = {};
  }
  async show() {
    const { ctx } = this;
    const { service } = ctx;

    ctx.body = {};
  }

};

