<template>
    <ul class="breadcrumb">
        <li class="button" v-for="(item, index) in breadcrumb">
            <span v-text="item.name" @click="toLink(item)"></span>
            <span class="arrow" v-show="index < breadcrumb.length - 1">></span>
        </li>
    </ul>
</template>

<script>

    import '@css/common/breadcrumb'

    export default{
        data (){
            return {
                breadcrumb: [
                    {
                        name: '首页',
                        link: './index.html',
                    }
                ], // 导航路径
            }
        },
        props: {
            crumb: {
                type: Array,
                default: () => []
            }, // 导航路径
        },
        components: {},
        methods: {
            /**
             * 跳转页面
             * @param item 数据
             */
            toLink(item) {
                if (item.link) window.location.href = item.link
            },
        },
        mounted(){

        },
        watch: {},
        created() {
            this.breadcrumb.push(...this.crumb)
        }
    }

</script>