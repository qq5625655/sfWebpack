const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
module.exports = {
  mode: 'development',
  entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "bundle.js",//打包后输出文件的文件名
    // publicPath:"/build/"
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/, // 能够使用async语法
        use: {
          loader: "babel-loader",
          options: {
            presets: [['@babel/preset-env', {
              useBuiltIns: "usage",
            }]]
          }
        },
        exclude: /node_modules/
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.scss$/,
        use: [{
          loader: "vue-style-loader",
        }, {
          loader: "css-loader",
          options: {
            // modules:true,
            modules: {
              mode: 'local',
              localIdentName: '[local]_[hash:base64:8]'
            },

          }
        },
        {
          loader: "postcss-loader",
        },
        ],
        exclude: /node_modules/
      }
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.html"//new 一个这个插件的实例，并传入相关的参数
    })

  ],
  resolve: {
    // 引入路径不用谢对应的后缀名
    extensions: [".vue", ".js", ".json"],
    // 使用template的时候需要使用
    alias: {
      vue$: "vue/dist/vue.esm.js", // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      '@': path.resolve(__dirname, './app')   //当前目录下的/app目录下
    }
  }
}