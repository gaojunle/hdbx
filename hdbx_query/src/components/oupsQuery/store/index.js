function validateId(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入证件号码'));
    } else {
        if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
            callback();
        } else {
            callback(new Error('请输入正确身份证号'));
        }
    }
}

function getNowDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;
    return nowDate
}

const store = {
    debug: true,
    user: {
        "headImg": "",
        "createTime": 1552894531054,
        "id": "",
        "sex": 1,
        "status": 1,
        "email": "",
        "userName": "",
        "updateTime": 1552894531054,
        "organizationalId": "76371548973432832",
        "loginName": "",
        "phone": "",
        "password": "",
        "onJob": 1,
        "authorization_key": "",
        "authorization_token": "",
        "logintime": 1560932770384
    },
    sdata_init: {
        "accountType": '2', //accountType 1是个人2是机构
        "accountId": "133618064657874944",
        "appearCity": "",
        "appearArea": "",
        "appearCountry": "",
        "appearDate": getNowDate(),
        "appearProvince": "",
        "applyType": "",//申请者身份类型applyType 1是著作权人2是代理人，默认为空
        "authAttachment": {//选择代理人时，授权委托书
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
        },
        "agentDesc": "",
        "attachments": [
            {
                "attachmentList": [],
                "segmentName": ""
            }
        ],
        "authors": [
            {"name": "", "signature": ""}
        ],
        "certificateCollectionMethod": "TQ",
        "certificateCollectionAddress": '1',
        "completeCity": "",
        "completeCountry": "",
        "completeDate": getNowDate(),
        "completeProvince": "",
        "needStamp": "1",
        "obtainType": "2",
        "obtainTypeAttachment": [
            {
                relevantFileName: 'QLGS-0603',
                path: '',
                remark: 'remark'
            },
            {
                relevantFileName: 'QLGS-0601',
                path: '',
                remark: 'remark'
            },
            {
                relevantFileName: 'QLGS-0602',
                path: '',
                remark: 'remark'
            },
            {
                relevantFileName: 'QLGS-0605',
                path: '',
                remark: 'remark'
            }
        ],
        "ownObtainDate": getNowDate(),
        "opusDescriptionAttachment": {
            "path": '',
            "relevantFileName": ""
        },
        "opusInditeType": "1",
        "opusInfo": "",
        "opusName": "",
        "opusNature": "2",
        "opusType": 'A',
        "opusTypeDesc": "",
        "owners": [
            {
                "applyType": "1",
                "applyCopy": "0",
                "cardBack": "",
                "cardFront": "",
                "country": "",
                "province": "",
                "city": "",
                "idNumber": "",
                "idType": "",
                "mobile": "",
                "name": "",
                "peopleKind": "",
                "role": "PET"
            }],
        "publishStatus": "1",
        "registrationMethod": "MAIL",
        "rightOwnType": "2",
        rightOwnTypeAttachment: {//rightOwnType为1时没有附件
            relevantFileName: '',
            path: '',
            remark: ''
        },
        "rightScope": "2",
        rightScopePart: [],
        "sampleRetentionMedium": "1"
    },
    sdata: {
        "accountType": '2', //accountType 1是个人2是机构
        "accountId": "133618064657874944",
        "appearCity": "",
        "appearArea": "",
        "appearCountry": "",
        "appearDate": getNowDate(),
        "appearProvince": "",
        "applyType": "",//申请者身份类型applyType 1是著作权人2是代理人，默认为空
        "authAttachment": {//选择代理人时，授权委托书
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
        },
        "agentDesc": "",
        "attachments": [
            {
                "attachmentList": [],
                "segmentName": ""
            }
        ],
        "authors": [
            {"name": "", "signature": ""}
        ],
        "certificateCollectionMethod": "TQ",
        "certificateCollectionAddress": '1',
        "completeCity": "",
        "completeCountry": "",
        "completeDate": getNowDate(),
        "completeProvince": "",
        "needStamp": "1",
        "obtainType": "2",
        "obtainTypeAttachment": [
            {
                relevantFileName: 'QLGS-0603',
                path: '',
                remark: 'remark'
            },
            {
                relevantFileName: 'QLGS-0601',
                path: '',
                remark: 'remark'
            },
            {
                relevantFileName: 'QLGS-0602',
                path: '',
                remark: 'remark'
            },
            {
                relevantFileName: 'QLGS-0605',
                path: '',
                remark: 'remark'
            }
        ],
        "ownObtainDate": getNowDate(),
        "opusDescriptionAttachment": {
            "path": '',
            "relevantFileName": ""
        },
        "opusInditeType": "1",
        "opusInfo": "",
        "opusName": "",
        "opusNature": "2",
        "opusType": 'A',
        "opusTypeDesc": "",
        "owners": [
            {
                "applyType": "1",
                "applyCopy": "0",
                "cardBack": "",
                "cardFront": "",
                "country": "",
                "province": "",
                "city": "",
                "idNumber": "",
                "idType": "",
                "mobile": "",
                "name": "",
                "peopleKind": "",
                "role": "PET"
            }],
        "publishStatus": "1",
        "registrationMethod": "MAIL",
        "rightOwnType": "2",
        rightOwnTypeAttachment: {//rightOwnType为1时没有附件
            relevantFileName: '',
            path: '',
            remark: ''
        },
        "rightScope": "2",
        rightScopePart: [],
        "sampleRetentionMedium": "1"
    },
    reFillin: [
        "agentDesc",
        "accountId",
        "applyType",
        "authAttachment",
        "opusName",
        "opusType",
        "opusTypeDesc",
        "opusInditeType",
        "completeDate",
        "completeCountry",
        "completeProvince",
        "completeCity",
        "publishStatus",
        "appearDate",
        "appearCountry",
        "appearProvince",
        "appearCity",
        "opusNature",
        "opusInfo",
        "attachments",
        "rightOwnType",
        "owners",
        "authors",
        "obtainType",
        "obtainTypeAttachment",
        "rightScope",
        "rightScopePart",
        "opusDescriptionAttachment",
        "sampleRetentionMedium",
        "needStamp",
        "registrationMethod",
        "certificateCollectionMethod",
        "certificateCollectionAddress"
    ],
    fdata: {
        "z11RegisterApplyInfoVo": {
            "accountId": "账户Id",
            "applyType": "申请方式",
            "authAttachment": {
                "attachmentId": "附件Id",
                "flowNumber": "流水号",
                "segmentName": "系列名称",
                "attachmentName": "附件名称",
                "relevantFileName": "附件类型，系列作品附件附件类型为null",
                "path": "路径",
                "remark": "备注",
                "createTime": "创建时间",
                "updateTime": "修改时间",
                "baseId": null
            },
            "opusName": "作品名称",
            "opusType": "作品类型",
            "opusTypeDesc": "作品类型说明",
            "opusInditeType": "创作性质",
            "completeDate": "创作完成日期",
            "completeCountry": "创作完成国家",
            "completeProvince": "创作完成省份",
            "completeCity": "创作完成城市",
            "publishStatus": "发表状态",
            "appearDate": "首次发表日期",
            "appearCountry": "首次发表国家",
            "appearProvince": "首次发表省份",
            "appearCity": "首次发表城市",
            "opusNature": "首次发表作品性质",
            "opusInfo": "最长作品字数/时长（传入字数或秒数字符串）",
            "attachments": [],
            "rightOwnType": "权利归属",
            "rightOwnTypeAttachment": "权利归属附件",
            "owners": [
                {
                    "id": "ID",
                    "flowNumber": "流水号",
                    "role": "用户角色",
                    "name": "用户名称",
                    "peopleKind": "人员类别",
                    "enterpriseType": "企业类型",
                    "idType": "证件类型",
                    "idNumber": "证件id",
                    "country": "国家",
                    "province": "省",
                    "city": "城市",
                    "park": "园区",
                    "address": "详细地址",
                    "phone": "电话号码",
                    "mobile": "手机号码",
                    "postcode": "邮编",
                    "fax": "传真",
                    "email": "邮箱",
                    "contactPerson": "联系人",
                    "applyType": "申请类型",
                    "sign": "",
                    "opusRightType": "",
                    "applyPeople": "申请人",
                    "opusSign": "",
                    "cnName": "中文名",
                    "enName": "英文名",
                    "impawnType": "",
                    "legalPeople": "",
                    "unitCode": "",
                    "unitName": "",
                    "applyCopy": "是否申请副本",
                    "busType": "",
                    "linkmannum": "",
                    "updateTime": "修改时间",
                    "createTime": "创建时间",
                    "source": "数据来源",
                    "cardFront": "身份证正面地址",
                    "cardBack": "身份证反面地址",
                    "realId": "",
                    "baseId": ""
                }
            ],
            "authors": "作者信息",
            "obtainType": "权利取得方式",
            "obtainTypeAttachment": "权利取得方式附件，与上面authAttachment字段相同",
            "rightScope": "权利拥有状况（如果权利拥有状况为全部，此项为空即可；如果是部分，各个权利id为string类型）",
            "rightScopePart": "权利拥有状况详细",
            "opusDescriptionAttachment": "作品说明书附件，与上面authAttachment字段相同",
            "sampleRetentionMedium": "选择介质",
            "needStamp": "是否附图盖章",
            "registrationMethod": "登记办理方式",
            "certificateCollectionMethod": "证书领取方式",
            "certificateCollectionAddress": "证书领取地址"
        },
        "reFillin": [
            "agentDesc",
            "accountId",
            "applyType",
            "authAttachment",
            "opusName",
            "opusType",
            "opusTypeDesc",
            "opusInditeType",
            "completeDate",
            "completeCountry",
            "completeProvince",
            "completeCity",
            "publishStatus",
            "appearDate",
            "appearCountry",
            "appearProvince",
            "appearCity",
            "opusNature",
            "opusInfo",
            "attachments",
            "rightOwnType",
            "owners",
            "authors",
            "obtainType",
            "obtainTypeAttachment",
            "rightScope",
            "rightScopePart",
            "opusDescriptionAttachment",
            "sampleRetentionMedium",
            "needStamp",
            "registrationMethod",
            "certificateCollectionMethod",
            "certificateCollectionAddress"
        ]
    },
    rules: {
        agentDesc: [
            {required: true, message: '请输入登记信息', trigger: 'blur'}
        ],
        opusName: [
            {required: true, message: '请输入作品名称', trigger: 'blur'}
        ],
        opusTypeDesc: [
            {required: true, message: '请输入作品类型描述', trigger: 'blur'}
        ],
        segmentName: [
            {required: true, message: '请输入样本名称', trigger: 'blur'}
        ],
        peopleKind: [
            {required: true, message: '请选择著作权人类型', trigger: 'change'}
        ],
        ownerName: [
            {required: true, message: '请输入著作权人姓名', trigger: 'blur'}
        ],
        idType: [
            {required: true, message: '请选择证件类型', trigger: 'change'}
        ],
        idNumber: [
            {required: true, message: '请输入证件号码', trigger: 'blur'}
        ],
        idNumberID: [
            {required: true, message: '请输入证件号码', trigger: 'blur'},
            {validator: validateId, trigger: 'blur'}
        ],
        mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        authorName: [
            {required: true, message: '请输入著作权人姓名', trigger: 'blur'}
        ],
        signature: [
            {required: true, message: '请输入作者署名：作者的笔名、别名', trigger: 'blur'}
        ],
        rightScopePart: [
            {required: true, message: '请输选择权利拥有状况', trigger: 'change'}
        ]
    }
}

export default store;