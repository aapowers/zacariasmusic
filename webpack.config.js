const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: {
        'index': './layouts/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'static/assets'),
        publicPath: '/assets/',
        pathinfo: true,
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new ProvidePlugin({
            'window.$': "jquery",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default'],
            Tether: "tether",
            "window.Tether": "tether"
        })
    ]
};
