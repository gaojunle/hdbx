<template>
  <div class="soft-submit">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <div class="w1000">
      <progress-nav :currentPage="2"></progress-nav>
      <query-info :params="params"></query-info>
      <material-show v-if="params.applyType === 'agent'" :imgData="imgData"></material-show>
      <handle-mode v-model="params.handleType" queryType="1" :disabled="disableds.handleType"></handle-mode>
      <receive-mode v-model="params.receiveType" :propReceiveAddress="params.receiveAddress" ref="receiveMode" :disabled="disableds.receiveType"></receive-mode>
      <div class="buttons clearfix">
        <div class="prev" @click="handlePrevPage">上一步</div>
        <div class="next" @click="handleSoftSubmit">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>

import '@css/softQuery/softSubmit'

import api from '@api'
import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import queryInfo from '@share/components/softQuery/queryInfo'
import materialShow from '@share/components/softQuery/materialShow'
import handleMode from '@share/components/softQuery/handleMode'
import receiveMode from '@share/components/softQuery/receiveMode'
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
        handleType: 'tq', // 办理方式
        receiveType: 'tq', // 领取方式
      },
      imgData: [], // 展示上传材料
      disableds: {}, // 是否可修改
    }
  },
  components: { breadcrumb, progressNav, queryInfo, materialShow, handleMode, receiveMode },
  methods: {
    /**
     * 主入口方法
     */
    init(softQuery) {
      Object.assign(this.params, softQuery, this.params)
      this.imgData.push({
        title: '原登记证书：',
        url: softQuery.exCertificate
      })
      this.imgData.push({
        title: '签字盖章的授权委托书：',
        url: softQuery.proxy
      })
    },
    /**
     * 回退上一页
     */
    handlePrevPage() {
      let flowNumber = this.$route.query.flowNumber
      this.$router.push({ name: 'index', query: { flowNumber } })
    },
    /**
     * 软件提交
     */
    handleSoftSubmit() {
      let apiName = this.$route.query.flowNumber ? 'softUpdata' : 'softSubmit'
      let params = Object.assign({}, this.params)
      params.receiveAddress = params.receiveType === 'mail' ?
        this.$refs.receiveMode.getReceiveAddress() : ''
      if (params.owners) delete params.owners
      if (params.copyrightOwnerCorrect) delete params.copyrightOwnerCorrect

      api[apiName](params).then(res => {
        if (res.data) this.submitSuccess(res.data)
      })
    },
    /**
     * 提交成功
     * @param flowNumber 流水号
     */
    submitSuccess(flowNumber) {
      clearSession('softQuery')
      clearSession('softDisableds')
      this.$router.push({ name: 'printMaterial', query: { flowNumber } })
    },
  },
  mounted() {

  },
  watch: {},
  created() {
    let softQuery = getSession('softQuery')
    softQuery ? this.init(softQuery) : this.handlePrevPage()
    this.disableds = getSession('softDisableds') || {}
  }
}

</script>