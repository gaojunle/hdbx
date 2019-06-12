/**
 * Created by VULCAN on 2018/9/10.
 * 实例化带有router的vue
 */
import Vue from 'vue'
import filters from "./filters"
Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

export default (App, router, useList = []) => {
    //处理vue.use
    if (Array.isArray(useList) && useList.length) {
        useList.map((val) => {
            Vue.use(val)
        })
    }

    router.afterEach((to, from) => {
        window.scrollTo(0, 0)
    })

    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    })
}