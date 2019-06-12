<template>
    <span class="tencent-captcha" :id="classId"></span>
</template>

<script>

    import api from '@api'
    import {API_HOST} from '../../api/config'

    export default{
        data() {
            return {}
        },
        props: ['classId', 'callback'],
        components: {},
        methods: {
        },
        mounted(){
        },
        watch: {},
        created(){
            $(() => {
                this.$nextTick(() => {
                    initNECaptcha({
                        captchaId: '从易盾申请的captchaId',
                        element: '#' + this.classId,
                        mode: 'float',
                        width: '320px'
                    }, instance => {
                        this.$emit('captchaExample', this.classId, instance)
                    }, err => {
                        let captchaObj = new TencentCaptcha(document.getElementById(this.classId), '2075488699', data => {
                            if (parseInt(data.ret) === 0) {
                                let {ticket, randstr} = data
                                let test = getUrlRequest().test
                                
                                api.axios(API_HOST + '/userServer/login/login/verifyTicket',
                                    {ticket, randStr: randstr, test}, {method: 'post'}).then(res => {
                                    if (res.data.response === '1') this.callback()
                                })
                            }
                        })
                        this.$emit('captchaExample', this.classId, captchaObj)
                    })
                })
            })
        }
    }

</script>

<style scoped>
    .tencent-captcha {
        /*display: none;*/
        width: 0;
        height: 0;
    }
</style>