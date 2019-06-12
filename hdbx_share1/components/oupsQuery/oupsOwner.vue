<template>
  <div class="oups-owner clearfix">
    <div class="title">查询人信息</div>
    <div class="oups-owner-left">
      <!--身份类型-->
      <div class="owner-type">
        <hd-radio v-model="opusQueryPeopleInfoVo.peopleType" label="0" :name="'peopleType'" @change="handleOwnerTypeChange">个人</hd-radio>
        <hd-radio v-model="opusQueryPeopleInfoVo.peopleType" label="1" :name="'peopleType'" @change="handleOwnerTypeChange">机构</hd-radio>
      </div>
      <!--国籍-->
      <div class="trunk">
        <span>国籍</span>
        <el-select v-model="opusQueryPeopleInfoVo.country" placeholder="请选择" @change="handleCountryChange">
          <el-option v-for="item in country" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <div class="error" v-show="error.country" v-text="error.country"></div>
      </div>
      <!--机构类型-->
      <div class="trunk" v-if="opusQueryPeopleInfoVo.peopleType === '1'">
        <span>机构类型</span>
        <el-select v-model="opusQueryPeopleInfoVo.peopleKind" placeholder="请选择" @change="handleEnterpriseTypeChange">
          <el-option v-for="item in mechanismType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="error" v-show="error.peopleKind" v-text="error.peopleKind"></div>
      </div>
      <!--真实姓名-->
      <div class="trunk" v-show="opusQueryPeopleInfoVo.peopleType === '0'">
        <hd-input :required="true" width="228" height="38" placeholder="请输入著作权人真实姓名" v-model="opusQueryPeopleInfoVo.name" @change="handleOwnerChange">真实姓名</hd-input>
        <div class="error" v-show="error.name" v-text="error.name"></div>
      </div>
      <!--机构名称-->
      <div class="trunk" v-show="opusQueryPeopleInfoVo.peopleType === '1'">
        <hd-input :required="true" width="228" height="38" placeholder="请输入著作权人真实姓名" v-model="opusQueryPeopleInfoVo.name" @change="handleOwnerChange">机构名称</hd-input>
        <div class="error" v-show="error.name" v-text="error.name"></div>
      </div>
      <!--证件类型-->
      <div class="trunk">
        <span>证件类型</span>
        <el-select v-model="opusQueryPeopleInfoVo.idType" placeholder="请选择" @change="handleOwnerIdTypeChange">
          <el-option v-for="item in cardType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="error" v-show="error.idType" v-text="error.idType"></div>
      </div>
      <!--证件号码-->
      <div class="trunk">
        <hd-input :required="true" width="228" height="38" placeholder="请输入证件号码" v-model="opusQueryPeopleInfoVo.idNumber" @change="handleOwnerIdNumberChange">证件号码</hd-input>
        <div class="error" v-show="error.idNumber" v-text="error.idNumber"></div>
      </div>
      <!--联系人-->
      <div class="trunk" v-if="opusQueryPeopleInfoVo.peopleType === '1'">
        <hd-input :required="true" width="228" height="38" placeholder="请输入联系人" v-model="opusQueryPeopleInfoVo.contactPerson" @change="handleContactPersonChange">联系人</hd-input>
        <div class="error" v-show="error.contactPerson" v-text="error.contactPerson"></div>
      </div>
      <!--联系电话-->
      <div class="trunk">
        <hd-input :required="true" width="228" height="38" placeholder="请输入联系电话" v-model="opusQueryPeopleInfoVo.phone" @change="handlePhoneChange">联系电话</hd-input>
        <div class="error" v-show="error.phone" v-text="error.phone"></div>
      </div>
    </div>
    <div class="oups-owner-right">
      <div class="upload-img">
        <file-upload ref="identityFront" who="identityFront" class="left" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
        <div class="error" v-if="identityFront.error" v-text="identityFront.error"></div>
      </div>
      <div class="upload-img">
        <file-upload v-if="twoImg" ref="identityBack" who="identityBack" class="left" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
        <div class="error" v-if="identityBack.error" v-text="identityBack.error"></div>
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
      opusQueryPeopleInfoVo: {
        peopleType: '0', // 著作权人类型
        country: '', // 著作权人国家
        peopleKind: '', // 机构类型
        name: '', // 著作权人
        idType: '', // 著作权人证件类型
        idNumber: '', // 著作权人证件号码
        phone: '', // 联系人电话
        contactPerson: '', // 联系人
      },
      error: {
        country: '', // 著作权人国家
        peopleKind: '', // 机构类型
        name: '', // 著作权人
        idType: '', // 著作权人证件类型
        idNumber: '', // 著作权人证件号码
        phone: '', // 联系人电话
        contactPerson: '', // 联系人
      }, // 错误信息
      identityFront: {
        img: false, // 是否添加图片
        url: '', // 上传成功的地址
        error: '', // 错误提示文案
      }, // 照片正面
      identityBack: {
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
      Object.keys(this.opusQueryPeopleInfoVo).forEach(key => {
        if (key === 'peopleType') return this.opusQueryPeopleInfoVo.peopleType = value
        this.opusQueryPeopleInfoVo[key] = ''
        this.error[key] = ''
      })
    },
    /**
     * 国籍选择 
     */
    handleCountryChange() {
      let country = this.opusQueryPeopleInfoVo.country
      let peopleType = this.opusQueryPeopleInfoVo.peopleType
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
      this.opusQueryPeopleInfoVo.idType = ''
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
      this.opusQueryPeopleInfoVo.peopleKind = ''
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
      this.error.peopleKind = ''
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
     * 联系人输入框变化
     */
    handleContactPersonChange() {
      this.error.contactPerson = ''
    },
    /**
     * 联系人电话输入框变化
     */
    handlePhoneChange() {
      this.error.phone = ''
    },
    /**
     * 改变需上传图片数量
     */
    handleImgNum() {
      this.twoImg = !this.twoImg
      this.identityBack = {
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
      this.imgLenAll = this.twoImg ? 2 : 1
      this.imgAllSuccess = true
      this.identityFront.url ? this.onComplete('identityFront', this.identityFront.url) : this.$refs.identityFront.submit()

      if (!this.twoImg) return
      this.identityBack.url ? this.onComplete('identityBack', this.identityBack.url) : this.$refs.identityBack.submit()
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
      let errorFont = this.opusQueryPeopleInfoVo.peopleType === '0' ? '真实姓名' : '机构名称'
      if (!this.opusQueryPeopleInfoVo.country) this.error.country = '请选择国籍'
      if (this.opusQueryPeopleInfoVo.peopleType === '1' && !this.opusQueryPeopleInfoVo.peopleKind) this.error.peopleKind = '请选择机构类型'
      if (!this.opusQueryPeopleInfoVo.name) this.error.name = '请填写' + errorFont
      if (!this.opusQueryPeopleInfoVo.idType) this.error.idType = '请选择证件类型'
      if (!this.opusQueryPeopleInfoVo.idNumber) this.error.idNumber = '请填写证件号码'
      if (!this.opusQueryPeopleInfoVo.phone) this.error.phone = '请填写联系人电话'
      if (this.opusQueryPeopleInfoVo.peopleType === '1' && !this.opusQueryPeopleInfoVo.contactPerson) this.error.contactPerson = '请填写联系人'

      Object.keys(this.error).forEach(error => {
        if (this.error[error]) flag = true
      })

      if (!this.identityFront.img) {
        this.identityFront.error = '请上传图片'
        flag = true
      }
      if (this.twoImg && !this.identityBack.img) {
        this.identityBack.error = '请上传图片'
        flag = true
      }

      return flag
    },
    /**
     * 设置数据
     */
    setInit(opusQueryPeopleInfoVo, identityFront, identityBack) {
      this.opusQueryPeopleInfoVo = { ...opusQueryPeopleInfoVo }
      this.getCountry()
      this.handleCountryChange()
      if (opusQueryPeopleInfoVo.peopleKind) this.handleEnterpriseTypeChange(opusQueryPeopleInfoVo.peopleKind)
      this.opusQueryPeopleInfoVo = { ...opusQueryPeopleInfoVo }
      this.opusQueryPeopleInfoVo.idType = parseInt(this.opusQueryPeopleInfoVo.idType)
      this.setImg('identityFront', identityFront)
      if (identityBack) {
        this.twoImg = true
        this.$nextTick(() => {
          this.setImg('identityBack', identityBack)
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