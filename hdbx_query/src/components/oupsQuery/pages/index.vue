<template>
    <div class="content">
        <div class="nav-title">Z11 作品著作权登记申请</div>
        <StepsList :curStep="$route.params.step"></StepsList>
        <Step_0 v-if="$route.params.step==0"></Step_0>
        <Step_1 v-if="$route.params.step==1"></Step_1>
        <Step_2 v-if="$route.params.step==2"></Step_2>
        <Step_3 v-if="$route.params.step==3"></Step_3>
        <Step_4 v-if="$route.params.step==4"></Step_4>
        <Step_5 v-if="$route.params.step==5"></Step_5>
    </div>
</template>
<script>
    import '../components/index.less'
    import StepsList from '../components/StepsList'
    import store from '../store/index'
    import Step_0 from './Step_0'
    import Step_1 from './Step_1'
    import Step_2 from './Step_2'
    import Step_3 from './Step_3'
    import Step_4 from './Step_4'
    import Step_5 from './Step_5'

    export default {
        components: {StepsList, Step_0, Step_1, Step_2, Step_3, Step_4, Step_5},
        data() {
            return {
                sdata: store.sdata,
            }
        },

        methods: {},
        filters: {
            isDisalbed(val) {
                console.log(val);
                return val;
            }
        },
        mounted() {
            /*setInterval(() => {
                console.log(this.sdata.agentDesc)
            }, 1000)*/
        }
    }
</script>