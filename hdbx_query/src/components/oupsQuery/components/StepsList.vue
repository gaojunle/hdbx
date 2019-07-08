<template>
    <ul class="steps-list">
        <li v-for="(item,idx) in steps" :class="{on:curStep == item.route}">
            <span class="s-icon-box">
                <img :src="curStep==idx?item.imgUrl2:item.imgUrl1" class="s_icon">
            </span>
            <span class="s_name">{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "StepsList",
        props: {
            steps: {
                type: [Array],
                default() {
                    return [
                        {
                            route: 'chooseIdentity',
                            imgUrl1: require('../../../assets/img/steps/step_1.png'),
                            imgUrl2: require('../../../assets/img/steps/step_1_on.png'),
                            name: '选择办理身份'
                        },
                        {
                            route: 'creativeInfo',
                            imgUrl1: require('../../../assets/img/steps/step_2.png'),
                            imgUrl2: require('../../../assets/img/steps/step_2_on.png'),
                            name: '作品创作信息'
                        },
                        {
                            route: 'ownershipInfo',
                            imgUrl1: require('../../../assets/img/steps/step_3.png'),
                            imgUrl2: require('../../../assets/img/steps/step_3_on.png'),
                            name: '作品权属信息'
                        },
                        {
                            route: 'confirmApplication',
                            imgUrl1: require('../../../assets/img/steps/step_4.png'),
                            imgUrl2: require('../../../assets/img/steps/step_4_on.png'),
                            name: '确认信息'
                        },
                        {
                            route: 'submitMaterial',
                            imgUrl1: require('../../../assets/img/steps/step_5.png'),
                            imgUrl2: require('../../../assets/img/steps/step_5_on.png'),
                            name: '打印材料'
                        },
                        {
                            route: 'submitSuccess',
                            imgUrl1: require('../../../assets/img/steps/step_6.png'),
                            imgUrl2: require('../../../assets/img/steps/step_6_on.png'),
                            name: '提交成功'
                        }
                    ]
                }
            }
        },
        data() {
            return {
                curStep: this.$route.name
            }
        },
        mounted() {
            //console.log(this.$route)
        },
        watch: {
            '$route'(val) {
                this.curStep = this.$route.name
            }
        },
        methods: {}
    }
</script>

<style lang='less' scoped>
    .steps-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1200px;
        margin: 0 auto;
        border-radius: 5px;
        overflow: hidden;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        color: rgb(118, 138, 162);
        margin-bottom: 20px;
        > li {
            position: relative;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #e3e9ed;
            height: 50px;
            &:after {
                content: ' ';
                position: absolute;
                width: 13px;
                height: 50px;
                right: 0px;
                background-color: #e3e9ed;
                background-image: url("../../../assets/img/steps/right.png");
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
            }
            &.on {
                background: #0068b7;
                color: white;

                &:before {
                    content: ' ';
                    position: absolute;
                    width: 13px;
                    height: 50px;
                    left: -13px;
                    background-image: url("../../../assets/img/steps/s_left.png");
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;
                }
                &:after {
                    background-image: url("../../../assets/img/steps/s_right.png");
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;
                }
                .s-icon-box {
                    border-color: white;
                }
            }
            &:nth-of-type(1) {
                &.on {
                    &:before {
                        content: none;
                    }
                }
            }
            &:nth-last-of-type(1) {
                &:after {
                    content: none;
                }
                &.on {
                    &:after {
                        content: none;
                    }
                }
            }
            .s-icon-box {
                border: 1px solid rgb(118, 138, 162);
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 6px;
                .s_icon {

                }
            }

            .s_name {

            }
        }
    }
</style>