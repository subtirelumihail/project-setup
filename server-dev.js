import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './webpack.config.babel';

const hostname = "localhost";
const port     = 8080;

config.output.publicPath = "/";

config.entry.unshift("webpack/hot/dev-server");
config.entry.unshift("webpack-dev-server/client?http://" + hostname + ":" + port);

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  historyApiFallback: true,
  progress: false,
  hot: true,
  inline:   true,
  quiet: false,
  noInfo: false,
  stats: {
    assets: false,
    colors: true,
    version: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    children: false
  },
}).listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + port);
});
