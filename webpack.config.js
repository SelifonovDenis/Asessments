var path = require('path');

module.exports = {
    entry: {
        login: './public/js/login/main.js',
        index: './public/js/index/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};