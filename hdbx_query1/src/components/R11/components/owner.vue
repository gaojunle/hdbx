<template>
  <div class="owner">
    <!--身份类型-->
    <div class="owner-type">
      <hd-radio v-model="params.ownerType" label="person" :name="'ownerType'" @change="handleOwnerTypeChange">个人</hd-radio>
      <hd-radio v-model="params.ownerType" label="enterprise" :name="'ownerType'" @change="handleOwnerTypeChange">机构</hd-radio>
    </div>
    <!--国籍-->
    <div class="trunk">
      <span>国籍</span>
      <el-select v-model="params.country" placeholder="请选择" @change="handleCountryChange">
        <el-option v-for="item in country" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <div class="error" v-show="error.country" v-text="error.country"></div>
    </div>
    <!-- 省份城市 -->
    <div class="trunk" v-show="province.length > 0">
      <span>省份城市</span>
      <el-cascader v-show="locationShow" v-model="location" placeholder="请选择" :options="options" @active-item-change="handleItemChange" @change="handleLocationChange"></el-cascader>
      <div class="error" v-show="error.province" v-text="error.province"></div>
    </div>
    <!--机构类型-->
    <div class="trunk" v-if="params.ownerType === 'enterprise'">
      <span>机构类型</span>
      <el-select v-model="params.enterpriseType" placeholder="请选择" @change="handleEnterpriseTypeChange">
        <el-option v-for="item in mechanismType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div class="error" v-show="error.enterpriseType" v-text="error.enterpriseType"></div>
    </div>
    <!--著作权人-->
    <div class="trunk">
      <hd-input :required="true" width="228" height="38" placeholder="著作权人姓名或名称，与身份证明文件保持一致" v-model="params.name" @change="handleOwnerChange">著作权人</hd-input>
      <div class="error" v-show="error.name" v-text="error.name"></div>
    </div>
    <!--园区选择-->
    <div class="trunk" v-if="params.ownerType === 'enterprise'">
      <span>园区选择</span>
      <el-select v-model="params.park" placeholder="请选择" @change="handleParkChange">
        <el-option v-for="item in parks" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div class="error" v-show="error.park" v-text="error.park"></div>
    </div>
    <!--证件类型-->
    <div class="trunk">
      <span>证件类型</span>
      <el-select v-model="params.idType" placeholder="请选择" @change="handleOwnerIdTypeChange">
        <el-option v-for="item in cardType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <div class="error" v-show="error.idType" v-text="error.idType"></div>
    </div>
    <!--证件号码-->
    <div class="trunk">
      <hd-input :required="true" width="228" height="38" placeholder="请输入证件号码" v-model="params.idNumber" @change="handleOwnerIdNumberChange">证件号码</hd-input>
      <div class="error" v-show="error.idNumber" v-text="error.idNumber"></div>
    </div>
  </div>
</template>

<script>
import '@css/R11/owner'
import '@share/css/theme'

import Vue from 'vue'
import areaFun from '@share/js/common/area'
import { papersStatus, mechanismStatus, peopleStatusCollection, mechanismStatusCollection } from '@share/constants/realName'
import hdRadio from '@share/components/hdRadio'
import hdInput from '@share/components/hdInput'
import {
  Cascader,
  Select,
  Option,
} from 'element-ui'

Vue.use(Cascader)
Vue.use(Select)
Vue.use(Option)

