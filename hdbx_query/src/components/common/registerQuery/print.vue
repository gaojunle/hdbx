<template>
  <div class="print-components no-print">
    <div class="buttons clearfix">
      <div class="back" @click="back">返回</div>
      <div class="print" @click="print">打印</div>
    </div>
    <div>
      <p class="prints_text">
        请选择打印类型：
        <span v-for="(item, index) in buttons" :key="index" :class="['first_title', {'first_Selection': current === item.type}]" @click="handleButton(item.type)" v-text="item.name"></span>
        <span :class="['first_title', {'first_Selection': current === 'all'}]" @click="handleButton('all')">打印全部</span>
      </p>
    </div>
    <ul ref="printContent">
      <li v-for="(item, index) in slideList" :key="index">
        <template v-if="item.type === 'ApplyForm'">
          <application-form v-if="type === 'SoftQuery'" :list="item.data"></application-form>
        </template>
        <img v-else-if="item.img" :src="item.img">
      </li>
    </ul>
  </div>
</template>

<script>

import '@css/common/registerQuery/print'
import { fileList } from '@share/constants/queryOupsSoft'
import Vue from 'vue'
import Print from '@plugins/print'
import ApplicationForm from '@share/components/application/ApplicationForm'
Vue.use(Print)

export default {
  data() {
    return {
      printList: [], // 打印全部的内容
      buttons: [], // 选择打印项按钮
      current: '', // 当前打印选项
      slideList: [], // 打印列表
      type: 'SoftQuery', // 证书类型
    }
  },
  props: ['setPrintShow'],
  components: { ApplicationForm },
  methods: {
    /**
     * 初始化
     * @param first 首屏打印
     * @param printList 需要打印的内容
     */
    init(first, printList) {
      this.printList = [...printList]
      this.setButtons(printList)
      this.setSlideList(first, printList)
    },
    /**
     * 设置打印数据
     * @param printNum 首屏打印
     * @param printList 需要打印的内容
     */
    setSlideList(first, printList) {
      if (first.length === 1) {
        this.slideList = first
        this.handleButton(first[0].type)
      } else {
        this.slideList = printList
        this.handleButton('all')
      }
    },
    /**
     * 设置列表
     */
    setButtons(data) {
      this.buttons = []
      data.forEach(item => {
        this.buttons.push(fileList[item.type])
      })
    },
    /**
     * 触发选择按钮
     * @param type 选中项
     */
    handleButton(type) {
      this.current = type
      if (type === 'all') return this.slideList = [...this.printList]
      let item = this.printList.find(item => item.type === type)
      this.slideList = [item]
    },
    /**
     * 触发打印
     */
    print() {
      this.$print(this.$refs.printContent)
    },
    /**
     * 返回
     */
    back() {
      this.slideList = []
      this.setPrintShow()
    },
  },
  mounted() { },
  watch: {},
  created() {
    let type = this.$route.query.type
    if (type) this.type = type
  }
}

</script>

<style scoped>
body {
  background-color: #ffffff;
  margin: 0mm;
}
p {
  font-size: 30px;
  line-height: 100px;
}
li {
  page-break-before: auto;
  page-break-after: always;
}
.prints_text {
  font-size: 16px;
}
.first_title {
  cursor: pointer;
  margin-right: 10px;
}
.first_Selection {
  color: #169bd5;
}
</style>