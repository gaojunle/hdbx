<template>
  <div class="print-box">
    <div class="print-list" v-show="!printShow">
      <breadcrumb :crumb="crumb"></breadcrumb>
      <div class="w1000">
        <progressNav :currentPage="3"></progressNav>
        <print-list ref="printList" :setPrintShow="setPrintShow"></print-list>
        <div class="button">已打印，去递交材料</div>
      </div>
    </div>
    
    <print v-show="printShow" ref="print" :setPrintShow="setPrintShow"></print>
  </div>
</template>

<script>

import '@css/softQuery/printMaterial'
import api from '@api'
import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import printList from '@components/common/registerQuery/printList'
import print from '@components/common/registerQuery/print'

export default {
  data() {
    return {
      printShow: false, // 是否显示打印预览
      crumb: [
        {
          name: '申请登记查询'
        }
      ], // 面包屑导航
    }
  },
  components: { breadcrumb, progressNav, printList, print },
  methods: {
    /**
     * 切换打印列表和打印阅览
     * @param first 首屏打印
     * @param printList 打印的内容
     */
    setPrintShow(first = [], printList = []) {
      this.printShow = first.length > 0
      if (first.length > 0) this.$refs.print.init(first, printList)
    }
  },
  mounted() {
  },
  watch: {},
  created() {
  }
}

</script>