/**
 * Created by VULCAN on 2018/9/10.
 */
import Vue from "vue"
import VueRouter from "vue-router"
import chooseIdentity from '../pages/chooseIdentity'
import creativeInfo from '../pages/creativeInfo'
import ownershipInfo from '../pages/ownershipInfo'
import confirmApplication from '../pages/confirmApplication'
import submitMaterial from '../pages/submitMaterial'
import submitSuccess from '../pages/submitSuccess'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        //申请登记查询
        {
            name: 'chooseIdentity',
            path: '/chooseIdentity',
            component: chooseIdentity,
            meta: {
                title: '选择办理身份',
                auth: true,
                keepAlive: false
            }
        },
        {
            name: 'creativeInfo',
            path: '/creativeInfo',
            component: creativeInfo,
            meta: {
                title: '作品创作信息',
                auth: true,
                keepAlive: false
            }
        },
        {
            name: 'ownershipInfo',
            path: '/ownershipInfo',
            component: ownershipInfo,
            meta: {
                title: '作品权属信息',
                auth: true,
                keepAlive: false
            }
        },
        {
            name: 'confirmApplication',
            path: '/confirmApplication',
            component: confirmApplication,
            meta: {
                title: '确认申请',
                auth: true,
                keepAlive: false
            }
        },
        {
            name: 'submitMaterial',
            path: '/submitMaterial',
            component: submitMaterial,
            meta: {
                title: '递交材料',
                auth: true,
                keepAlive: false
            }
        },
        {
            name: 'submitSuccess',
            path: '/submitSuccess',
            component: submitSuccess,
            meta: {
                title: '提交成功',
                auth: true,
                keepAlive: false
            }
        },
        {
            path: '*', //其他页面，强制跳转到登录页面
            redirect: '/chooseIdentity'
        },
    ],
    // 每次进入组件 滚动到顶部
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {x: 0, y: 0}
    }
})

export default router