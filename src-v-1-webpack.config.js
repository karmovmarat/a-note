const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
context: __dirname, //path.resolve(__dirname, './src/js'),
  entry: {
       app: './src/js/app.js', // string | object | array
    vendor: [
        'react',
        'react-dom',
        'react-router'
        //...
    ]
  },
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, './build'), // string  '/build' -?
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: '[name].bandle.js', // for multiple entry points e.x. 'app.bandle.js'
    // the filename template for entry chunks
    sourceMapFilename: '[name].bandle.map', // string
    publicPath: 'public' // string     publicPath: "https://cdn.example.com/", 
    // the url to the output directory resolved relative to the HTML page
   // library: "MyLibrary", // string,
    // the name of the exported library
  },
  devtool: 'source-map', // enum   '#source-map'
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
         test: /\.jsx?$/,
      exclude: [ path.resolve(__dirname, 'node_modules') ],   // exclude: /node_modules/

        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include
       loader: 'babel-loader',
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see webpack 1 upgrade guide
      options: { presets: ['env', 'stage-0', 'react'] }
        // options for the loader
      },
      {
            test: /\.css$/,
            use: ['style-loader','css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [require('autoprefixer')]
                }}]
      },
      {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract( {
            use: ['style-loader','css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [require('autoprefixer')]
                    }}, 'sass-loader']
                    })
      }    
            
    ] 
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules

    extensions: [".js", ".json", ".jsx", ".css", ".scss"],
    // extensions that are used

  },

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

   plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        
        new ExtractTextPlugin('app.css'),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: false
        }),

        new UglifyJsPlugin({
            uglifyOptions: {
                exclude: /node_modules/,
              ie8: false,
              ecma: 8,
              parse: {...options},
              mangle: true,
              output: {
                comments: false,
                beautify: false,
                ...options
              },
              compress: true,
              warnings: false
            }
        }),
          
        new CopyWebpackPlugin([{
              from: './src/fonts',
              to: './build/fonts'
        }, {
              from: './src/images',
              to: './build/images'
        }
        ]),
        
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: "body"
        })
    ]
  // list of additional plugins


}
