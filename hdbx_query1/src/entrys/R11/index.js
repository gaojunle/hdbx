/**
 * @Author: 苏喆
 * @Date: 2019-05-06
 * @Description: 软件著作权登记
 */
import newVueRouter from '@share/js/utils/newVueRouter'
import App from '@components/R11/app'
import router from '@components/R11/router'
import { Select, Option, DatePicker } from 'element-ui';
import '@share/css/theme'
autoToLogin()

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

newVueRouter(App, router, [Select, Option, DatePicker])