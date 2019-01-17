module.exports = {
    devServer: {
        proxy: {
            '/apiurl': {
                target: 'http://localhost:9002/',
                changeOrigin: true,
                pathRewrite: {
                    '^/apiurl': '/'
                }
            }
        }
    }
}