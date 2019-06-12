<template>
  <div class="info">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <progress-nav :currentPage="2"></progress-nav>
    <div class="from clearfix">
      <!-- 软件全称 -->
      <div class="trunk">
        <hd-input v-model="params.softFullName" width="500" :required="true" placeholder="请输入软件全称">软件全称：</hd-input>
        <span class="error" v-if="error.softFullName" v-text="error.softFullName"></span>
      </div>
      <!-- 软件简称 -->
      <div class="trunk">
        <hd-input v-model="params.softShortName" width="500" placeholder="请输入软件简称">软件简称：</hd-input>
        <span class="error" v-if="error.softShortName" v-text="error.softShortName"></span>
      </div>
      <!-- 版本号 -->
      <div class="trunk">
        <hd-input v-model="params.version" width="500" :required="true" placeholder="大写V+数字+小数点">版本号：</hd-input>
        <span class="error" v-if="error.version" v-text="error.version"></span>
        <span class="tip" v-if="tips.version" v-text="tips.version"></span>
      </div>
      <!-- 软件作品说明 -->
      <div class="trunk clearfix">
        <label>
          <span>软件作品说明：</span>
        </label>
        <explain ref="explain"></explain>
      </div>
      <!-- 开发完成日期 -->
      <div class="trunk clearfix">
        <label for="completeDate">
          <span>开发完成日期：</span>
        </label>
        <el-date-picker id="completeDate" v-model="params.completeDate" type="date" placeholder="选择日期" value-format="timestamp" @change="handleCompleteDateChange"></el-date-picker>
        <span class="error" v-if="error.completeDate" v-text="error.completeDate"></span>
      </div>
      <!-- 发表状态 -->
      <div class="trunk clearfix">
        <label for="publishStatus">
          <span>发表状态：</span>
        </label>
        <ul>
          <li v-for="(item, index) in publishStatus" :key="index">
            <hd-radio :label="item.value" name="publishStatus" v-model="params.publishStatus" @change="handlePublishStatusChange">{{ item.label }}</hd-radio>
          </li>
        </ul>
      </div>
      <!-- 首次发表日期 -->
      <div class="trunk clearfix" v-show="!unpublished">
        <label for="firstAppearDate">
          <span>首次发表日期：</span>
        </label>
        <el-date-picker id="firstAppearDate" v-model="params.firstAppearDate" type="date" placeholder="选择日期" value-format="timestamp"></el-date-picker>
        <span class="error" v-if="error.firstAppearDate" v-text="error.firstAppearDate"></span>
      </div>
      <!-- 首次发表地点 -->
      <div class="trunk clearfix" v-show="!unpublished">
        <label>
          <span>首次发表地点：</span>
        </label>
        <r-address ref="rAddress" @addressChange="addressChange"></r-address>
        <span class="error" v-if="error.firstAppearCountry" v-text="error.firstAppearCountry"></span>
      </div>
      <!-- 硬件环境 -->
      <div class="trunk clearfix">
        <label for="hardwareEnv">
          <span>硬件环境：</span>
        </label>
        <textarea id="hardwareEnv" v-model="params.hardwareEnv"></textarea>
        <span class="error" v-if="error.hardwareEnv" v-text="error.hardwareEnv"></span>
      </div>
      <!-- 软件环境 -->
      <div class="trunk clearfix">
        <label for="softEnv">
          <span>软件环境：</span>
        </label>
        <textarea id="softEnv" v-model="params.softEnv"></textarea>
        <span class="error" v-if="error.softEnv" v-text="error.softEnv"></span>
      </div>
      <!-- 编程语言 -->
      <div class="trunk clearfix">
        <label for="programLanguage">
          <span>编程语言：</span>
        </label>
        <el-select id="programLanguage" v-model="params.programLanguage" placeholder="请选择编程语言">
          <el-option v-for="item in programLanguages" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <span class="error" v-if="error.programLanguage" v-text="error.programLanguage"></span>
      </div>
      <!-- 源程序量 -->
      <div class="trunk clearfix">
        <label for="programLanguage">
          <span>源程序量：</span>
        </label>
        <div class="input-box">
          <hd-input v-model="params.sourceCodeRow" width="200" placeholder="请输入" type="number"></hd-input>
          <div>行</div>
          <hd-input v-model="params.sourceCodePage" width="200" placeholder="请输入" type="number"></hd-input>
          <div>页</div>
        </div>
        <span class="error" v-if="error.sourceCodeRow" v-text="error.sourceCodeRow"></span>
        <span class="error error-page" v-if="error.sourceCodePage" v-text="error.sourceCodePage"></span>
      </div>
      <!-- 创作目的 -->
      <div class="trunk clearfix">
        <label for="creationPurpose">
          <span>创作目的：</span>
        </label>
        <textarea id="creationPurpose" v-model="params.creationPurpose"></textarea>
        <span class="error" v-if="error.creationPurpose" v-text="error.creationPurpose"></span>
      </div>
      <!-- 主要功能 -->
      <div class="trunk clearfix">
        <label for="mainFunction">
          <span>主要功能：</span>
        </label>
        <textarea id="mainFunction" v-model="params.mainFunction"></textarea>
        <span class="error" v-if="error.mainFunction" v-text="error.mainFunction"></span>
      </div>
      <!-- 用途 -->
      <div class="trunk clearfix">
        <label for="purpose">
          <span>用途：</span>
        </label>
        <textarea id="purpose" v-model="params.purpose"></textarea>
        <span class="error" v-if="error.purpose" v-text="error.purpose"></span>
      </div>
      <!-- 技术特点 -->
      <div class="trunk clearfix">
        <label for="specialty">
          <span>技术特点：</span>
        </label>
        <textarea id="specialty" v-model="params.specialty"></textarea>
        <span class="error" v-if="error.specialty" v-text="error.specialty"></span>
      </div>
    </div>
    <div class="buttons clearfix">
      <hd-button class="prev" width="232" height="50" @click="handlePrevPage('index')">上一步</hd-button>
      <hd-button class="next" width="232" height="50" @click="handleNext">下一步</hd-button>
    </div>
  </div>
