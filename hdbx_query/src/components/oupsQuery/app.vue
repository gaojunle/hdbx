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
            //获取登记方式
            api.getRegistrationMethod({}).then(ret => {
                options.options_registrationMethod = [];
                ret.data.forEach((item, idx) => {
                    if (item.parent == 'HALL') {
                        options.options_registrationMethod.push({
                            val: item.code,
                            name: item.value,
                            addr: item.description
                        })
                    }
                });
            })
        },
        created() {
            //TODO 登录后，调用setUser方法，此外测试用户登录后刷新即可；
            autoToLogin()
            this.setUserInfo();

            console.log('this.user', JSON.parse(JSON.stringify(this.user)));
            //TODO 测试判断用户是否登录
            if (!getCookie('webUserInfo')) {
                this.$alert('<p style="text-align: center;color: red;padding: 10px 40px;">用户未登录，请先登录，并刷新</p>', '提示', {
                    dangerouslyUseHTMLString: true
                });
            }

            //获取是否回显标记；
            this.flowNumber = this.$route.query.flowNumber;

            //如果本地有数据，优先使用session数据（用户编辑数据），然后判断是否是回填数据；
            if (this.getSessionData()) {
                store.sdata = this.getSessionData();
                this.sdata = store.sdata;
            } else {
                if (this.flowNumber) {
                    api.z11InfoAndReFillInfo({flowNumber: this.flowNumber}).then((ret) => {
                        var _sdata = ret.data.z11RegisterApplyInfoVo;
                        if (!_sdata.authAttachment) {
                            _sdata.authAttachment = {//选择代理人时，授权委托书
                                "attachmentId": "",
                                "flowNumber": "",
                                "segmentName": "",
                                "attachmentName": "",
                                "relevantFileName": "",
                                "path": "",
                                "remark": "",
                                "createTime": "",
                                "updateTime": "",
                                "baseId": null
                            }
                        }
                        if (!_sdata.rightOwnTypeAttachment) {
                            _sdata.rightOwnTypeAttachment = {//rightOwnType为1时没有附件
                                relevantFileName: '',
                                path: '',
                                remark: ''
                            }
                        }
                        if (!_sdata.rightScopePart) {
                            _sdata.rightScopePart = [];
                        }
                        this.sdata = _sdata;
                        store.sdata = _sdata;
                        store.reFillin = ret.data.reFillin;
                        this.setSessionData();
                        location.reload();
                    })
                }
            }

            if (this.$route.query.clear == 1) {
                this.clearSessionData()
            }

            console.log('this.sdata', JSON.parse(JSON.stringify(this.sdata)))
        },
    }
</script>