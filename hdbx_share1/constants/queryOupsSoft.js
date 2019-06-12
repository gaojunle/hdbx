export const applyTypes = [{
  name: '著作权人', // 查询人名称
  value: 'owner', // 查询人值
},
{
  name: '代理人',
  value: 'agent',
},
] // 身份类型

export const applyPurposes = [{
  name: '转让', // 查询用途名称
  value: '1', // 查询用途值
},
{
  name: '承受',
  value: '2',
},
{
  name: '合同登记',
  value: '3',
},
{
  name: '撤销',
  value: '4',
},
{
  name: '变更补充',
  value: '5',
},
{
  name: '补发',
  value: '6',
},
{
  name: '复制原始档案',
  value: '7',
},
{
  name: '质权登记',
  value: '8',
},
{
  name: '质权注销',
  value: '9',
},
{
  name: '概况查询',
  value: '10',
},

{
  name: '其他',
  value: '0',
},
] // 软件查询用途

export const fileList = {
  ApplyForm: {
    name: '计算机软件著作权查询申请表',
    requirement: '申请人签章处加盖XXXX公章',
    type: 'ApplyForm',
  },
  AuthorizedLetter: {
    name: '授权委托书',
    requirement: '申请人签章处加盖XXXX公章',
    type: 'AuthorizedLetter',
  },
  OrigCertificateCopy: {
    name: '原登记证书复印件',
    requirement: '申请人签章处加盖XXXX公章',
    type: 'OrigCertificateCopy',
  },
} // 打印材料

export const oupsFileList = {
  ApplyForm: {
    name: '作品查询申请表',
    type: 'ApplyForm',
  },
  AgentAuthorizedLetter: {
    name: '代理委托书',
    type: 'AgentAuthorizedLetter',
  },
  AgentIdentification: {
    name: '代理人身份证明',
    type: 'AgentIdentification',
  },
  OwnerIdentification: {
    name: '著作权人身份证明',
    type: 'OwnerIdentification',
  }
}
// 受理检查列表
export const mateFileList = {
  validWill: {
    name: '被继承人有效遗嘱',
    type: 'validWill',
  },
  jobDescription: {
    name: '作品说明书',
    type: 'jobDescription',
  },
  agentProve: {
    name: '代理人身份证明文件',
    type: 'agentProve',
  },
  statement: {
    name: '合作作品创作声明/协议；法人作品创作声明；职务作品创作声明；委托作品创作声明/协议',
    type: 'statement',
  },
  powerOfAttorney: {
    name: '授权委托书',
    type: 'powerOfAttorney'
  },
  legalInstrument: {
    name: '法院文书',
    type: 'legalInstrument'
  },
  enterpriseChangeCertificate: {
    name: '企业变更证明',
    type: 'enterpriseChangeCertificate'
  },
  opusApplyForm: {
    name: '作品登记申请表申请人处签字/盖章',
    type: 'opusApplyForm'
  },
  relativeOfHeirProve: {
    name: '著作权人与被继承人的关系证明',
    type: 'relativeOfHeirProve'
  },
  noticeOfLiquidationOrganization: {
    name: '清算组织公告',
    type: 'noticeOfLiquidationOrganization'
  },
  idCard: {
    name: '著作权人身份证明文件',
    type: 'idCard'
  },
  opusSample: {
    name: '作品样本',
    type: 'opusSample'
  },
  contractCreditorsMeetingResolution: {
    name: '合同、债权人会议决定',
    type: 'contractCreditorsMeetingResolution'
  },
  heirProve: {
    name: '继承人身份证明',
    type: 'heirProve'
  },
  deathProve: {
    name: '被继承人死亡证明',
    type: 'deathProve'
  },
}
export const notice = {
  acceptance: {
    name: '软件著作权登记档案查询受理通知书',
    caseName: [4],
  },
  correction: {
    name: '补证通知书',
    caseName: [5, 9],
  },
  unAcceptance: {
    name: '不予办理通知书',
    caseName: [6, 10],
  },
  receiveResult: {
    name: '领取查询结果通知',
    caseName: [8],
  },
  grantResult: {
    name: '查询结果发放通知',
    caseName: [12],
  },
} // 通知书

