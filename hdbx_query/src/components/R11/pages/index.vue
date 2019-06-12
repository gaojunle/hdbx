<template>
  <div class="index">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <progress-nav :currentPage="1"></progress-nav>

    <div class="box clearfix">
      <div class="item">
        <p>我是著作权人</p>
        <p>我为自己创作的软件申请著作权</p>
        <hd-button @click="applition">立即申请</hd-button>
      </div>
      <div class="item">
        <p>我是代理人</p>
        <p>我为他人创作的软件申请著作权</p>
        <hd-button @click="upload">上传授权委托书协助申请</hd-button>
      </div>
    </div>
    <hd-alert ref="hdAlert" title="需实名认证" confirmText="前往实名认证" :clearBtn="true" @handleConfirm="toPage">
      <p>需要实名认证方可进行查询业务</p>
    </hd-alert>
    <hd-alert ref="upload" title="上传授权委托书协助申请" @handleConfirm="uploadImg">
      <file-upload @on-complete="onComplete" ref="file"></file-upload>
    </hd-alert>
  </div>
</template>

<script>

import api from '@api'

import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import hdButton from '@share/components/hdButton'
import hdAlert from '@share/components/hdAlert'
import fileUpload from '@share/components/common/fileUpload'

export default {
  data() {
    return {
      crumb: [
        {
          name: '软件著作权登记申请'
        }
      ], // 面包屑导航
      params: {
        applyPersonType: '', //  申请人类型
        agentProxy: '', // 授权委托书
      }, // 上传数据
    }
  },
  props: [],
  computed: {},
  components: { breadcrumb, progressNav, hdButton, hdAlert, fileUpload },
  methods: {
    /* 点击立即申请按钮 */
    applition() {
      if (this.state()) return this.router(1)
      this.alert()
    },
    /* 上传授权委托书协助申请 */
    upload() {
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
    onComplete(who, url) {
      if (!url) return
      this.params.agentProxy = url
      this.router(2)
    },
    /* 弹窗方法 */
    alert() {
      this.$refs.hdAlert.alertShow = true
    },
    /* 路由跳转方法 */
    router(applyPersonType) {
      this.params.applyPersonType = applyPersonType
      if (applyPersonType === 1) this.params.agentProxy = ''
      setSession(this.params, 'R11')
      this.$router.push({ name: 'info' })
    },
    /* 状态方法 */
    state() {
      return parseInt(getCookie().authenticationState) === 2
    },
    /**
     * 删除代理委托书
     */
    clearProxy() { },
  },
  watch: {},
  mounted() { },
  created() {
    clearSession('R11')
  },
}

</script>
<style lang='scss' scoped>
</style>