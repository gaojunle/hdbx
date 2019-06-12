<template>
   <div class="recm-custom-select-new" :class="selectClass">
       <p class="recm-btn recm-dropdownbtn" @click="dropdownbtnToggle" ref="drop">{{getSelecteds(value)}}{{getSelected(value)}}
            <span class="recm-caret"></span>
        </p>
        <ul class="recm-dropdownbtn-list" ref="drop" v-show="show">
            <li v-for="(item,index) in list" :key="index" @click="select(item)">
            <span class="title">{{item.title}}</span> {{item.name}}</li>
        </ul>
   </div>
</template>

<script>
import $ from 'jquery';
import Vue from 'vue';
var cm = new Vue();
var context = this;
export default {
   name: '',
   data() {
       return {
           isShowOption: false,
           isOk:'一级',
           show: false
       }
   },
   props: {
       selectClass:{
           type:String,
           default:''
       }, // 类名
        value: {
            required: true
        }, // value
        list: {
            type: Array,
            required: true
        }, // 数组
        valueKey: {
            type: String,
            default: 'value'
        }, // value值
        nameKey: {
            type: String,
            default: 'name'
        }, // 内容
        titleKey: {
            type: String,
            default: 'title'
        }, // 大字
        width: {
            default: '150'
        }, // 宽度
        height: {
            default: '40'
        }, // 高度
    },
    computed: {
        isDisabled: function() {
            if (this.disabled === '') {
                return true;
            }
            return Boolean(this.disabled);
        }
    },
    created: function () {
        context = this;
    },
    mounted: function() {
     
    },
    methods:{
        init() {
            // let drop = this.$refs.drop
            // drop.style.width = this.width + 'px'
            // drop.style.height = this.height + 'px'
        },
        /* 头部点击 */
        dropdownbtnToggle: function () {
            this.show = true
            if (this.isDisabled) {
                return ;
            }
            var $target = $(event.target);
            var $dropdownlist = $target.next();
            if ($dropdownlist.is(':hidden')) {
                $('.recm-dropdownbtn-list').hide();
                $dropdownlist.show();
                $(document).on('click', this.hideDropdownbtn);
            } else {
                $dropdownlist.hide();
            }
        },
        // 让ul隐藏
        hideDropdownbtn: function () {
            if ($(event.target).is('.recm-dropdownbtn')) {
                return;
            }
            $('.recm-dropdownbtn-list').hide();
            $(document).off('click', this.hideDropdownbtn);
        },
        // 点击每一项之后让ul隐藏
        select:function (item) {
            var value = this.getItemValue(item);
            if (value !== this.value) {
                this.$emit('change', value);
            }
            this.$emit('input', value);
            $(document).on('click', this.hideDropdownbtn);
        },
        getItemName: function(item) {
            return item[this.nameKey];
        },
        getItemValue: function(item) {
            return item[this.valueKey];
        },
        getItemTitle: function(item) {
            return item[this.titleKey]
        },
        // 把选择框的值赋值给头部
        getSelected: function(value) {
            var context = this;
            var item = {};
            this.list.forEach(function(i) {
                if (context.getItemValue(i) === value) {
                    item = i;
                }
            });
            return context.getItemName(item);
        },
        getSelecteds: function(value) {
            var context = this;
            var item = {};
            this.list.forEach(function(i) {
                if (context.getItemValue(i) === value) {
                    item = i;
                }
            });
            return context.getItemTitle(item);
        },
        hides() {
            this.$refs.drop.display = 'none'
        }
    },
  
   components: {},
  created() {
      this.init()
  }
}
</script>

<style scoped lang="scss">
    .recm-custom-select-new{
        display: inline-block;
    }
    .recm-dropdownbtn-list {
        list-style-type: none;
    }
    .recm-disabled{
        background:#ccc;
    }
    .selectClass{
        width:100%;
    }
    .recm-caret {
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-top-color:#000;
        margin-top: 9px;
        float: right;
    }
</style>
