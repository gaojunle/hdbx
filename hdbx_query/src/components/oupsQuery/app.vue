<template>
    <div class="oups-query">
        <top-nav></top-nav>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <hd-footer></hd-footer>
    </div>
</template>

<script>
    import topNav from '@components/common/header'
    import hdFooter from '@components/common/hdFooter'
    import breadcrumb from '@components/common/breadcrumb'

    export default {
        data() {
            return {}
        },
        components: {topNav, breadcrumb, hdFooter},
        methods: {},
        mounted() {

        },
        watch: {},
        created() {

        }
    }
</script>