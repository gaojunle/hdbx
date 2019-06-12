<template>
  <div class="ownership">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <progress-nav :currentPage="2"></progress-nav>
    <div class="from">
      <!-- 开发方式 -->
      <div class="trunk clearfix">
        <label>
          <span>开发方式：</span>
        </label>
        <dev-mode ref="devMode" v-model="params.developMode"></dev-mode>
      </div>
      <!-- 权利取得方式 -->
      <div class="trunk clearfix">
        <label>
          <span>权利取得方式：</span>
        </label>
        <rights-mode ref="rightsMode" v-model="params.rightObtainMode"></rights-mode>
      </div>
      <!-- 著作权人 -->
      <div class="trunk clearfix">
        <label>
          <span>著作权人：</span>
        </label>
        <copyright-owners ref="copyrightOwners" :propsParams="params"></copyright-owners>
      </div>
      <!-- 权利范围 -->
      <div class="trunk clearfix">
        <label>
          <span>权利范围：</span>
        </label>
        <rights-scope ref="rightsScope" v-model="params.rightScope" :propsParams="params"></rights-scope>
      </div>
    </div>
    <div class="buttons clearfix">
      <hd-button class="prev" width="232" height="50" @click="handlePrevPage('info')">上一步</hd-button>
      <hd-button class="next" width="232" height="50" @click="handleNext">下一步</hd-button>
    </div>
  </div>
</template>

<script>

import '@css/R11/ownership'

import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import devMode from '../components/devMode'
import rightsMode from '../components/rightsMode'
import copyrightOwners from '../components/copyrightOwners'
import rightsScope from '../components/rightsScope'
import hdButton from '@share/components/hdButton'

export default {
  data() {
    return {
      crumb: [
        {
          name: '软件著作权登记申请'
        }
      ], // 面包屑导航
      params: {
        developMode: '1', // 开发方式
        rightObtainMode: '1', // 权利取得方式
        ownerList: [], // 著作权人
        rightScope: '1', // 权利范围
        rightScopePart: [], // 权利范围详情
      },
    }
  },
  props: [],
  computed: {},
  components: { breadcrumb, progressNav, hdButton, devMode, rightsMode, copyrightOwners, rightsScope },
  methods: {
    /**
     * 主入口函数
     */
    init() {
      this.$refs.devMode.init(this.params.developContract)
      this.$refs.rightsMode.init(this.params)
      this.$refs.copyrightOwners.init(this.params.ownerList)
      this.$refs.rightsScope.init(this.params.rightScopePart)
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
      if (this.$refs.devMode.check(this.params)) return
      if (this.$refs.rightsMode.check(this.params)) return
      if (this.$refs.copyrightOwners.check(this.params)) return
      if (this.$refs.rightsScope.check(this.params)) return
      setSession(this.params, 'R11')
      this.handlePrevPage('submit')
    },
  },
  watch: {},
  mounted() {
    this.init()
  },
  created() {
    Object.assign(this.params, getSession('R11'))
  },
}

</script>
<style lang='scss' scoped>
</style>