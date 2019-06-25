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
            triggerValidate(flag) {//flag:true,false,
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
            position: absolute;
            color: #F56C6C;
            font-size: 12px;
        }
    }
</style>