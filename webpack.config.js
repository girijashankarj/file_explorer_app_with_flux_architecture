// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development', // Set development mode
    optimization: {
        minimize: false, // Disable code minification
    },
    devtool: 'source-map', // Generate source maps for debugging
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};