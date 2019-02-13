// const init = require('./middleware/initVisit');
module.exports = app => {
  const init = app.middleware.initVisit({
    isVisit: false
  });
  const { controller: { home, tag, post, archive }} = app;
  app.get('/', init, home.index);
  app.resources('posts', '/posts', post);
  app.resources('tags', '/tags', tag);
  app.resources('archive', '/archives', archive);
};
