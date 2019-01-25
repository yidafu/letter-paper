const apiRouter = require('./api');
const color = require('colors-cli/safe');
const chokidar = require('chokidar');
const path = require('path');

module.exports = function (app) {
  const watchFile = [path.join(__dirname, './index.js')];
  const watchFiles = Array.isArray(watchFile) ? watchFile : [watchFile];
  if (watchFiles.some(file => !file)) {
    throw new Error('Mocker file does not exist!.');
  }
  const watcher = chokidar.watch(watchFiles.map(watchFile => path.dirname(watchFile)));

  watcher.on('all', function (event, path) {
    if (event === 'change' || event === 'add') {
      try {
        // 当监听的可能是多个配置文件时，需要清理掉更新文件以及入口文件的缓存，重新获取
        cleanCache(path);
        watchFiles.forEach(file => cleanCache(file));

        console.log(`${color.green_b.black(' Done: ')} Hot Mocker ${color.green(path.replace(process.cwd(), ''))} file replacement success!`);
      } catch (ex) {
        console.error(`${color.red_b.black(' Failed: ')} Hot Mocker ${color.red(path.replace(process.cwd(), ''))} file replacement failed!!`);
      }
    }
  });

  app.use('/api', apiRouter);
};

function cleanCache(modulePath) {
  // The entry file does not have a .js suffix,
  // causing the module's resources not to be released.
  // https://github.com/jaywcjlove/webpack-api-mocker/issues/30
  let mPath = modulePath;
  try {
    mPath = require.resolve(modulePath);
  } catch (e) {}
  let module = require.cache[mPath];
  if (!module) return;
  // remove reference in module.parent
  if (module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[mPath] = null;
}
