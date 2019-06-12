<template>
   <div class="recm-custom-select-new" :class="selectClass" >
       <p class="recm-btn recm-dropdownbtn" @click="dropdownbtnToggle"  :class="{'recm-disabled': isDisabled,selectClass}" >{{getSelected(value)}}
            <span class="recm-caret"></span>
        </p>
        <ul class="recm-dropdownbtn-list"  :class="selectClass" ref="drop">
            <li v-for="(item,index) in list" :key="index" @click="select(item)">{{item.name}}</li>
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
           isOk:'一级'
       }
   },
   props: {
       selectClass:{
           type:String,
           default:''
       },
        disabled: {
            default: false
        },
        value: {
            required: true
        },
        list: {
            type: Array,
            required: true
        },
        valueKey: {
            type: String,
            default: 'value'
        },
        nameKey: {
            type: String,
            default: 'name'
        }
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
        dropdownbtnToggle: function () {
            if (this.isDisabled) {
                return ;
            }
            var $target = $(event.target);
            var $dropdownlist = $target.next();
            if ($dropdownlist.is(':hidden')) {
                $('.recm-dropdownbtn-list').hide();
                $dropdownlist.show();

                var offset = $target.offset();
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                var top = offset.top + event.target.offsetHeight - scrollTop;
                var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                var left = offset.left - scrollLeft;
                var bottom = document.documentElement.clientHeight - top - $dropdownlist.get(0).offsetHeight;
                if (bottom < 0) {
                    top = 'auto';
                    bottom = 0;
                } else {
                    bottom = 'auto';
                }
                $dropdownlist.css({ top: top, left: left, bottom: bottom });
                $(document).on('click', this.hideDropdownbtn);
            } else {
                $dropdownlist.hide();
            }
        },
        hideDropdownbtn: function () {
            if ($(event.target).is('.recm-dropdownbtn')) {
                return;
            }
            $('.recm-dropdownbtn-list').hide();
            $(document).off('click', this.hideDropdownbtn);
        },
        select:function (item) {
            var value = this.getItemValue(item);
                if (value !== this.value) {
                    this.$emit('change', value);
                }
                this.$emit('input', value);
        },
        getItemName: function(item) {
            return item[this.nameKey];
        },
        getItemValue: function(item) {
            return item[this.valueKey];
        },
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
    },
  
  components: {}
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
</style>
