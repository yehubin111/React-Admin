export default {
    productName: 'react', // 影响缓存数据的保存
    navLogo: require('assets/images/logo.png').default,  // 内页菜单栏logo
    avatar: require('assets/images/logo.png').default, // 默认头像
    mainLogo: require('assets/images/logo.png'), // 手机端内页头部logo
    // loginBg: require('assets/images/bg_login.jpg'),  // 登录页背景图
    title: 'Object',
    introduce: '', // 登录页logo下方文字
    api: { // 页面请求相关
        origin: '', // https://ssr-api.diosamo.top
        path: '/api'
    },
    limit: { // 路由权限配置
        normalLimit: false,
        authorLimit: false,
    },
    structure: { // 页面结构配置
        navType: 'side', // side top
        theme: 'dark', // dark light
    },
    showPageInfo: false, // 是否显示页面信息栏
    copyright: 'Copyright © 2021',  // 版权
    showCopyright: false, // 是否显示页面版权信息
    useCache: true, // 是否开启页面缓存
}