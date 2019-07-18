<template>
    <div class="ways">
        <div class="way-box">
            <div class="way-check-box"
                 :class="{on:value==item.val}"
                 v-for="(item,idx) in options.options_registrationMethod"
                 v-if="idx < limit"
                 @click="selectWay(item.val)">
                <div class="w-title">{{item.name}}</div>
                <div class="w-info">{{item.addr}}</div>
            </div>
        </div>
        <LoadMore v-if="options.options_registrationMethod.length>3"
                  @triggerLoadMore="triggerLoadMore"
                  dataLabel="'options.options_registrationMethod'"></LoadMore>
    </div>
</template>

<script>
    import options from '../store/options.js'
    import LoadMore from '../components/LoadMore'

    export default {
        components: {LoadMore},
        props: {
            showNum: {
                type: Number,
                default: 3
            },
            value: {
                default: ''
            }
        },
        data() {
            return {
                options: options,
                code: '',
                limit: this.showNum
            }
        },

        methods: {
            selectWay(code) {
                this.$emit('input', code);
            },
            triggerLoadMore(isFold) {
                this.limit = isFold ? this.showNum : options.options_registrationMethod.length;
            }
        },
        mounted() {

        }
    }
</script>
<style lang='less'>
    //办理方式或地址的信息框
    .way-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .way-check-box {
            padding: 20px 15px;
            width: 360px;
            min-height: 120px;
            border-radius: 5px;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, .08);
            margin-right: 10px;
            margin-bottom: 15px;
            cursor: default;
            .w-title {
                color: #000;
                padding-bottom: 8px;
                border-bottom: 1px solid rgba(0, 0, 0, .08);
            }
            .w-info {
                padding-top: 6px;
                color: #666666;
                line-height: 1.7;
            }
            &.on {
                position: relative;
                border: 1px solid rgb(0, 104, 183);
                &:after {
                    content: ' ';
                    position: absolute;
                    right: -1px;
                    bottom: -1px;
                    width: 32px;
                    height: 31px;
                    background: url("../../../assets/img/steps/btn_on.png") 0px 0px no-repeat;
                    -webkit-background-size: 100% 100%;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>