<template>
  <div class="receive-mode">
    <div class="title">请选择领取方式</div>
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
    <ul class="receive-type-child address-list" v-show="receiveMode === 'mail' || receiveMode === 'ems'">
      <li v-for="(address, index) in addressList" class="clearfix" :key="index">
        <hd-radio v-model="receiveAddress" :label="address.id" :name="'receiveAddressChild'"></hd-radio>
        <div class="address-box">
          <div class="name" v-text="address.name"></div>
          <div class="address">{{ address | addressShow }}</div>
          <div class="phone">{{ address.phone | phoneShow }}</div>
          <div class="default" v-if="parseInt(address.isDefault) === 1">默认地址</div>
          <div class="set-default" v-show="parseInt(address.isDefault) !== 1" @click="setDefaultAddress(address)">设为默认地址</div>
          <div class="updata" @click="updataAddress(address.id)">修改</div>
        </div>
      </li>
    </ul>
    <template v-if="userInfo">
      <address-edit ref="addressEdit" :defaultAddress="setDefaultAddress" @changeAddressList="changeAddressList"></address-edit>
    </template>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/softQuery/receiveMode'

import axios from '../../api/axios'
import { API_HOST } from '../../api/config'
import addressEdit from '../address/addressEdit'
import hdRadio from '../hdRadio'

export default {
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
  computed: {
    receiveMode: {
      get() {
        let value = this.receiveType
        if (this.receiveType !== 'mail' && this.receiveType !== 'ems') value = 'xc'
        return value
      },
      set() { },
    }, // 办理方式
  },
  components: { addressEdit, hdRadio },
  methods: {
    /**
     * 触发选择办理方式
     * @param value 选中项的值
     */
    handleReceiveMode(value) {
      this.receiveMode = value
      if (value === 'xc') value = this.receiveModeChild
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
          this.receiveAddress = params.id
        }
      })
    },
    /**
     * 弹出新建地址组件
     */
    updataAddress(id) {
      let userId = this.userId,
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
    if(this.userId) axios(this.getAddressList + `/${this.userId}`).then(res => {
      if (res.data) this.addressList.push(...res.data)
    })
  }
}

</script>