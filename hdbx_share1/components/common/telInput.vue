<template>
    <div class="tel-input">
        <div class="select" v-show="countrys.length > 0">
            <div class="select-box" v-text="currentCountry"></div>
            <div class="option-box" v-show="dropDownFlag">
                <div class="option-hide">
                    <div v-for="(country, index) in countrys" v-text="country"
                         @click="changeCountry(country)" class="option"></div>
                </div>
            </div>
        </div>
        <input type="num" class="phone" :value="value" placeholder="请输入手机号码"
               onkeyup="value=value.replace(/[^\d]/g,'')" v-on="inputListeners"
               :disabled="disabled"/>
    </div>
</template>

<script>

    import '../../css/common/telInput'

    export default{
        data (){
            return {
                countrys: ['中国 +86'], // 所有的国家及电话域号
                currentCountry: '中国 +86', // 当前选中的国家及电话域号
                dropDownFlag: false, // 下拉菜单是否显示
            }
        },
        props: ['value', 'disabled'],
        computed: {
            // 当前选中的国家电话域号
            currentCountryValue() {
                let value = this.currentCountry.split('+')
                return '+' + value[1]
            },

            inputListeners () {
                let vm = this
                return Object.assign({},
                    this.$listeners,
                    {
                        input (event) {
                            vm.changePhone(event)
                        },
                    },
                )
            },
        },
        components: {},
        methods: {
            /**
             * 国家及电话域号变化时触发
             * @param country
             */
            changeCountry(country) {
                this.currentCountry = country
            },
            /**
             * 手机号变化时触发
             * @param event event对象
             */
            changePhone(event) {
                this.$emit('input', event.target.value)
            },
        },
        mounted(){
        },
        watch: {},
        created() {
            /*$(() => {
               /!* $(document).on('click', event => {
                    if (event.target.className !== 'select-box') this.dropDownFlag = false
                })*!/
            })*/
        },
    }
</script>