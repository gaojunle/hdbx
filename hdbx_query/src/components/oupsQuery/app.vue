<template>
    <div class="oups-query">
        <top-nav></top-nav>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <hd-footer></hd-footer>
    </div>
</template>

<script>
    import store from './store/index'
    import myMixin from './store/mixin'
    import topNav from '@components/common/header'
    import hdFooter from '@components/common/hdFooter'
    import breadcrumb from '@components/common/breadcrumb'

    export default {
        mixins: [myMixin],
        data() {
            return {}
        },
        components: {topNav, breadcrumb, hdFooter},
        methods: {},
        mounted() {

        },
        created() {
            console.log(this.sdata)
            if (this.getSessionData()) {
                store.sdata = this.getSessionData();
                this.sdata = store.sdata;
            }

            if (this.$route.query.clear == 1) {
                this.clearSessionData()
            }
        },
    }
</script>