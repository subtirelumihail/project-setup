var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');

var hostname = "localhost";
var port     = 8080;

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
config.entry.unshift("webpack/hot/dev-server");
config.entry.unshift("webpack-dev-server/client?http://" + hostname + ":" + port);
config.output.publicPath = "/";

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  hot: true,
  historyApiFallback: true,
  progress: true,
  inline:   true,
  stats: {
    assets: true,
    colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false,
    source: true,
		children: true
  },
}).listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + port);
});
