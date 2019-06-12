export default {
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
}

