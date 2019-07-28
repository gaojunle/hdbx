// 定义一个混入对象
import store from './index'
import options from '../store/options'
import api from '@api'

var canNextFlag = true;
const myMixin = {
    data() {
        return {
            flowNumber: null, //是否回显标识，在app创建时判断
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
        }
    },
    methods: {
        //上一步
        stepPrev(step, applyType) {
            this.$router.go(-1)
        },
        //下一步
        async stepNext(applyType) {
            let step = this.$route.name;
            canNextFlag = true;
            console.log(this.sdata, step)
            //return false
            var t = await this.validate();
            if (!t) {
                return false
            }
            //return false

            switch (step) {
                case 'chooseIdentity':
                    //填报身份不一致时，清除缓存
                    //console.log(this.sdata.applyType, applyType.toString())
                    if (this.sdata.applyType != applyType.toString()) {
                        this.clearSessionData()
                    }
                    this.sdata.applyType = applyType.toString();
                    this.$router.push('/creativeInfo')
                    break;
                case 'creativeInfo':
                    this.$router.push('/ownershipInfo')
                    break;
                case 'ownershipInfo':
                    this.$router.push('/confirmApplication')
                    break;
                case 'confirmApplication':
                    //确认填写完成后，判断是否回显，调用对应接口，成功后清掉缓存
                    //return false;
                    this.sdata.accountId = this.user.id;
                    if (!this.flowNumber) {
                        api.Z11BaseInfo(this.sdata).then((ret) => {
                            this.clearSessionData()
                            this.$router.push('/submitMaterial?submitFlowNumber=' + ret.data)
                        })
                    } else {
                        api.reFillin(this.sdata).then((ret) => {
                            this.clearSessionData()
                            this.$router.push('/submitMaterial?submitFlowNumber=' + ret.data)
                        })
                    }
                    break;
                case 'submitMaterial':
                    this.$router.push('/submitSuccess')
                    break;
                    break;
                default:
                    this.clearSessionData()
                    this.$router.push('/chooseIdentity')
            }
            this.setSessionData();
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
            console.log('countryCityChange:', JSON.stringify(params), item, type)
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

                //切换国家时对身份类型及证件类型影响
                if (this.user.accountType != '0') { //登陆人是个人，身份信息从实名数据取；不要重置
                    item.idType = '';
                }
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
            console.log(dataRef)
            dataRef.splice(idx, 1);
        },

        //文件上传成功回调
        onFileUploaded(uploadedParams, dataRef, type) {
            console.log(uploadedParams, dataRef, type)
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
            sessionStorage.setItem('sdata', JSON.stringify(this.sdata))
        },
        getSessionData() {
            return JSON.parse(sessionStorage.getItem('sdata'))
        },
        clearSessionData() {
            store.sdata = store.sdata_init;
            this.sdata = store.sdata_init;
            sessionStorage.setItem('sdata', null)
        }
    }
}

export default myMixin;
