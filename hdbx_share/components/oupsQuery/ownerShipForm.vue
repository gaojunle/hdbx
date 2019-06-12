<template>
  <div class="oups-owner clearfix">
    <div class="title">著作权人信息</div>
    <div class="oups-owner-left">
      <!--身份类型-->
      <div class="owner-type">
        <hd-radio v-model="owners.peopleType" label="0" :name="'peopleType'" @change="handleOwnerTypeChange">个人</hd-radio>
        <hd-radio v-model="owners.peopleType" label="1" :name="'peopleType'" @change="handleOwnerTypeChange">机构</hd-radio>
      </div>
      <!--国籍-->
      <div class="trunk">
        <span>国籍</span>
        <el-select v-model="owners.country" placeholder="请选择" @change="handleCountryChange">
          <el-option v-for="item in country" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <div class="error" v-show="error.country" v-text="error.country"></div>
      </div>
      <!--机构类型-->
      <div class="trunk" v-if="owners.peopleType === '1'">
        <span>机构类型</span>
        <el-select v-model="owners.enterpriseType" placeholder="请选择" @change="handleEnterpriseTypeChange">
          <el-option v-for="item in mechanismType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="error" v-show="error.enterpriseType" v-text="error.enterpriseType"></div>
      </div>
      <!--真实姓名-->
      <div class="trunk" v-show="owners.peopleType === '0'">
        <hd-input :required="true" width="226" height="38" placeholder="请输入著作权人真实姓名" v-model="owners.name" @change="handleOwnerChange"><span>真实姓名</span></hd-input>
        <div class="error" v-show="error.name" v-text="error.name"></div>
      </div>
      <!--机构名称-->
      <div class="trunk" v-show="owners.peopleType === '1'">
        <hd-input :required="true" width="226" height="38" placeholder="请输入著作权人真实姓名" v-model="owners.name" @change="handleOwnerChange"><span>机构名称</span></hd-input>
        <div class="error" v-show="error.name" v-text="error.name"></div>
      </div>
      <!--证件类型-->
      <div class="trunk">
        <span>证件类型</span>
        <el-select v-model="owners.idType" placeholder="请选择" @change="handleOwnerIdTypeChange">
          <el-option v-for="item in cardType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="error" v-show="error.idType" v-text="error.idType"></div>
      </div>
      <!--证件号码-->
      <div class="trunk">
        <hd-input :required="true" width="226" height="38" placeholder="请输入证件号码" v-model="owners.idNumber" @change="handleOwnerIdNumberChange"><span>证件号码</span></hd-input>
        <div class="error" v-show="error.idNumber" v-text="error.idNumber"></div>
      </div>
      <!--手机号码-->
      <div class="trunk">
        <hd-input :required="true" width="226" height="38" placeholder="手机号码" v-model="owners.mobile" @change="handleOwnerMobileChange"><span>手机号码</span></hd-input>
        <div class="error" v-show="error.mobile" v-text="error.mobile"></div>
      </div>


      <div class="trunk">
        <span>是否申请证书</span>
        <hd-radio v-model="owners.applyCopy" label="1" :name="'applyCopy'" @change="handleApplyCopyChange">是</hd-radio>
        <hd-radio v-model="owners.applyCopy" label="0" :name="'applyCopy'" @change="handleApplyCopyChange">否</hd-radio>
      </div>
    </div>
    <div class="oups-owner-right">
      <div class="upload-img">
        <file-upload ref="cardFront" who="cardFront" class="left" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
        <div class="error" v-if="cardFront.error" v-text="cardFront.error"></div>
      </div>
      <div class="upload-img">
        <file-upload v-if="twoImg" ref="cardBack" who="cardBack" class="left" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
        <div class="error" v-if="cardBack.error" v-text="cardBack.error"></div>
      </div>
      <hd-button width="80" @click="handleImgNum">{{ buttonText }}</hd-button>
    </div>
    <!-- 禁止修改 -->
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>
<script>

