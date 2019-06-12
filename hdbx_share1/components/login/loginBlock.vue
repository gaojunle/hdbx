<template>
    <div class="userLoginBox" ref="userLoginBox">
        <!--关闭按钮-->
        <div class="close" v-if="isBlock" ref="close"
             @click="hideUserLoginBox"></div>
        <div class="infoBox">
            <!--tab栏-->
            <div class="loginNav" v-if="!isBlock">
                <div :class="{onSel:loginNavSel==='password'}">
                    <span class="text" @click="loginNavBtnHandler('password')">密码登录</span>
                    <span class="line"></span>
                </div>
                <div :class="{onSel:loginNavSel=='code'}">
                    <span class="text" @click="loginNavBtnHandler('code')">验证码登录</span>
                    <span class="line"></span>
                </div>
            </div>
            <!--密码登录-->
            <div class="password-login" v-show="loginNavSel==='password'">
                <!--用户名/手机号/邮箱-->
                <div class="userAccount bottomLine">
                    <input class="" placeholder="请输入用户名/手机号/邮箱" v-model.trim="userData.loginName" maxlength="32"
                           type="text" @blur="userNameTest"/>
                    <span class="error" v-text="nameErrorText" v-show="nameErrorText != ''"></span>
                </div>
                <!--密码-->
                <div class="userAccount bottomLine">
                    <input class="" placeholder="请输入密码" v-model.trim="userData.password" maxlength="11"
                           :type="showPd ? 'text' : 'password'" @blur="passwordTest"/>
                    <span :class="['show-pd', {'hide-pd': showPd}]" @click="showPd = !showPd"></span>
                    <span class="error" v-text="passwordErrorText" v-show="passwordErrorText != ''"></span>
                </div>
            </div>
            <!--验证码登录-->
            <div class="code-login" v-show="loginNavSel==='code'">
                <!--手机输入-->
                <div class="userPass bottomLine">
                    <tel-input v-model="userData.userPhone" @blur="phoneNumTest"></tel-input>
                    <span class="error" v-text="phoneErrorText" v-show="phoneErrorText != ''"></span>
                </div>
                <!--验证码-->
                <div class="userPass bottomLine">
                    <input class="" placeholder="请输入短信验证码" v-model.trim="userData.userCode" type="tel" maxlength="6"
                           @blur="codeNumTest"/>
                    <span class="error" v-text="codeErrorText" v-show="codeErrorText != ''"></span>
                    <countdown-btn @codeBtnHandler='codeBtnHandler'></countdown-btn>
                    <tencent-captcha :classId="'codeLogin'" :callback="getCodeNum"
                                     @captchaExample="captchaExample"></tencent-captcha>
                </div>
            </div>
            <!--记住我和忘记密码-->
            <div class="remember-forget">
                <div class="remember">
                    <input type="checkbox" value="hdbx_login" v-model="remember">&nbsp;记住我
                </div>
                <div class="forget" @click="toPassword">忘记密码</div>
            </div>
            <!--登录按钮-->
            <div class="btnBox">
                <span class="btnBox-text" v-text="'立即登录'" @click="loginBtnHandler"></span>
                <tencent-captcha :classId="'possLogin'" :callback="getLogin"
                                 @captchaExample="captchaExample"></tencent-captcha>
            </div>
            <!--注册-->
            <div class="register">
                还没有帐号？点击<span @click="toRegister">注册</span>
            </div>
        </div>
    </div>
</template>

