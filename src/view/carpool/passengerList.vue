<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div style="margin-bottom: 55px">
            <div class="black" v-for="(item,index) in passList" :key="index">
                <div>
                    <van-row style="display: flex;align-items: center" @click="goPassengerDetails(item.userId)">
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
                    <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"  />
                    <van-row v-if="item.passState == '0'">
                        <van-col span="6" offset="11">
                            <van-button type="default" color="#9E9E9E" size="mini" style="height: 34px;font-size: 14px;width: 100%" @click="confirmTrip(item,'2')">拒绝</van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" size="mini" style="height: 34px;font-size: 14px;width: 100%;margin-left: 10px" @click="confirmTrip(item,'1')">预约确定</van-button>
                        </van-col>
                    </van-row>

                    <van-row v-if="item.passState != '0'">

                        <van-col span="6" style="float: right">
                            <van-button type="default" :color="item.passState == '1'?'#0CC893':'#cacaca'" size="mini" style="height: 34px;font-size: 14px;width: 100%;margin-left: 10px">{{item.passState == '1'?'已确定':(item.passState == '2'?'已拒绝':'待确定')}}</van-button>
                        </van-col>

                        <van-col span="6" style="float: right;margin-right: 10px"  v-if="tripState=='1'">
                            <van-button type="default" @click="goPassengerAppraise(item.userId)" :color="item.passState == '1'?'#0CC893':'#cacaca'" size="mini" style="height: 34px;font-size: 14px;width: 100%;margin-left: 10px">评价乘客</van-button>
                        </van-col>
                    </van-row>
        </div>
    </div>
        </div>

        <div style="width: 100%">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Divider,Button,Dialog,Tabbar,TabbarItem,Toast} from 'vant';

    import avatar from "../../static/images/userAvatar.png"

    import request from '../../utils/request'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        name: "passengerList",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [Dialog.name]: Dialog,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [Toast.name]: Toast,
        },
        data(){
            return{
                active:"",
                title:"乘客列表",
                passList:[],
                defaultAvatar:avatar,
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                tripState:'',
                tripId:''
            }
        },
        mounted(){
            this.tripState = this.$route.query.tripState;
            this.tripId = this.$route.query.tripId;
            //初始化列表数据
            this.initPassList();

        },

        methods:{
            onClickLeft(){
                this.$router.back(-1);
            },
            //行车评价
            goPassengerAppraise(val) {
                let tripId =  this.tripId;
                this.$router.push({path: '/passengerAppraise', query: {tripId: tripId,userId:val}});
            },

            goPassengerDetails(val){
                this.$router.push({path:'/passengerDetails',query:{userId:val}});
            },
            initPassList(){
                //获取行程id
                let tripId =  this.tripId;

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
                                bookId:val.bookId,
                                state:flag,
                                tripId:val.tripId
                            }
                        }).then(res =>{
                            //刷新列表
                            if(res.data.code == '0'){
                                this.initPassList();
                                Toast.success(res.data.msg);
                            }
                        })
                    }).catch(() => {
                        //取消
                        debugger;
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
                                bookId:val.bookId,
                                state:flag,
                                tripId:val.tripId
                            }
                        }).then(res =>{
                            //刷新列表
                            if(res.data.code == '0'){
                                this.initPassList();
                                Toast.success(res.data.msg);
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