export const handleType = {
  mail: {
    mode: '邮寄到中国版权保护中心办理',
    address: '地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层',
    zipCode: '邮编：100050'
  },
  tq: {
    mode: '登记大厅现场办理',
    hall: '中国版权保护中心版权登记大厅（天桥）',
    address: '地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层'
  },
}

export const receiveType = {
  tq: {
    mode: '登记大厅自取',
    hall: '中国版权保护中心版权登记大厅（天桥）',
    address: '地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层'
  },
}

export const applyPurposesOups = [
  {
  name: '合同备案', // 查询用途名称
  value: '1', // 查询用途值
  applyTypes: ['TEC', 'TRC', 'AGT_TEC', 'AGT_TRC', 'LCR', 'LCE', 'AGT_LCR', 'AGT_LCE'], // 用途下的身份类型
  file: {
    AGT_TRC: ['proxy'], // 代理转让方
    AGT_TEC: ['proxy', 'proxyContract'], // 代理受让方
    AGT_LCR: ['proxy'], // 代理许可方
    AGT_LCE: ['proxy', 'proxyContract'], // 代理被许可方
    TEC: ['proxyContract'], // 受让方
    LCE: ['proxyContract'], // 被许可方
  },
},
{
  name: '变更登记',
  value: '2',
  applyTypes: ['OWN', 'AGT'],
  file: {
    AGT: ['proxy']
  },
},
{
  name: '补换发登记证书',
  value: '3',
  applyTypes: ['OWN', 'AGT'],
  file: {
    AGT: ['proxy']
  },
},
{
  name: '撤销登记',
  value: '4',
  applyTypes: ['OWN', 'AGT'],
  file: {
    AGT: ['proxy']
  },
},
{
  name: '质权登记',
  value: '5',
  applyTypes: ['PLR', 'PLE', 'AGT_PLR', 'AGT_PLE'],
  file: {
    PLE: ['proxyContract'], // 质权人
    AGT_PLR: ['proxy'], // 代理出质人
    AGT_PLE: ['proxy', 'proxyContract'], // 代理质权人
  },
},
{
  name: '质权注销',
  value: '6',
  applyTypes: ['PLR', 'PLE', 'AGT_PLR', 'AGT_PLE'],
  file: {
    PLE: ['proxyContract'], // 质权人
    AGT_PLR: ['proxy'], // 代理出质人
    AGT_PLE: ['proxy', 'proxyContract'], // 代理质权人
  },
},
{
  name: '公司上市',
  value: '7',
  applyTypes: ['OWN', 'AGT'],
  file: {
    AGT: ['proxy']
  },
},
{
  name: '司法或行政管理机关查询',
  value: '8',
  applyTypes: ['JUD'],
  file: {
    JUD: ['assistanceLetter', 'agentCard'] // 司法或行政管理机关
  },
},
] // 作品查询用途

export const applyTypesOpus = [{
  name: '作品登记人', // 查询人名称
  value: 'OWN', // 查询人值
},
{
  name: '代理人',
  value: 'AGT',
},
{
  name: '代理受让方',
  value: 'AGT_TEC',
},
{
  name: '代理转让方',
  value: 'AGT_TRC',
},
{
  name: '受让方',
  value: 'TEC',
},
{
  name: '转让方',
  value: 'TRC',
},
{
  name: '出质人',
  value: 'PLR',
},
{
  name: '质权人',
  value: 'PLE',
},
{
  name: '代理出质人',
  value: 'AGT_PLR',
},
{
  name: '代理质权人',
  value: 'AGT_PLE',
},
{
  name: '司法或行政管理机关',
  value: 'JUD',
},
{
  name: '许可方',
  value: 'LCR',
},
{
  name: '被许可方',
  value: 'LCE',
},
{
  name: '代理许可方',
  value: 'AGT_LCR',
},
{
  name: '代理被许可方',
  value: 'AGT_LCE',
},
] // 作品身份类型

export const agentOupsType = ['AGT', 'AGT_TEC', 'AGT_TRC', 'AGT_PLR', 'AGT_PLE', 'JUD', 'AGT_LCR', 'AGT_LCE'] // 作品代理人类型

export const fileType = {
  proxy: '代理委托书',
  proxyContract: '双方质权合同或出质人查询授权委托书',
  assistanceLetter: '协助调查函(有法院章)',
  agentCard: '经办人员工(法官、行政机构工作人员)作证件复印件',
} // 需要上传的电子材料