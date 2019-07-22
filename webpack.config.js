var path = require('path');

module.exports = {
    entry: {
        'js/login/bundle.js': './public/js/login/main.js',
        'js/index/bundle.js': './public/js/index/main.js',
        'js/asessments/bundle.js': './public/js/asessments/main.js',
        'js/workers/bundle.js': './public/js/workers/main.js',
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'public')
    },

};