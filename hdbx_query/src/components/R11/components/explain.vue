<template>
  <div class="explain">
    <ul class="clearfix">
      <li v-for="(item, index) in developCharactors" :key="index">
        <hd-radio :label="item.value" v-model="params.developCharactor" @change="handleDevelopCharactorChange">{{ item.label }}</hd-radio>
      </li>
    </ul>
    <div class="modify" v-show="params.developCharactor === '2'">
      <div class="trunk clearfix">
        <hd-checkbox v-model="developRewriteExplain" @change="handleCheckboxChange">是修改、翻译或合成别人软件，且需要原权利人授权的</hd-checkbox>
      </div>
      <div class="trunk clearfix">
        <hd-checkbox v-model="oriRegister" @change="handleCheckboxChange">原有软件已登记</hd-checkbox>
        <hd-input v-show="oriRegister" v-model="params.oriRegisterNum" @change="handleInputChange('oriRegisterNum')"></hd-input>
        <div class="error error-oriRegisterNum" v-show="error.oriRegisterNum" v-text="error.oriRegisterNum"></div>
      </div>
      <div class="trunk">
        <textarea v-show="developRewriteExplain" v-model="params.oriSoftModifiedDescription" @change="handleInputChange('oriSoftModifiedDescription')"></textarea>
        <div class="error" v-show="error.oriSoftModifiedDescription" v-text="error.oriSoftModifiedDescription"></div>
      </div>
      <div class="trunk clearfix">
        <div class="upload">
          <file-upload v-show="oriRegister" who="oriRegisterCopy" class="left" :autoUpload="true" showFont="原登记证书复印件" ref="oriRegisterCopy" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
          <div class="error" v-show="error.oriRegisterCopy" v-text="error.oriRegisterCopy"></div>
        </div>
        <div class="upload">
          <file-upload v-show="developRewriteExplain" who="modifyProxy" :autoUpload="true" showFont="授权书" ref="modifyProxy" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
          <div class="error" v-show="error.modifyProxy" v-text="error.modifyProxy"></div>
        </div>
      </div>
    </div>
    <div class="error" v-show="error.checkbox" v-text="error.checkbox"></div>
  </div>
</template>

<script>

import '@css/R11/explain'

import hdRadio from '@share/components/hdRadio'
import hdCheckbox from '@share/components/hdCheckbox'
import hdInput from '@share/components/hdInput'
import fileUpload from '@share/components/common/fileUpload'

export default {
  data() {
    return {
      developCharactors: [
        {
          label: '原创',
          value: '1'
        },
        {
          label: '修改（含翻译软件、合成软件）',
          value: '2'
        },
      ], // 软件作品说明
      developRewriteExplain: false, // 软件修改说明，是否修改、翻译或合成别人软件
      oriRegister: false, // 原有软件已登记
      params: {
        developCharactor: '1', // 软件作品说明
        developRewriteExplain: '0', // 软件修改说明，是否修改、翻译或合成别人软件
        oriRegisterNum: '', // 原登记号码
        oriSoftModifiedDescription: '', // 修改合成或翻译说明
        oriRegisterCopy: '', // 原登记证书复印件
        modifyProxy: '', // 授权书
      },
      error: {
        checkbox: '', // 多选框未有选择
        oriRegisterNum: '', // 原登记号码
        oriSoftModifiedDescription: '', // 修改合成或翻译说明
        oriRegisterCopy: '', // 原登记证书复印件
        modifyProxy: '', // 授权书
      },
    }
  },
  props: [],
  computed: {},
  components: { hdRadio, hdCheckbox, hdInput, fileUpload },
  methods: {
    /**
     * 软件作品说明修改
     * @param value 当前选项
     */
    handleDevelopCharactorChange(value) {
      Object.keys(this.error).forEach(key => {
        this.error[key] = ''
      })
      if (value === '1') {
        this.developRewriteExplain = false
        this.oriRegister = false
      }
    },
    /**
     * 单选框修改
     * @param value 当前选项
     */
    handleCheckboxChange(value) {
      this.error.checkbox = ''
    },
    /**
     * 输入选框修改
     * @param key 当前修改字段
     */
    handleInputChange(key) {
      this.error[key] = ''
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
     * 验证必填项
     * @param params 
     */
    check(params) {
      let flag = false
      this.checkboxError()
      this.checkOriRegister()
      this.checkDevelopRewriteExplain()

      Object.keys(this.error).forEach(key => {
        if (this.error[key]) flag = true
      })
      Object.keys(this.params).forEach(key => {
        params[key] = this.params[key]
      })
      return flag
    },
    /**
     * 多选是否有选择
     */
    checkboxError() {
      if (this.params.developCharactor === '1') return
      if (this.developRewriteExplain || this.oriRegister) return
      this.error.checkbox = '请选择修改类型'
    },
    checkOriRegister() {
      if (!this.oriRegister) return
      if (!this.params.oriRegisterNum) this.error.oriRegisterNum = '请输入原登记号'
      if (!this.params.oriRegisterCopy) this.error.oriRegisterCopy = '请上传原登记证书复印件'
    },

    checkDevelopRewriteExplain() {
      if (!this.developRewriteExplain) return
      if (!this.params.oriSoftModifiedDescription) this.error.oriSoftModifiedDescription = '请输入修改合成或翻译说明'
      if (!this.params.modifyProxy) this.error.modifyProxy = '请上传授权书'
    },
    setData(params) {
      Object.keys(this.params).forEach(key => {
        this.params[key] = params[key] || this.params[key]
      })
      if (params.oriSoftModifiedDescription) this.developRewriteExplain = true
      if (params.oriRegisterNum) this.oriRegister = true
      if (params.oriRegisterCopy) this.$refs.oriRegisterCopy.initFile(params.oriRegisterCopy)
      if (params.modifyProxy) this.$refs.modifyProxy.initFile(params.modifyProxy)
    },
  },
  watch: {
    /**
     * 软件修改说明，是否修改、翻译或合成别人软件 修改
     */
    developRewriteExplain(value) {
      this.params.developRewriteExplain = value ? '1' : '0'
      if (value) return
      this.params.oriSoftModifiedDescription = ''
      this.$refs.modifyProxy.closeBtn()
      this.error.oriSoftModifiedDescription = ''
      this.error.modifyProxy = ''
    },
    /**
     * 原有软件已登记
     */
    oriRegister(value) {
      if (value) return
      this.params.oriRegisterNum = ''
      this.$refs.oriRegisterCopy.closeBtn()
      this.error.oriRegisterNum = ''
      this.error.oriRegisterCopy = ''
    },
  },
  mounted() {
  },
  created() {
    
  },
}

</script>
<style lang='scss' scoped>
</style>