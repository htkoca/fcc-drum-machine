// ****************************************************************************************************
// Init
// ****************************************************************************************************

// init native dependencies
const path = require('path');

// init dependencies
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// init variables
const modulesDir = "./node_modules";
const privateDir = "./private";
const publicDir = "./public";

// init mode functions
function getMode(argv){
  if (process.argv[1].includes("webpack-dev-server")){
    return 'development-server'
  } else if (argv.mode !== 'production'){
    return 'development'
  } else {
    return 'production'
  }
}


// ****************************************************************************************************
// Export Config
// ****************************************************************************************************

// export config
module.exports = function (env, argv) {

  // show webpack mode
  const mode = getMode(argv);
  console.log(`Webpack in ${mode} mode`)

  // init config
  let config = {
    // entry file and context
    entry: {
      app: path.resolve(privateDir, 'js/index.js'),
    },
    context: path.resolve(privateDir),
    // aliases
    resolve: {
      extensions: ['.js', '.jsx', '.scss', '.sass', '.css'],
      alias: {
        '@': path.resolve(privateDir),
        '~': path.resolve(modulesDir)
      }
    },
    // bundler modules
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }]
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: mode === 'development-sever' ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [require('autoprefixer')];
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      }, {
        test: /\.(svg|png|jpe?g|gif|txt)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }]
      }, {
        test: /\.json$/,
        type: 'javascript/auto',
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }]
      }]
    },
    // bundler plugins
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        template: path.resolve('./private/index.html'),
        filename: path.resolve('./public/index.html')
      }),
      new HtmlBeautifyPlugin({
        config: {
          html: {
            indent_size: 2,
            indent_with_tabs: false,
            indent_inner_html: true
          }
        }
      }),
      new MiniCssExtractPlugin({
        filename: "css/index.css",
      })
    ],
    // js output
    output: {
      path: path.resolve(publicDir),
      filename: 'js/index.js'
    }
  }

  // init mode based config
  if (mode === 'development-server') {
    // development-server
    config.performance = {
      hints: false
    },
    config.devServer = {
      open: true,
      port: 3001
    }
  } else if (argv.mode !== 'production') {
    // development
    config.devtool = 'source-map'
    config.plugins.push(new CleanWebpackPlugin())
    config.performance = {
      hints: false
    }
  } else {
    // production
    config.devtool = 'source-map'
    config.plugins.push(new CleanWebpackPlugin())
  }

  // return config
  return config;

};