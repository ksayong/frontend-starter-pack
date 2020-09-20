const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: MODE,

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: "./src/js/index.js",
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: outputPath,
        // 出力ファイル名
        filename: "js/bundle.js",
    },

    module: {
        rules: [
            {
                // 拡張子 .js の場合
                test: /\.js$/,
                use: [
                    {
                        // Babel を利用する
                        loader: 'babel-loader',
                        // Babel のオプションを指定する
                        options: {
                            presets: [
                                // プリセットを指定することで、ES5 に変換
                                '@babel/preset-env',
                            ]
                        }
                    }
                ]
            },
            // Sassファイルの読み込みとコンパイル
            {
                test: /\.scss/, // 対象となるファイルの拡張子
                use: [
                    // CSSファイルを書き出すオプションを有効にする
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // CSSをバンドルするための機能
                    {
                        loader: "css-loader",
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            url: false,
                            // ソースマップの利用有無
                            sourceMap: enabledSourceMap,

                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            // ソースマップの利用有無
                            sourceMap: enabledSourceMap,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        // CSSファイルを外だしにするプラグイン
        new MiniCssExtractPlugin({
            // ファイル名を設定します
            filename: "css/style.css",
        }),
    ],

    // webpack-dev-serverを立ち上げた時のドキュメントルートを設定
    // ここではdistディレクトリのindex.htmlにアクセスするよう設定してます
    devServer: {
        contentBase: outputPath
    },
};