<template>
    <div class="addressBox">
        <!--展示领取地址-->
        <div class="address-wrap">
            <div class="addr-top">
                <span>您已创建2个收货地址，最多可创建5个</span>
                <span class="addr-add" @click="updataAddress()">+新增地址</span>
            </div>
            <ul class="receive-type-child address-list">
                <li v-for="(address, index) in addressList" class="clearfix" :key="index">
                    <div class="address-box">
                        <el-radio v-model="receiveAddress" :label="address.id" border>{{address.name}}</el-radio>
                        <div class="phone">{{ address.phone | phoneShow }}</div>
                        <div class="address">{{ address | addressShow }}
                            <span class="default" v-if="parseInt(address.isDefault) === 1">默认地址</span>
                        </div>
                        <div class="ops">
                            <div class="set-default" v-show="parseInt(address.isDefault) !== 1"
                                 @click="setDefaultAddress(address)">设为默认地址
                            </div>
                            <div class="updata" @click="updataAddress(address.id)">修改</div>
                            <div class="updata" @click="delAddress(address.id)">删除</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <AddressEditBox ref="AddressEditBox"></AddressEditBox>
    </div>
</template>

<script>
    import axios from '@share/api/axios'
    import {API_HOST} from '@share/api/config'
    import AddressEditBox from './AddressEditBox'

    export default {
        components: {AddressEditBox},
        data() {
            return {
                receiveAddress: this.propReceiveAddress, // 地址选择
                receiveModeChild: 'tq', // 大厅
                addressList: [], // 地址列表
                userInfo: getCookie(), // 用户信息
            }
        },
        model: {
            prop: 'receiveType',
            event: 'change'
        },
        props: {
            receiveType: String, // 办理方式
            receiveModes: {
                type: Array,
                default: () => [
                    {
                        name: '登记大厅自取',
                        value: 'xc'
                    },
                    {
                        name: '挂号信',
                        value: 'mail'
                    },
                ]
            }, // 办理方式选择
            receiveModeChildren: {
                type: Array,
                default: () => [
                    {
                        name: `<span class="hall">中国版权保护中心版权登记大厅（天桥）</span>
                               <span>地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层</span>`,
                        value: 'tq'
                    },
                ]
            }, // 大厅选择
            propReceiveAddress: {
                type: String,
                default: ''
            }, // 地址选项
            defaultAddress: {
                type: String,
                default: API_HOST + '/userServer/address/default'
            }, // 设置默认地址
            getAddressList: {
                type: String,
                default: API_HOST + '/userServer/address/address/list'
            }, // 地址信息列表查询
            disabled: {
                type: Boolean,
                default: false
            }, // 是否可修改
            userId: {
                type: String,
                default: getCookie() ? getCookie().id : ''
            }, // 用户信息
        },

        methods: {
            /**
             * 设置默认地址
             * @param address 当前数据
             * @param index 当前索引
             */
            setDefaultAddress(address) {
                axios(this.defaultAddress + `/${this.userId}/${address.id}`, {}, {
                    method: 'put'
                }).then(res => {
                    if (res.data) {
                        let index = this.addressList.findIndex(item => item.id === address.id)
                        this.addressList.forEach(item => item.isDefault = '0')
                        address.isDefault = '1'
                        this.addressList.splice(index, 1)
                        this.addressList.unshift(address)
                        //this.receiveAddress = params.id
                    }
                })
            },
            /**
             * 弹出新建地址组件
             */
            updataAddress(id) {
                let userId = this.userId,
                    addressId = id
                this.$refs.AddressEditBox.showEdit(userId, addressId)
            },
            delAddress(id) {
                alert('删除地址，')
            },
            /**
             * 修改地址列表
             * @param data 修改或添加的地址
             */
            changeAddressList(data) {
                let index = this.addressList.findIndex(item => item.id === data.id)
                if (index > -1) this.addressList.splice(index, 1)
                data.isDefault === '1' ? this.addressList.unshift(data) : this.addressList.splice(1, 0, data)
            },
            /**
             * 获取领取地址id
             * @returns {*}
             */
            getReceiveAddress() {
                return this.receiveAddress
            }
        },
        mounted() {

        },
        watch: {
            defaultAddress: {
                handle(v, o) {
                    console.log(v, 'v');
                    console.log(o, 'o');

                },
                deep: true
            },
        },
        created() {
            console.log(this.userId)
            if (this.userId) axios(this.getAddressList + `/${this.userId}`).then(res => {
                if (res.data) this.addressList.push(...res.data)
            })
        }
    }
</script>
<style lang='less'>
    .address-wrap {
        padding: 30px 40px;
        border: 1px solid rgb(220, 228, 230);
        border-radius: 5px;
        box-sizing: border-box;
        .addr-top {
            display: flex;
            justify-content: space-between;
            color: rgb(102, 102, 102);
            padding-bottom: 30px;
            .addr-add {
                cursor: pointer;
                color: rgb(0, 104, 183);
            }
        }
        .address-list {
            > li {
                padding-bottom: 20px;
                color: rgb(102, 102, 102);
                .el-radio {
                    width: 148px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background: #f5f8f9;
                    padding: 0px;
                    border: 1px solid rgb(0, 104, 183);
                    margin-right: 0px;
                    .el-radio__inner {
                        display: none;
                    }
                    .el-radio__label {
                        padding-left: 0px;
                    }
                    &.is-bordered.is-checked {
                        &:after {
                            content: ' ';
                            position: absolute;
                            right: -1px;
                            bottom: -1px;
                            width: 16px;
                            height: 16px;
                            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABdUlEQVQ4y52SvUtCURiHn3uvFlKkefsOVCwupktfS0FEFjQWNFgN1Xihpbb+gaStJUioqbnGOH1QaTW0JThEBAXR0iD2MQgh3gavcZOk8sDhwO/h+fHCeyQqPbpwAnNKhXI9cAw45ApkFTgB+gH+V6CLRlPuKUa2f8jNwCkQtMZ/m0AXrUC8VP5bgS7aTTnwE5Z/kT3AOaCVoiqb/EuBLnxAAvBbY0mCjekg7+tjjAcb3HIZucOUfaUoOqGxOOwhlzd4zeZy8g+yBiRqqxVPdEJj0O/6QkthHyvjfj5yeSLbSa4eXt6UErkLOAPawgGV2GyI+YF2FFnC63awORMCYGEnxd71M0BKscghCntuAXhIZ7ErMkOd9YxoKpPdzUgSLO/esHX5VLTMAl10U/hhTUViGHBym+b8LsNoQMXpsLF2eM+quLfOnJHQRS9wBKjlFuKusRPpayV28YhhfENxCV1MAV6gznKdgMt8rbkBpIAkcADsfwK1kmGp4hIqOAAAAABJRU5ErkJggg==") 0px 0px no-repeat;
                        }
                    }
                }
                > .address-box {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .address {
                        flex: 1;
                        .default {
                            border-radius: 2px;
                            background-color: rgb(0, 104, 183);
                            padding: 0px 4px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            color: rgb(255, 255, 255);
                            margin-left: 25px;
                        }
                    }
                    .phone {
                        width: 130px;
                        text-align: center;
                    }
                    .ops {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        > div {

                            cursor: pointer;
                            color: rgb(0, 104, 183);
                            padding-left: 23px;
                        }
                        .set-default {

                        }
                    }
                }
            }
        }
    }
</style>