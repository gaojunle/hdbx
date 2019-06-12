<template>
  <div class="register">
    <div class="w1200">
      <h1>申请登记查询</h1>
      <progress-nav :currentPage="1"></progress-nav>
      <apply-type ref="applyType" v-model="params.applyType" :disabled="disableds.applyType"></apply-type>
      <apply-purpose ref="applyPurpose" v-model="params.applyPurpose" :disabled="disableds.applyPurpose"></apply-purpose>
      <query-soft ref="querySoft" :applyType="params.applyType" @ownerChange="ownerChange" :disabled="disableds.registerNumber"></query-soft>
      <material-upload v-show="params.applyType === 'agent'" ref="materialUpload" :uploadFile="uploadFileNeed" @success="upLoadSuccess" @upLoadError="isUpload = false" :disabled="disableds.exCertificate"></material-upload>
      <div class="bottom">
        <hd-button width="232" height="50" @click="handleNext">下一步</hd-button>
      </div>
    </div>
    <hd-alert title="请输入著作权人授权码" ref="hdAlert" @handleConfirm="alertConfirm">
      <soft-send-phone ref="softSendPhone" @codeSuccess="codeSuccess"></soft-send-phone>
    </hd-alert>
  </div>
</template>

<script>

import '@css/softQuery/register'

import api from '@api'
import progressNav from '@components/common/registerQuery/progressNav'
import applyType from '@share/components/softQuery/applyType'
import applyPurpose from '@share/components/softQuery/applyPurpose'
import querySoft from '@share/components/softQuery/querySoft'
import materialUpload from '@share/components/oupsQuery/materialUpload'
import hdButton from '@share/components/hdButton'
import hdAlert from '@share/components/hdAlert'
import softSendPhone from '@components/common/registerQuery/softSendPhone'

import { applyTypes, applyPurposes } from '@share/constants/queryOupsSoft'

export default {
  data() {
    return {
      crumb: [
        {
          name: '申请登记查询'
        }
      ], // 面包屑导航
      params: {
        applyType: applyTypes[0].value, // 身份
        applyPurpose: applyPurposes[0].value, // 用途
        registerNumber: '', // 登记号
        softFullName: '', // 软件名称
        owner: [], // 经办人
        owners: [], // 著作权人信息
      },
      disableds: {
        applyType: false,
        applyPurpose: false,
        registerNumber: false,
        exCertificate: false,
        handleType: false,
        receiveType: false,
      }, // 是否可修改
      uploadFileNeed: [], // 需要上传的文件
      isUpload: false, // 是否在上传中
    }
  },
  computed: {},
  components: { progressNav, applyType, applyPurpose, querySoft, materialUpload, softSendPhone, hdButton, hdAlert },
  methods: {
    /**
     * 设置数据
     */
    setParams(data) {
      Object.keys(this.disableds).forEach(key => {
        this.disableds[key] = data.fillInfo[key] ? false : true
      })
      setSession(this.disableds, 'softDisableds')
      this.params = { ...data.softInfo }
      this.params.flowNumber = this.$route.query.flowNumber
      this.init(data.softInfo)
      this.$nextTick(() => {
        this.$refs.querySoft.handleGetInfo()
      })
    },
    /**
     * 初始化页面数据
     * @param softQuery 页面数据
     */
    init(softQuery) {
      let applyPurposeRef = this.$refs.applyPurpose
      let querySoft = this.$refs.querySoft
      let { applyType, applyPurpose, applyPurposeRemarks, registerNumber,
        softFullName, owner, owners, proxy, exCertificate } = softQuery
      Object.assign(this.params, { applyType, applyPurpose, registerNumber, softFullName, owner, owners })


      if (applyPurposeRemarks) applyPurposeRef.showTextArea(applyPurposeRemarks)
      querySoft.setData({ registerNumber, softFullName, owner })


      this.setImg(proxy, exCertificate)
    },
    /**
     * 设置上传材料
     */
    setImg(proxy = '', exCertificate = '') {
      this.uploadFileNeed = []
      this.uploadFileNeed.push({
        key: 'proxy',
        value: '原登记证书',
        url: proxy ? proxy : ''
      })
      this.uploadFileNeed.push({
        key: 'exCertificate',
        value: '签字盖章的授权委托书',
        url: exCertificate ? exCertificate : ''
      })
    },
    /**
     * 著作权人变化时触发
     */
    ownerChange(owners) {
      this.params.owners = owners
    },
    /**
     * 点击下一步
     */
    handleNext() {
      if (this.isUpload) return
      let flag = true
      let params = { ...this.params }
      let applyPurpose = this.$refs.applyPurpose
      let querySoft = this.$refs.querySoft
      let materialUpload = this.$refs.materialUpload

      if (params.applyPurpose === '0') {
        params.applyPurposeRemarks = applyPurpose.getApplyPurposeRemarks()
        if (!params.applyPurposeRemarks) flag = false
      }

      if (!querySoft.checkQueryOupsSoft()) flag = false

      if (!flag) return

      Object.assign(params, querySoft.getData())

      this.isUpload = true

      this.params = params

      params.applyType === 'owner' ? this.nextPage() : materialUpload.imgUpload()
    },
    /**
     * 图片全部上传成功
     * @param params 上传成功的图片
     *
     */
    upLoadSuccess(data) {
      data.forEach(item => {
        this.params[item.who] = item.url
      })
      this.isUpload = false
      this.$refs.hdAlert.alertShow = true
      this.$refs.softSendPhone.sendSMS(this.params.owners)
    },
    /**
     * 弹出框确定按钮
     */
    alertConfirm() {
      this.$refs.softSendPhone.handleConfirm()
    },
    /**
     * 短信认证通过
     */
    codeSuccess() {
      this.nextPage()
    },
    /**
     * 进入下一页
     */
    nextPage() {
      let flowNumber = this.$route.query.flowNumber
      clearSession('softQuery')
      setSession(this.params, 'softQuery')
      this.$router.push({ name: 'softSubmit', query: { flowNumber } })
    },
  },
  mounted() {
    if (this.flowNumber) return api.softInfoAndReFillInfo(this.flowNumber).then(res => {
      if (res.data) this.setParams(res.data)
    })
    let softQuery = getSession('softQuery')
    if (softQuery) this.init(softQuery)
  },
  watch: {},
  created() {
    this.setImg()
    clearSession('softDisableds')
    this.flowNumber = this.$route.query.flowNumber
  }
}
</script>