const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: "production",
  
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
  
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          test: /\.css$/,
          use: [{
            loader: 'style-loader'
          }, {
              loader: 'css-loader',
              options: { 
                sourceMap: true, 
                importLoaders: 1 
              }
          }, {
              loader: 'postcss-loader',
              options: { plugins: [ autoprefixer({Browserslist: 'last 2 versions'}) ] }
          }]
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: { sourceMap: true, importLoaders: 1, modules: true}
            }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, plugins: [ autoprefixer() ] }
            }, {
                loader: 'less-loader',
                options: { sourceMap: true }
            }, {
              loader: 'typed-css-modules-loader'
            }]
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ]
    },
   
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webrtc test',
            template: path.resolve(__dirname, 'src', 'index.ejs')        }),
    ]
};