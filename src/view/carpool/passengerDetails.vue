<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div class="userInfo">
            <van-row style="display: flex;align-items: center;font-size: 14px">
                <van-col span="24" >
                    <div style="display: flex;align-items: center">
                        <img :src="userInfo.headimageurl" style="height: 52px;width: 52px;margin-right: 10px;border-radius: 50%">
                        <div>
                            <p style="margin: 5px 0">
                                <span style="color: #5E5E5E;font-weight: bold">{{userInfo.nickName}}</span>
                                <img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="userInfo.sex == '1'">
                                <img src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px" v-else>

                                <img src="./../../static/images/xin.png" style="width: 14px;height: 14px;margin-right: 5px;margin-left: 20px"/><span>{{userInfo.goodCount?userInfo.goodCount:'0'}}</span>
                                <img src="./../../static/images/unhapply.png" style="width: 14px;height: 14px;margin: 0 5px 0 20px" /> <span>{{userInfo.badCount?userInfo.badCount:'0'}}</span>
                            </p>
                            <p style="margin: 5px 0;display: flex;align-items: center">
                                <img src="../../static/images/userInfo.png" style="width: 14px;height: 16px;margin-right: 5px" /><span style="font-size: 14px;color: #5E5E5E">{{userInfo.realName}}</span>
                            </p>
                            <p style="margin: 5px 0">
                                <img src="./../../static/images/tel.png" style="width: 14px" /><span style="font-size: 14px;color: #5E5E5E">{{userInfo.phone}}</span>
                            </p>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="assess">
            <div><span style="font-size: 16px;font-weight: bold;margin-right: 10px">车主评价:</span><span>（{{appraiseTotal}}）</span></div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false" />
            <div v-if="appraiseList.data.length == '0'" style="text-align: center;margin: 10px 0">
                    暂无评价
            </div>
            <van-list
                    :offset="10"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
                    v-else
            >
            <div v-for="(item,index) in appraiseList.data" :key="index">
                <div class="card">
                    <van-row style="display: flex;align-items: center">
                        <van-col span="10" style="display: flex;align-items: center">
                            <img :src="item.headImageurl"  style="width: 34px;height: 34px;border-radius: 50%;margin-right: 15px;"/>
                            <span>{{item.nickName}}</span>
                        </van-col>
                        <van-col span="14" align="right">{{item.commentDate}}</van-col>
                    </van-row>
                    <div style="margin-top: 10px">
                       {{item.commentDetail}}
                    </div>
                </div>

            </div>
            </van-list>
        </div>


    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Divider,Button,List} from 'vant';

    import request from '../../utils/request'

    export default {
        name: "passengerDetails",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [List.name]: List
        },
        data(){
            return{
                title:"乘客详情",
                userInfo:{},
                appraiseList:{
                    data: [],
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                },
                loading: false,
                finished: false,
                appraiseTotal:""
            }
        },
        mounted(){
            this.initData();

            this.initAppraiseList();
        },

        methods:{
            onLoad() {
                if (this.appraiseList.total > this.appraiseList.data.length) {
                    this.appraiseList.pageNum += 1;
                    this.initAppraiseList();
                }

            },


            initAppraiseList(){
                let userId = this.$route.query.userId;
                request.sendGet({
                    url: "/user/center/evaluate/list/"+userId,
                    params: {
                        pageNum: this.appraiseList.pageNum,
                        pageSize: this.appraiseList.pageSize
                    }
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.appraiseList.total = res.data.total;
                        if(res.data.rows.length>0){
                            this.appraiseList.data=this.appraiseList.data.concat(res.data.rows);
                        }
                        this.appraiseTotal = res.data.total;
                    }
                })
            },


            initData(){
                let userId = this.$route.query.userId;
                request.sendGet({
                    url:"/sharecar/pass/passenger/"+ userId,
                    params:{}
                }).then(res =>{
                    this.userInfo = res.data.data;
                })
            },

            onClickLeft(){
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped>
    .userInfo{
        width: 85%;
        margin: 55px auto 15px;
        padding: 5px 10px;
        background: #FFFFFF;
    }

    .assess{
        padding: 10px 15px;
        background: #FFFFFF;
    }

    .card{
       padding: 10px;
        margin: 15px auto;
        border: 1px solid #ECECEC;
    }
</style>
