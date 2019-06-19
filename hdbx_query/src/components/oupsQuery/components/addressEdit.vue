<template>
    <div class="addressEdit" ref="addressEdit">
        <div class="content">
            <div class="title">
                <div class="title-left">新建地址</div>
                <div class="title-close" @click="hideEdit(null)"><img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAu0lEQVQoz6XRvU1DQRBF4e9t4IjMDbgDuxEHoCcQbmBr2gaeAFlO6APJFUADzoiISDZYW/sTeMOZe87OaKaU0je+8Bpj/DN4KaUV3rALOOMJx9wYgUc84hzwjE/se4IC3Of8y9RozOUKrf40CvTE02C0A5bWRFdwRXDBugZW4Sx4wE8GL9jEGH9vc6Hx81KAayy1K4QKWO686Z0xdMA5jzq3BPfdeQT2BAEfIxByvVzhPWCLUw+sCE7Y/gOSfoB2IQ4lDAAAAABJRU5ErkJggg=="
                        alt=""></div>
            </div>
            <!--收件人-->
            <div class="trunk">
                <span><i>*</i>收货人</span>
                <el-input placeholder="请输入收货人"
                          class="w400"
                          maxlength="25" type="text"
                          v-model="paramData.name"
                          @blur="requiredBlur('name')"></el-input>
                <div class="error" v-if="error.name" v-text="error.name"></div>
            </div>
            <!--国籍-->
            <div class="trunk">
                <span><i>*</i>配送国家</span>
                <el-select
                        class="w400"
                        v-model="paramData.country"
                        placeholder="请选择国家"
                        @change="countryChange">
                    <el-option v-for="item in country" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
                <div class="error" v-if="error.country" v-text="error.country"></div>
            </div>
            <!--省份-->
            <div class="trunk" v-show="locationShow">
                <span><i>*</i>所在地区</span>
                <el-cascader
                        class="w400"
                        v-model="location"
                        :props="props"
                        placeholder="省/市区/街道"
                        :options="options"
                        @active-item-change="handleItemChange"></el-cascader>
                <div class="error" v-if="error.location" v-text="error.location"></div>
            </div>
            <!--详细地址-->
            <div class="trunk">
                <span class="detailAddress"><i>*</i>详细地址</span>
                <textarea
                        class="w400"
                        placeholder="请输入详细地址信息，如道路路、小区、楼栋号、单元室等" v-model="paramData.detailAddress" @blur="requiredBlur('detailAddress')"></textarea>
                <div class="error" v-if="error.detailAddress" v-text="error.detailAddress"></div>
            </div>
            <!--手机号码-->
            <div class="trunk">
                <span><i>*</i>手机号码</span>
                <el-input placeholder="请输入手机号码"
                          class="w400"
                          maxlength="13"
                          type="number"
                          v-model="paramData.phone"
                          @blur="phoneNumTest"></el-input>
                <div class="error" v-if="error.phone" v-text="error.phone"></div>
            </div>
            <!--设置为默认收货地址-->
            <div class="trunk">
                <span></span>
                <el-checkbox v-model="checkbox">设置默认地址</el-checkbox>
            </div>
            <!--提交按钮-->
            <div class="trunk btn-box">
                <el-button type="primary" @click="save_handler">保存</el-button>
                <el-button type="default" @click="hideEdit(null)">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>

    import '@share/css/theme'
    import './addressEdit.less'


    import Vue from 'vue'
    import api from '@api'
    import axios from '@share/api/axios'
    import {API_HOST} from '@share/api/config'
    import telInput from '@share/components/common/telInput'
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
                props: {
                    lazy: true,
                    async lazyLoad(node, resolve) {
                        if (!node.data) {
                            return false
                        }
                        const {id, lvl} = node.data.value;
                        console.log(id, lvl);
                        const level = (lvl == 1 ? 'Province' : (lvl == 2 ? 'City' : 'Area'))
                        let citys = await areaFun.getArea(level, id);
                        console.log(citys, level)
                        var nodes = citys.map(item => ({
                            value: item.id,
                            label: item.name,
                            leaf: lvl >= 2
                        }));
                        console.log(nodes)
                        var nodes = Array.from({length: lvl + 1})
                            .map(item => ({
                                value: id,
                                label: `选项${id}`,
                                leaf: lvl >= 2
                            }));
                        console.log(nodes)
                        // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        resolve(citys);
                    }
                },
                country: [], // 国籍列表
                province: [], // 省份列表
                city: [], // 城市列表
                area: [], // 区/县列表
                location: [], // 所在地区
                locationShow: true, // 是否需要填写所在地区
                options: [], // 所在地区所需级联格式
                paramData: {
                    country: '', // 国籍选择
                    province: '', // 省份选择
                    city: '', // 城市选择
                    area: '', // 区/县列表
                    detailAddress: '', // 详细地址
                    name: '', // 收件人
                    phone: '', // 手机号
                }, // 传参
                error: {
                    country: '', // 国籍选择
                    location: '', // 所在地区
                    detailAddress: '', // 详细地址
                    name: '', // name: '', // 收件人
                    phone: '', // 手机号
                }, // 错误信息提示
                checkbox: false, // 设置为默认收货地址
                id: '', // 用户id
                userId: '', // 地址id
            }
        },
        components: {telInput},
        props: {
            defaultAddress: Function, // 设置默认地址
            getAddress: {
                type: String,
                default: API_HOST + '/userServer/address/address'
            }, // 地址信息查询
            addApdataAddress: {
                type: String,
                default: API_HOST + '/userServer/address/address'
            }, // 地址信息查询
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
                        let {country, province, city, area, detailAddress, name, phone, isDefault} = res.data
                        await this.countryChange(country)
                        this.paramData = {country, detailAddress, name, phone}
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
                console.log(currentCountry)
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
            /**
             * 验证必填字段
             * @param key
             */
            requiredBlur(key) {
                let font = ''
                switch (key) {
                    case 'detailAddress':
                        font = '请输入详细地址'
                        break
                    case 'name':
                        font = '请输入收件人'
                        break
                    default:
                        break
                }
                this.error[key] = this.paramData[key] ? '' : font
            },
            /**
             * 手机号验证
             */
            phoneNumTest() {
                let phone = this.paramData.phone
                if (phone) {
                    if (/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
                        this.error.phone = ''
                    } else {
                        this.error.phone = '请输入正确手机号'
                    }
                } else {
                    this.error.phone = '请输入手机号'
                }
            },
            /**
             * 保存
             */
            save_handler() {
                let flag = true,
                    errorValue = [],
                    inputArror = ['detailAddress', 'name']

                if (!this.paramData.country) {
                    this.error.country = '请选择配送国家'
                    this.error.location = '请选择所在地区'
                }

                if (this.province.length > 0 && this.location.length === 0) this.error.location = '请选择所在地区'

                errorValue = Object.values(this.error)

                inputArror.forEach(item => this.requiredBlur(item))

                this.phoneNumTest()

                flag = !errorValue.some(item => item.length > 0)

                if (flag) {
                    let method = ''
                    this.setAddress()
                    if (this.id > -1) {
                        this.paramData.id = this.id
                        method = 'put'
                    } else {
                        method = 'post'
                    }
                    this.paramData.accountId = this.userId
                    axios(this.addApdataAddress, this.paramData, {method}).then(res => {
                        if (res.data) {
                            this.hideEdit(res.data)
                            if (this.checkbox) this.defaultAddress(res.data)
                        }
                    })
                }
            },
            /**
             * 设置所在地区
             */
            setAddress() {
                this.paramData.province = ''
                this.paramData.city = ''
                this.paramData.area = ''
                this.location.forEach((item, index) => {
                    index === 0 ? this.paramData.province = item.name : index === 1 ?
                        this.paramData.city = item.name : this.paramData.area = item.name
                })
            },
            /**
             * 显示地址编辑弹出框
             */
            showEdit(userId, id) {
                this.userId = userId
                this.id = id
                this.init()
                this.$refs.addressEdit.style.display = 'block'
            },
            /**
             * 隐藏地址编辑弹出框
             * @param data 修改或添加的地址
             */
            hideEdit(data) {
                this.$refs.addressEdit.style.display = 'none'
                if (data) this.$emit('changeAddressList', data)
            },
        },
        mounted() {

        },
        watch: {},
        async created() {
            let country = await areaFun.getArea('Country')
            this.country.push(...country)
        },
    }

</script>