/**
 * @Author: 苏喆
 * @Date: 2018-09-12
 * @Description: 查询服务平台 首页
 */
import newVueRouter from '@share/js/utils/newVueRouter'
import App from '@components/Z11/app'
import router from '@components/Z11/router'
import { Select,Option,DatePicker,Upload,Cascader } from 'element-ui';
autoToLogin()

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

newVueRouter(App, router,[ Select,Option,DatePicker,Upload,Cascader  ])