const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: "development",
    devServer: {
		https: true,
		port: 8080,
		host: 'localhost',
		historyApiFallback: true,
	},
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
  
    resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			src: path.resolve(__dirname, './src/'),
		}
    },
  
    module: {
      rules: [
        {
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
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
				options: { 
				  sourceMap: true, 
				  importLoaders: 1,
				  modules: true
				}
			}, {
				loader: 'postcss-loader',
				options: { 
				  sourceMap: true, 
				  plugins: [ autoprefixer({Browserslist: 'last 2 versions'}) ] 
				}
			}, {
				loader: 'less-loader',
				options: { 
				  sourceMap: true,
				}
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