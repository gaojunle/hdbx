<template>
  <div class="rights-mode">
    <ul class="clearfix">
      <li v-for="(item, index) in rightsModes" :key="index">
        <hd-radio :label="item.value" name="publishStatus" v-model="radioValue" @change="handleRightsModeChange">{{ item.label }}</hd-radio>
      </li>
    </ul>
    <ul class="upload clearfix" v-show="radioValue !== '1'">
      <li v-for="(key, index) in uploadFiles" :key="index">
        <file-upload :who="key" :autoUpload="true" :showFont="files[key]" :ref="key" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
        <div class="error" v-show="error[key]" v-text="error[key]"></div>
      </li>
    </ul>
    <div class="content" v-show="radioValue !== '1'">
      <!-- 该软件是否已登记 -->
      <div class="trunk clearfix">
        <div class="left">该软件是否已登记</div>
        <div class="right">
          <div class="block">
            <hd-radio label="0" name="inheritanceSoftRegNum" v-model="inheritanceSoftRegNum" @change="handleInheritanceSoftRegNumChange">是</hd-radio>
            <hd-input v-show="inheritanceSoftRegNum === '0'" placeholder="原登记号" v-model="params.inheritanceSoftRegNum"></hd-input>
          </div>
          <hd-radio label="1" name="inheritanceSoftRegNum" v-model="inheritanceSoftRegNum" @change="handleInheritanceSoftRegNumChange">否</hd-radio>
        </div>
        <div class="error" v-show="error.inheritanceSoftRegNum" v-text="error.inheritanceSoftRegNum"></div>
      </div>
      <!-- 原软件是否做过变更或补充 -->
      <div class="trunk clearfix">
        <div class="left">原软件是否做过变更或补充</div>
        <div class="right">
          <div class="block">
            <hd-radio label="0" name="inheritanceSoftChangeNum" v-model="inheritanceSoftChangeNum" @change="handleInheritanceSoftChangeNumChange">是</hd-radio>
            <hd-input v-show="inheritanceSoftChangeNum === '0'" placeholder="原变更补充号" v-model="params.inheritanceSoftChangeNum"></hd-input>
          </div>
          <hd-radio label="1" name="inheritanceSoftChangeNum" v-model="inheritanceSoftChangeNum" @change="handleInheritanceSoftChangeNumChange">否</hd-radio>
        </div>
        <div class="error" v-show="error.inheritanceSoftChangeNum" v-text="error.inheritanceSoftChangeNum"></div>
      </div>
    </div>
  </div>
</template>

<script>

import '@css/R11/rightsMode'

import hdRadio from '@share/components/hdRadio'
import fileUpload from '@share/components/common/fileUpload'
import hdInput from '@share/components/hdInput'

