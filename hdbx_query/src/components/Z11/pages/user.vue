<template>
    <div class="wrap">
        <p class="titles">首页>Z11作品著作权登记申请</p>
        <div class="pross">
            <progress-nav :currentPage="1"></progress-nav>
        </div>
        <!-- <tab></tab> -->
        <div class="box">
            <div class="item">
                <p>我是著作权人</p>
                <p>我为自己创作的作品申请著作权</p>
                <btn @click="applition" class="btn">立即申请</btn>
            </div>
            <div class="item item1">
                <p>我是代理人</p>
                <p>我为他人创作的作品申请著作权</p>
                <btn @click="upload" class="btn">上传授权委托书协助申请</btn>
            </div>
        </div>
        <hd-alert ref="hdAlert" title="需实名认证" confirmText="前往实名认证" :clearBtn="true" @handleConfirm="toPage">
        <p>需要实名认证方可进行查询业务</p>
        </hd-alert>
        <hd-alert ref="upload" title="上传授权委托书协助申请" @handleConfirm="uploadImg">
            <file-upload @on-complete="onComplete" ref='file'></file-upload>
        </hd-alert>
    </div>
</template>
<script>
import '@css/Z11/user'
import api from '@api'
import tab from '@components/common/breadcrumb'
import btn from '@share/components/hdButton'
import hdAlert from '@share/components/hdAlert'
import fileUpload from '@share/components/common/fileUpload'
import progressNav from '@components/common/registerQuery/progressNav'
import { HTML_HOST } from '@share/api/config'
export default {
    data () {
        return {
        }
    },
    components: {
        tab,
        btn,
        hdAlert,
        fileUpload,
        progressNav
    },
    methods: {
        // pdf,text
        /* 点击立即申请按钮 */
        applition() {
            if (this.state()) return this.$router.push({name: 'information'}) 
            this.alert()
        },
        /* 上传授权委托书协助申请 */
        upload() {
            // this.state() 
            if (this.state()) return this.$refs.upload.alertShow = true
            this.alert()
        },
        /* 前往实名认证 */
        toPage() {
            window.location.href = HTML_HOST + 'accounts/authentication.html'
        },
        /* 上传图片方法 */
        uploadImg() {
            this.$refs.file.submit()
        },
        /* 判断图片上传是否成功 */
        onComplete(who,url) {
            if(!url) return 
            setSession({url},'Z11')
            this.router()
            // this.$router.push({name: 'information'}) 
        },
        /* 弹窗方法 */
        alert() {
            this.$refs.hdAlert.alertShow = true
        },
        /* 路由跳转方法 */
        router() {
           this.$router.push({name: 'information'}) 
        },
        /* 状态方法 */
        state() {
           return parseInt(getCookie().authenticationState) === 2 
        },
    }
}
</script>