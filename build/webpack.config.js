const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const webpack = require('webpack')
module.exports = {
  // 指定打包模式
  mode: 'development',
  entry: {
    // 指定入口文件
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    // 配置出口文件
    path: path.resolve(__dirname, '../dist'),
    // 生成js文件名称
    filename: 'js/[name].[hash:8].js',
    // 生成chunk名称
    chunkFilename: 'js/[name].[hash:8].js',
    // 资源引用路径  这里在dev时一定要注释，否则加载不出来网页！！！
    // publicPath: './'
  },
  target: 'web',
  devServer: {
    hot: true,
    port: 8080,
    contentBase: './dist'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/, // 排除文件
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader'
          },
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    // new webpack.NamedModulesPlugin(),  // 在webpack5.x中，webpack.NamedModulesPlugin的功能已经内置
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
}
