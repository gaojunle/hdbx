<template>
    <div class="receive-mode">
        <div class="title">请选择办理方式</div>
        <!--选择领取方式-->
        <ul class="receive-type clearfix">
            <li v-for="(item, index) in receiveModes" :key="index">
                <hd-radio v-model="receiveMode" :label="item.value" :name="'receiveMode'" @change="handleReceiveMode">{{ item.name }}</hd-radio>
            </li>
        </ul>
        <!--选择大厅-->
        <ul class="receive-type-child" v-show="receiveMode === 'xc'">
            <li v-for="(item, index) in receiveModeChildren" :key="index">
                <hd-radio v-model="receiveModeChild" :label="item.value" :name="'receiveModeChild'" @change="handleReceiveModeChildren" v-html="item.name"></hd-radio>
            </li>
        </ul>
        <!--展示领取地址-->
        <ul class="receive-type-child address-list" v-show="receiveMode === 'mail'">
            <li v-for="(address, index) in addressList" class="clearfix" :key="index">
                       <hd-radio v-model="receiveAddress" :label="address.id" :name="'receiveAddressChild'"></hd-radio>
                <div class="address-box">
                    <div class="name" v-text="address.name"></div>
                    <div class="address">{{ address | addressShow }}</div>
                    <div class="phone">{{ address.phone | phoneShow }}</div>
                    <div class="default" v-if="parseInt(address.isDefault) === 1">默认地址</div>
                    <div class="set-default" v-show="parseInt(address.isDefault) !== 1"
                         @click="defaultAddress(address)">设为默认地址</div>
                    <div class="updata" @click="updataAddress(address.id)">修改</div>
                </div>
            </li>
        </ul>
        <address-edit ref="addressEdit" :defaultAddress="defaultAddress"
                      @changeAddressList="changeAddressList"></address-edit>
    </div>
</template>

<script>

    import '@css/common/registerQuery/receiveMode'

    import api from '@api'
    import addressEdit from '@share/components/address/addressEdit'
    import hdRadio from '@share/components/hdRadio'

    export default{
        data (){
            return {
                receiveMode: 'xc', // 办理方式
                receiveModeChild: 'tq', // 大厅
                receiveAddress: '', // 领取地址
                userInfo: getCookie(), // 用户信息
                addressList: [], // 地址列表
            }
        },
        model: {
            prop: 'handleType',
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
        },
        components: {addressEdit, hdRadio},
        methods: {
            /**
             * 触发选择办理方式
             * @param value 选中项的值
             */
            handleReceiveMode(value) {
                this.receiveMode = value
                if (this.receiveMode === 'xc') value = 'tq'
                this.$emit('change', value)

                if (!this.receiveAddress) this.receiveAddress = this.addressList[0].id
            },
            /**
             * 触发选择大厅
             * @param item 选中项
             */
            handleReceiveModeChildren(item) {
                let value = item.value
                this.receiveModeChild = value
                this.$emit('change', value)
            },
            /**
             * 设置默认地址
             * @param address 当前数据
             * @param index 当前索引
             */
            defaultAddress(address) {
                let params = {
                    accountId: this.userInfo.id,
                    id: address.id
                }
                api.defaultAddress(params).then(res => {
                    if (res.data) {
                        let index = this.addressList.findIndex(item => item.id === address.id)
                        this.addressList.forEach(item => item.isDefault = '0')
                        address.isDefault = '1'
                        this.addressList.splice(index, 1)
                        this.addressList.unshift(address)
                        this.receiveAddress = params.id
                    }
                })
            },
            /**
             * 弹出新建地址组件
             */
            updataAddress(id) {
                let userId = this.userInfo.id,
                    addressId = id
                this.$refs.addressEdit.showEdit(userId, addressId)
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
        mounted(){

        },
        watch: {},
        created() {
            api.getAddressList(this.userInfo.id).then(res => {
                if (res.data) this.addressList.push(...res.data)
            })
        }
    }

</script>