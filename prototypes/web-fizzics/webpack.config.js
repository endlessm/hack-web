const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const FIZZICS_APP_PATH = path.join(__dirname, '../libquest-web-common/hack-toy-apps/com.hack_computer.Fizzics/app');

module.exports = {
    entry: './src/main.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8082
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties',
                              '@babel/plugin-transform-runtime']
                }
            },
        ],
    },
    plugins: [
        new CopyPlugin([
            { from: path.join(FIZZICS_APP_PATH, 'main.js'), to: 'main.js' },
            { from: path.join(FIZZICS_APP_PATH, 'assets/'), to: 'assets/' },
            { from: 'node_modules/dat.gui/build/dat.gui.js', to: 'dat.gui.js' },
        ]),
    ],
};
