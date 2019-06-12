<template>
  <div class="apply-type">
    <div class="title">选择您的身份</div>
    <ul class="clearfix">
      <li v-for="(item, index) in applyTypes" :key="index">
        <hd-radio v-model="radioValue" :label="item.value" :name="'applyType'" @change="handleApplyType">{{ item.name }}</hd-radio>
      </li>
    </ul>
  </div>
</template>

<script>

import '@css/common/registerQuery/applyType'

import hdRadio from '@share/components/hdRadio'
import { applyTypes } from '@share/constants/queryOupsSoft'

export default {
  data() {
    return {
      radioValue: '', // 单选框值
    }
  },
  computed: {
  },
  model: {
    prop: 'applyType',
    event: 'change'
  },
  props: {
    applyType: {
      type: Object,
      default: () => applyTypes[0]
    }, // 查询人身份
    applyTypes: {
      type: Array,
      default: () => applyTypes
    }, // 查询人身份列表
  },
  components: { hdRadio },
  methods: {
    /**
   * 设置单选框值
   * @param value 返回的值
   */
    setData(value) {
      this.radioValue = value
    },
    /**
     * 触发选择身份
     * @param value 选中项的值
     */
    handleApplyType(value) {
      let item = this.applyTypes.find(item => item.value === value)
      this.$emit('change', item)
    }
  },
  mounted() {

  },
  watch: {},
  created() {
    this.setData(this.applyType.value)
  }
}

</script>