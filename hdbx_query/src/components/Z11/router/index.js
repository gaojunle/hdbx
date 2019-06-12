/**
 * Created by VULCAN on 2018/9/10.
 */
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        //选择身份
        {
            path: "/user",
            name: "user",
            meta: {
                title: '选择身份',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/user"], resolve)
        },
        // 作品创作信息
        {
            path: "/information",
            name: "information",
            meta: {
                title: '作品创作信息',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/information"], resolve)
        },
        // 作品权属信息
        {
            path: '/ownership',
            name: "ownership",
            meta: {
                title: '作品权属信息',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/ownership"], resolve)
        },
        {
            path: '/confirmapply',
            name: "ownership",
            meta: {
                title: '作品权属信息',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/confirmapply"], resolve)
        },
        {
            path: '/submaterial',
            name: "ownership",
            meta: {
                title: '作品权属信息',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/submaterial"], resolve)
        }
    ],
    // 每次进入组件 滚动到顶部
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})

export default router