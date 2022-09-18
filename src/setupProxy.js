const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        // 경로명
        '/api',
        createProxyMiddleware({
            // 요청하고자 하는 주소를 설정
            target: `${process.env.REACT_APP_API_URL}`,
            changeOrigin: true,
        })
    );
};
