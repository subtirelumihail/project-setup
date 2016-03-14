import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import chalk from "chalk";

import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import Logger from "./logger";

import config from './webpack.config.babel';

const hostname = "localhost";
const port     = 8080;

config.output.publicPath = "/";

config.entry.unshift("webpack/hot/dev-server");
config.entry.unshift("webpack-dev-server/client?http://" + hostname + ":" + port);

config.plugins.unshift(new Logger());
config.plugins.unshift(
  new ProgressBarPlugin({
    format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
  })
);

console.log(`Listening at: [ ${chalk.yellow.bold('http://localhost:' + port)} ]\n`);

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  historyApiFallback: true,
  progress: false,
  hot: true,
  inline:   true,
  quiet: false,
  noInfo: true,
  stats: {
    assets: false,
    colors: true,
    version: true,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    children: false
  },
}).listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
});
