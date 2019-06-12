/**
 * @Author: 苏喆
 * @Date: 2018-09-12
 * @Description: 查询服务平台 首页
 */
import newVueRouter from '@share/js/utils/newVueRouter'
import App from '@components/softQuery/app'
import router from '@components/softQuery/router'

autoToLogin()

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

newVueRouter(App, router)