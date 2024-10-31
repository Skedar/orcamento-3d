const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
	productionSourceMap: false,
    devServer: {
    	disableHostCheck: true
    },
    configureWebpack: {
        plugins: [
            new ESLintPlugin({
                extensions: ['js', 'jsx', 'vue'],
                fix: true
            })
        ]
    }
}

   