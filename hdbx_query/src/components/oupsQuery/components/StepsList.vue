<template>
    <ul class="steps-list">
        <li v-for="(item,idx) in steps" :class="{on:curStep==idx}">
            <img :src="curStep==idx?item.imgUrl1:item.imgUrl2" class="s_icon">
            <span class="s_name">{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "StepsList",
        props: {
            curStep: 0,
            steps: {
                type: [Array],
                default: []
            },

        },
        methods: {
            /*updateValue(event) {
                const value = event.target.value.trim();
                this.$emit('input', value);
            }*/
        }
    }
</script>

<style lang='less' scoped>
    .steps-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1200px;
        margin: 0 auto;
        padding: 10px 0px;
        > li {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #e4e9ed;
            &.on {
                border: 1px solid #0000ff;
                background: #0168b7;
                color: white;
            }
            .s_icon {

            }
            .s_name {
                font-size: 20px;
            }
        }
    }
</style>