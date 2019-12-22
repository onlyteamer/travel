<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" :title="title" left-arrow @click-left="onClickLeft"/>
            <div v-html="content" style="width: 88%;margin:46px auto 0;background: #FFFFFF;padding: 15px 10px"></div>
        </div>
    </div>
</template>

<script>
    import {NavBar} from 'vant';
    import request from '../../utils/request'

    export default {
        components: {
            [NavBar.name]: NavBar,
        },
        data(){
            return{
                content:"",
                title:""
            }
        },
        mounted(){
            this.initData()
        },
        methods: {

            initData(){
                let id = this.$route.query.id;
                request.sendGet({
                    url:"/common/clause/"+id,
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.content = res.data.data.context;
                        this.title = res.data.data.title
                    }
                })
            },

            onClickLeft() {
                this.$router.back(-1);
            },
        }
    }
</script>

<style scoped>
    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

</style>
