module.exports = {
    target: ["web"],
    devServer: {
        static: {
            directory: "./"
        },
        open: "sample/index.html",
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
    resolve: {
        extensions: [".js", ".ts"],
    }
};