export default {
  data() {
    return {
      params: {
        ownerType: 'person', // 人员类型
        name: '', // 名称
        enterpriseType: '', // 机构类型
        country: '', // 国家
        province: '', // 省份
        city: '', // 城市
        park: '', // 园区
        idType: '', // 证件类型
        idNumber: '',	// 证件号
      }, // 需要上传的数据
      error: {
        name: '', // 著作权人
        country: '', // 著作权人国家
        province: '', // 省份
        park: '', // 园区
        idType: '', // 著作权人证件类型
        idNumber: '', // 著作权人证件号码
      }, // 错误信息
      require: {
        person: {
          name: '请输入著作权人姓名或名称',
          country: '请选择国家',
          idType: '请选择证件类型',
          idNumber: '请输入证件号',
        },
        enterprise: {
          name: '请输入著作权人姓名或名称',
          country: '请选择国家',
          enterpriseType: '请选择机构类型',
          park: '请选择园区',
          idType: '请选择证件类型',
          idNumber: '请输入证件号',
        },
      }, // 需要验证
      country: [], // 全部国家
      options: [], // 所在地区所需级联格式
      province: [], // 省份列表
      city: [], // 城市列表
      location: [], // 所在地区
      locationShow: true, // 是否需要填写所在地区
      mechanismType: [], // 机构类型
      cardType: [], // 证件类型
      parks: [
        {
          label: '清华软件园',
          value: '清华软件园',
        },
        {
          label: '上海浦东软件园',
          value: '上海浦东软件园',
        },
        {
          label: '杭州软件园',
          value: '杭州软件园',
        },
        {
          label: '江苏软件园',
          value: '江苏软件园',
        },
        {
          label: '东大软件园',
          value: '东大软件园',
        },
        {
          label: '齐鲁软件园',
          value: '齐鲁软件园',
        },
        {
          label: '西部软件园',
          value: '西部软件园',
        },
        {
          label: '长沙软件园',
          value: '长沙软件园',
        },
        {
          label: '北京软件产业基地',
          value: '北京软件产业基地',
        },
        {
          label: '天津华苑软件园',
          value: '天津华苑软件园',
        },
        {
          label: '湖北软件产业基地',
          value: '湖北软件产业基地',
        },
        {
          label: '杭州高新软件园',
          value: '杭州高新软件园',
        },
        {
          label: '福州软件园',
          value: '福州软件园',
        },
        {
          label: '江西金庐软件园',
          value: '江西金庐软件园',
        },
        {
          label: '西安软件园',
          value: '西安软件园',
        },
        {
          label: '大连软件园',
          value: '大连软件园',
        },
        {
          label: '广州软件园',
          value: '广州软件园',
        },
        {
          label: '上海软件园',
          value: '上海软件园',
        },
        {
          label: '南京软件园',
          value: '南京软件园',
        },
        {
          label: '长春软件园',
          value: '长春软件园',
        },
        {
          label: '厦门软件园',
          value: '厦门软件园',
        },
        {
          label: '合肥软件园',
          value: '合肥软件园',
        },
        {
          label: '云南软件园',
          value: '云南软件园',
        },
        {
          label: '深圳软件园',
          value: '深圳软件园',
        },
        {
          label: '兰州软件园',
          value: '兰州软件园',
        },
        {
          label: '青岛软件园',
          value: '青岛软件园',
        },
        {
          label: '吉林软件园',
          value: '吉林软件园',
        },
        {
          label: '中部软件产业园',
          value: '中部软件产业园',
        },
        {
          label: '无锡软件园',
          value: '无锡软件园',
        },
        {
          label: '苏州软件园',
          value: '苏州软件园',
        },
        {
          label: '常州软件园',
          value: '常州软件园',
        },
        {
          label: '宁波国际软件园',
          value: '宁波国际软件园',
        },
        {
          label: '河北省软件产业基地（石家庄）',
          value: '河北省软件产业基地（石家庄）',
        },
        {
          label: '其他园区',
          value: '其他园区',
        },
      ], // 全部园区
      status: null, // 根据国家和著作权人类型得到的状态类型
    }
  },
  props: {
    index: {
      default: '0'
    }, // 索引
  },
  computed: {},
  components: { hdRadio, hdInput },
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
      Object.keys(this.params).forEach(key => {
        if (key === 'ownerType') return this.params.ownerType = value
        this.params[key] = ''
        this.error[key] = ''
      })
    },
    /**
     * 国籍选择 
     */
    async handleCountryChange() {
      let country = this.params.country
      let currentCountry = this.country.find(item => item.name === country)
      if (!currentCountry) return
      let ownerType = this.params.ownerType
      let statusCollection = ownerType === 'person' ? peopleStatusCollection : mechanismStatusCollection
      this.status = statusCollection[country] ? statusCollection[country] : statusCollection.other
      ownerType === 'person' ? this.peopleInitPapers(this.status) : this.mechanismInitPapers(this.status)
      this.error.country = ''

      this.province = await areaFun.getArea('Province', currentCountry.id)
      this.locationShow = this.province.length === 0 ? false : true
      this.options = []
      this.formatOptions(this.options, this.province)
    },
    /**
     * 选中级联选项时触发
     * @param val 选择的数据
     */
    handleItemChange(val) {
      let length = val.length,
        option = val[length - 1],
        province = length > 0 ? this.options.find(item => item.label === val[0].name) : null,
        city = length > 1 ? province.children.find(item => item.label === val[1].name) : null

      switch (parseInt(option.lvl)) {
        case 2:
          this.provinceChange(option.name, province)
          break
        case 3:
          this.cityChange(option.name, city)
          break
        default:
          break
      }
    },
    /**
     * 级联选项绑定值变化
     * @param val 选择的数据
     */
    handleLocationChange(val) {
      this.$emit('addressChange', this.country, val)
    },
    /**
     * 省份改变时触发
     */
    async provinceChange(name, province) {
      let currentProvince = this.province.find(item => item.name === name)

      this.city = await areaFun.getArea('City', currentProvince.id)
      this.formatOptions(province.children, this.city, province)
    },
    /**
     * 格式化省份数据
     * @param options 省份数据
     */
    formatOptions(parentArray, options, parent) {
      if (!parentArray) return
      if (parentArray.length > 0) parentArray = []
      options.forEach(option => {
        let obj = {}
        obj.label = option.name
        obj.value = option
        if (parseInt(option.lvl) < 3 && parseInt(option.hasChildren) === 1) obj.children = []
        parentArray.push(obj)
      })
    },
    /**
     * 重置证件类型选择
     * @param list 证件类型名称
     */
    peopleInitPapers(list) {
      this.cardType = []
      this.params.idType = ''
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
      this.params.peopleKind = ''
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
     * 园区选择
     */
    handleParkChange() {
      this.error.park = ''
    },
    /**
     * 证件号码输入框变化
     */
    handleOwnerIdNumberChange(index) {
      this.error.idNumber = ''
    },
    /**
     * 验证
     */
    check(selfOwner) {
      let flag = false
      let require = this.require[this.params.ownerType]
      Object.keys(require).forEach(key => {
        if (this.params[key]) return
        this.error[key] = require[key]
        flag = true
      })
      if (selfOwner) Object.keys(selfOwner).forEach(key => {
        if (this.params[key] === selfOwner[key]) return
        if (key === 'park') return
        this.error[key] = '输入内容与实名内容不符'
        flag = true
      })
      if (this.province.length > 0 && this.location.length === 0) {
        this.error.province = '请选择省份'
        flag = true
      }
      if (flag) return flag

      this.params.province = ''
      this.params.city = ''
      if (this.location[0]) this.params.province = this.location[0].name
      if (this.location[1]) this.params.city = this.location[1].name

      return flag
    },
    /**
    * 设置数据
    */
    async setInit(data) {
      this.location = []
      Object.keys(this.params).forEach(key => {
        this.params[key] = data[key]
      })
      await this.getCountry()
      await this.handleCountryChange()
      if (this.params.province) {
        await this.provinceChange(this.params.province, this.options.find(option => option.label === this.params.province))
        this.location.push(this.province.find(item => item.name === this.params.province))
      }
      if (this.params.city) this.location.push(this.city.find(item => item.name === this.params.city))
      if (data.enterpriseType) this.handleEnterpriseTypeChange(data.enterpriseType)
      Object.keys(this.params).forEach(key => {
        this.params[key] = data[key]
      })
    },
  },
  watch: {},
  mounted() { },
  async created() {
    await this.getCountry()
  },
}

</script>
<style lang='scss' scoped>
</style>