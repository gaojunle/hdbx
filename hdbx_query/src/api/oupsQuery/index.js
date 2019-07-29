/**
 * Created by gaojun on 2017/7/06.
 */
import {API_HOST, APIDOC_HOST} from '@share/api/config'

export default {
    /**
     * 获取著作人第一位的个人信息
     * @param data 参数
     * @returns {*}
     */
    ownerInfo(data) {
        return this.axios(API_HOST + "/registerQueryOpusServer/RegisterBaseInfo/ownerInfo", data, {
            method: 'POST'
        })
    },
    /**
     * 初次提交数据
     * @param data 参数
     * @returns {*}
     */
    Z11BaseInfo(data) {
        return this.axios(API_HOST + "/registerQueryOpusServer/RegisterBaseInfo/Z11BaseInfo", data, {
            method: 'POST'
        })
    },
    /**
     * 用户补交数据
     * @param data 参数
     * @returns {*}
     */
    reFillin(z11RegisterApplyInfoVo, flowNumber) {
        return this.axios(API_HOST + "/registerQueryOpusServer/RegisterBaseInfo/opusExamine/reFillin", {
            z11RegisterApplyInfoVo: z11RegisterApplyInfoVo,
            flowNumber: flowNumber
        }, {
            method: 'POST'
        })
    },
    /**
     * 作品回显数据
     * @param data 参数
     * @returns {*}
     */
    z11InfoAndReFillInfo(data) {
        return this.axios(API_HOST + "/registerQueryOpusServer/RegisterBaseInfo/z11InfoAndReFillInfo/" + data.flowNumber, {})
    },

    /**
     * 获取登记大厅地址
     * @param data 参数
     * @returns {*}
     */
    getRegistrationMethod(data) {
        return this.axios(API_HOST + "/registerQueryOpusServer/RegisterBaseInfo/getRegistrationMethod", data)
    },
    /**
     * 查询申请材料清单
     * @param data 参数
     * @returns {*}
     */
    searchApplicationDocuments(data) {
        return this.axios(API_HOST + "/opusManageServer/opusExamine/searchApplicationDocuments", data)
    },
    /**
     * 打印数据
     * @param data 参数
     * @returns {*}
     */
    applyDocument(data) {
        return this.axios(API_HOST + "/registerQueryOpusServer/RegisterBaseInfo/applyDocument/" + data.flowNumber, {})
    },

}