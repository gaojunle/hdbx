/**
 * Created by VULCAN on 2018/8/8.
 */
import axios from 'axios'
import errorCode from './code'
import {
    HTML_HOST
} from './config'

axios.interceptors.request.use(config => {
    const userInfo = getCookie()
    const backstageUserInfo = getCookie('backstageUserInfo')
    if (userInfo) {
        config.headers['Authorization'] = 'Bearer ' + userInfo.authorization_token
        config.headers['authorization_token'] = userInfo.authorization_token
        config.headers['authorization_key'] = userInfo.authorization_key
    } else if (backstageUserInfo) {
        config.headers['Authorization'] = 'Bearer ' + backstageUserInfo.authorization_token
        config.headers['authorization_token'] = backstageUserInfo.authorization_token
        config.headers['authorization_key'] = backstageUserInfo.authorization_key
    }
    return config
}, error => {
    pageShowMsg('请求超时')
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    let res = null
    if (response.data.returnCode === 'SUCCESS') {
        res = response.data
    } else {
        switch (parseInt(response.data.errExceptionCode)) {
            case errorCode.phoneCodeError:
            case errorCode.emailCodeError:
            case errorCode.loginNamedError:
            case errorCode.passwordError:
                res = response.data
                break
            case errorCode.TokenNull:
            case errorCode.TokenExpire:
            case errorCode.TokenFail:
                pageShowMsg(response.data.message)
                clearCookie()
                setTimeout(() => {
                    window.location.href = HTML_HOST + '/accounts/login.html?linkBackUrl=' + window.location.href
                }, 1000)
                break
            default:
                pageShowMsg(response.data.message)
                return Promise.reject(response.data.message)
                break
        }
    }
    return res
}, err => {
    // 对响应错误做点什么
    if (err.response) {
        switch (err.response.status) {
            case 401:
                // autoToLogin()
                break
            default:
                pageShowMsg(err.response.data.message)
                break
        }
    } else {
        pageShowMsg(err)
    }


    return Promise.reject(err)
})

/** 弹出提示框 **/
function pageShowMsg(msg) {
    if (msg && String(msg).trim().length == 0) return false
    let msgStr = '<span>' + msg + '</span>',
        msgTime,
        msgPopBox = document.getElementById('msgPopBox'),
        msgBox = document.getElementById('msgBox')
    if (!msgPopBox) {
        msgPopBox = document.createElement("div")
        msgBox = document.createElement("div")
        msgPopBox.setAttribute("id", "msgPopBox")
        msgBox.setAttribute("id", "msgBox")
        msgPopBox.appendChild(msgBox)
        document.body.appendChild(msgPopBox)
    }
    msgBox.innerHTML = msg
    msgPopBox.style.display = 'block'



    clearTimeout(msgTime)
    msgTime = setTimeout(() => {
        msgBox.innerHTML = 'msg'
        msgPopBox.style.display = 'none'
    }, 2000)
}

// export default axios
export default (url, data = {}, {
    method = 'get',
    headers = {},
    timeout = 15000
} = {}) => {
    let params = method == 'get' ? {
        params: data
    } : {
        data
    }
    return axios({
        method,
        url,
        headers,
        timeout,
        ...params,
    })
}