// 定义一个混入对象
import store from './index'
import options from '../store/options'
import api from '@api'

var canNextFlag = true;
const myMixin = {
    data() {
        return {
            flowNumber: store.flowNumber, //是否回显标识，在app创建时判断
            user: store.user,
            ownerInfo: store.ownerInfo,
            options: options,
            sdata: store.sdata,
            rules: store.rules
        }
    },
    watch: {
        '$route'() {
            //路由切换时，如果中间步骤数据信息sesssion为空，则直接跳转到首页；
            if (['confirmApplication', 'creativeInfo', 'ownershipInfo'].indexOf(this.$route.name) > -1 && !this.getSessionData()) {
                this.$router.replace('/chooseIdentity')
            }
            this.flowNumber = this.$route.query.flowNumber;
            store.flowNumber = this.$route.query.flowNumber;
            this.noLoginCheck();
        }
    },
    methods: {
        //上一步
        stepPrev(step, applyType) {
            if (!this.changeUserCheck()) {
                this.$router.go(-1);
            }
        },
        //下一步
        async stepNext(applyType) {
            //判断用户是否切换或未登录
            if (this.changeUserCheck()) {
                return false;
            }

            let step = this.$route.name;
            canNextFlag = true;
            let flowNumber = this.flowNumber;
            console.log(JSON.parse(JSON.stringify(this.sdata)), step, this.flowNumber)
            //return false

            //校验填写
            var isValid = await this.validate();
            if (!isValid) {
                return false
            }

            switch (step) {
                case 'chooseIdentity':
                    //填报身份不一致时，清除缓存
                    //console.log(this.getSessionData().applyType, applyType.toString())
                    if (this.getSessionData() && (this.getSessionData().applyType != applyType.toString())) {
                        if (applyType == '1') {
                            this.clearSessionData();

                            this.sdata.authAttachment = {};
                            store.sdata.authAttachment = {};
                            this.sdata.agentDesc = '';
                            store.sdata.agentDesc = '';
                            this.sdata.applyType = applyType.toString();
                        } else {
                            var authAttachment = {//选择代理人时，授权委托书
                                "attachmentId": "",
                                "flowNumber": "",
                                "segmentName": "",
                                "attachmentName": this.sdata.authAttachment.attachmentName,
                                "relevantFileName": "QLGS-01",
                                "path": this.sdata.authAttachment.path,
                                "remark": "",
                                "createTime": "",
                                "updateTime": "",
                                "baseId": null
                            }
                            var agentDesc = this.sdata.agentDesc;
                            this.clearSessionData();
                            this.sdata.authAttachment = authAttachment;
                            store.sdata.authAttachment = authAttachment;
                            this.sdata.agentDesc = agentDesc;
                            store.sdata.agentDesc = agentDesc;
                        }
                        this.$router.push('/creativeInfo' + pathFlowNumber());
                        this.setSessionData();
                    }
                    this.sdata.applyType = applyType.toString();
                    this.$router.push('/creativeInfo' + pathFlowNumber())
                    this.setSessionData();
                    break;
                case 'creativeInfo':
                    this.$router.push('/ownershipInfo' + pathFlowNumber())
                    this.setSessionData();
                    break;
                case 'ownershipInfo':
                    this.$router.push('/confirmApplication' + pathFlowNumber())
                    this.setSessionData();
                    break;
                case 'confirmApplication':
                    //确认填写完成后，判断是否回显，调用对应接口，成功后清掉缓存
                    this.sdata.accountId = this.user.id;
                    if (!this.flowNumber) {
                        api.Z11BaseInfo(this.sdata).then((ret) => {
                            this.clearSessionData()
                            this.$router.push('/submitMaterial?submitFlowNumber=' + ret.data)
                        })
                    } else {
                        api.reFillin(this.sdata, this.flowNumber).then((ret) => {
                            this.clearSessionData()
                            this.$router.push('/submitMaterial?submitFlowNumber=' + ret.data)
                        })
                    }
                    this.setSessionData();
                    break;
                case 'submitMaterial':
                    this.$router.push('/submitSuccess');
                    this.setSessionData();
                    break;
                default:
                    this.clearSessionData();
                    this.flowNumber = null;
                    store.flowNumber = null;
                    this.$router.push('/chooseIdentity');
                    location.reload()
            }


            function pathFlowNumber() {
                return flowNumber ? '?flowNumber=' + flowNumber : '';
            }
        },

        //验证
        validate() {
            //console.log(this.$refs)
            return new Promise((resolve, reject) => {
                Object.values(this.$refs).forEach((ref) => {
                    if (Array.isArray(ref)) {
                        ref.forEach((_ref) => {
                            this.doValidate(_ref)
                        })
                    } else {
                        if (ref) {
                            this.doValidate(ref)
                        }
                    }
                })
                //console.log('validate next:' + canNextFlag);
                setTimeout(() => {
                    resolve(canNextFlag)
                }, 400)
            })
        },
        doValidate(ref) {
            //console.log('ref.$el.className' + ref.$el.className + (ref.$el.className == 'el-form'));
            if (ref.$el.className.indexOf('el-form') > -1) {
                ref.validate((val) => {
                    if (val == false) {
                        canNextFlag = false;
                    }
                })
            } else {
                if (ref.validate() == false) {
                    canNextFlag = false;
                }
            }
        },

        //验证是否可编辑
        isDisabled(key) {
            return store.reFillin.indexOf(key) == -1;
        },

        //国家城市选择后回调处理方法
        countryCityChange(params, item, type) {
            //console.log('countryCityChange:', JSON.stringify(params), item, type)
            if (type) {
                item[type + 'Country'] = params.country
                item[type + 'Province'] = params.province;
                item[type + 'City'] = params.city;
                item[type + 'Area'] = params.area;
            } else {
                item['country'] = params.country;
                item['province'] = params.province;
                item['city'] = params.city;
                item['area'] = params.area;

                //切换国家时对身份类型及证件类型影响1
                item.idType = '';//证件类型重置
                if (item.peopleKind == '其它') {
                    item.peopleKind = ''
                }
                if (item.country != '中国大陆' && item.applyType == '2') {
                    item.peopleKind = '4'
                }
            }
        },

        //将select字段值转为text显示
        formatOptionData(option, val) {
            var ret = '';
            //console.log(option, this.options[option])
            this.options[option].forEach((item) => {
                if (item.val == val) {
                    ret = item.text;
                }
            })
            return ret
        },

        //移除上传文件
        removeUploadFile(dataRef, idx) {
            //console.log(dataRef)
            dataRef.splice(idx, 1);
        },

        //文件上传成功回调
        onFileUploaded(uploadedParams, dataRef, type) {
            //console.log(uploadedParams, dataRef, type)
            let path = uploadedParams.filePath

            let item = {
                attachmentName: uploadedParams.fileName,
                path: path
            }
            if (type == 'multi') {
                dataRef.push(item);
            } else {
                dataRef.attachmentName = uploadedParams.fileName;
                dataRef.path = path
            }
        },

        //时间戳转日期
        reltimeToDate(timestamp) {
            var date = new Date();

            try {
                date = new Date(parseFloat(timestamp));
            } catch (e) {
                date = new Date();
            }
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            return Y + M + D;
        },

        setSessionData() {
            if (!this.user.id) {
                return false;
            }
            //console.log('setSessionData', this.sdata.opusName);
            sessionStorage.setItem('hdbx_' + this.user.id, JSON.stringify(this.sdata))
        },
        getSessionData() {
            if (!this.user.id) {
                return false;
            }
            return JSON.parse(sessionStorage.getItem('hdbx_' + this.user.id))
        },
        clearSessionData() {
            var sdata_init = JSON.parse(JSON.stringify(store.sdata_init));
            store.sdata = sdata_init
            this.sdata = sdata_init;

            //清掉所有登录账号session
            for (var skey in sessionStorage) {
                if (skey.substring(0, 5) == 'hdbx_') {
                    sessionStorage.removeItem(skey)
                }
            }
        },

        ////未登录状态管理
        noLoginCheck() {
            if (!getCookie('webUserInfo')) {
                this.clearSessionData();
                this.$router.push('/chooseIdentity');
                return false;
            }
        },

        //切换账号，当前用户id与sdata内的id不一致时处理；
        changeUserCheck() {
            let cookieUserInfo = getCookie('webUserInfo');
            if ((cookieUserInfo && this.user.id && (cookieUserInfo.id != this.user.id))) {
                this.$alert('<p style="text-align: center;color: red;padding: 10px 40px;">您已切换用户，需要首页重新开始</p>', '提示', {
                    dangerouslyUseHTMLString: true,
                    callback: action => {
                        this.clearSessionData();

                        this.$router.push('/chooseIdentity');
                        location.reload()
                    }
                });
                return true;
            }
            return false;
        }
    }
}

export default myMixin;
