/**
 * @Author: 苏喆
 * @Date: 2018-09-12
 * @Description: 查询服务平台 首页
 */
import newVueRouter from '@share/js/utils/newVueRouter'
import App from '@components/oupsQuery/app'
import router from '@components/oupsQuery/router'
import Vue from 'vue';
import ElementUI from 'element-ui';
import '@share/css/theme';
Vue.use(ElementUI);

autoToLogin()

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

newVueRouter(App, router)