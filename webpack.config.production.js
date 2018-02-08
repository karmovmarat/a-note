const webpack = require("webpack");
const Path = require('path');
 // для продакшн: const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
 // для продакшн: const merge = require('webpack-merge'); 
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
        'react-bootstrap'
        //...
     ]
  },
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results
    path: Path.resolve(__dirname, 'build'), // string  '/build' -?
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: '[name].bandle.js', // for multiple entry points e.x. 'app.bandle.js'
    // the filename template for entry chunks
  // для продакшн:  sourceMapFilename: '[name].bandle.map', // string
    publicPath: './' // string это путь для формирования <script src="./zzapp.bandle.js"> </script>
    //    publicPath: "https://cdn.example.com/", 
    // the url to the output directory resolved relative to the HTML page
   // library: "MyLibrary", // string,
    // the name of the exported library
  },
   // для продакшн: devtool: 'source-map', // enum   '#source-map'
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
         test: /\.jsx?$/,
      exclude: [ Path.resolve(__dirname, 'node_modules') ],   // exclude: /node_modules/

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
        test: /\.(png|jpg|gif)$/,
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
              outputPath: 'fonts/awesome/' //этот путь добавится к имени файла, а затем к пути output: { publicPath
              // будет так  ./fonts/bootstrap/[name].[ext]
          }
        }
      },
      

      {
        test: /\.scss$/,

        loader: ExtractTextPlugin.extract({
        //  fallback: 'style-loader', использовать желательно только на develomment
          use: [
            'css-loader',
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
                includePaths: [ Path.join('./src/sass') ]
              }
            }
          ]
        })
      }    
            
    ] 
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      "node_modules",
      Path.resolve(__dirname, "node_modules")
    ],
    // directories where to look for modules

    extensions: ['.js', '.json', '.jsx', '.css', '.scss']    // extensions that are used

  },

      // для продакшн: devServer: {  },

   plugins: [
        // для продакшн:  new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify("production")} }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin('app.css'),

        new UglifyJsPlugin({
            uglifyOptions: {
                exclude: /node_modules/,
              ie8: false,
              ecma: 8,
             // parse: {...options},
              mangle: true,
              output: {
                comments: false,
                beautify: false
                //...options
              },
              compress: true,
              warnings: false
            }
        }),
          
        new CopyWebpackPlugin([{
              from: './src/fonts/awesome_light',
              to: './fonts/awesome'
        }, {
              from: './src/images',
              to: './images'
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
