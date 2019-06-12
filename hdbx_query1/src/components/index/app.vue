<template>
    <div class="index-page">
        <top-nav ref="header"></top-nav>

        <div class="title">中国版权登记公示查询</div>
        <search @search_handle="search_handle"></search>
        <ul class="entry clearfix">
            <li class="title">计算机软件著作权相关登记查询</li>
            <li class="title cneter">作品著作权相关登记查询</li>
            <li class="title">DCI数字作品著作权相关登记查询</li>
            <li class="box">
                <div class="title">登记查询</div>
                <div class="text-first">核实软件登记情况，申请获取登记查询证明</div>
                <div class="text-second">尽职调查 | 处理权属纠纷 | 授权转让 | 办理其他类别登记</div>
                <div class="button" @click="toSoftPage">立即申请</div>
            </li>
            <li class="box cneter">
                <div class="title">登记查询</div>
                <div class="text-first">核实作品登记情况，申请获取登记查询证明</div>
                <div class="text-second">尽职调查 | 处理权属纠纷 | 版权交易 | 办理其他类别登记</div>
                <div class="button" @click="showAlert">立即申请</div>
            </li>
        </ul>
        <hd-footer></hd-footer>
        <hd-alert ref="hdAlert" title="用户须知" confirmText="我已阅读并同意" :clearBtn="true" @handleConfirm="toOupsPage">
            <p>介绍作品著作权信息检索盖章定义</p>
            <p>应用场景</p>
            <p>支持什么用户身份</p>
            <p>需要登录并实名认证</p>
            <p>不同用户身份需提交的不同材料</p>
            <p>申请需要几个步骤</p>
            <p>快递到付大概多少钱</p>
        </hd-alert>
    </div>
</template>

<script>

    import '@css/index/index'

    import topNav from '@components/common/header'
    import search from '@components/common/search'
    import hdFooter from '@components/common/hdFooter'
    import hdAlert from '@share/components/hdAlert'

    export default{
        data (){
            return {}
        },
        components: {topNav, search, hdFooter, hdAlert},
        methods: {
            /**
             * 搜索结果
             * @param isLogin 是否登录
             * @param searchInfo 查询内容
             * @param current 查询公告类型
             */
            search_handle(isLogin, searchInfo, current) {
                if (isLogin) return window.location.href = './queryResult.html?search=' + encodeURI(encodeURI(searchInfo)) + '&current=' + current
                this.$refs.header.openLogin('query', login => this.search_handle(login, searchInfo, current))
            },
            /**
             * 跳转软件查询
             */
            toSoftPage() {
                if (this.needLogin()) return
                window.location.href = './softQuery.html'
            },
            /**
             * 展示弹出框
             */
            showAlert() {
                if (this.needLogin()) return
                this.$refs.hdAlert.alertShow = true
            },
            /**
             * 跳转作品查询
             */
            toOupsPage() {
                window.location.href = './oupsQuery.html'
            },
            // 跳转Z11
            toZ11Page() {
                if (this.needLogin()) return
                window.location.href = './Z11.html'
            },
            /**
             * 检查是否需要登录
             * @returns {boolean}
             */
            needLogin() {
                let userInfo = getCookie()
                let flag = userInfo ? false : true
                if (flag) this.$refs.header.openLogin()
                return flag
            },
        },
        mounted(){

        },
        watch: {}
    }

</script>