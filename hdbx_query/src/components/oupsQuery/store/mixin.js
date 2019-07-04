// 定义一个混入对象
import store from './index'
import options from '../store/options'

var flag = true;
const myMixin = {
    data() {
        return {
            options: options,
            sdata: store.sdata,
            rules: store.rules,
            fdata: store.fdata
        }
    },
    created() {
        //console.log(this.sdata)
        if (this.getSessionData()) {
            store.sdata = this.getSessionData();
            this.sdata = store.sdata;
        }

        if (this.$route.query.clear == 1) {
            this.clearSessionData()
        }
    },
    methods: {
        //上一步
        stepPrev(step, applyType) {
            step = parseInt(step);
            this.$router.push('/index/' + (--step))
        },
        //下一步
        async stepNext(step, applyType) {
            flag = true;
            console.log(this.sdata.rightScope)
            var t = await this.validate();

            if (!t) {
                return false
            }
            //return false
            step = parseInt(step);

            switch (step) {
                case 0:
                    //填报身份不一致时，清除缓存
                    console.log(this.sdata.applyType, applyType.toString())
                    if (this.sdata.applyType != applyType.toString()) {
                        this.clearSessionData()
                    }
                    this.sdata.applyType = applyType.toString();
                    this.$router.push('/index/' + (++step))
                    break;
                case 1:
                    this.$router.push('/index/' + (++step))
                    break;
                case 2:
                    this.$router.push('/index/' + (++step))
                    break;
                case 3:
                    //确认填写完成后，清掉缓存
                    this.clearSessionData()
                    this.$router.push('/index/' + (++step))
                    break;
                case 4:
                    this.$router.push('/index/' + (++step))
                    break;
                case 5:
                    this.$router.push('/index/' + (++step))
                    break;
                default:
                    this.clearSessionData()
                    this.$router.push('/index/0')
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
                //console.log('validate next:' + flag);
                setTimeout(() => {
                    resolve(flag)
                }, 400)
            })
        },
        doValidate(ref) {
            //console.log('ref.$el.className' + ref.$el.className + (ref.$el.className == 'el-form'));
            if (ref.$el.className.indexOf('el-form') > -1) {
                ref.validate((val) => {
                    if (val == false) {
                        flag = false;
                    }
                })
            } else {
                if (ref.validate() == false) {
                    flag = false;
                }
            }
        },

        //验证是否可编辑
        isDisabled(key) {
            return store.fdata.reFillin.indexOf(key) == -1;
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
                item.idType = '';
                if (item.peopleKind == '无') {
                    item.peopleKind = ''
                }
                if (item.country != '中国大陆' && item.applyType == '2') {
                    item.peopleKind = '0'
                }
            }
        },

        //将select字段值转为text显示
        formatOptionData(option, val) {
            var ret = '';
            console.log(option, this.options[option])
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
            let item = {
                attachmentName: uploadedParams.fileName,
                path: uploadedParams.filePath
            }
            if (type == 'multi') {
                dataRef.push(item);
            } else {
                dataRef.attachmentName = uploadedParams.fileName;
                dataRef.path = uploadedParams.filePath
            }
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
