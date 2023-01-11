// vue.config.js
const crypto = require('crypto');

/**
 * md4 algorithm is not available anymore in NodeJS 17+ (because of lib SSL 3).
 * In that case, silently replace md4 by md5 algorithm.
 */
try {
  crypto.createHash('md4');
} catch (e) {
  console.warn('Crypto "md4" is not supported anymore by this Node version');
  const origCreateHash = crypto.createHash;
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
  };
}
module.exports = {
  runtimeCompiler: true,
  // proxy all webpack dev-server requests starting with /api
  // to our Spring Boot backend (localhost:8088) using http-proxy-middleware
  // see https://cli.vuejs.org/config/#devserver-proxy
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        ws: true,
        changeOrigin: true
      },
    '/logout': {
      target: 'http://localhost:8090',
        ws: true,
        changeOrigin: true
    },
    '/files': {
      target: 'http://localhost:8090',
        ws: true,
        changeOrigin: true
    }
    }
  },
  // Change build paths to make them Maven compatible
  // see https://cli.vuejs.org/config/
  outputDir: 'target/dist',
  assetsDir: 'static',
  configureWebpack: {
    output: {
      filename: "static/js/[name].[hash].js",
      chunkFilename: "static/js/[name].[hash].js"
    }
  },
}
