
module.exports = app => {

  return class HomeController extends app.Controller {

    async index() {
      const { ctx } = this;
      await ctx.render('home/index.js');
    }

    async post() {
      const { ctx } = this;
      await ctx.render('post/index.js', { msg: 'test message' });
    }

  };
};
