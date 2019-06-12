<template>
  <div class="oups-submit">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <div class="w1000">
      <progress-nav :currentPage="2"></progress-nav>
      <query-info :params="params"></query-info>
      <template v-if="imgData.length > 0">
        <material-show :imgData="imgData"></material-show>
      </template>
      <template v-if="receiveShow">
        <receive-mode v-model="params.receiveType" ref="receiveMode" :disableds="disableds.receiveType"></receive-mode>
      </template>
      <div class="buttons clearfix">
        <hd-button class="prev" width="232" height="50" @click="handlePrevPage('register')">上一步</hd-button>
        <hd-button class="next" width="232" height="50" @click="handleOupsSubmit">下一步</hd-button>
      </div>
    </div>
  </div>
</template>

<script>

import '@css/oupsQuery/oupsSubmit'

import api from '@api'
import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import queryInfo from '../components/queryInfo'
import materialShow from '@share/components/softQuery/materialShow'
import receiveMode from '@share/components/softQuery/receiveMode'
import hdButton from '@share/components/hdButton'
import { fileType } from '@share/constants/queryOupsSoft'
import Utils from '@utils/utils'

export default {
  data() {
    return {
      crumb: [
        {
          name: '申请登记查询'
        }
      ], // 面包屑导航
      params: {
        createUser: getCookie().id,
        receiveType: 'tq', // 领取方式
      },
      imgData: [], // 展示上传材料
      disableds: {}, // 是否可修改
      receiveShow: false, // 领取方式展示
    }
  },
  components: { breadcrumb, progressNav, queryInfo, materialShow, receiveMode, hdButton },
  methods: {
    /**
     * 主入口函数
     */
    init(oupsQuery) {
      let files = { ...fileType }
      let applyPurpose = parseInt(oupsQuery.applyPurpose)
      oupsQuery ? Object.assign(this.params, oupsQuery) : this.handlePrevPage('index')
      files.identityFront = '身份证明文件正面'
      files.identityBack = '身份证明文件反面'

      if (applyPurpose > 6) this.receiveShow = true

      if (!oupsQuery.attachmentList) return
      oupsQuery.attachmentList.forEach(item => {
        this.imgData.push({
          title: files[item.relevantFileName],
          url: item.path
        })
      })
    },
    /**
    * 回退上一页
    * @param pageName 跳转页面名称
    */
    handlePrevPage(pageName) {
      let flowNumber = this.$route.query.flowNumber
      this.$router.push({ name: pageName, query: { flowNumber } })
    },
    /**
     * 软件提交
     */
    handleOupsSubmit() {
      let apiName = this.params.flowNumber ? 'opusUpdate' : 'opusSubmit',
        params = Object.assign({}, this.params)
      params.receiveAddress = params.receiveType === 'mail' ?
        this.$refs.receiveMode.getReceiveAddress() : ''
      if (!this.receiveShow) params.receiveType = ''

      api[apiName](params).then(res => {
        if (res.data) this.submitSuccess()
      })
    },
    /**
     * 提交成功
     */
    submitSuccess() {
      clearSession('oupsQuery')
      clearSession('oupsDisableds')
      this.$router.push({ name: 'oupsSuccess' })
    },
  },
  mounted() {

  },
  watch: {},
  created() {
    let oupsQuery = getSession('oupsQuery')
    this.disableds = getSession('oupsDisableds') || {}
    this.init(oupsQuery)
  }
}

</script>