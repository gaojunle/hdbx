import optionsCitys from './country-data.js'

const options = {
    //作品类型
    options_opusType: [
        {
            val: 'A',
            text: '文字作品'
        },
        {
            val: 'M',
            text: '口述作品'
        },
        {
            val: 'B',
            text: '音乐作品'
        },
        {
            val: 'C',
            text: '戏剧作品'
        },
        {
            val: 'D',
            text: '曲艺作品'
        },
        {
            val: 'E',
            text: '舞蹈作品'
        },
        {
            val: 'N',
            text: '杂技艺术'
        },
        {
            val: 'F',
            text: '美术作品'
        },
        {
            val: 'P',
            text: '模型作品'
        },
        {
            val: 'O',
            text: '建筑作品'
        },
        {
            val: 'G',
            text: '摄影作品'
        },
        {
            val: 'H',
            text: '电影作品'
        },
        {
            val: 'I',
            text: '以类似摄制电影的方法创作的作品'
        },
        {
            val: 'J',
            text: '工程设计图、产品设计图'
        },
        {
            val: 'K',
            text: '地图、示意图'
        },
        {
            val: 'L',
            text: '其他作品'
        }
    ],
    //创作性质
    options_opusInditeType: [
        {
            val: '1',
            text: '原创'
        }, {
            val: '2',
            text: '改编'
        }, {
            val: '3',
            text: '翻译'
        }, {
            val: '4',
            text: '汇编'
        }, {
            val: '5',
            text: '注释'
        }, {
            val: '6',
            text: '整理'
        }, {
            val: '7',
            text: '其他'
        }],
    //作品性质
    options_opusNature: [
        {
            val: '1',
            text: '单个作品'
        }, {
            val: '2',
            text: '系列作品'
        }
    ],
    //发表状态
    options_publishStatus: [
        {
            val: '0',
            text: '未发表'
        }, {
            val: '1',
            text: '已发表'
        }],
    //协议文件名
    options_relevantFileName: [
        {
            val: 'QLGS-0801',
            text: '合作作品创作声名/协议',
            exampleUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1417347526,3693915681&fm=26&gp=0.jpg'
        },
        {
            val: 'QLGS-0804',
            text: '法人作品创作声名',
            exampleUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1417347526,3693915681&fm=26&gp=0.jpg'
        },
        {
            val: 'QLGS-0802',
            text: '职务作品创作声名',
            exampleUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1417347526,3693915681&fm=26&gp=0.jpg'
        },
        {
            val: 'QLGS-0803',
            text: '委托作品创作声名',
            exampleUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1417347526,3693915681&fm=26&gp=0.jpg'
        }
    ],
    //著作权人还是申请人等，角色
    options_role: [
        {
            val: 'AGT',
            text: '代理人'
        }, {
            val: 'CRP',
            text: '合同登记人'
        }, {
            val: 'OWN',
            text: '著作权人'
        }, {
            val: 'PET',
            text: '申请人'
        }, {
            val: 'SRP',
            text: '软件登记人'
        }, {
            val: 'TEC',
            text: '受让方'
        }, {
            val: 'TRC',
            text: '转让方'
        }
    ],
    //著作权人类型
    options_peopleKind: [
        {
            val: '1',
            text: '自然人'
        },
        {
            val: '2',
            text: '法人'
        },
        {
            val: '21',
            text: '企业法人'
        },
        {
            val: '23',
            text: '事业单位法人'
        },
        {
            val: '24',
            text: '社会团体法人'
        },
        {
            val: '3',
            text: '其它组织'
        },
        {
            val: '4',
            text: '其它'
        }
    ],
    //证件类型
    options_idType: [
        {
            val: '1',
            text: '居民身份证'
        },
        {
            val: '2',
            text: '军官证'
        },
        {
            val: '3',
            text: '营业执照'
        },
        {
            val: '4',
            text: '护照'
        },
        {
            val: '5',
            text: '企业法人营业执照'
        },
        {
            val: '6',
            text: '组织机构代码证书'
        },
        {
            val: '7',
            text: '事业单位法人证书'
        },
        {
            val: '8',
            text: '社团法人证书'
        },
        {
            val: '9',
            text: '其它有效证件'
        }
    ],
    //是否申请副本
    options_applyCopy: [
        {
            val: '0',
            text: '否'
        },
        {
            val: '1',
            text: '是'
        }
    ],
    //权利获取方式
    //权利拥有状况
    options_rightScope: [
        {
            val: '1',
            text: '全部'
        }, {
            val: '2',
            text: '部分'
        }
    ],
    //权利拥有状况详细
    options_rightScopePart: [
        {
            val: '1',
            text: '发表权'
        }, {
            val: '2',
            text: '署名权'
        }, {
            val: '3',
            text: '修改权'
        }, {
            val: '4',
            text: '保护作品完成权'
        }, {
            val: '5',
            text: '复制权'
        }, {
            val: '6',
            text: '发行权'
        }, {
            val: '7',
            text: '出租权'
        }, {
            val: '8',
            text: '展览权'
        }, {
            val: '9',
            text: '表演权'
        }, {
            val: '10',
            text: '放映权'
        }, {
            val: '11',
            text: '广播权'
        }, {
            val: '12',
            text: '信息网络传播权'
        }, {
            val: '13',
            text: '摄制权'
        }, {
            val: '14',
            text: '改编权'
        }, {
            val: '15',
            text: '翻译权'
        }, {
            val: '16',
            text: '汇编权'
        }, {
            val: '17',
            text: '其它'
        }
    ],
    //权限取得方式
    options_obtainType: [
        {
            val: '1',
            text: '原始'
        }, {
            val: '2',
            text: '继承'
        }, {
            val: '3',
            text: '承受'
        }, {
            val: '4',
            text: '其它'
        }
    ],
    //权利取得方式细节
    options_obtainTypeAttachment: [
        [
            {
                val: 'QLGS-0603',
                text: '与被继承人关系证明'
            },
            {
                val: 'QLGS-0601',
                text: '被继承人死亡证明'
            },
            {
                val: 'QLGS-0602',
                text: '被继承人有效遗嘱'
            },
            {
                val: 'QLGS-0605',
                text: '法院文书'
            },
        ],
        [
            {
                val: 'QLGS-0501',
                text: '企业变更证明'
            },
            {
                val: 'QLGS-0701',
                text: '合同'
            },
            {
                val: 'QLGS-0702',
                text: '债权人会议决议'
            },
            {
                val: 'QLGS-0504',
                text: '清算组织公告'
            },
        ],
        [
            {
                val: 'QLGS-0703',
                text: '转让合同'
            },
        ]
    ],
    /*{
            val: 'QLGS-07',
            text: '作品说明文件'
        },
        {
            val: 'QLGS-01',
            text: '授权委托书'
        },*/
    options_rightOwnType: [
        {
            val: '1',
            text: '个人作品'
        }, {
            val: '2',
            text: '合作作品'
        }, {
            val: '3',
            text: '法人作品'
        }, {
            val: '4',
            text: '职务作品'
        }, {
            val: '5',
            text: '委托作品'
        },
    ],

    options_own: [
        {
            val: '0',
            text: '全部'
        }, {
            val: '1',
            text: '部分'
        }
    ],

    //选择介质
    options_sampleRetentionMedium: [
        {
            val: '1',
            text: '光盘'
        }, {
            val: '2',
            text: 'A4纸'
        }
    ],
    //是否附图盖章
    options_needStamp: [
        {
            val: '1',
            text: '是'
        },
        {
            val: '0',
            text: '否'
        }
    ],
    //登记办理方式
    options_registrationMethod: [
        {
            val: 'TQ',
            text: '中国版权保护中心版权登记大厅'
        }, {
            val: 'MAIL',
            text: '邮寄到中国版权保护中心'
        }
    ],
    //证书领取方式
    options_certificateCollectionMethod: [
        {
            val: 'TQ',
            text: '登记大厅自取'
        },
        {
            val: 'EMS',
            text: 'EMS'
        }, {
            val: 'MAIL',
            text: '挂号信'
        }
    ],

    options_citys: optionsCitys

}

export default options