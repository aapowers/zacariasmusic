const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]}
                )
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new CommonsChunkPlugin('commons'),
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
