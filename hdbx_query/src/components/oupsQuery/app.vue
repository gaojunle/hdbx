<template>
    <div class="oups-query">
        <top-nav></top-nav>
        <div class="content">
            <div class="nav-title">Z11 作品著作权登记申请</div>
            <StepsList></StepsList>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <hd-footer></hd-footer>
    </div>
</template>

<script>
    import api from '../../api'
    import options from './store/options'
    import store from './store/index'
    import myMixin from './store/mixin'
    import topNav from '@components/common/header'
    import hdFooter from '@components/common/hdFooter'
    import breadcrumb from '@components/common/breadcrumb'
    import StepsList from './components/StepsList'

    export default {
        mixins: [myMixin],
        data() {
            return {}
        },
        components: {topNav, breadcrumb, hdFooter, StepsList},
        methods: {},
        mounted() {

        }
    }
</script>