const defaultConfig = require("./webpack.config.js");

module.exports = {
    ...defaultConfig,
    mode: "production",
    output: {
        path: `${__dirname}/dist`,
        filename: "tween24.esm.js",
        library: {
            type: "module",
        },
        module: true,
    },
    experiments: {
        outputModule: true,
    },
};
