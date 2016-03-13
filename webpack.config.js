var webpack = require('webpack');
var path    = require('path');

//Plugins
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssLoaderStr = [
  "css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
  "postcss-loader",
  "sass-loader" + '?sourceMap&outputStyle=expanded&sourceMap=true&sourceMapContents=true'
].join("!");

var cssLoader = ExtractTextPlugin.extract("style", cssLoaderStr);

module.exports = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    entry: [
      './src/js/index.js'
    ],
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle[hash].js",
    },
    resolve: {
      root: [path.resolve('./src/js/'), path.resolve('./src/')],
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: path.resolve('./src/js'),  loader: 'babel-loader', exclude: /node_modules/},
            { test: /\.s?css$/, loader: cssLoader },
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=1048576' }, // inline base64 URLs for <=1MB images, direct URLs for the rest
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: 'body'
      }),
      new ExtractTextPlugin("[contenthash].css"),
      new webpack.DefinePlugin({
        "process.env": {
           NODE_ENV: JSON.stringify(process.env.NODE_ENV)
         }
      }),
    ]

};
