/**
 * Created by VULCAN on 2018/9/10.
 */
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        //申请登记查询
        {
            path: "/index",
            name: "index",
            meta: {
                title: '申请登记查询',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/index"], resolve)
        },
        //申请登记查询
        {
            path: "/register",
            name: "register",
            meta: {
                title: '申请登记查询',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/register"], resolve)
        },
        //确认信息
        {
            path: "/oupsSubmit",
            name: "oupsSubmit",
            meta: {
                title: '申请登记查询',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/oupsSubmit"], resolve)
        },
        //打印材料
        {
            path: "/oupsSuccess",
            name: "oupsSuccess",
            meta: {
                title: '申请登记查询',
                auth: true,
                keepAlive: false
            },
            component: resolve => require(["../pages/oupsSuccess"], resolve)
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