/**
 * Created by VULCAN on 2018/9/13.
 */
import {API_HOST, APIDOC_HOST} from '@share/api/config'

export default {
    /**
     * 软件公告接口
     * @param data 参数
     * @returns {*}
     */
    // 判断是否实名
    getRealName(data) {
        return this.axios(API_HOST + "/userServer/login/accountLogin", data,{
            method: 'POST'
        })
    },
}