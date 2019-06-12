<template>
    <div class="Z11">
        <top-nav></top-nav>
        <div class="content">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>

<script>

    import '@css/oupsQuery'
    import topNav from '@components/common/header'

    export default{
        data (){
            return {
            }
        },
        components: {topNav},
        methods: {},
        mounted(){

        },
        watch: {},
        created() {

        }
    }

</script>