import '../../css/theme'
import '../../css/oupsQuery/oupsOwner'

import Vue from 'vue'
import hdRadio from '../hdRadio'
import hdInput from '../hdInput'
import hdButton from '../hdButton'
import fileUpload from '../common/fileUpload'
import areaFun from '../../js/common/area'
import { papersStatus, mechanismStatus, peopleStatusCollection, mechanismStatusCollection } from '../../constants/realName'
import {
  Select,
  Option,
} from 'element-ui'

Vue.use(Select)
Vue.use(Option)

export default {
  data() {
    return {
      owners: {
        peopleType: '0', // 著作权人类型
        country: '', // 著作权人国家
        enterpriseType: '', // 机构类型
        name: '', // 著作权人
        idType: '', // 著作权人证件类型
        idNumber: '', // 著作权人证件号码
        mobile:'',//手机号码
        applyCopy: '0',
      },
      error: {
        country: '', // 著作权人国家
        enterpriseType: '', // 机构类型
        name: '', // 著作权人
        idType: '', // 著作权人证件类型
        idNumber: '', // 著作权人证件号码
        mobile:'',//手机号码
      }, // 错误信息
      cardFront: {
        img: false, // 是否添加图片
        url: '', // 上传成功的地址
        error: '', // 错误提示文案
      }, // 照片正面
      cardBack: {
        img: false, // 是否添加图片
        url: '', // 上传成功的地址
        error: '', // 错误提示文案
      }, // 照片正面
      twoImg: false, // 是否显示第二张图片
      imgLenAll: 0, // 需要上传的图片总数量
      imgLen: 0, // 已上传的图片数量
      imgAllSuccess: false, // 所有图片上传成功
      country: [], // 全部国家
      mechanismType: [], // 机构类型
      cardType: [], // 证件类型
      status: null, // 根据国家和著作权人类型得到的状态类型
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改
  },
  computed: {
    /**
     * 按钮显示文案
     */
    buttonText() {
      return this.twoImg ? '删除' : '添加'
    },
  },
  components: { hdRadio, hdInput, hdButton, fileUpload },
  methods: {
    /**
     * 获取国家信息
     */
    async getCountry() {
      let country = await areaFun.getArea('Country')
      this.country = []
      this.country.push(...country)
    },
    /**
     * 著作权人类型选择
     * @param value 著作权人类型
     */
    handleOwnerTypeChange(value) {
      this.owners.peopleType = value
      this.owners.country = ''
      this.owners.enterpriseType = ''
      this.owners.name = ''
      this.owners.idType = ''
      this.owners.idNumber = ''
      this.owners.mobile = ''
      this.owners.applyCopy = value

      Object.keys(this.error).forEach(error => {
        this.error[error] = ''
      })
    },

    handleApplyCopyChange(){

    },
    /**
     * 国籍选择 
     */
    handleCountryChange() {
      let country = this.owners.country
      let peopleType = this.owners.peopleType
      let statusCollection = peopleType === '0' ? peopleStatusCollection : mechanismStatusCollection
      this.status = statusCollection[country] ? statusCollection[country] : statusCollection.other

      peopleType === '0' ? this.peopleInitPapers(this.status) : this.mechanismInitPapers(this.status)

      this.error.country = ''
    },
    /**
     * 重置证件类型选择
     * @param list 证件类型名称
     */
    peopleInitPapers(list) {
      this.cardType = []
      this.owners.idType = ''
      list.forEach(item => {
        let paper = papersStatus.find(info => info.value === item)
        this.cardType.push(paper)
      })
    },
    /**
     * 重置机构类型选择
     * @param status 机构类型
     */
    mechanismInitPapers(status) {
      this.mechanismType = []
      this.owners.enterpriseType = ''
      Object.keys(status).forEach(item => {
        let paper = mechanismStatus.find(info => info.value === parseInt(item))
        this.mechanismType.push(paper)
      })
    },
    /**
     * 机构类型选择
     */
    handleEnterpriseTypeChange(value) {
      this.peopleInitPapers(this.status[value])
      this.error.enterpriseType = ''
    },
    /**
     * 机构名称输入框变化
     */
    handleOwnerChange() {
      this.error.name = ''
    },
    /**
     * 证件类型选择
     */
    handleOwnerIdTypeChange(index) {
      this.error.idType = ''
    },
    /**
     * 证件号码输入框变化
     */
    handleOwnerIdNumberChange(index) {
      this.error.idNumber = ''
    },
    /**
     * 手机号码输入框变化
     */
    handleOwnerMobileChange(index) {
      this.error.mobile = ''
    },
    /**
     * 改变需上传图片数量
     */
    handleImgNum() {
      this.twoImg = !this.twoImg
      this.cardBack = {
        img: false, // 是否添加图片
        url: '', // 上传成功的地址
        error: '', // 错误提示文案
      }
    },
    /**
     * 图片上传
     */
    upload() {
      this.imgLen = 0
      this.imgLenAll = 0
      this.imgAllSuccess = true
      this.imgLenAll++
      this.cardFront.url ? this.onComplete('cardFront', this.cardFront.url) : this.$refs.cardFront.submit()

      if (!this.twoImg) return
      this.imgLenAll++
      this.cardBack.url ? this.onComplete('cardBack', this.cardBack.url) : this.$refs.cardBack.submit()
    },
    /**
     * 添加图片时触发
     * @param who
     */
    onChange(who) {
      this[who].img = true
      this[who].error = ''
    },
    /**
     * 删除图片时触发
     * @param who
     */
    onClose(who) {
      this[who].img = false
      this[who].url = ''
    },
    /**
     * 上传成功或失败后调用
     * @param who
     * @param url
     */
    onComplete(who, url) {
      if (url) {
        this[who].url = url
      } else {
        this.imgAllSuccess = false
        pageShowMsg('上传图片失败')
      }

      this.imgLen++

      if (this.imgLen === this.imgLenAll) {
        this.imgLen = 0
        if (this.imgAllSuccess) this.$emit('success')
      }
    },
    /**
     * 检验著作权人信息填写正确
     */
    check() {
      let flag = false
      let errorFont = this.owners.peopleType === '0' ? '真实姓名' : '机构名称'
      if (!this.owners.country) this.error.country = '请选择国籍'
      if (this.owners.peopleType === '1' && !this.owners.enterpriseType) this.error.enterpriseType = '请选择湖沟类型'
      if (!this.owners.name) this.error.name = '请填写' + errorFont
      if (!this.owners.idType) this.error.idType = '请选择证件类型'
      if (!this.owners.idNumber) this.error.idNumber = '请填写证件号码'
      if (!this.owners.mobile) this.error.mobile='请填写手机号码'

      Object.keys(this.error).forEach(error => {
        if (this.error[error]) flag = true
      })

      if (!this.cardFront.img) {
        this.cardFront.error = '请上传图片'
        flag = true
      }
      if (this.twoImg && !this.cardBack.img) {
        this.cardBack.error = '请上传图片'
        flag = true
      }

      return flag
    },
    /**
     * 设置数据
     */
    setInit(owners, cardFront, cardBack) {
      this.owners = { ...owners }
      this.getCountry()
      this.handleCountryChange()
      if (owners.enterpriseType) this.handleEnterpriseTypeChange(owners.enterpriseType)
      this.owners = { ...owners }
      this.setImg('cardFront', cardFront)
      if (cardBack) {
        this.twoImg = true
        this.$nextTick(() => {
          this.setImg('cardBack', cardBack)
        })
      }
    },
    /**
     * 回填上传文件
     */
    setImg(key, value) {
      this[key].url = value
      this[key].img = true
      this.$refs[key].initFile(value)
    },
  },
  mounted() {

  },
  watch: {},
  created() {
    this.getCountry()
  }
}

</script>
