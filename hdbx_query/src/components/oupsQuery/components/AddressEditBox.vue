<template>
    <div class="addressEdit" :class="{show:isShow}">
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
            <div class="trunk city-sel-box">
                <div class="sel-mark">
                    <p><span><i>*</i>配送国家</span></p>
                    <p><span><i>*</i>所在地区</span></p>
                </div>
                <CountryCitySelect
                        v-if="isShow"
                        :country="paramData.country"
                        :province="paramData.province"
                        :city="paramData.city"
                        :area="paramData.area"
                        @countryCityChange="((param)=>{countryCityChange(param,paramData,'')})"
                ></CountryCitySelect>
                <div class="error" v-if="error.country" v-text="error.country"></div>
            </div>
            <!--详细地址-->
            <div class="trunk">
                <span class="detailAddress"><i>*</i>详细地址</span>
                <textarea
                        class="w400"
                        placeholder="请输入详细地址信息，如道路路、小区、楼栋号、单元室等" v-model="paramData.detailAddress"
                        @blur="requiredBlur('detailAddress')"></textarea>
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
                <el-checkbox v-model="paramData.isDefault">设置默认地址</el-checkbox>
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
    import axios from '@share/api/axios'
    import {API_HOST} from '@share/api/config'
    import CountryCitySelect from './CountryCitySelect'
    import areaFun from '@share/js/common/area'

    export default {
        name: "AddressEditBox",
        components: {CountryCitySelect},
        data() {
            return {
                isShow: false,
                paramData: {
                    country: '', // 国籍选择
                    province: '', // 省份选择
                    city: '', // 城市选择
                    area: '', // 区/县列表
                    detailAddress: '', // 详细地址
                    name: '', // 收件人
                    phone: '', // 手机号
                    isDefault: false //默认地址
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
            countryCityChange(params, item) {
                item['country'] = params.country;
                item['province'] = params.province;
                item['city'] = params.city;
                item['area'] = params.area;
            },
            /**
             * 初始化回填数据
             */
            init() {
                if (!this.id) return this.clear()
                axios(this.getAddress + `/${this.id}`).then(async res => {
                    let {country, province, city, area, detailAddress, name, phone, isDefault} = res.data
                    this.paramData = {
                        name: name, // 收件人
                        country: country, // 国家选择country
                        province: province, // 省份选择
                        city: city, // 城市选择
                        area: area, // 区/县列表
                        detailAddress: detailAddress, // 详细地址
                        phone: phone, // 手机号
                        isDefault: isDefault == '1'
                    }
                    this.isShow = true;
                })
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
            },
            /**
             * 隐藏地址编辑弹出框
             * @param data 修改或添加的地址
             */
            hideEdit(data) {
                this.isShow = false;
                /*this.$refs.addressEdit.style.display = 'none'
                if (data) this.$emit('changeAddressList', data)*/
            },
        },
        mounted() {

        }
    }
</script>

<style lang="less">
    @cblue: rgb(0, 104, 183);
    .addressEdit {
        display: none;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 9999;
        &.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        > .content {
            width: 590px;
            box-sizing: border-box;
            padding: 40px 60px;
            border-radius: 5px;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 3px 7px 0px rgba(165, 165, 165, 0.24);
            > .title {
                padding-bottom: 30px;
                color: @cblue;
                font-size: 20px;
                > .title-left {
                }
                > .title-close {
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    cursor: pointer;
                }
            }
            > .trunk {
                margin-bottom: 20px;
                position: relative;
                &.city-sel-box {
                    display: flex;
                    justify-content: space-between;
                }
                &.btn-box {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-left: 70px;
                    padding-bottom: 0px;
                    margin-bottom: 0px;
                    .el-button {
                        border-radius: 5px;
                        font-size: 16px;
                        color: rgb(118, 138, 162);
                        height: 40px;
                        line-height: 40px;
                        width: 170px;
                        padding: 0px;
                        background: #dce3e8;
                        &.el-button--primary {
                            background-color: rgb(0, 104, 183);
                            color: white;
                        }
                    }
                }
                > span, .sel-mark p span {
                    display: inline-block;
                    width: 66px;
                    text-align: right;
                    margin-left: -10px;
                    margin-right: 10px;
                    > i {
                        color: red;
                        padding-right: 3px;
                    }
                }
                .sel-mark {
                    display: flex;
                    justify-content: space-around;
                    flex-direction: column;
                    p {

                    }
                }
                .el-input__inner {
                    height: 40px;
                    outline: none;
                }
                .w400 {
                    width: 398px;
                    box-sizing: border-box;
                }
                > textarea {
                    width: 217px;
                    height: 50px;
                    resize: none;
                    border: 1px solid #dcdfe6;
                    outline: none;
                    border-radius: 5px;
                    font-size: 14px;
                    line-height: 20px;
                    padding: 10px;
                }
                > .error {
                    position: absolute;
                    z-index: 5;
                    font-size: 14px;
                    line-height: 20px;
                    color: #ff2553;
                    bottom: -24px;
                    left: 82px;
                    padding-left: 6px;
                    background-position: 0px -20px;
                    background-size: 20px auto;
                }
                > .detailAddress {
                    vertical-align: 38px;
                }
                > .tel-input {
                    width: 300px;
                    position: absolute;
                    top: -10px;
                    left: 82px;
                }
                > .codeBtn {
                    cursor: pointer;
                    color: #333333;
                }
                > .unClick {
                    pointer-events: none;
                    color: #999999;
                }
                > .left, > .right {
                    display: inline-block;
                    width: 300px;
                    height: 200px;
                    text-align: center;
                    line-height: 200px;
                    background-color: pink;
                    position: relative;
                }
                > .left {
                    margin-right: 30px;
                }
                > .button {
                    width: 200px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    margin: 0 auto;
                    background-color: #128BED;
                    cursor: pointer;
                }
            }
            > .phone {
                height: 42px;
                margin-top: 40px;
                > .error {
                    bottom: -18px;
                }
            }
        }

        .country-city-select {
            .country-box {
                width: 400px;
                display: block;
                padding-bottom: 20px;
            }
            .city-box {
                width: 400px;
                display: block;
            }
        }
    }


</style>