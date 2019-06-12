import optionsCitys from './country-data.js'
const options = {
    options_opusType: [
        {
            val: 1,
            text: '文字作品-小说、论文、剧本、商业计划书、歌词等'
        },
        {
            val: 2,
            text: '口述作品－小说、论文、剧本、商业计划书、歌词等'
        },
        {
            val: 3,
            text: '音乐作品－歌曲、器乐等'
        },
        {
            val: 4,
            text: '戏剧作品－话居、歌剧、地方戏剧、广播剧等'
        },
        {
            val: 5,
            text: '曲艺作品－相声、大鼓、快书、评书等'
        },
        {
            val: 6,
            text: '舞蹈作品－现代舞、民族舞、中国古典舞、爵士舞、肚皮舞、钢管舞等'
        },
        {
            val: 7,
            text: '杂技艺术－柔术、顶碗、走钢丝、变戏法、舞狮子、车技等'
        },
        {
            val: 8,
            text: '美术作品－插画、绘画、油画、雕塑等'
        },
        {
            val: 9,
            text: '模型作品－平面模型、2D模型、3D模型等'
        },
        {
            val: 10,
            text: '建筑作品－民用建筑、工业建筑、农业建筑等'
        },
        {
            val: 11,
            text: '摄影作品－人像摄影、记录摄影、艺术摄影、全息摄影、全景摄影、商业摄影等'
        },
        {
            val: 12,
            text: '电影作品－记录电影、动画电影、动作电影、科幻电影、悬疑电影等'
        },
        {
            val: 13,
            text: '以类似摄制电影的方法创作的作品－短片、录像、短视频等'
        },
        {
            val: 14,
            text: '工程设计图、产品设计图－平面设计图、立面图、剖面图、施工图、工业设计图纸、服装设计图纸等'
        },
        {
            val: 15,
            text: '地图、示意图－地图、桌面图、立体图等'
        },
        {
            val: 16,
            text: '其他作品－法律、行政法规规定的其他作品'
        }
    ],
    options_opusInditeType: [
        {
            val: 1,
            text: '原创'
        }, {
            val: 2,
            text: '改编'
        }, {
            val: 2,
            text: '翻译'
        }, {
            val: 3,
            text: '汇编'
        }, {
            val: 4,
            text: '注释'
        }, {
            val: 5,
            text: '整理'
        }, {
            val: 6,
            text: '其他'
        }],
    options_publishStatus: [
        {
            val: 1,
            text: '未发表'
        }, {
            val: 2,
            text: '已发表'
        }],
    options_opusNature: [
        {
            val: 1,
            text: '单个作品'
        }, {
            val: 2,
            text: '系列作品'
        }],
    options_citys: optionsCitys,

    options_rightOwnType: [
        {
            val: 1,
            text: '个人作品'
        }, {
            val: 2,
            text: '合作作品'
        }, {
            val: 3,
            text: '法人作品'
        }, {
            val: 4,
            text: '职务作品'
        }, {
            val: 5,
            text: '委托作品'
        },
    ],
    options_peopleKind: [
        {
            val: 1,
            text: '自然人'
        },
        {
            val: 2,
            text: '法人'
        },
        {
            val: 3,
            text: '企业法人'
        },
        {
            val: 4,
            text: '事业单位法人'
        }
    ],
    options_idType: [
        {
            val: 1,
            text: '居民身份证'
        },
        {
            val: 2,
            text: '军官证'
        },
        {
            val: 3,
            text: '营业执照'
        },
        {
            val: 4,
            text: '护照'
        },
        {
            val: 5,
            text: '企业法人营业执照'
        },
        {
            val: 6,
            text: '组织机构代码证书'
        },
        {
            val: 7,
            text: '事业单位法人证书'
        },
        {
            val: 8,
            text: '社团法人证书'
        },
        {
            val: 9,
            text: '其它有效证件'
        }
    ],
    options_applyCopy: [
        {
            val: 1,
            text: '是'
        }, {
            val: 2,
            text: '否'
        }
    ],
    options_obtainType: [
        {
            val: 1,
            text: '原始'
        }, {
            val: 2,
            text: '继承'
        }, {
            val: 3,
            text: '承受'
        }, {
            val: 4,
            text: '其它'
        }
    ],
    options_own: [
        {
            val: 0,
            text: '全部'
        }, {
            val: 1,
            text: '部分'
        }
    ],
    options_rightScope: [
        {
            val: 1,
            text: '全部'
        }, {
            val: 2,
            text: '部分'
        }
    ],
    options_rightScopePart: [
        {
            val: 0,
            text: '发表权'
        }, {
            val: 1,
            text: '署名权'
        }, {
            val: 2,
            text: '修改权'
        }, {
            val: 3,
            text: '保护作品完成权'
        }, {
            val: 4,
            text: '复制权'
        }, {
            val: 5,
            text: '发行权'
        }, {
            val: 6,
            text: '出租权'
        }, {
            val: 7,
            text: '展览权'
        },
    ]
}

export default options