const path = require('path')

module.exports = {
  repo: {
    name: 'posts',
    path: 'https://github.com/yidafu/blog-post.git',
  },
  output: {
    dir: path.resolve(__dirname, '../mock'),
  },
};

