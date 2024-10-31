const { defineConfig } = require('@vue/cli-service')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = defineConfig({
	transpileDependencies: true,
    configureWebpack: {
        plugins: [
            new ESLintPlugin({
                extensions: ['js', 'vue'],
                fix: true
            })
        ]
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/scss/_variables.scss";
                `
            }
        }
    }
})

   