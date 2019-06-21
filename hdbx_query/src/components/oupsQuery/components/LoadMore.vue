<template>
    <div :class="['icon-more', isFold?'':'on',align]">
        <span @click="toggleFold">{{isFold?foldTxt:unFoldTxt}} </span>
        <img @click="toggleFold" src="../../../assets/img/steps/icon_down.png">
    </div>
</template>

<script>
    export default {
        name: "LoadMore",
        props: {
            dataLabel: '', //数据标签，用于返回处理展示数据；
            align: {
                type: String,
                default: 'center'
            },
            foldTxt: {
                type: String,
                default: '展开更多'
            },
            unFoldTxt: {
                type: String,
                default: '收起更多'
            },
        },
        data() {
            return {
                isFold: true //是否折起
            }
        },
        methods: {
            toggleFold() {
                this.isFold = !this.isFold;
                this.$emit('triggerLoadMore', this.isFold, this.dataLabel);
            }
        }
    }
</script>

<style lang='less' scoped>
    .icon-more {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #0168b7;
        padding-top: 20px;
        &.left {
            justify-content: flex-start;
        }
        span {
            cursor: pointer;
        }
        img {
            cursor: pointer;
            margin-left: 6px;
            transition: transform .3s;
        }
        &.on {
            img {
                transform: rotate(180deg);
            }
        }
    }
</style>