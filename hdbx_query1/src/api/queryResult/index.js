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
    getSoftPublicity(data) {
        return this.axios(API_HOST + "/internalAPI/getSoftPublicity", data)
    },
    /**
     * 作品公告接口
     * @param data 参数
     * @returns {*}
     */
    getOpusPublicity(data) {
        return this.axios(API_HOST + "/internalAPI/getOpusPublicity", data)
    },
    /**
     * DCI公告接口
     * @param data 参数
     * @returns {*}
     */
    getDCIPublicity(data) {
        return this.axios(API_HOST + "/internalAPI/getDCIPublicity", data)
    },
    /**
     * 软件公告详情接口
     * @param data 参数
     * @returns {*}
     */
    getSoftPublicityDetail(data) {
        return this.axios(API_HOST + "/internalAPI/getSoftPublicityDetail", data)
    },
    /**
     * 作品公告详情接口
     * @param data 参数
     * @returns {*}
     */
    getOpusPublicityDetail(data) {
        return this.axios(API_HOST + "/internalAPI/getOpusPublicityDetail", data)
    },
}