export default {
  data() {
    return {
      rightsModes: [
        {
          label: '原始',
          value: '1',
          files: [],
        },
        {
          label: '受让',
          value: '22',
          files: ['copyRightTransferContract'],
        },
        {
          label: '承受',
          value: '23',
          files: ['enterpriseChangeProve', 'creditorDecision', 'inheritanceContract', 'liquidationReport'],
        },
        {
          label: '继承',
          value: '21',
          files: ['relationshipProve', 'ancesterDeathProof', 'ancesterTestament', 'courtFile'],
        },
      ], // 开发方式列表
      params: {
        copyRightTransferContract: '', // 著作权转让合同
        enterpriseChangeProve: '', // 企业变更证明
        creditorDecision: '', // 债权人会议决议
        inheritanceContract: '', // 承受合同
        liquidationReport: '', // 清算组织报告
        relationshipProve: '', // 著作权人与被继承人的关系证明（户口本）
        ancesterDeathProof: '', // 被继承人死亡证明
        ancesterTestament: '', // 被继承人有效遗嘱
        courtFile: '', // 法院文书
        inheritanceSoftRegNum: '', // 原登记号
        inheritanceSoftChangeNum: '', // 原变更补充号
      }, // 上传所需字段
      error: {
        copyRightTransferContract: '', // 著作权转让合同
        enterpriseChangeProve: '', // 企业变更证明
        creditorDecision: '', // 债权人会议决议
        inheritanceContract: '', // 承受合同
        liquidationReport: '', // 清算组织报告
        relationshipProve: '', // 著作权人与被继承人的关系证明（户口本）
        ancesterDeathProof: '', // 被继承人死亡证明
        ancesterTestament: '', // 被继承人有效遗嘱
        courtFile: '', // 法院文书
        inheritanceSoftRegNum: '', // 原登记号
        inheritanceSoftChangeNum: '', // 原变更补充号
      }, // 错误提示
      files: {
        copyRightTransferContract: '著作权转让合同', // 著作权转让合同
        enterpriseChangeProve: '企业变更证明', // 企业变更证明
        creditorDecision: '债权人会议决议', // 债权人会议决议
        inheritanceContract: '承受合同', // 承受合同
        liquidationReport: '清算组织报告', // 清算组织报告
        relationshipProve: '著作权人与被继承人的关系证明', // 著作权人与被继承人的关系证明（户口本）
        ancesterDeathProof: '被继承人死亡证明', // 被继承人死亡证明
        ancesterTestament: '被继承人有效遗嘱', // 被继承人有效遗嘱
        courtFile: '法院文书', // 法院文书
      }, // 上传文件名称
      inheritanceSoftRegNum: '1', // 原登记号
      inheritanceSoftChangeNum: '1', // 原变更补充号
    }
  },
  model: {
    prop: 'rightsMode',
    event: 'change'
  },
  props: {
    rightsMode: {
      type: String,
      default: ''
    },
  },
  computed: {
    /**
     * 单选框值
     */
    radioValue: {
      get() {
        return this.rightsMode
      },
      set() { },
    },
    /**
     * 需要上传的文件
     */
    uploadFiles() {
      let index = this.rightsModes.findIndex(item => item.value === this.radioValue)
      return [...this.rightsModes[index].files]
    },
  },
  components: { hdRadio, fileUpload, hdInput },
  methods: {
    /**
   * 初始化上传图片
   */
    init(params) {
      if (params.inheritanceSoftRegNum) this.inheritanceSoftRegNum = '0'
      if (params.inheritanceSoftChangeNum) this.inheritanceSoftChangeNum = '0'
      Object.keys(this.params).forEach(key => {
        if (!params[key]) return
        this.params[key] = params[key]
        if (this.$refs[key]) this.$refs[key][0].initFile(params[key])
      })
    },
    /**
     * 改变开发方式
     */
    handleRightsModeChange(val) {
      this.$emit('change', val)
      Object.keys(this.params).forEach(key => this.params[key] = '')
      Object.keys(this.error).forEach(key => this.error[key] = '')
      Object.keys(this.$refs).forEach(key => {
        if (this.$refs[key].length === 0) return
        this.$refs[key][0].closeBtn()
      })
      this.inheritanceSoftRegNum = '1'
      this.inheritanceSoftChangeNum = '1'
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
     * 原登记号是否改变
     */
    handleInheritanceSoftRegNumChange(value) {
      this.params.inheritanceSoftRegNum = ''
      this.error.inheritanceSoftRegNum = ''
    },
    /**
     * 原变更补充号是否改变
     */
    handleInheritanceSoftChangeNumChange(value) {
      this.params.inheritanceSoftChangeNum = ''
      this.error.inheritanceSoftChangeNum = ''
    },
    /**
     * 检测图片是否上传
     */
    check(params) {
      let flag = false
      if (this.radioValue === '1') return flag

      this.uploadFiles.forEach(key => {
        if (this.params[key]) return
        this.error[key] = '请上传' + this.files[key]
        flag = true
      })
      let inheritance = {
        inheritanceSoftRegNum: '请输入原登记号',
        inheritanceSoftChangeNum: '请输入原变更补充号',
      }

      Object.keys(inheritance).forEach(key => {
        if (this[key] === '1') return
        if (this.params[key]) return
        this.error[key] = inheritance[key]
        flag = true
      })
      if (!flag) Object.assign(params, this.params)
      return flag
    },
  },
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>