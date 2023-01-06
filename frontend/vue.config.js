// vue.config.js
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
