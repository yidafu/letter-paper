// const init = require('./middleware/initVisit');
module.exports = app => {
  const init = app.middleware.initVisit({
    isVisit: false
  });
  app.get('/', init, app.controller.home.index);
  app.get('/post', app.controller.home.post);
  // app.get('/pager', app.controller.home.pager);
};
