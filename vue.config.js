module.exports = {
    devServer: {
        proxy: {
            '/apiurl': {
                target: 'http://localhost:9000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/apiurl': '/'
                }
            }
        }
    }
}