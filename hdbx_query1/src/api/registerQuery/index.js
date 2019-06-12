/**
 * Created by VULCAN on 2018/9/13.
 */
import {
    API_HOST,
    APIDOC_HOST
} from '@share/api/config'

export default {
    /**
     * 软件相关信息获取
     * @param data 参数
     * @returns {*}
     */
    getSoftInfo(data) {
        return this.axios(API_HOST + "/registerQuerySoftServer/softQuery/getSoftPeopleInfo", data)
    },

    /**
     * 软件提交
     * @param data 参数
     * @returns {*}
     */
    softSubmit(data) {
        return this.axios(API_HOST + "/registerQuerySoftServer/softQuery/addQueryBaseInfo", data, {
            method: 'post'
        })
    },
    /**
     * 软件提交信息修改
     * @param data 参数
     * @returns {*}
     */
    softUpdata(data) {
        return this.axios(API_HOST + "/registerQuerySoftServer/softQuery/updateQueryBaseInfo", data, {
            method: 'post'
        })
    },

    /**
     * 作品提交
     * @param data 参数
     * @returns {*}
     */
    opusSubmit(data) {
        return this.axios(API_HOST + "/registerQueryOpusServer/opusQuery/addOopusQueryInfo", data, {
            method: 'post'
        })
    },
    /**
     * 作品更新
     * @param data 参数
     * @returns {*}
     */
    opusUpdate(data) {
        return this.axios(API_HOST + "/registerQueryOpusServer/opusQuery/updateOpusQueryInfo", data, {
            method: 'post'
        })
    },
    /**
     * 放权信息获取
     * @param data 参数
     * @returns {*}
     */
    getReFillInfo(data) {
        return this.axios(APIDOC_HOST + "/opusManageServer/query/getReFillInfo", data)
    },

    /**
     * 地址信息列表查询
     * @param data 参数
     * @returns {*}
     */
    getAddressList(data) {
        return this.axios(API_HOST + "/userServer/address/address/list/" + data, data)
    },
    /**
     * 地址信息查询
     * @param data 参数
     * @returns {*}
     */
    getAddress(data) {
        return this.axios(API_HOST + "/userServer/address/address/" + data, data)
    },
    /**
     * 添加地址信息
     * @param data 参数
     * @returns {*}
     */
    addAddress(data) {
        return this.axios(API_HOST + "/userServer/address/address", data, {
            method: 'post'
        })
    },
    /**
     * 编辑地址信息
     * @param data 参数
     * @returns {*}
     */
    updataAddress(data) {
        return this.axios(API_HOST + "/userServer/address/address", data, {
            method: 'put'
        })
    },
    /**
     * 删除地址信息
     * @param data 参数
     * @returns {*}
     */
    delAddress(data) {
        return this.axios(API_HOST + "/userServer/address/address/" + data, data, {
            method: 'delete'
        })
    },
    /**
     * 设置默认地址
     * @param data 参数
     * @returns {*}
     */
    defaultAddress(data) {
        return this.axios(API_HOST + `/userServer/address/default/${data.accountId}/${data.id}`, data, {
            method: 'put'
        })
    },
    /**
     * 查询所有国家
     * @param data 参数
     * @returns {*}
     */
    getCountry(data) {
        // return this.axios(USER_HOST + "/area/country/lvl=" + data)
        return this.axios(API_HOST + "/userServer/area/country/list")
    },
    /**
     * 查询所有省份
     * @param data 参数
     * @returns {*}
     */
    getProvince(data) {
        return this.axios(API_HOST + "/userServer/area/province/" + data)
    },
    /**
     * 查询所有城市
     * @param data 参数
     * @returns {*}
     */
    getCity(data) {
        return this.axios(API_HOST + "/userServer/area/city/" + data)
    },
    /**
     * 查询所有区县
     * @param data 参数
     * @returns {*}
     */
    getArea(data) {
        return this.axios(API_HOST + "/userServer/area/area/" + data)
    },
    /**
     * 短信验证码
     * @param data
     */
    sendSMS(data) {
        return this.axios(API_HOST + "/userServer/login/login/sendSMS", data, {
            method: 'post'
        })
    },
    /**
     * 多短信验证码验证
     * @param data
     */
    validate(data) {
        return this.axios(API_HOST + "/userServer/checkPhoneCode/validate", data, {
            method: 'post'
        })
    },
    /**
     * 获取打印材料列表接口
     */
    getQueryBaseInfo(data) {
        return this.axios(API_HOST + "/registerQuerySoftServer/softQuery/getQueryBaseInfo/" + data)
    },
    /**
     * 获取软件查询填报信息及放权信息
     *  @param data
     */
    softInfoAndReFillInfo(data) {
        return this.axios(API_HOST + "/queryManageServer/query/softInfoAndReFillInfo/" + data)
    },
}