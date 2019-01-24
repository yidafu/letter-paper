
const apiRouter = require('./api');

module.exports =  function(app, server) {
  app.use('/api', apiRouter)
}