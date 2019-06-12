<template>
    <ul class="oups-owner">
        <li v-for="(item, index) in copyrightOwnerCorrect">
            <div class="title">著作权人信息</div>
            <!--身份类型-->
            <div class="owner-type">
                <input type="radio" :name="'ownerType' + index" value="0" :id="'ownerType1' + index"
                       :checked="params.ownerType[index] === '0'"
                       @change="handleOwnerTypeChange(index, '0')">
                <label :for="'ownerType1' + index">个人</label>
                <input type="radio" :name="'ownerType' + index" value="1" :id="'ownerType2' + index"
                       :checked="params.ownerType[index] === '1'"
                       @change="handleOwnerTypeChange(index, '1')">
                <label :for="'ownerType2' + index">机构</label>
            </div>
            <!--国籍-->
            <div class="trunk">
                <span>国籍</span>
                <el-select v-model="params.ownerCountry[index]" placeholder="请选择" @change="handleCountryChange(index)">
                    <el-option v-for="item in country" :key="item.id"
                               :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
                <div class="error" v-show="error.ownerCountry[index]" v-text="error.ownerCountry[index]"></div>
            </div>
            <!--真实姓名-->
            <div class="trunk" v-show="params.ownerType[index] === '0'">
                <span>真实姓名</span>
                <input type="text" placeholder="请输入著作权人真实姓名" v-model="params.owner[index]"
                @input="handleOwnerChange(index)">
                <div class="error" v-show="error.owner[index]" v-text="error.owner[index]"></div>
            </div>
            <!--机构名称-->
            <div class="trunk" v-show="params.ownerType[index] === '1'">
                <span>机构名称</span>
                <input type="text" placeholder="请输入著作权人真实姓名" v-model="params.owner[index]"
                       @input="handleOwnerChange(index)">
                <div class="error" v-show="error.owner[index]" v-text="error.owner[index]"></div>
            </div>
            <!--证件类型-->
            <div class="trunk">
                <span>证件类型</span>
                <el-select v-model="params.ownerIdType[index]" placeholder="请选择" @change="handleOwnerIdTypeChange(index)">
                    <el-option v-for="item in cardType[index]" :key="item.code"
                               :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
                <div class="error" v-show="error.ownerIdType[index]" v-text="error.ownerIdType[index]"></div>
            </div>
            <!--证件号码-->
            <div class="trunk">
                <span>证件号码</span>
                <input type="text" placeholder="请输入证件号码" v-model="params.ownerIdNumber[index]"
                @input="handleOwnerIdNumberChange(index)">
                <div class="error" v-show="error.ownerIdNumber[index]" v-text="error.ownerIdNumber[index]"></div>
            </div>
        </li>
    </ul>
</template>