<script>

    import '../../css/login'

    import api from '@api'
    import errorCode from '../../api/code'
    import telInput from '../common/telInput'
    import countdownBtn from '../common/countdownBtn'
    import tencentCaptcha from '../common/tencentCaptcha'
    import {API_HOST, HTML_HOST} from '../../api/config'

    export default {
        data() {
            return {
                loginNavSel: 'password', // 当前选择的 选项==> password:密码登录      code:验证码登录
                userData: {
                    loginName: '', // 用户名/手机号/邮箱
                    password: '', // 密码
                    userPhone: '', // 手机号
                    userCode: '', // 验证码
                },
                showPd: false, // 密码是否显示
                phoneCode: null, // 防水墙实例对象
                nameErrorText: '',  // 用户名/手机号/邮箱错误提示
                passwordErrorText: '',  // 密码错误提示
                phoneErrorText: '',  // 手机号错误提示
                codeErrorText: '',   // 验证码错误提示
                remember: [],   // 记住我
                possLogin: null, // 密码登录防水墙
                codeLogin: null, // 验证码登录防水墙
                loginParams: null, // 登录所需参数
                codeCountDown: null, // 倒计时函数
            }
        },
        props: {
            isBlock: {
                type: Boolean,
                default: true
            }
        },
        components: {telInput, tencentCaptcha, countdownBtn},
        methods: {
            /**
             * 初始化登录信息
             */
            initUserData(){
                let userData = getLocal()
                this.userData.loginName = userData ? userData.loginName : ''
                this.userData.password = userData ? userData.password : ''
                this.userData.userPhone = userData ? userData.userPhone : ''
                if (userData && userData.remember) this.remember[0] = 'hdbx_login'
            },
            /** 导航tap切换 点击事件 */
            loginNavBtnHandler(msg){
                this.loginNavSel = msg;
            },
            /** 用户名/手机号/邮箱 **/
            userNameTest(){
                if (this.userData.loginName) {
                    this.nameErrorText = ''
                    return true
                } else {
                    this.nameErrorText = '请输入用户名或手机号或邮箱'
                    return false
                }
            },
            /** 密码 **/
            passwordTest(){
                if (this.userData.password) {
                    this.passwordErrorText = ''
                    return true
                } else {
                    this.passwordErrorText = '请输入密码'
                    return false
                }
            },
            /** 手机号验证 **/
            phoneNumTest(){
                if (this.userData.userPhone) {
                    if (this.userData.userPhone && /^1[3|4|5|7|8]\d{9}$/.test(this.userData.userPhone)) {
                        this.phoneErrorText = ''
                        return true
                    } else {
                        this.phoneErrorText = '请输入正确手机号'
                        return false
                    }
                } else {
                    this.phoneErrorText = '请输入手机号'
                    return false
                }
            },
            /** 验证码验证 */
            codeNumTest(){
                if (/^[0-9]*$/.test(this.userData.userCode) && this.userData.userCode.length === 6) {
                    this.codeErrorText = ''
                    return true
                } else {
                    this.codeErrorText = '请输入短信验证码'
                    return false
                }
            },
            /** 获取验证码点击事件 */
            codeBtnHandler(codeCountDown){
                this.phoneNumTest()
                if (this.phoneErrorText) return
                this.codeCountDown = codeCountDown
                this.codeLogin.show()      // 请求验证码
            },
            /** 获取验证码 */
            getCodeNum(){
                let phoneNumber = this.userData.userPhone,
                    type = 'L'
                api.axios(API_HOST + '/userServer/account/sendSMS',
                    {phoneNumber, type}, {method: 'post'}).then(res => {
                    if (res) this.codeCountDown()   // 开始倒计时
                })
            },
            /** 登录按钮点击事件 **/
            loginBtnHandler(){
                let loginName = '',
                    password = '',
                    phone = '',
                    code = ''
                if (this.loginNavSel === 'password') {
                    // 密码登录
                    if (this.nameErrorText || this.passwordErrorText) return
                    loginName = this.userNameTest()
                    password = this.passwordTest()
                    if (loginName && password) {
                        let loginName = this.userData.loginName,
                            password = this.userData.password
                        this.loginParams = {loginName, password}
                        this.LocalLoginAll({loginName, password})
                        this.possLogin.show()
                    }
                } else {
                    if (this.codeErrorText) return
                    // 验证码登录
                    if (this.phoneErrorText || this.codeErrorText) return
                    phone = this.phoneNumTest()
                    code = this.codeNumTest()
                    if (phone && code) {
                        let userPhone = this.userData.userPhone,
                            code = this.userData.userCode
                        this.LocalLoginAll({userPhone})
                        this.getCodeLogin({phoneNumber: userPhone, code})
                    }
                }
            },
            /**
             * 根据勾选记住我来判定清除还是存储
             * @param obj 需要存储的对象
             */
            LocalLoginAll(obj) {
                obj.remember = true
                if (this.remember[0]) {
                    setLocal(obj)
                } else {
                    clearLocal()
                }
            },
            /** 请求登录接口 */
            getLogin(data = this.loginParams){
                console.log(API_HOST + '/userServer/login/login/accountLogin')
                api.axios(API_HOST + '/userServer/login/login/accountLogin',
                    data, {method: 'post'}).then(res => {
                    if (res.data) {
                        this.finishLogin(res.data)
                    } else {
                        switch (parseInt(res.errExceptionCode)) {
                            case errorCode.loginNamedError:
                                this.nameErrorText = '未找到用户'
                                break
                            case errorCode.passwordError:
                                this.passwordErrorText = '密码错误'
                                break
                            default:
                                break
                        }
                    }
                })
                this.loginParams = null
            },
            /**
             * 短信验证码登录接口
             */
            getCodeLogin(data){
                api.axios(API_HOST + '/userServer/login/login/phoneNumberLogin',
                    data, {method: 'post'}).then(res => {
                    if (res.data) {
                        if (res.data.account) {
                            this.finishLogin(res.data)
                        } else {
                            this.$emit('showBindBlock', data.phoneNumber)
                        }
                    } else if (parseInt(res.errExceptionCode) === errorCode.phoneCodeError) {
                        this.codeErrorText = '验证码错误'
                    }
                })
            },
            /**
             * 跳转找回密码页面
             */
            toPassword() {
                window.location.href = HTML_HOST + '/accounts/retrievePw.html'
            },
            /**
             * 跳转注册页面
             */
            toRegister() {
                window.location.href = HTML_HOST + '/accounts/register.html'
            },
            /**
             * 完成后登录
             * @param data 需要存储的登录信息
             */
            finishLogin(data) {
                let account = data.account
                account.authorization_key = data.authorization_key
                account.authorization_token = data.authorization_token
                setCookie(account)
                this.$emit('loginSuccess', account)
            },
            /**
             * 腾讯防水墙
             * @param classId
             * @param captchaObj
             */
            captchaExample(classId, captchaObj) {
                this[classId] = captchaObj
            },
            /**
             * 显示登录框
             */
            showUserLoginBox() {
                this.$refs.userLoginBox.style.display = 'block'
            },
            /**
             * 隐藏登录框
             */
            hideUserLoginBox() {
                this.$refs.userLoginBox.style.display = 'none'
            },
        },
        mounted(){
        },
        watch: {},
        created(){
            this.initUserData()

        }
    }

</script>