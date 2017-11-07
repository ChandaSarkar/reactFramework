var path = require("path");

function normalizePath(dirPath) {
    return path.normalize(__dirname + dirPath);
}

module.exports = {
    entry: {
        reactscript: normalizePath('/src/scripts/reactscript.jsx')
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ],
    }
}