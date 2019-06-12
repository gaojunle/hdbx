<template>
    <div>
        <div class="trunk">
            <el-select v-model="paramData.country" placeholder="请选择国家" @change="countryChange">
            <el-option v-for="item in country" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <div class="error" v-if="error.country" v-text="error.country"></div>
        </div> 
        <div class="trunk">
            <el-cascader v-model="location" placeholder="请选择省份和城市" :options="options" @active-item-change="handleItemChange"></el-cascader>
            <div class="error" v-if="error.location" v-text="error.location"></div>
        </div>
    </div>
</template>

<script>

import '@share/css/theme'
import '../../../css/Z11/addressEdit'

import Vue from 'vue'
import api from '@api'
import axios from '@share/api/axios'
import { API_HOST } from '@share/api/config'
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
        country: [], // 国籍列表
            province: [], // 省份列表
            city: [], // 城市列表
            area: [], // 区/县列表
            location: [], // 所在地区
            options: [], // 所在地区所需级联格式
            paramData: {
                country: '', // 国籍选择
                province: '', // 省份选择
                city: '', // 城市选择
                area: '', // 区/县列表
            }, // 传参
            error: {
                country: '', // 国籍选择
                location: '', // 所在地区
                detailAddress: '', // 详细地址
                name: '', // name: '', // 收件人
                phone: '', // 手机号
            },
    }
  },
  props: {
    defaultAddress: Function, // 设置默认地址
  },
  methods: {
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
         * 初始化回填数据
         */
        init() {
        if (!this.id) return this.clear()
        axios(this.getAddress + `/${this.id}`).then(async res => {
            if (res.data) {
            let { country, province, city, area, isDefault } = res.data
            await this.countryChange(country)
            this.paramData = { country }
            this.checkbox = isDefault === '1'

            let provinceOption = this.options.find(option => option.label === province)
            if (!provinceOption) return
            this.location.push(provinceOption.value)
            if (!provinceOption.children) return
            await this.provinceChange(province, provinceOption)
            let cityOption = provinceOption.children.find(option => option.label === city)
            if (!cityOption) return
            this.location.push(cityOption.value)
            if (!cityOption.children) return
            await this.cityChange(city, cityOption)
            let areaOption = cityOption.children.find(option => option.label === area)
            if (!areaOption) return
            this.location.push(areaOption.value)

            }
        })
        },
        /**
         * 国家改变时触发
         */
        async countryChange(name) {
          let currentCountry = this.country.find(item => item.name === name)
          if (!currentCountry) return
          this.province = await areaFun.getArea('Province', currentCountry.id)
          this.locationShow = this.province.length === 0 ? false : true
          this.location = []
          this.options = []
          this.formatOptions(this.options, this.province)
          this.error.country = ''
        },
        /**
         * 省份改变时触发
         */
        async provinceChange(name, province) {
          let currentProvince = this.province.find(item => item.name === name)
          this.city = await areaFun.getArea('City', currentProvince.id)
          this.formatOptions(province.children, this.city, province)
          this.error.province = ''
        },
        /**
         * 城市改变时触发
         */
        async cityChange(name, city) {
          let currentCity = this.city.find(item => item.name === name)
          this.area = await areaFun.getArea('Area', currentCity.id)
          this.formatOptions(city.children, this.area, city)
          this.error.city = ''
        },
        /**
         * 区/县改变时触发
         */
        async areaChange(name) {
          this.error.area = ''
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
            if (parseInt(option.hasChildren) === 1) obj.children = []
            parentArray.push(obj)
        })
        },
        /**
         * 选择时清除数据
         * @param clears
         */
        clear() {
        Object.keys(this.paramData).forEach(item => {
            this.paramData[item] = ''
        })
        Object.keys(this.error).forEach(item => {
            this.error[item] = ''
        })

          this.province = []
          this.city = []
          this.area = []
          this.location = []
          this.options = []
        },
  },
  mounted() {
  },
  watch: {},
  created() {
      this.init()
  },
}

</script>