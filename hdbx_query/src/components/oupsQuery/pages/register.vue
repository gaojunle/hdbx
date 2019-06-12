<template>
  <div class="register">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <div class="w1200">
      <progress-nav :currentPage="1"></progress-nav>
      <query-oups :params="params" ref="queryOups" :disabled="disableds.queryOpusBaseInfoEntityList"></query-oups>
      <template v-if="isAgent">
        <oups-owner ref="oupsOwner" :disabled="disableds.opusQueryPeopleInfoVo" @success="oupsOwnerUpload"></oups-owner>
      </template>
      <template v-if="uploadFileNeed.length > 0">
        <material-upload ref="materialUpload" :disabled="disableds.attachementList" :uploadFile="uploadFileNeed" @success="materialUpload"></material-upload>
      </template>
      <div class="buttons clearfix">
        <hd-button class="prev" width="232" height="50" @click="handlePrevPage('index')">上一步</hd-button>
        <hd-button class="next" width="232" height="50" @click="handleNext">下一步</hd-button>
      </div>
    </div>
  </div>
</template>

<script>
import '@css/oupsQuery/register'

import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import queryOups from '@share/components/oupsQuery/queryOups'
import oupsOwner from '@share/components/oupsQuery/oupsOwner'
import materialUpload from '@share/components/oupsQuery/materialUpload'
import hdButton from '@share/components/hdButton'
import { agentOupsType, applyPurposesOups, fileType } from '@share/constants/queryOupsSoft'

export default {
  data() {
    return {
      isAgent: false, // 是否为代理人类型
      crumb: [
        {
          name: '申请作品登记查询'
        }
      ], // 面包屑导航
      params: {
        queryOpusBaseInfoEntityList: [], // 作品信息
        opusQueryPeopleInfoVo: {}, // 著作权人信息
        attachmentList: [], // 上传电子材料
      },
      disableds: {}, // 是否可修改
      uploadFileNeed: [], // 需要上传的文件
    }
  },
  props: [],
  computed: {},
  components: { breadcrumb, progressNav, queryOups, oupsOwner, materialUpload, hdButton },
  methods: {
    /**
     * 主入口函数
     * @param oupsQuery 作品查询数据
     */
    init(oupsQuery) {
      let applyPurpose = applyPurposesOups.find(item => parseInt(item.value) === parseInt(oupsQuery.applyPurpose))
      let uploadFileNeed = applyPurpose.file[oupsQuery.applyIdentity] || []
      let identityFront = null
      let identityBack = null
      if (oupsQuery.attachmentList) {
        identityFront = oupsQuery.attachmentList.find(item => item.relevantFileName === 'identityFront')
        identityBack = oupsQuery.attachmentList.find(item => item.relevantFileName === 'identityBack')
        if (identityFront) identityFront = identityFront.path
        if (identityBack) identityBack = identityBack.path
      }

      uploadFileNeed.forEach(key => {
        let url = ''
        if (oupsQuery.attachmentList) url = oupsQuery.attachmentList.find(item => item.relevantFileName === key).path
        let obj = {
          key,
          value: fileType[key],
          url
        }
        this.uploadFileNeed.push(obj)
      })
      Object.assign(this.params, oupsQuery)
      this.isAgent = agentOupsType.some(item => item === oupsQuery.applyIdentity) // 是否为代理人类型
      this.$nextTick(() => {
        if (identityFront) this.$refs.oupsOwner.setInit(oupsQuery.opusQueryPeopleInfoVo, identityFront, identityBack)
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
     * 点击下一步
     */
    handleNext() {
      let queryOups = this.$refs.queryOups
      let oupsOwner = this.$refs.oupsOwner
      let materialUpload = this.$refs.materialUpload
      let flag = queryOups.check()
      if (this.isAgent && oupsOwner.check()) flag = false
      if (this.uploadFileNeed.length > 0 && materialUpload.check()) flag = false
      if (!flag) return
      this.params.queryOpusBaseInfoEntityList = queryOups.opusBaseInfoList
      this.isAgent ? oupsOwner.upload() : this.uploadFile()
    },
    /**
     * 著作权人图片上传成功
     */
    oupsOwnerUpload() {
      let oupsOwner = this.$refs.oupsOwner

      this.params.opusQueryPeopleInfoVo = oupsOwner.opusQueryPeopleInfoVo
      this.setAttachmentList('identityFront', oupsOwner.identityFront.url)
      this.setAttachmentList('identityBack', oupsOwner.identityBack.url)
      this.uploadFile()
    },
    /**
     * 修改电子材料里面的内容
     */
    setAttachmentList(relevantFileName, path) {
      let index = this.params.attachmentList.findIndex(item => item.relevantFileName === relevantFileName)
      if (index > -1) this.params.attachmentList.splice(index, 1)
      if (path) this.params.attachmentList.push({ relevantFileName, path })
    },
    /**
     * 上传电子材料
     */
    uploadFile() {
      let materialUpload = this.$refs.materialUpload
      if (this.uploadFileNeed.length == 0) return this.next()
      materialUpload.imgUpload()
    },
    /**
     * 上传电子材料成功
     */
    materialUpload(data) {
      data.forEach(item => {
        this.setAttachmentList(item.who, item.url)
      })
      this.next()
    },
    next() {
      let flowNumber = this.$route.query.flowNumber
      clearSession('oupsQuery')
      setSession(this.params, 'oupsQuery')
      this.$router.push({ name: 'oupsSubmit', query: { flowNumber } })
    },
  },
  watch: {},
  mounted() { },
  created() {
    let oupsQuery = getSession('oupsQuery')
    this.disableds = getSession('oupsDisableds') || {}
    oupsQuery ? this.init(oupsQuery) : this.handlePrevPage('index')
  },
}

</script>
<style lang='scss' scoped>
</style>