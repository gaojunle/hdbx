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
    /*var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }*/
    var nowDate = new Date().getTime().toString();
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
        "certificateCollectionMethod": "HALL",//HALL表示大厅领取
        "certificateCollectionAddress": 'TQ',
        "completeCity": "",
        "completeCountry": "",
        "completeDate": getNowDate(),
        "completeProvince": "",
        "needStamp": "1",
        "obtainType": "2",
        "obtainTypeAttachment": [
            {
                relevantFileName: 'QLGS-0603',//继承作品－与被继承人关系证明
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
            "remark": '',
            "relevantFileName": "QLGS-07"
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
                "role": "OWN"
            }],
        "publishStatus": "1",
        "registrationMethodType": "HALL",
        "registrationMethod": "TQ",
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
        "certificateCollectionMethod": "HALL",
        "certificateCollectionAddress": 'TQ',
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
            "remark": '',
            "relevantFileName": "QLGS-07"
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
                "role": "OWN"
            }],
        "publishStatus": "1",
        "registrationMethodType": "HALL",
        "registrationMethod": "TQ",
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