</template>

<script>

import '@css/R11/info'

import api from '@api'
import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import hdInput from '@share/components/hdInput'
import hdRadio from '@share/components/hdRadio'
import rAddress from '../components/address'
import explain from '../components/explain'
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
        softFullName: '', // 软件全称
        softShortName: '', // 软件简称
        version: '', // 版本号
        completeDate: '', // 开发完成日期
        publishStatus: '1', // 发表状态
        firstAppearDate: '', // 首次发表日期
        firstAppearCountry: '', // 首次发表国家
        firstAppearProvince: '', // 首次发表省份
        firstAppearCity: '', // 首次发表城市
        hardwareEnv: '', // 硬件环境
        softEnv: '', // 硬件环境
        programLanguage: '', // 编程语言
        sourceCodeRow: '', // 源程序量行数
        sourceCodePage: '', // 源程序量页数
        creationPurpose: '', // 创作目的
        mainFunction: '', // 主要功能
        purpose: '', // 用途
        specialty: '', // 技术特点
      }, // 上传数据
      error: {
        softFullName: '', // 软件全称
        softShortName: '', // 软件简称
        version: '', // 版本号
        completeDate: '', // 开发完成日期
        firstAppearDate: '', // 首次发表日期
        firstAppearCountry: '', // 首次发表国家
        hardwareEnv: '', // 硬件环境
        softEnv: '', // 硬件环境
        programLanguage: '', // 编程语言
        sourceCodeRow: '', // 源程序量行数
        sourceCodePage: '', // 源程序量页数
        creationPurpose: '', // 创作目的
        mainFunction: '', // 主要功能
        purpose: '', // 用途
        specialty: '', // 技术特点
      }, // 错误提示
      required: {
        softFullName: '请填写软件全称',
        version: '请填写版本号',
        completeDate: '请填写开发完成日期',
        firstAppearDate: '请填写首次发表日期',
        hardwareEnv: '请填写硬件环境',
        softEnv: '请填写软件环境',
        programLanguage: '请填写编程语言',
        sourceCodeRow: '请填写源程序量行数',
        sourceCodePage: '请填写源程序量页数',
        firstAppearCountry: '请填写首次发表国家',
        creationPurpose: '请填写创作目的',
        mainFunction: '请填写主要功能',
        purpose: '请填写用途',
        specialty: '请填写创技术特点',
      }, // 必填信息
      tips: {
        version: '', // 版本号
      }, // 提示
      publishStatus: [
        {
          label: '未发表',
          value: '0'
        },
        {
          label: '已发表',
          value: '1'
        },
      ], // 发表状态
      programLanguages: [], // 编程语言
      unpublished: false, // 是否未发表状态
      unpublishedTypes: ['firstAppearDate', 'firstAppearCountry'], // 未发表状态无需验证字段
    }
  },
  props: [],
  computed: {},
  components: { breadcrumb, progressNav, hdInput, hdRadio, rAddress, explain, hdButton },
  methods: {
    /**
     * 主入口函数
     */
    init() {
      this.$refs.rAddress.setData(this.params.firstAppearCountry, this.params.firstAppearProvince, this.params.firstAppearCity)
      this.$refs.explain.setData(this.params)
    },
    /**
     * 改变开发完成日期
     * @param value 当前选择的时间
     */
    handleCompleteDateChange(value) {
      if (value > (new Date()).getTime()) this.error.completeDate = '首次发表日期必须小于等于当前填报日期'
    },
    /**
     * 改变发表状态
     *  @param value 当前选中状态
     */
    handlePublishStatusChange(value) {
      this.unpublished = value === '0'
      if (value === '0') {
        this.params.firstAppearDate = ''
        this.params.firstAppearCountry = ''
        this.params.firstAppearProvince = ''
        this.params.firstAppearCity = ''
        this.error.firstAppearDate = ''
        this.error.firstAppearCountry = ''
        this.$refs.rAddress.clear()
      }
    },
    /**
     * 地址组件值发生变化时触发
     */
    addressChange(country, addressArr) {
      this.error.firstAppearCountry = ''
      this.params.firstAppearCountry = country
      this.params.firstAppearProvince = addressArr[0] ? addressArr[0].name : ''
      this.params.firstAppearCity = addressArr[1] ? addressArr[1].name : ''
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
      if (this.requiredCheck()) return
      if (this.firstAppearDateCheck()) return
      if (this.$refs.explain.check(this.params)) return
      if (!this.unpublished && !this.$refs.rAddress.check()) return this.error.firstAppearCountry = '请填写省份和城市'

      setSession(this.params, 'R11')
      this.handlePrevPage('ownership')
    },
    /**
     * 验证必填选项未填写
     */
    requiredCheck() {
      let flag = false
      Object.keys(this.required).forEach(key => {
        if (!this.params[key]) {
          if (this.unpublished && this.unpublishedTypes.some(item => item === key)) return
          this.error[key] = this.required[key]
          flag = true
        }
      })
      if (!flag) Object.values(this.error).forEach(value => {
        if (value) flag = true
      })
      return flag
    },
    /**
     * 首次发表日期填写是否有误
     */
    firstAppearDateCheck() {
      if (this.params.publishStatus === '0') return false
      if (this.params.firstAppearDate > (new Date()).getTime()) this.error.firstAppearDate = '首次发表日期必须小于等于当前填报日期'
      if (this.params.completeDate > this.params.firstAppearDate) this.error.firstAppearDate = '首次发表日期必须大于等于开发完成日期'
      return Boolean(this.error.firstAppearDate)
    },
    /**
     * 判断简称比全称长
     * @param newValue 最新的数据
     */
    softShortNameError(newValue) {
      let softFullName = String(newValue.softFullName).length
      let softShortName = String(newValue.softShortName).length
      if (softFullName === 0 || softFullName > softShortName) return this.error.softShortName = ''
      this.error.softShortName = '简称不可与全称完全一致'
    },
    /**
     * 判断版本号是否正确
     * @param newValue 最新的数据
     */
    versionTip(newValue) {
      if (!newValue.version || this.error.version || /^V\d+(\.\d+)*$/.test(newValue.version)) return this.tips.version = ''
      this.tips.version = '非标准格式可能会补正'
    },
  },
  watch: {
    params: {
      handler(newValue, oldValue) {
        Object.keys(this.required).forEach(key => {
          if (newValue[key]) return this.error[key] = ''
        })
        this.softShortNameError(newValue)
        this.versionTip(newValue)
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  created() {
    Object.assign(this.params, getSession('R11'))
    this.unpublished = this.params.publishStatus === '0'
    api.R11ProgramLanguage().then(res => {
      if (res.data) this.programLanguages = [...res.data]
    })
  },
}

</script>
<style lang='scss' scoped>
</style>