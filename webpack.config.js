const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development'; // Определение режима сборки на основе значения argv.mode

  return {
    entry: './script.js', // Точка входа для JavaScript
    output: {
      path: path.resolve(__dirname, 'dist'), // Путь к выходной директории
      filename: 'script.js', // Имя выходного файла JavaScript
    },
    mode: isDevelopment ? 'development' : 'production', // Установка режима сборки
    module: {
      rules: [
        {
          test: /\.css$/, // Правило для обработки файлов CSS
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, // Использование style-loader в режиме разработки и MiniCssExtractPlugin.loader в режиме продакшена
            'css-loader', // Загрузчик для обработки CSS
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Путь к исходному HTML-шаблону
        filename: 'index.html', // Имя выходного HTML-файла
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css', // Имя выходного файла CSS
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'), // Путь к статическим файлам, которые будут обслуживаться DevServer
      },
      port: 8080, // Порт, на котором будет запущен DevServer
    },
  };
};
