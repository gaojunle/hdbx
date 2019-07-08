/**
 * Created by gaojun on 2017/7/06.
 */
import {API_HOST, APIDOC_HOST} from '@share/api/config'

export default {
    /**
     * 初次提交数据
     * @param data 参数
     * @returns {*}
     */
    Z11BaseInfo(data) {
        return this.axios(API_HOST + "/RegisterBaseInfo/Z11BaseInfo", data, {
            method: 'POST'
        })
    },
    /**
     * 用户补交数据
     * @param data 参数
     * @returns {*}
     */
    reFillin(data) {
        return this.axios(API_HOST + "/RegisterBaseInfo/opusExamine/reFillin", data, {
            method: 'POST'
        })
    },
    /**
     * 作品回显数据
     * @param data 参数
     * @returns {*}
     */
    z11InfoAndReFillInfo(data) {
        return this.axios(API_HOST + "/RegisterBaseInfo/z11InfoAndReFillInfo", data)
    },

}