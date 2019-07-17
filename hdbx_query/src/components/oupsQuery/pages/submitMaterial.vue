<template>
    <div class="step step_4">
        <div class="f_box">
            <div class="info-title">
                <span>请递交以下申请材料，并按要求签字或盖章</span>
                <div class="print-all">
                    <img src="../../../assets/img/steps/icon-print.png" alt="">
                    <span>打印全部</span>
                </div>
            </div>
            <el-table
                    class="print-table"
                    :class="{unfold:print_unfold_1}"
                    :data="printData_1"
                    align="center"
                    header-align="center"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="p_name"
                        label="名称"
                        width="350">
                </el-table-column>
                <el-table-column
                        prop="p_require"
                        label="要求"
                        width="408">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                @click="doDetail()" style="color: #666666;margin-right: 10px">查看
                        </el-button>
                        <el-button
                                type="text"
                                @click="doDetail()">打印
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <LoadMore v-if="printData_1.length>4"
                      @triggerLoadMore="(unfold)=>{this.print_unfold_1 =!unfold}"></LoadMore>
        </div>
        <div class="f_box">
            <div class="info-title">
                <span>请按以下要求准备作品样本</span>
                <div class="print-all">
                    <img src="../../../assets/img/steps/icon-print.png" alt="">
                    <span>打印全部</span>
                </div>
            </div>
            <el-table
                    class="print-table"
                    :data="printData_2"
                    align="center"
                    header-align="center"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="p_name"
                        label="作品名称"
                        width="350">
                </el-table-column>
                <el-table-column
                        prop="p_require"
                        label="材料介质"
                        width="408">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                @click="doDetail()" style="color: #666666;margin-right: 10px">查看
                        </el-button>
                        <el-button
                                type="text"
                                @click="doDetail()">打印
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <LoadMore v-if="printData_2.length>4"
                      @triggerLoadMore="(unfold)=>{this.print_unfold_2 =!unfold}"></LoadMore>
        </div>
        <div class="step-btns big">
            <el-button type="primary" @click="stepNext($route.params.step)" class="big">已打印，去递交材料</el-button>
        </div>
    </div>
</template>
<script>
    import '../components/index.less'
    import api from '@api'
    import options from '../store/options'
    import store from '../store/index'
    import myMixin from '../store/mixin'
    import LoadMore from '../components/LoadMore'
    import WaysBox from '../components/WaysBox'
    import AddressBox from '../components/AddressBox'

    export default {
        components: {LoadMore, WaysBox, AddressBox},
        mixins: [myMixin],
        data() {
            return {
                options: options,
                sdata: store.sdata,
                printData_1: [
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    }
                ],
                print_unfold_1: false,
                printData_2: [
                    {
                        p_name: '计算机软件著作权查询申请表2',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表2',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表2',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表2',
                        p_require: '申请人签章处加盖XXXX公章'
                    }
                ],
                print_unfold_2: false,
            }
        },

        methods: {},
        mounted() {
            if (this.$route.query.submitFlowNumber) {
                //从路由参数上得到flowNumer来加载打印数据
                api.applyDocument({flowNumber: this.$route.query.submitFlowNumber}).then((ret) => {
                    console.log(ret);
                })
                /*api.searchApplicationDocuments({}).then((ret) => {
                    console.log(ret);
                })*/
            }
        }
    }
</script>
<style lang="less">
    @blue: #0168b7;
    //第四步，打印
    .step_4 {
        .f_box {
            .info-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .print-all {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16px;
                font-weight: normal;
                color: @blue;
                img {
                    margin-right: 4px;
                }
            }
        }
    }

    .el-table {
        &.print-table {
            height: 300px;
            overflow-y: hidden;
            &.unfold {
                height: auto;
            }
            th {
                text-align: center;
                background: #eeeeee;
                padding: 8px 0;
                position: relative;
                color: #000000;
                &:before {
                    content: ' ';
                    width: 2px;
                    height: 40px;
                    display: block;
                    position: absolute;
                    background: white;
                    top: 0px;
                    left: 0px;
                    z-index: 1;
                }
                &:nth-of-type(1), &:nth-of-type(3) {
                    &:before {
                        content: none;
                    }
                }
            }
            td {
                text-align: center;
                .el-button {
                    color: @blue;
                }
            }
        }
    }
</style>