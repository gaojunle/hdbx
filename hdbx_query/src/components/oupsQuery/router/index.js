/**
 * Created by VULCAN on 2018/9/10.
 */
import Vue from "vue"
import VueRouter from "vue-router"
import Index from '../pages/index'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        //申请登记查询
        {
            path: "/index",
            name: "index",
            meta: {
                title: '作品著作权登记',
                auth: true,
                keepAlive: false
            },
            component: Index,
            children: [
                {
                    path: '/index/:step',
                    component: Index,
                    meta: {
                        title: '作品著作权登记',
                        auth: true,
                        keepAlive: false
                    }
                }
            ]
        },
        {
            path: '*', //其他页面，强制跳转到登录页面
            redirect: '/index/0'
        },
    ],
    // 每次进入组件 滚动到顶部
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})

export default router