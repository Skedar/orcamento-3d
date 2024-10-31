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
        ],
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js'
        },
        define: {
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/scss/_variables.scss";
                `
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/orcamento/' : '/',
    outputDir: 'dist',
    indexPath: 'orcamento.html'
})

   