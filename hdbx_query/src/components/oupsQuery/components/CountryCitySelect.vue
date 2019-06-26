<template>
    <div class="country-city-select">
        <div class="country-box">
            <el-select
                    :disabled="countryDisabled"
                    v-model="selCountry"
                    filterable
                    placeholder="请选择国家"
                    @change="selCountryChange">
                <el-option
                        v-for="item in countrys"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <div class="error_tip error_country" v-show="validateFlag&&!selCountry">请输选择国家</div>
        </div>
        <div class="city-box">
            <el-cascader
                    :disabled="cityDisabled"
                    ref="cityBox"
                    v-if="selCountry || initNullFlag"
                    placeholder="省/市区/街道"
                    @change="onCityChange"
                    value="location"
                    :props="props">
            </el-cascader>
            <div class="error_tip error_location" v-show="validateFlag&&!province">请输选择城市</div>
        </div>
    </div>
</template>

<script>
    import axios from '@share/api/axios'
    import {API_HOST} from '@share/api/config'
    import areaFun from '@share/js/common/area'

    var selCountry = ''
    export default {
        props: {
            countryDisabled: {
                type: Boolean,
                default: false
            },
            cityDisabled: {
                type: Boolean,
                default: false
            },
            country: '',
            province: '',
            city: '',
            area: ''
        },
        data() {
            return {
                initNullFlag: true,
                props: {
                    lazy: true,
                    async lazyLoad(node, resolve) {
                        setTimeout(async () => {
                            let citys = null;

                            if (!selCountry) {
                                resolve([])
                                return;
                            } else {
                                if (node.root == true) {
                                    citys = await areaFun.getArea('Province', selCountry);
                                } else {
                                    var {id, lvl} = node.data._d;
                                    let apiName = (lvl == 2 ? 'City' : 'Area')
                                    citys = await areaFun.getArea(apiName, id);
                                }

                                const nodes = citys.map(item => ({
                                    value: item.id,
                                    label: item.name,
                                    leaf: item.hasChildren == 0,
                                    _d: item
                                }));
                                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                                resolve(nodes);
                            }
                        }, 100);
                    }
                },
                countrys: [],
                selCountry: '',//001中国大陆
                retParam: {
                    country: '',
                    province: '',
                    city: '',
                    area: ''
                },
                validateFlag: false //是否进行校验标记
            }
        },
        watch: {
            country(newVal, oldVal) {
                console.log(newVal, oldVal);
            }
        },
        methods: {
            //选择国家
            selCountryChange(val) {
                this.initNullFlag = false;
                this.selCountry = '';
                selCountry = '';
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.selCountry = val;
                        selCountry = val;
                    }, 100)
                })
                this.retParam.country = val;
                this.$emit('countryCityChange', this.retParam)
                console.log(this.retParam);
            },
            //选择城市
            onCityChange(val) {
                this.retParam = {
                    country: selCountry,
                    province: val[0],
                    city: val[1],
                    area: val[2]
                }
                this.$emit('countryCityChange', this.retParam)
                console.log(this.retParam);
            },
            //初始化地址
            initLocation() {
                let loction = [];
                this.province && loction.push(this.province)
                this.city && loction.push(this.city)
                this.area && loction.push(this.area)
                if (loction.length > 0) {
                    var cIpt = this.$refs.cityBox.$el.querySelector('.el-input__inner');
                    cIpt.value = loction.join('/')
                }
            },
            //验证有效性（是否选择）
            validate(flag=true) {//flag:true,false,
                this.validateFlag = flag;
                return this.province; //只要选择了省，说明国家与城市都选择完成，检验成功
            }
        },
        async mounted() {
            this.selCountry = this.country;
            selCountry = this.selCountry
            this.countrys = await areaFun.getArea('Country');

            this.initLocation()
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    .country-city-select {
        .country-box {
            position: relative;
            .el-select {
                width: 100%;
            }
        }
        .city-box {
            position: relative;
            .el-cascader {
                width: 100%;
            }
        }
        .error_tip {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 3px;
            font-size: 14px !important;
            color: red;
            &:before {
                position: relative;
                display: inline-block;
                content: ' ';
                width: 14px;
                height: 14px;
                background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5RUE2ODE5OTcxRjExRTlCRjdDRDdBQjg1RTAzQURGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5RUE2ODFBOTcxRjExRTlCRjdDRDdBQjg1RTAzQURGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDlFQTY4MTc5NzFGMTFFOUJGN0NEN0FCODVFMDNBREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDlFQTY4MTg5NzFGMTFFOUJGN0NEN0FCODVFMDNBREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6keNNKAAABH0lEQVR42oxSXU7CQBhcTQgt9ACI7yT8JVyEJ56scgr+wgWMAqcAypNPXMRE0MR3fg5QbQkvQ2e167ZQcJNJNtOZ7fczAoBQWK/zaLeHKBY/kE7vJEqld3S7z9hsbnTtn2kyeYBpepI6hWz2C45jR43jcTPREMevWWC1uoVh+JJMpfaoVBZH4mr1TX7jPZP5ZtkCrdZICWq1V3ieiXp9rjjbdiRXLi8V1+kMBAqFz8jroZBm/a5rguEJVULc7PvGSRMRTPtaJB3gSpw7Z0ttNF7gutbRX4PdXh4O7zTrw+n1nn7SEi6e/TIp8Z7IhbNgEOQ6GIDp9P7fAZjN7qKRo5mvJRksyw1NUSPBIAf1y36YJoKp6fcfsd3mdO1BgAEAAG6l2TCpFr4AAAAASUVORK5CYII=") 0px 0px no-repeat;
                padding-right: 4px;
            }
        }
    }
</style>