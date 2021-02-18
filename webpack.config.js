module.exports = {
    // mode: 'production',
    mode: "development",
    // target: ['web', 'es5'],
    devServer: {
        open: true
    },
    entry: './src/Tween24.ts',
    output: {
        path: `${__dirname}/dist`,
        filename: 'tween24.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
      extensions: ['.js', '.ts']
    }
}