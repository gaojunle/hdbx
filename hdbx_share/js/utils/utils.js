
import {HTML_HOST} from '@share/api/config'

export default class Utils {
    /**
     * 格式化时间 年月日
     * @param inputTime
     * @returns {string}
     */
    static formatDateTime(inputTime, format = '.') {
        if (!inputTime) return ''
        let date = new Date(parseInt(inputTime))
        let y = date.getFullYear()
        let m = this.formatDateTimeString(date.getMonth() + 1)
        let d = this.formatDateTimeString(date.getDate())
        return y + format + m + format + d
    }

    /**
     * 格式化时间 时分秒
     * @param inputTime
     * @returns {string}
     */
    static formatHoursTime(inputTime, all = true) {
        let date = new Date(parseInt(inputTime))
        let h = this.formatDateTimeString(date.getHours())
        let m = this.formatDateTimeString(date.getMinutes())
        let s = this.formatDateTimeString(date.getSeconds())
        return all ? h + ':' + m + ':' + s : h + ':' + m
    }

    /**
     * 格式化时间样式
     * @param time 时间
     * @returns {string} 格式后的时间
     */
    static formatDateTimeString(time) {
        return time < 10 ? ('0' + time) : time
    }

    /**
    * 展示认证状态
    * @param authenticationState 实名认证状态
    * @param goAuthenticationText 需要展示的文案
    * @returns {string} 认证状态
    */
    static authenticationState(authenticationState) {
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
   }

    /**
     * 添加并执行点击事件
     * @param ele 被绑定的元素
     */
    static click(ele){
        let event = document.createEvent('MouseEvents')
        event.initEvent('click', true, true)
        ele.dispatchEvent(event);
    }

    /**
     * 判断是否为图片类型
     * @param path 路径
     * @returns {boolean} 是否为图片类型
     */
    static isImg(path) {
        let reg = /.+(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$/
        return reg.test(path)
    }

    /**
     * 为图片路径添加域名
     * @param path 路径
     * @returns {boolean} 添加域名后的图片
     */
    static concatUrlImg(path) {
        if (!path) return ''
        return path.includes(HTML_HOST) ? path : HTML_HOST + '/' + path
    }

    /**
     * 上传formData格式
     * @param params 参数
     * @returns {*} formData格式参数
     */
    static formDataParams (params) {
        let fd = new FormData()
        let keys = Object.keys(params)
        let valuse = Object.values(params)
        valuse.forEach((value, index) => {
            if (typeof value === 'object') keys[index] = JSON.stringify(value)
            fd.append(keys[index], value)
        })
        return fd
    }
}













