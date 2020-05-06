/**
 *  项目配置
 */
/*eslint-disable */
const ENV = process.env.NODE_ENV

// 基础路径 、基础路由
let apiUrl, hostUrl
switch (ENV) {
    case 'production':
        // 正式环境
        apiUrl = 'https://api.mobilemart.cn'
        hostUrl = 'hufu.mobilemart.cn'
        break
    case 'pre':
        // 测试环境
        apiUrl = 'https://test-api.mobilemart.cn'
        hostUrl = 'pre-hufu.mobilemart.cn'
        break
    default:
        // dev环境
        apiUrl = 'https://dev-api.mobilemart.cn'
        hostUrl = 'dev-hufu.mobilemart.cn'
}

module.exports = {
    name: '项目名称',
    // 基础URL
    apiUrl,
    // 地址前缀
    preUrlPath: '',
    hostUrl,
}