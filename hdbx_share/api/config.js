/**
 * Created by VULCAN on 2018/9/28.
 */
/**
 * 接口域名
 */
export const API_HOST = (process.env.NODE_ENV === 'production') ?
    'https://api.hefantv.com' :
    (process.env.NODE_ENV === 'preproduction' ?
        'https://api.adposter.cn' :
        (process.env.NODE_ENV === 'testing' ?
            '//210.14.147.108:8002' :
            '//210.14.147.108:8002'))

/**
 * apidoc接口域名
 */
export const APIDOC_HOST = (process.env.NODE_ENV === 'production') ?
    'https://api.hefantv.com' :
    (process.env.NODE_ENV === 'preproduction' ?
        'https://api.adposter.cn' :
        (process.env.NODE_ENV === 'testing' ?
            '//210.14.147.108:8002' :
            'http://10.10.202.109:9013/mock'))
            // 'http://apidoc.cpcc.in/mock'))

/**
 * 页面链接地址
 */
export const HTML_HOST = (process.env.NODE_ENV === 'production') ?
    'https://api.hefantv.com' :
    (process.env.NODE_ENV === 'preproduction' ?
        '//api.adposter.cn' :
        (process.env.NODE_ENV === 'testing' ?
            '//test.ccopyright.cpcc.in' :
            ''))