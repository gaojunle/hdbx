/**
 * Created by VULCAN on 2018/10/11.
 */
import api from '@api'
export default {
    /**
     * 获取地址信息
     * @param area 省份/城市/区域
     * @param id 地址id
     */
    getArea(area, id = null) {
        let key = id ? area + id : area,
            value = getSession(key)

        if (value) return value.data

        return api['get' + area](id).then(res => {
            if (res.data) {
                let data = res.data
                data = {data}
                setSession(data, key)
                return data.data
            }
        })
    },
}