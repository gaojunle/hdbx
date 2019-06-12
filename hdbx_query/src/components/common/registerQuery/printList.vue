<template>
  <div class="print-list">
    <div class="title" v-text="title"></div>
    <ul v-if="list.length > 0">
      <li class="list-title clearfix">
        <div class="num">序号</div>
        <div class="name">材料名称</div>
        <div class="requirement">要求</div>
        <div class="operation">操作</div>
        <div class="print" @click="setPrintShow(numbers, numbers)">打印全部</div>
      </li>
      <li class="clearfix" v-for="(item, index) in list" :key="index">
        <div class="num" v-text="index + 1"></div>
        <div class="name" v-text="item.name"></div>
        <div class="requirement" v-text="item.requirement"></div>
        <div class="operation" @click="setPrintShow([numbers[index]], numbers)">查看</div>
        <div class="print" @click="setPrintShow([numbers[index]], numbers)">打印</div>
      </li>
    </ul>
    
  </div>
</template>

<script>

import '@css/common/registerQuery/printList'

import api from '@api'
import { fileList } from '@share/constants/queryOupsSoft'

export default {
  data() {
    return {
      title: '请在线打印以下材料，并按要求签字或盖章', // 标题
      list: [], // 打印列表
      numbers: [], //返回当前点击数据
    }
  },
  props: ['setPrintShow'],
  components: {},
  methods: {
    /**
       * 打印材料列表
       */
    getQueryBaseInfo() {
      api.getQueryBaseInfo(this.$route.query.flowNumber).then(res => {
        if (res.data) this.setList(res.data)
      })
    },
    /**
     * 设置列表
     */
    setList(data) {
      data.forEach(item => {
        this.list.push(fileList[item.type])
        this.numbers.push(item)
      })
    },
  },
  mounted() {

  },
  watch: {},
  created() {
    this.getQueryBaseInfo()
  }
}

</script>