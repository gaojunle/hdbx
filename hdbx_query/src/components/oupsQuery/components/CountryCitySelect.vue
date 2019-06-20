<template>
    <div class="country-city-select">
        <el-select
                class="country-box"
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
{{location}}
        <el-cascader
                class="city-box"
                v-if="selCountry || initNullFlag"
                placeholder="省/市区/街道"
                @change="onCityChange"
                value="location"
                :props="props">
        </el-cascader>
    </div>
</template>

<script>
    import axios from '@share/api/axios'
    import {API_HOST} from '@share/api/config'
    import areaFun from '@share/js/common/area'

    var selCountry = ''
    export default {
        props: {
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
                }
            }
        },
        watch: {
            country(newVal, oldVal) {
                console.log(newVal, oldVal);
            }
        },
        computed: {
            location() {
                return [this.province, this.city, this.area]
            }
        },
        methods: {
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
            onCityChange(val) {
                this.retParam = {
                    country: selCountry,
                    province: val[0],
                    city: val[1],
                    area: val[2]
                }
                this.$emit('countryCityChange', this.retParam)
                console.log(this.retParam);
            }
        },
        async mounted() {
            console.log(this.country)
            this.selCountry = this.country;
            selCountry = this.selCountry
            this.countrys = await areaFun.getArea('Country');
        }
    }

</script>
<style lang="less" rel="stylesheet/less">
    .country-city-select {

    }
</style>