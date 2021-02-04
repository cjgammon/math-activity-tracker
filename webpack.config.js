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
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: { sourceMap: true, importLoaders: 1 }
            }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, plugins: [ autoprefixer() ] }
            }, {
                loader: 'less-loader',
                options: { sourceMap: true }
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
  
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*
    externals: {
     // "react": "React",
     // "react-dom": "ReactDOM"
    },
    */
   
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webrtc test',
            template: path.resolve(__dirname, 'src', 'index.ejs')        }),
    ]
};