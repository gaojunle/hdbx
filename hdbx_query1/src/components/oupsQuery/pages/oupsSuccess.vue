<template>
  <div class="success">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <progressNav :currentPage="3"></progressNav>
    <p>恭喜您  提交申请成功</p>
    <p>您提交的申请将由业务人员进行审核，请您在“我的版权服务”中关注审核进度</p>
  </div>
</template>

<script>

import '@css/oupsQuery/oupsSuccess'

import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'

export default {
  data() {
    return {
      crumb: [
        {
          name: '申请登记查询'
        }
      ], // 面包屑导航
    }
  },
  components: { breadcrumb, progressNav},
  methods: {
   
  },
  mounted() {
  },
  watch: {},
  created() {

  }
}

</script>