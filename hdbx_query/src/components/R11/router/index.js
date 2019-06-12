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
            path: "/index",
            name: "index",
            meta: {
                title: '选择身份',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/index"], resolve)
        },
        //软件创作信息
        {
            path: "/info",
            name: "info",
            meta: {
                title: '软件创作信息',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/info"], resolve)
        },
        //软件创作信息
        {
            path: "/ownership",
            name: "ownership",
            meta: {
                title: '软件创作信息',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/ownership"], resolve)
        },
        //软件提交页面
        {
            path: "/submit",
            name: "submit",
            meta: {
                title: '软件提交页面',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/submit"], resolve)
        },
        //软件提交页面
        {
            path: "/printMaterial",
            name: "printMaterial",
            meta: {
                title: '材料打印页面',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/printMaterial"], resolve)
        },
        // 其他页面
        {
            path: '*', //其他页面，强制跳转到登录页面
            redirect: '/index'
        },
    ],
    // 每次进入组件 滚动到顶部
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})

export default router