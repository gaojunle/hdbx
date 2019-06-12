import Utils from './utils'

export default {
    /**
     * 阅读量转化成万单位
     * @param num  需转化的值
     * @returns {string} 转化后的值
     */
    toMillion(value) {
        return value && Number(value) > 9999 ? (Number(value) / 10000).toFixed(1) + '万' : Number(value)
    },
    /**
     * 手机号只显示前三位后四位
     * @param phone  需转化的手机号
     * @returns {string} 转化后的手机号
     */
    phoneShow(phone) {
        return phone && phone.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    /**
     * 拼接详细地址
     * @param address  地址的对象
     * @returns {string} 转化后的详细地址
     */
    addressShow(address) {
        return address && address.country + address.province + address.city + address.area + address.detailAddress
    },
    /**
     * 个人证件类型
     * @param cardType 个人证件类型id
     * @returns {string} 转化后的个人证件类型描述
     */
    personCardType(cardType) {
        switch (parseInt(cardType)) {
            case 1:
                return '居民身份证'
            case 2:
                return '军/警官证'
            case 3:
                return '企业法人'
            case 4:
                return '护照'
            case 7:
                return '事业单位法人'
            case 8:
                return '社会团体法人'
            case 9:
                return '其他'
            case 10:
                return '士兵证'
            case 11:
                return '文职干部证等'
            case 12:
                return '统一社会信用代码营业执照'
            case 13:
                return '统一社会信用代码证书'
            case 14:
                return '其他有效证件'
            case 15:
                return '台湾居民往来大陆通行证'
            case 16:
                return '香港居民往来大陆通行证'
            case 17:
                return '澳门居民往来大陆通行证'
            case 18:
                return '证件翻译件+翻译机构公章'
            case 19:
                return '无身份证明文件'
            default:
                return
        }
    },
    /**
     * 机构类型
     * @param cardType 机构类型id
     * @returns {string} 转化后的机构类型描述
     */
    companyCardType(cardType) {
        switch (parseInt(cardType)) {
            case 21:
                return '企业法人'
            case 22:
                return '机关法人'
            case 23:
                return '事业单位法人'
            case 24:
                return '社会团体法人'
            case 3:
                return '其他组织'
            case 4:
                return '其他'
            default:
                return
        }
    },
    /**
     * 个人性别
     * @param sex 个人性别
     * @returns {string} 转化后的性别
     */
    personSex(sex) {
        return sex > 1 ? '女' : '男'
    },
    /**
     * 用户类型
     * @param type 用户类型
     * @returns {string} 转化后的类型
     */
    accountType(type) {
        return type === '0' ? '个人' : '机构'
    },
    /**
     * 证件号码前6位后4位
     * @param cardNumber  需转化的手机号
     * @returns {string} 转化后的手机号
     */
    personCardNumber(cardNumber) {
        return cardNumber && cardNumber.toString().replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2")
    },
    /**
     * 证件有效日期
     * @param person  个人数据
     * @returns {string} 转化后的证件有效日期
     */
    getCardDate(person) {
        let startDate = Utils.formatDateTime(person.startDate),
            hasEndDate = parseInt(person.hasEndDate) === 1 ? '-' : '',
            endDate = parseInt(person.hasEndDate) === 1 ? Utils.formatDateTime(person.endDate) : ''
        return startDate + ' ' + hasEndDate + ' ' + endDate
    },
    /**
     * 展示认证状态
     * @returns {string} 认证状态
     */
    authenticationState(authenticationState) {
        switch (parseInt(authenticationState)) {
            case 1:
                return '认证中'
            case 2:
                return '认证成功'
            case 3:
                return '认证失败'
            case 4:
                return '认证过期'
            default:
                return '未认证'
        }
    },
    /**
     * 软件类型
     * @returns {string} 软件类型
     */
    registerType(registerType) {
        switch (registerType) {
            case 'R11':
                return '软件著作权登记'
            case 'R21Attorn':
                return '软件著作权转让合同登记'
            case 'R21Proprietary':
                return '软件著作权专有许可合同登记'
            case 'R31':
                return '软件著作权质押合同登记'
            case 'R32':
                return '软件著作权质押合同注销'
            case 'R41':
                return '软件著作权变更补充登记'
            case 'R42R44':
                return '软件著作权登记撤销'
            case 'Z11':
                return '作品著作权登记'
            case 'Z21':
                return '著作权合同备案'
            case 'Z31':
                return '与著作权相关权利事项登记'
            case 'Z41':
                return '重印国外期刊合同登记'
            case 'Z51':
                return '著作权质押合同登记'
            case 'Z53':
                return '著作权质押合同变更登记'
            case 'Z54':
                return '著作权质押合同注销撤销登记'
            case 'Z61':
                return '作品著作权和合同变更或补充登记'
            case 'Z62':
                return '撤销作品著作权和合同登记'
            default:
                return ''
        }
    },
    /**
     * 日期转换
     * @param person  个人数据
     * @returns {string} 转化后的证件有效日期
     */
    formatDate(date, format = '-') {
        return Utils.formatDateTime(date, format)
    },
    /**
     * 时间转换
     * @param person  个人数据
     * @returns {string} 转化后的证件有效日期
     */
    formatHoursTime(date) {
        return Utils.formatHoursTime(date)
    },

    ymdDate(date) {
        let dateText = Utils.formatDateTime(date),
            dateArray = dateText.split('.'),
            ymd = ['年', '月', '日']
        dateText = ''
        dateArray.forEach((item, index) => {
            dateText += item + ymd[index]
        })
        return dateText
    },
    /**
     * 获得时间区间
     * @param start 开始时间
     * @param end 结束时间
     */
    dateSection(start, end) {
        return Utils.formatDateTime(start) + '-' + Utils.formatDateTime(end)
    },

}