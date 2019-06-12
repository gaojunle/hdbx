/**
 * Created by VULCAN on 2018/9/13.
 */
import { API_HOST, APIDOC_HOST } from '@share/api/config'

export default {
    /**
     * R11编程语言接口
     * @param data 参数
     * @returns {*}
     */
    R11ProgramLanguage(data) {
        return this.axios(API_HOST + "/registerQuerySoftServer/R11Register/R11ProgramLanguage")
    },
    /**
     * R11实名认证接口
     * @param data 参数
     * @returns {*}
     */
    R11RealNameCheck(data) {
        return this.axios(API_HOST + "/registerQuerySoftServer/R11Register/R11RealNameCheck", data, { method: 'POST' })
    },
    /**
     * R11登记填报
     * @param data 参数
     * @returns {*}
     */
    addR11BaseInfo(data) {
        return this.axios(API_HOST + "/registerQuerySoftServer/R11Register/addR11BaseInfo", data, { method: 'POST' })
    },
    /**
     * 根据账户id查询企业及人员信息
     * @param data 参数
     * @returns {*}
     */
    companyAndPeople(data) {
        return this.axios(API_HOST + "/userServer/company/companyAndPeople/" + data)
    },
    /**
     * 获取申请个人认证数据
     * @param data 参数
     * @returns {*}
     */
    getPerson(data) {
        return this.axios(API_HOST + "/userServer/person/getPerson/" + data)
    },
}