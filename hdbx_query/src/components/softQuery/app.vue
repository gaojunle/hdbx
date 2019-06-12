<template>
    <div class="soft-query">
        <top-nav></top-nav>
        <div class="content">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <hd-footer></hd-footer>
    </div>
</template>

<script>

    import '@css/softQuery'
    import topNav from '@components/common/header'
    import hdFooter from '@components/common/hdFooter'

    export default{
        data (){
            return {
            }
        },
        components: {topNav, hdFooter},
        methods: {},
        mounted(){

        },
        watch: {},
        created() {

        }
    }

</script>