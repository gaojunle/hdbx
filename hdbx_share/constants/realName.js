export const papersStatus = [
    {
        label: '居民身份证',
        value: 1
    },
    {
        label: '军/警官证',
        value: 2
    },
    {
        label: '企业法人',
        value: 3
    },
    {
        label: '护照',
        value: 4
    },
    {
        label: '事业单位法人',
        value: 7
    },
    {
        label: '社会团体法人',
        value: 8
    },
    {
        label: '其他',
        value: 9
    },
    {
        label: '士兵证',
        value: 10
    },
    {
        label: '文职干部证等',
        value: 11
    },
    {
        label: '营业执照',
        value: 12
    },
    {
        label: '统一社会信用代码证书',
        value: 13
    },
    {
        label: '其他有效证件',
        value: 14
    },
    {
        label: '台湾居民往来大陆通行证',
        value: 15
    },
    {
        label: '香港居民往来大陆通行证',
        value: 16
    },
    {
        label: '澳门居民往来大陆通行证',
        value: 17
    },
    {
        label: '证件翻译件+翻译机构公章',
        value: 18
    },
    {
        label: '无身份证明文件',
        value: 19
    },
] // 证件类型

export const mechanismStatus = [
    {
        label: '企业法人',
        value: 21
    },
    {
        label: '机关法人',
        value: 22
    },
    {
        label: '事业单位法人',
        value: 23
    },
    {
        label: '社会团体法人',
        value: 24
    },
    {
        label: '其他组织',
        value: 3
    },
    {
        label: '其他',
        value: 4
    },
    {
        label: '军队单位',
        value: 5
    },
] // 机构类型

export const peopleStatusCollection = {
    '中国大陆': [1, 2, 10],
    '香港': [1, 16],
    '澳门': [1, 17],
    '台湾': [15],
    other: [4, 18]
}

export const mechanismStatusCollection = {
    '中国大陆': {
        '21': [12],
        '22': [13],
        '23': [13],
        '24': [13],
        '3': [13],
        '4': [14],
        '5': [19]
    },
    '香港': {
        '4': [14]
    },
    '澳门': {
        '4': [14]
    },
    '台湾': {
        '4': [14]
    },
    other: {
        '4': [14, 18]
    }
}