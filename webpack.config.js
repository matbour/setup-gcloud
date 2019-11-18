module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/install.ts",
    output: {
        filename: "install.js"
    },
    resolve: {
        extensions: [".ts", ".ts", ".js"]
    },
    externals: [
        'child_process'
    ],
    module: {
        rules: [
            {test: /\.ts$/, loader: "ts-loader"}
        ]
    }
};
