module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    include: ['app/web/page'],
    exclude: ['app/web/page/[a-z]+/component', 'app/web/page/test'],
    loader: {
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
    }
  },
  alias: {
    asset: 'app/web/asset',
    client: 'app/web/framework/vue/entry/client.js',
    component: 'app/web/component',
    framework: 'app/web/framework',
    vue: 'vue/dist/vue.esm.js',
    server: 'app/web/framework/vue/entry/server.js',
    squid: 'app/squid'
  },
  dll: ['vue', 'axios'],
  loaders: {},
  plugins: {},
  done() {
    // empty function
  }
};
