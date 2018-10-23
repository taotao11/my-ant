const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  "proxy":{
    "/test/": {
      "target": "http://127.0.0.1:8080",
      "secure": false,
      "changeOrigin": true
    },
    "/book/": {
      "target": "http://127.0.0.1:8085",
      "secure": false,
      "changeOrigin": true,
    },
    "/jsoupnode/": {
      "target": "http://127.0.0.1:8085",
      "secure": false,
      "changeOrigin": true,
    },
    "/jsoup/": {
      "target": "http://127.0.0.1:8085",
      "secure": false,
      "changeOrigin": true,
    },
  },
  externals: {
    '@antv/data-set': 'DataSet',
    rollbar: 'rollbar',
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
