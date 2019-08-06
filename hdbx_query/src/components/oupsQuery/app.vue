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
        methods: {//设置用户真实信息
            setUserInfo() {
                this.user = getCookie('webUserInfo') || {};
                store.user = this.user;
                this.sdata.accountId = this.user.id;
                store.sdata.accountId = this.user.id;
                this.sdata.accountType = (parseInt(this.user.accountType) + 1);//accountType：用户类型，0：个人、1：机构
                store.sdata.accountType = (parseInt(this.user.accountType) + 1).toString();
            },
            setRefillIn() {
                if (this.user.id && sessionStorage.getItem('hdbx_reFillin_' + this.user.id)) {
                    store.reFillin = sessionStorage.getItem('hdbx_reFillin_' + this.user.id);
                }
            }
        },
        created() {
            //TODO 登录后，调用setUser方法，此外测试用户登录后刷新即可；
            autoToLogin()
            this.setUserInfo();
            this.setRefillIn();
            this.noLoginCheck();

            //获取是否回显标记；
            this.flowNumber = this.$route.query.flowNumber;
            store.flowNumber = this.$route.query.flowNumber;
            //如果本地有数据，优先使用session数据（用户编辑数据），然后判断是否是回填数据；
            if (this.getSessionData()) {
                store.sdata = this.getSessionData();
                this.sdata = store.sdata;
            }
            console.log('this.sdata', JSON.parse(JSON.stringify(this.sdata)))
        },
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

            setInterval(() => {
                this.changeUserCheck();
            }, 3000)
        }
    }
</script>