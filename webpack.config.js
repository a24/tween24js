module.exports = {
    target: ["web"],
    devServer: {
        contentBase: "./",
        publicPath: "/dist/",
        open: true,
        openPage: "sample/index.html",
    },
    entry: "./src/index.ts",
    output: {
        path: `${__dirname}/dist`,
        filename: "tween24.js",
        libraryTarget: "umd",
        globalObject: "this",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
            },
        ],
    },
    experiments: {
        outputModule: true,
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
};