<script>

    import '@share/css/theme'
    import '@css/common/registerQuery/queryOupsSoft/oupsOwner'

    import Vue from 'vue'
    import areaFun from '@share/js/common/area'
    import {
        Select,
        Option,
    } from 'element-ui'

    Vue.use(Select)
    Vue.use(Option)

    export default{
        data (){
            return {
                params: {
                    ownerType: [], // 著作权人类型
                    ownerCountry: [], // 著作权人国家
                    owner: [], // 著作权人
                    ownerIdType: [], // 著作权人证件类型
                    ownerIdNumber: [], // 著作权人证件号码
                },
                error: {
                    ownerCountry: [], // 著作权人国家
                    owner: [], // 著作权人
                    ownerIdType: [], // 著作权人证件类型
                    ownerIdNumber: [], // 著作权人证件号码
                }, // 错误信息
                copyrightOwnerCorrect: [], // 正确的著作权人
                country: [], // 全部国家
                cardType: [], // 证件类型
            }
        },
        components: {},
        methods: {
            /**
             * 设置作品的著作权人信息
             */
            setOupsOwner(copyrightOwnerCorrect) {
                this.copyrightOwnerCorrect = copyrightOwnerCorrect
                this.params.ownerType = []
                this.params.ownerCountry = []
                this.params.owner = []
                this.params.ownerIdType = []
                this.params.ownerIdNumber = []
                this.cardType = []
                this.error.ownerCountry = []
                this.error.owner = []
                this.error.ownerIdType = []
                this.error.ownerIdNumber = []
                copyrightOwnerCorrect.forEach((item, index) => {
                    this.params.ownerType.push('0')
                    this.params.ownerCountry.push('')
                    this.params.owner.push('')
                    this.params.ownerIdType.push('')
                    this.params.ownerIdNumber.push('')
                    this.cardType.push([])
                    this.error.ownerCountry.push('')
                    this.error.owner.push('')
                    this.error.ownerIdType.push('')
                    this.error.ownerIdNumber.push('')
                })
                this.getCountry()
            },
            /**
             * 获取国家信息
             */
            async getCountry() {
                let country = await areaFun.getArea('Country')
                this.country = []
                this.country.push(...country)
            },
            /**
             * 著作权人类型选择
             * @param index 修改著作权人类型的位置
             */
            handleOwnerTypeChange(index, value) {
                this.params.ownerType[index] = value
                this.params.ownerCountry[index] = ''
                this.params.owner[index] = ''
                this.params.ownerIdType[index] = ''
                this.params.ownerIdNumber[index] = ''
            },
            /**
             * 国籍选择
             * @param index 修改国籍的位置
             */
            handleCountryChange(index) {
                let country = this.params.ownerCountry[index]
                let ownerType = this.params.ownerType[index]
                this.error.ownerCountry.splice(index, 1, '')
                switch (country) {
                    case '中国大陆':
                        ownerType === '0' ?
                            this.peopleInitPapers(index, '居民身份证', '军/警官证', '士兵证', '文职干部证等') :
                            this.peopleInitPapers(index, '统一社会信用代码营业执照')
                        break
                    case '台湾':
                        ownerType === '0' ?
                            this.peopleInitPapers(index, '台湾居民往来大陆通行证') :
                            this.peopleInitPapers(index, '其他')
                        break
                    case '香港':
                    case '澳门':
                        ownerType === '0' ?
                            this.peopleInitPapers(index, '居民身份证') :
                            this.peopleInitPapers(index, '其他')
                        break
                    default:
                        ownerType === '0' ?
                            this.peopleInitPapers(index, '护照') :
                            this.peopleInitPapers(index, '其他')
                        break
                }
            },
            /**
             * 重置证件类型选择
             * @param parames 证件类型名称
             */
            peopleInitPapers(index, ...parames) {
                this.cardType[index] = []
                this.params.ownerIdType[index] = ''
                parames.forEach(parame => {
                    let paper = {}
                    paper.name = parame
                    paper.code = this.peoplePaperType(parame)
                    this.cardType[index].push(paper)
                })
            },
            /**
             * 根据证件类型得到相应的id
             * @param parame 证件类型名称
             * @returns {*} 证件类型id
             */
            peoplePaperType(parame) {
                switch (parame) {
                    case '居民身份证':
                        return 1
                    case '军/警官证':
                        return 2
                    case '护照':
                        return 4
                    case '士兵证':
                        return 10
                    case '文职干部证等':
                        return 11
                    case '统一社会信用代码营业执照':
                        return 13
                    case '其他':
                        return 14
                    case '台湾居民往来大陆通行证':
                        return 15
                    default:
                        return
                }
            },
            /**
             * 机构名称输入框变化
             * @param index 机构名称变化的位置
             */
            handleOwnerChange(index) {
                this.error.owner.splice(index, 1, '')
            },
            /**
             * 证件类型选择
             * @param index 修改证件类型的位置
             */
            handleOwnerIdTypeChange(index) {
                this.error.ownerIdType.splice(index, 1, '')
            },
            /**
             * 证件号码输入框变化
             * @param index 证件号码变化的位置
             */
            handleOwnerIdNumberChange(index) {
                this.error.ownerIdNumber.splice(index, 1, '')
            },
            /**
             * 检验著作权人信息填写正确
             */
            checkOupsOwnerData() {
                let flag = true
                this.params.ownerCountry.forEach((ownerCountry, index) => {
                    if (!ownerCountry) {
                        this.error.ownerCountry.splice(index, 1, '请选择国籍')
                        flag = false
                    }
                })
                this.params.owner.forEach((owner, index) => {
                    let errorFont = this.params.ownerType === '0' ? '真实姓名' : '机构名称'
                    if (!owner) {
                        this.error.owner.splice(index, 1, '请填写' + errorFont)
                        flag = false
                    }else {
                        if (this.copyrightOwnerCorrect.some(item => item === owner)) return
                        this.error.owner.splice(index, 1, '填写的' + errorFont + '有误')
                        flag = false
                    }
                })
                this.params.ownerIdType.forEach((ownerIdType, index) => {
                    if (!ownerIdType) {
                        this.error.ownerIdType.splice(index, 1, '请选择证件类型')
                        flag = false
                    }
                })
                this.params.ownerIdNumber.forEach((ownerIdNumber, index) => {
                    if (!ownerIdNumber) {
                        this.error.ownerIdNumber.splice(index, 1, '请填写证件号码')
                        flag = false
                    }
                })
                return flag
            },
            /**
             * 获取数据
             */
            getParams() {
                return this.params
            },
            /**
             * 设置数据
             */
            setParams(data) {
                let ownerIdType = [...data.ownerIdType]
                this.params = Object.assign({}, data)
                this.copyrightOwnerCorrect = this.params.owner
                this.getCountry()
                this.params.owner.forEach((item, index) => {
                    this.handleCountryChange(index)
                    this.params.ownerIdType[index] = ownerIdType[index]
                })
            },
        },
        mounted(){

        },
        watch: {},
        created() {

        }
    }

</script>