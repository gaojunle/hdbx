<template>
  <div class="address">
    <div class="country"></div>
    <el-select v-model="country" placeholder="请选择" @change="countryChange">
      <el-option v-for="item in countrys" :key="item.id" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <el-cascader v-show="locationShow" v-model="location" placeholder="请选择" :options="options" @active-item-change="handleItemChange" @change="handleLocationChange"></el-cascader>
  </div>
</template>

<script>

import '@css/R11/address'
import '@share/css/theme'

import Vue from 'vue'
import api from '@api'
import areaFun from '@share/js/common/area'
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
      countrys: [], // 国籍列表
      options: [], // 所在地区所需级联格式
      province: [], // 省份列表
      city: [], // 城市列表
      country: '', // 国籍选择
      location: [], // 所在地区
      locationShow: true, // 是否需要填写所在地区
    }
  },
  props: [],
  computed: {},
  components: {},
  methods: {
    /**
   * 国家改变时触发
   */
    async countryChange(name, emit = true) {
      let currentCountry = this.countrys.find(item => item.name === name)
      if (!currentCountry) return
      this.province = await areaFun.getArea('Province', currentCountry.id)
      this.locationShow = this.province.length === 0 ? false : true
      this.options = []
      this.formatOptions(this.options, this.province)
      if (emit) {
        this.location = []
        this.$emit('addressChange', name, [])
      }

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
       * 选择时清除数据
       * @param clears
       */
    clear() {
      this.province = []
      this.city = []
      this.options = []
      this.country = ''
      this.location = []
    },
    /**
     * 检测地址选择
     */
    check() {
      let flag = true

      if (this.locationShow && this.location.length === 0) flag = false

      return flag
    },
    /**
     * 设置数据
     */
    setData(country, province, city) {
      let interval
      this.country = country

      clearInterval(setInterval)
      interval = setInterval(async () => {
        if (this.countrys.length > 0) {
          clearInterval(interval)
          await this.countryChange(country, false)
          if (province) {
            await this.provinceChange(province, this.options.find(option => option.label === province))
            this.location.push(this.province.find(item => item.name === province))
          }
          if (city) this.location.push(this.city.find(item => item.name === city))
        }
      }, 100)
    },
  },
  watch: {},
  mounted() { },
  async created() {
    let countrys = await areaFun.getArea('Country')
    this.countrys.push(...countrys)
  },
}

</script>
<style lang='scss' scoped>
</style>