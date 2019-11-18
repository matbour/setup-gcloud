module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/install.ts",
    target: 'node',
    output: {
        filename: "install.js"
    },
    resolve: {
        extensions: [".ts", ".ts", ".js"]
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: "ts-loader"}
        ]
    }
};
