
export const wxConfig = {
    OAuthUrl: 'https://open.weixin.qq.com/connect/oauth2',
    appid: 'wxced2219afe5ecd7b',
    redirectUri: 'http%3A%2F%2Fyls.whfitc.cn%2Ffitcweb%2F%23%2Fwxlogin',
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: 'STATE#wechat_redirect'
}

export const config={
    pageSize: 20,//每页大小
    // webUrl: 'http://192.168.2.15:9005', //webserver请求地址
    // socketUrl: 'ws://192.168.2.15:9002',//袁来双电脑
    socketUrl: 'ws://192.168.2.51:4405',//测试服务器
    webUrl: 'http://192.168.2.51:9090', //webserver请求地址测试服务器
    //连接类型为websocket
    socketOptions: { transports: ['websocket'] },
    wxLoginUrl: `${wxConfig.OAuthUrl}/authorize?appid=${wxConfig.appid}&redirect_uri=${wxConfig.redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
   
}
  //图片资源查看
export const getImage= (imageUrl) => {
    return `${config.webUrl}/Upload/${imageUrl}`;
}

//关于
export const about = {
    aboutUs: 'http://www.whfitc.cn/mobile/node/about_us', //关于我们
    userManual: 'http://www.whfitc.cn/mobile/node/mobile_guide_menu', //帮助手册
}

// APP 相关
export const APP = {
    version: '1.0.6',  // 版本号
}

export default config;