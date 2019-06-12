<!--
    /**
    * @Author: 苏喆
    * @Date: 2018-09-06
    * @Description: 顶部导航组件
    * @Query:
    * @Props:
    * @Remark:
    */
-->
<template>
    <div class="navBox" ref="navBox">
        <div class="w1200">
            <div class="logo">
                <img src="@assets/img/header/logo.png" alt="">
            </div>
            <div class="slogan">
                <img src="@assets/img/header/slogan.png" alt="">
            </div>
            <slot>
                <ul class="tab">
                    <li v-for="(item, index) in tabs" v-text="item.name" :key="index"
                        @click="toLink(item)"></li>
                </ul>
            </slot>
            <div class="header-right clearfix">
                <!--头像-->
                <div class="user" v-if="userInfo">
                    <div class="user-head-box">
                        <div class="user-head" :style="{ background:'url('+userInfo.headImg+') no-repeat'}"></div>
                    </div>
                    <span @click="toCenter">个人中心</span>
                </div>
                <div class="login" v-else @click="openLogin('header')">登录/注册</div>
            </div>
        </div>
        <login-block class="loginblock logins" ref="loginblock"
                     @loginSuccess="loginSuccess"></login-block>
    </div>
</template>

<script>

    import '@css/common/header'
    import loginBlock from '@share/components/login/loginBlock'
    import {HTML_HOST} from '@share/api/config'

    export default {
        props: {},
        data(){
            return {
                tabs: [
                    {
                        name: '首页',
                        link: './index.html',
                    },
                    {
                        name: '公告查询',
                        link: '',
                    },
                    {
                        name: '登记查询',
                        link: '',
                    },
                    {
                        name: '登记档案',
                        link: '',
                    },
                    {
                        name: '数据服务',
                        link: '',
                    },
                ], // 默认tab切换
                isLogin: false, // 是否登录
                userInfo: {}, // 登陆后的用户数据
                source: 'header', // 来源
                callback: null, // 登录后回调
            }
        },
        components: {loginBlock},
        methods: {
            /**
             * 跳转页面
             * @param item 需要跳转的数据
             */
            toLink(item) {
                window.location.href = item.link
            },
            /**
             * 打开登录弹出框
             * @param source 登录来源
             * @param callback 需要回调的方法
             */
            openLogin(source, callback) {
                this.source = source
                this.callback = callback
                this.$refs.loginblock.showUserLoginBox()
            },
            /**
             * 注册成功后调用
             * @param data 登陆后的信息
             */
            loginSuccess(data) {
                this.userInfo = data
                this.$refs.loginblock.hideUserLoginBox()
                if (this.source === 'query') this.callback(true)
            },
            /**
             * 跳转个人中心
             */
            toCenter() {
                window.location.href = HTML_HOST + '/accounts/center.html'
            },
        },
        mounted(){
        },
        created(){
            this.userInfo = getCookie()
        }
    }

</script>


