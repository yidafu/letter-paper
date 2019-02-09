
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/post', app.controller.home.post);
  app.get('/pager', app.controller.home.pager);
};
