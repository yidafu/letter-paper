module.exports = (options) => {
  return async (ctx, next) => {
    console.log('initVisit');
    await next();
  };
};
