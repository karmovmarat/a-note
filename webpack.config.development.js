const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
 // для девелопмент: const merge = require('webpack-merge'); 
 // для девелопмент: const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 // для девелопмент: const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: __dirname, //path.resolve(__dirname, './src/js'),
  entry: {
       zapp: './src/js/app.js', // string | object | array
       vendor: [
        'react',
        'react-dom',
        'react-bootstrap'
        //...
       ]
  },
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'build'), // string  '/build' -? это путь куда складывается сборка
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: '[name].bandle.js', // for multiple entry points e.x. 'zapp.bandle.js'
    // the filename template for entry chunks
    sourceMapFilename: 'bandle.map', // string
    publicPath: './' // string это путь для формирования <script src="./zzapp.bandle.js"> </script>
    //    publicPath: "https://cdn.example.com/", 
    // the url to the output directory resolved relative to the HTML page
   // library: "MyLibrary", // string,
    // the name of the exported library
  },
  devtool: '#source-map', // enum   '#source-map'  'inline-source-map'
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
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { 
              name: '[name].[ext]',
             // publicPath: './images/',
              outputPath: 'images/' //этот путь добавится к имени файла, а затем к пути output: { publicPath
              // будет так  ./images/[name].[ext]
            }  
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
             name: '[name].[ext]',
             // publicPath: './images/',
              outputPath: 'fonts/bootstrap/' //этот путь добавится к имени файла, а затем к пути output: { publicPath
              // будет так  ./fonts/bootstrap/[name].[ext]
          }
        }
      },
      {
        test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            },
            { 
              loader: 'css-loader', options: { sourceMap: true }
            },
            { 
              loader: 'postcss-loader',
              options: { 
                sourceMap: true,
                plugins: () => [require('autoprefixer')]
                 } 
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [ path.join('./src/sass') ],
                sourceMap: true
              }
            }
          ]
        
       } 
            
    ]  

  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      "node_modules",
      path.resolve(__dirname, "node_modules")
    ],
    // directories where to look for modules

    extensions: ['.js', '.json', '.jsx', '.css', '.scss']    // extensions that are used

  },

  devServer: {
    
    contentBase: './src',//'./build', // boolean | string | array, static file location = path.join(__dirname),
    open: true,
    publicPath: "/", // это путь от корня сайта для index.html
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

   plugins: [

        new CleanWebpackPlugin(['build/*.*']),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        
        
       // new ExtractTextPlugin('zapp.css'),

       // для девелопмент:   new UglifyJsPlugin({        }),
          
        new CopyWebpackPlugin([{
              from: './src/fonts',
              to: './fonts'
              }, 
                {
              from: './src/images',
              to: './images'
              }
        ]),
        
       // для девелопмент:   new OptimizeCssAssetsPlugin({        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'HotMR',
            inject: "body"
        })
    ]
  // list of additional plugins
}
