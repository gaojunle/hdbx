<template>
    <div class="wrap">
        <div class="inpBox ownerShipBox">
            <p class="titles">首页>Z11作品著作权登记申请</p>
        
            <div class="pross">
                <progress-nav :currentPage="3"></progress-nav>
            </div>

            <div class="submaterial">
                <h3>请递交以下申请材料，并按要求签字或盖章</h3>

                <div class="table">
                    <table>
                        <tr>
                            <th class="w80 pad_left_38">序号</th>
                            <th class="w450">材料名称</th>
                            <th>要求</th>
                            <th class="w100"><span class="center">操作</span></th>
                            <th class="w100"><hd-button class='print' @click='print'>打印</hd-button></th>
                        </tr>

                        <tr v-for="(item,index) in list">
                            <td class="pad_left_38">{{item.label}}</td>
                            <td><p>{{item.name}}</p></td>
                            <td><p>{{item.require}}</p></td>
                            <td><a class="center" href="javascript:;">查看</a></td>
                            <td><a class="center" href="javascript:;">打印</a></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="submaterial">
                <h3>请按以下要求准备作品样本</h3>

                <div class="table">
                    <table>
                        <tr>
                            <th class="w80 pad_left_38">序号</th>
                            <th class="w450">作品名称</th>
                            <th>材料介质</th>
                            <th class="w100">份数</th>
                        </tr>

                        <tr v-for="(item,index) in works">
                            <td class="pad_left_38">{{item.label}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.material}}</td>
                            <td>{{item.num}}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <hd-button class='printSubmit' @click='printSubmit'>已打印完成，去递交申请</hd-button>
        </div>
    </div>
</template>
<script>
// import '@css/Z11/common'
import '@css/Z11/submaterial'
import progressNav from '@components/common/registerQuery/progressNav'
import hdButton from '@share/components/hdButton'

export default {
    data() {
        return {
            list: [
                {
                    name: '作品著作权查询申请表',
                    require:'全部著作权人签字/盖章',
                    label: '1',
                },
                {
                    name: '授权委托书',
                    require:'请递交原件',
                    label: '2',
                },
                {
                    name: '继承人身份证明',
                    require:'',
                    label: '3',
                },
                {
                    name: '著作权人与被继承人的关系证明',
                    require:'',
                    label: '4',
                },
                {
                    name: '被继承人死亡证明',
                    require:'',
                    label: '5',
                },
                {
                    name: '被继承人有效遗嘱',
                    require:'',
                    label: '6',
                },
                {
                    name: '法院文书',
                    require:'',
                    label: '7',
                },
                {
                    name: '企业变更证明',
                    require:'',
                    label: '8',
                },
                {
                    name: '合同',
                    require:'',
                    label: '9',
                },
                {
                    name: '债权人会议决定',
                    require:'',
                    label: '10',
                },
                {
                    name: '清算组织公告',
                    require:'',
                    label: '11',
                },
                {
                    name: '合作作品创作声明/协议；法人作品创作声明；职务作品创作声明；委托作品创作声明/协议',
                    require:'',
                    label: '12',
                },
                {
                    name: '作品说明书',
                    require:'',
                    label: '13',
                },

            ],

            works: [
                {
                    name: '太行山行摄',
                    material:'光盘',
                    num:'1',
                    label: '1',
                },
                {
                    name: '授权委托书',
                    material:'光盘',
                    num:'1',
                    label: '2',
                },
            ],
        }
    },
    methods: {
       
        print() {
            alert("打印")
        },

        printSubmit() {
            alert("已递交")
        },
    },
    components: {
        progressNav,
        hdButton,
    }
}
</script>
