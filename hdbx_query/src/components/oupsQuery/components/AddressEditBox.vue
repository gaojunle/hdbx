<template>
    <div class="addressEdit" :class="{show:isShow}">
        <el-form class="content" :model="addrForm" :rules="rules" ref="addrEditForm">
            <div class="title">
                <div class="title-left">新建地址</div>
                <div class="title-close" @click="hideEdit(null)"><img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAu0lEQVQoz6XRvU1DQRBF4e9t4IjMDbgDuxEHoCcQbmBr2gaeAFlO6APJFUADzoiISDZYW/sTeMOZe87OaKaU0je+8Bpj/DN4KaUV3rALOOMJx9wYgUc84hzwjE/se4IC3Of8y9RozOUKrf40CvTE02C0A5bWRFdwRXDBugZW4Sx4wE8GL9jEGH9vc6Hx81KAayy1K4QKWO686Z0xdMA5jzq3BPfdeQT2BAEfIxByvVzhPWCLUw+sCE7Y/gOSfoB2IQ4lDAAAAABJRU5ErkJggg=="
                        alt=""></div>
            </div>
            <!--收件人-->
            <el-form-item label="收货人" prop="name" class="trunk">
                <el-input placeholder="请输入收货人"
                          v-model="addrForm.name"></el-input>
            </el-form-item>
            <!--国籍-->
            <div class="trunk city-sel-box">
                <div class="sel-mark">
                    <p><span><i>*</i>配送国家</span></p>
                    <p><span><i>*</i>所在地区</span></p>
                </div>
                <CountryCitySelect
                        ref="CountryCitySelect"
                        v-if="isShow"
                        :country="addrForm.country"
                        :province="addrForm.province"
                        :city="addrForm.city"
                        :area="addrForm.area"
                        @countryCityChange="((param)=>{countryCityChange(param,addrForm,'')})"
                ></CountryCitySelect>
            </div>
            <!--详细地址-->
            <el-form-item label="详细地址" prop="detailAddress" class="trunk">
                <el-input type="textarea"
                          placeholder="请输入详细地址信息，如道路路、小区、楼栋号、单元室等"
                          v-model="addrForm.detailAddress"></el-input>
            </el-form-item>
            <!--手机号码-->
            <el-form-item label="手机号码" prop="phone" class="trunk">
                <el-input placeholder="请输入手机号码"
                          v-model="addrForm.phone"></el-input>
            </el-form-item>
            <!--设置为默认收货地址-->
            <el-form-item class="trunk">
                <span></span>
                <el-checkbox v-model="addrForm.isDefault">设置默认地址</el-checkbox>
            </el-form-item>
            <!--提交按钮-->
            <div class="trunk btn-box">
                <el-button type="primary" @click="save_handler">保存</el-button>
                <el-button type="default" @click="hideEdit(null)">取消</el-button>
            </div>
        </el-form>
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
            let validPhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入手机号'))
                } else if (!/^1[3|4|5|7|8]\d{9}$/.test(value)) {
                    callback(new Error('请输入正确手机号'))
                } else {
                    callback()
                }
            }
            return {
                isShow: false,
                location: '',
                addrForm: {
                    country: '', // 国籍选择
                    province: '', // 省份选择
                    city: '', // 城市选择
                    area: '', // 区/县列表
                    detailAddress: '', // 详细地址
                    name: '', // 收件人
                    phone: '', // 手机号
                    isDefault: false //默认地址
                }, // 传参
                rules: {
                    name: [
                        {required: true, message: '请输入收货人', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    detailAddress: [
                        {required: true, message: '请输入详细地址', trigger: 'blur'}
                    ],
                    phone: [
                        {
                            type: 'number',
                            required: true,
                            min: 6,
                            max: 13,
                            validator: validPhone,
                            trigger: 'blur'
                        }
                    ]
                },
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
            //国家、城市选择回调
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
                if (!this.id) {
                    this.addrForm = {
                        country: '', // 国籍选择
                        province: '', // 省份选择
                        city: '', // 城市选择
                        area: '', // 区/县列表
                        detailAddress: '', // 详细地址
                        name: '', // 收件人
                        phone: '', // 手机号
                        isDefault: false //默认地址
                    }
                    this.isShow = true;
                } else {
                    axios(this.getAddress + `/${this.id}`).then(async res => {
                        let {country, province, city, area, detailAddress, name, phone, isDefault} = res.data
                        this.addrForm = {
                            name: name, // 收件人
                            country: country, // 国家选择country
                            province: province, // 省份选择
                            city: city, // 城市选择
                            area: area, // 区/县列表
                            detailAddress: detailAddress, // 详细地址
                            phone: phone, // 手机号
                            isDefault: isDefault == '1'
                        }
                        this.location = [province, city, area]
                        this.isShow = true;
                    })
                }
            },
            /**
             * 保存
             */
            save_handler() {
                this.$refs.addrEditForm.validate((ret) => {
                    var locationValid = this.$refs.CountryCitySelect.triggerValidate(true);
                    console.log(ret, locationValid)
                    if (ret && locationValid) {
                        let method = ''
                        if (this.id > -1) {
                            this.addrForm.id = this.id
                            method = 'put'
                        } else {
                            method = 'post'
                        }
                        this.addrForm.accountId = this.userId
                        axios(this.addApdataAddress, this.addrForm, {method}).then(res => {
                            if (res.data) {
                                this.hideEdit(res.data)
                                if (this.checkbox) this.defaultAddress(res.data)
                            }
                        })
                    }
                });
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
                if (data) {
                    this.$emit('changeAddressList', data)
                }
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
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                position: relative;
                &.city-sel-box {
                    display: flex;
                    justify-content: space-between;
                    align-items: stretch;
                    color: #606266;
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
                .sel-mark p span {
                    display: inline-block;
                    min-width: 80px;
                    padding-right: 12px;
                    box-sizing: border-box;
                    > i {
                        color: red;
                        padding-right: 3px;
                        font-style: normal;
                    }
                }
                .sel-mark {
                    display: flex;
                    justify-content: space-around;
                    flex-direction: column;
                    p {

                    }
                }
                .el-form-item__label {
                    min-width: 80px;
                }
                .el-form-item__content {
                    flex: 1;
                }
                .el-input__inner {
                    height: 40px;
                    outline: none;
                }
                textarea {
                    width: 100%;
                    height: 60px;
                    resize: none;
                    border: 1px solid #dcdfe6;
                    outline: none;
                    border-radius: 5px;
                    font-size: 14px;
                    line-height: 20px;
                    padding: 10px;
                    box-sizing: border-box;
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
        }

        .country-city-select {
            .country-box {
                width: 390px;
                display: block;
                padding-bottom: 20px;
            }
            .city-box {
                width: 390px;
                display: block;
            }
        }
    }


</style>