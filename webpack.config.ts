const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
      port: 8080,
      open: true,
      proxy: {
        '/api': 'http://localhost:3000',
      },
      historyApiFallback: true,
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', 'css' ]
    },
    module: {
        rules: [
            {
              test: /\.(ts|tsx)$/,
              loader: 'ts-loader',
              exclude: /node_modules/
            },
            {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader',
              options: {
                presets: ["react", "es2017"]
              },
              exclude: /node_modules/
            },
            {
              test: /\.css?$/,
              loader: 'style-loader!css-loader',
              exclude: /node_modules/
            }
        ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
}

module.exports = config;
