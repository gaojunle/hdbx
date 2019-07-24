/*
 * @Author: 苏喆
 * @Description: webpack 资源路径统一配置文件
 * @Date: 2018-08-14 11:00:05  
 * @Last Modified time: 2018-08-14 11:00:05 
 */

var path = require("path");

module.exports = {
    production: {
        env: "production",
        staticRootFrom: path.resolve(__dirname, "../static"),
        staticRootTo: path.resolve(__dirname, "../dist/static"),
        publicPath: "/query/",
        outPath: path.resolve(__dirname, "../dist"),
        jsPath: [
            // // 只在移动端使用
            // "http://webstatic.hefantv.com/h5/common/common.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/common/wxShare.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/lib/zepto_min.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/lib/vconsole.min.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/common/polyfill.js" +
            //     "?timestamp=" +
            //     Date.now()
        ]
    },
    preproduction: {
        env: "preproduction",
        staticRootFrom: path.resolve(__dirname, "../static"),
        staticRootTo: path.resolve(__dirname, "../dist/static"),
        publicPath: "/query/",
       // publicPath: "http://localhost.hefantv.com:1317/dist/",
        outPath: path.resolve(__dirname, "../dist"),
        jsPath: [
            // 只在移动端使用
            // "http://webstatic.hefantv.com/h5/common/common.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/common/wxShare.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webauthAttachmentstatic.hefantv.com/h5/lib/zepto_min.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/lib/vconsole.min.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/common/polyfill.js" +
            //     "?timestamp=" +
            //     Date.now()
        ]
    },
    testing: {
        env: "testing",
        staticRootFrom: path.resolve(__dirname, "../static"),
        staticRootTo: path.resolve(__dirname, "../dist/static"),
        publicPath: "/query/",
        outPath: path.resolve(__dirname, "../dist"),
        jsPath: [
            "http://cstaticdun.126.net/load.min.js",
            "https://ssl.captcha.qq.com/TCaptcha.js",
            "../static/js/polyfill.js",
            "../static/js/common.js",
        ]
    },
    development: {
        env: "development",
        port: 1318,
        outPath: path.resolve(__dirname, "../dist"),
        staticRootFrom: path.resolve(__dirname, "../static"),
        staticRootTo: path.resolve(__dirname, "../dist/static"),
        publicPath: "/",
        jsPath: [
            "http://cstaticdun.126.net/load.min.js",
            "https://ssl.captcha.qq.com/TCaptcha.js",
            "../static/js/polyfill.js",
            "../static/js/common.js",
        ]
    }
};
