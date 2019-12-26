<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div style="margin-top: 46px">
            <div class="black" v-for="(item,index) in passList" :key="index">
                <div @click="goPassengerDetails(item.userId)">
                    <van-row style="display: flex;align-items: center">
                        <van-col span="14" >
                            <div style="display: flex;align-items: center">
                                <img :src="item.headimgurl?item.headimgurl:defaultAvatar" style="height: 50px;width: 50px;margin-right: 10px">
                                <div>
                                    <p style="margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">{{item.nickname}}</span> <img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="item.sex == '1'"><img src="./../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px" v-else> </p>
                                    <p style="margin: 5px 0">
                                        <img src="./../../static/images/xin.png" style="width: 14px;height: 14px;margin-right: 5px"/><span>{{item.goodCount}}</span>
                                        <img src="./../../static/images/unhapply.png" style="width: 14px;height: 14px;margin: 0 5px 0 20px" /> <span>{{item.badCount}}</span>
                                    </p>
                                    <p style="margin: 5px 0">
                                        <span style="color: #5E5E5E">乘车地点：{{item.startPlace}}</span>
                                    </p>
                                </div>
                            </div>
                        </van-col>
                        <van-col span="10" align="right">
                            <div><div class="userType" v-if="item.tag == '0'">乘客</div></div>
                            <div style="color: #5E5E5E;margin: 5px 0">乘坐过 {{item.passCount}} 次</div>
                            <div><div style="color: #5E5E5E">下车地点：{{item.endPlace}}</div></div>
                        </van-col>
                    </van-row>
                    <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false" />
                    <van-row>
                        <van-col span="6" offset="11">
                            <van-button type="default" color="#9E9E9E" size="mini" style="height: 34px;font-size: 14px;width: 100%" @click="confirmTrip(item,'1')">拒绝</van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" size="mini" style="height: 34px;font-size: 14px;width: 100%;margin-left: 10px" @click="confirmTrip(item,'2')">预约确定</van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Divider,Button,Dialog} from 'vant';

    import avatar from "../../static/images/userAvatar.png"

    import request from '../../utils/request'

    export default {
        name: "passengerList",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [Dialog.name]: Dialog,
        },
        data(){
            return{
                title:"乘客列表",
                passList:[],
                defaultAvatar:avatar
            }
        },
        mounted(){
            //初始化列表数据
            this.initPassList();
        },

        methods:{
            onClickLeft(){
                this.$router.back(-1);
            },
            goPassengerDetails(val){
                this.$router.push({path:'/passengerDetails',query:{userId:val}});
            },
            initPassList(){
                //获取行程id
                let tripId = this.$route.query.tripId;

                request.sendGet({
                    url:"/sharecar/trip/passlist/"+tripId,
                    params: {}
                }).then(res =>{
                    if(res.data.code==0){
                        this.passList = res.data.rows;
                    }
                })
            },

            confirmTrip(val,flag){
                //1-确认 2-拒绝
                if(flag == '1'){
                    Dialog.confirm({
                        title: '预约确定',
                        message: '同意该乘客预约！'
                    }).then(() => {
                        // 确定
                        request.sendPost({
                            url:'/sharecar/trip/confirm',
                            params:{
                                bookId:item.bookId,
                                state:flag,
                                tripId:item.tripId
                            }
                        }).then(res =>{
                            //刷新列表
                            if(res.data.code == '0'){
                                this.initPassList();
                            }
                        })
                    }).catch(() => {
                        //取消

                    });
                }else {
                    Dialog.confirm({
                        title: '拒绝确定',
                        message: '是否拒绝该乘客乘车？'
                    }).then(() => {
                        // 确定
                        request.sendPost({
                            url:'/sharecar/trip/confirm',
                            params:{
                                bookId:item.bookId,
                                state:flag,
                                tripId:item.tripId
                            }
                        }).then(res =>{
                            //刷新列表
                            if(res.data.code == '0'){
                                this.initPassList();
                            }
                        })
                    }).catch(() => {
                        //取消

                    });
                }
            }
        }
    }
</script>

<style scoped>

    .black{
        width: 90%;
        margin: 10px auto;
        padding: 5px 10px 10px 5px;
        background: #FFFFFF;
        font-size: 14px;
    }

    .userType{
        width: fit-content;
        padding: 2px 8px;
        border-radius: 5px;
        color: #FFFFFF;
        background: #0CC893;
    }

    .removeTag{
        width: fit-content;
        padding: 2px 8px;
        margin-top: 10px;
        color: #0CC893;
        border-radius: 5px;
        border: 1px solid #0CC893;
    }
</style>
