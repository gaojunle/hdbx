<template>
  <div class="handle-mode">
    <div class="title">
      请选择办理方式
      <span>注意：在线申请后需要递交相关材料才可以完成办理</span>
    </div>
    <!--选择办理方式-->
    <ul class="handle-type clearfix">
      <li v-for="(item, index) in handleModes" :key="index">
        <hd-radio v-model="handleMode" :label="item.value" :name="'handleType'" @change="handleHandleMode">{{ item.name }}</hd-radio>
      </li>
    </ul>
    <!--选择大厅-->
    <ul class="handle-type-child" v-show="handleMode === 'xc'">
      <li v-for="(item, index) in handleModeChildren" :key="index">
        <hd-radio v-model="handleModeChild" :label="item.value" :name="'handleTypeChild'" @change="handleHandleModeChildren" v-html="item.name"></hd-radio>
      </li>
    </ul>
    <!--展示软件地址-->
    <ul class="handle-type-child" v-if="queryType === '1'" v-show="handleMode === 'mail'">
      <li>
        <span>邮寄地址：</span>
        <span>北京市西城区天桥南大街1号天桥艺术大厦A座三层302</span>
      </li>
      <li>
        <span>邮编：</span>
        <span>100050</span>
      </li>
    </ul>
    <!--展示作品地址-->
    <ul class="handle-type-child" v-if="queryType === '2'" v-show="handleMode === 'mail'">
      <li>
        <span>邮寄地址：</span>
        <span>北京市西城区天桥南大街1号天桥艺术大厦A座三层307</span>
      </li>
      <li>
        <span>邮编：</span>
        <span>100050</span>
      </li>
    </ul>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/softQuery/handleMode'
import hdRadio from '../hdRadio'

export default {
  data() {
    return {
      handleModeChild: 'tq', // 大厅
    }
  },
  model: {
    prop: 'handleType',
    event: 'change'
  },
  props: {
    handleType: String, // 办理方式
    handleModes: {
      type: Array,
      default: () => [
        {
          name: '登记大厅现场办理',
          value: 'xc'
        },
        {
          name: '邮寄到中国版权保护中心办理',
          value: 'mail'
        },
      ]
    }, // 办理方式选择
    handleModeChildren: {
      type: Array,
      default: () => [
        {
          name: `<span class="hall">中国版权保护中心版权登记大厅（天桥）</span>
                               <span>地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层</span>`,
          value: 'tq'
        },
      ]
    }, // 大厅选择
    queryType: {
      type: String,
      default: '1'
    }, // 查询类型
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改
  },
  computed: {
    // 办理方式
    handleMode: {
      get() {
        let value = this.handleType
        if (this.handleType !== 'mail') value = 'xc'
        return value
      },
      set(value) {
        
      },
    },
  },
  components: { hdRadio },
  methods: {

    /**
     * 触发选择办理方式
     * @param value 选中项的值
     */
    handleHandleMode(value) {
      this.handleMode = value
      if (value === 'xc') value = this.handleModeChild
      this.$emit('change', value)
    },
    /**
     * 触发选择大厅
     * @param item 选中项
     */
    handleHandleModeChildren(item) {
      let value = item.value
      this.handleModeChild = value
      this.$emit('change', value)
    }
  },
  mounted() {

  },
  watch: {},
  created() {

  }
}

</script>