<template>
    <div class="material-show">
        <div class="title">请确认上传材料</div>
        <ul>
            <li class="clearfix">
                <div class="name">原登记证书：</div>
                <img :src="exCertificate" alt="">
            </li>
            <li class="clearfix" v-for="item in identity">
                <div class="name">著作权人身份证明：</div>
                <img :src="item" alt="">
            </li>
        </ul>
    </div>
</template>

<script>

    import '@css/common/registerQuery/materialShow'

    export default{
        data (){
            return {}
        },
        props: {
            exCertificate: {
                type: String,
                defauls: ''
            }, // 原登记证书
            identity: {
                type: Array,
                defauls: () => []
            }, //著作权人身份证明
        },
        components: {},
        methods: {},
        mounted(){

        },
        watch: {},
        created() {

        }
    }

</script>