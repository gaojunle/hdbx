<template>
  <div class="dev-mode">
    <ul class="clearfix">
      <li v-for="(item, index) in developModes" :key="index">
        <hd-radio :label="item.value" name="publishStatus" v-model="radioValue" @change="handleDevelopModeChange">{{ item.label }}</hd-radio>
      </li>
    </ul>
    <div class="upload" v-show="radioValue !== '1'">
      <file-upload who="developContract" :autoUpload="true" :showFont="uploadFont" ref="developContract" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
      <div class="error" v-show="error.developContract" v-text="error.developContract"></div>
    </div>
  </div>
</template>

<script>
import '@css/R11/devMode'

import hdRadio from '@share/components/hdRadio'
import fileUpload from '@share/components/common/fileUpload'

export default {
  data() {
    return {
      developModes: [
        {
          label: '独立开发',
          value: '1',
          uploadFont: '',
        },
        {
          label: '合作开发',
          value: '2',
          uploadFont: '开发协议',
        },
        {
          label: '委托开发',
          value: '3',
          uploadFont: '委托协议',
        },
        {
          label: '下达任务开发',
          value: '4',
          uploadFont: '项目任务书或合同',
        },
      ], // 开发方式列表
      params: {
        developContract: '', // 开发证明合同
      }, // 上传所需字段
      error: {
        developContract: '', // 开发证明合同
      }, // 错误提示
    }
  },
  model: {
    prop: 'developMode',
    event: 'change'
  },
  props: {
    developMode: {
      type: String,
      default: ''
    },
  },
  computed: {
    /**
     * 上传文案提示
     */
    uploadFont() {
      let obj = this.developModes.find(item => item.value === this.radioValue)
      return obj.uploadFont
    },
    /**
     * 单选框值
     */
    radioValue: {
      get() {
        return this.developMode
      },
      set() { },
    },
  },
  components: { hdRadio, fileUpload },
  methods: {
    /**
     * 初始化上传图片
     */
    init(url) {
      if (!url) return
      this.params.developContract = url
      this.$refs.developContract.initFile(url)
    },
    /**
     * 改变开发方式
     */
    handleDevelopModeChange(val) {
      this.$emit('change', val)
      this.params.developContract = ''
      this.error.developContract = ''
      this.$refs.developContract.closeBtn()
    },
    /**
   * 添加图片时触发
   * @param who
   */
    onChange(who) {
    },
    /**
     * 删除图片时触发
     * @param who
     */
    onClose(who) {
      this.params[who] = ''
    },
    /**
     * 上传成功或失败后调用
     * @param who
     * @param url
     */
    onComplete(who, url) {
      if (url) this.params[who] = url
      this.error[who] = ''
    },
    /**
     * 检测图片是否上传
     */
    check(params) {
      if (this.radioValue !== '1' && !this.params.developContract) {
        this.error.developContract = '请上传' + this.uploadFont
        return true
      }
      Object.assign(params, this.params)
      return false
    },
  },
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>