<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->

        <div style="margin-top: 0px;padding: 15px 0px;position: relative;">
            <div class="userInfo">
                <van-row>
                    <van-col span="16">{{tripDetails.tripDate}}</van-col>
                    <van-col span="8" align="right">已完成</van-col>
                </van-row>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
                <van-row style="display: flex;align-items: center;font-size: 14px">
                    <van-col span="24">
                        <div style="display: flex;align-items: center">
                            <van-image
                                    round
                                    fit="cover"
                                    width="60"
                                    height="60"
                                    :src="tripDetails.headImageurl"
                            />
                            <div style="width: 100%">
                                <p style="margin: 5px 0">
                                    <span style="color: #5E5E5E;font-weight: bold">{{tripDetails.nickName}}</span>

                                    <img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="tripDetails.sex == '1'">
                                    <img src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px" v-else>
                                </p>
                                <p style="margin: 5px 0;">
                                    <van-row>
                                        <van-col span="12" style="display: flex;align-items: center">
                                            <img src="../../static/images/userInfo.png"
                                                 style="width: 14px;height: 16px;margin-right: 5px"/><span
                                                style="font-size: 14px;color: #5E5E5E">{{tripDetails.nickName}}</span>
                                        </van-col>
                                        <van-col span="12">
                                            <img src="./../../static/images/tel.png" style="width: 14px"/><span
                                                style="font-size: 14px;color: #5E5E5E">{{tripDetails.phone}}</span>
                                        </van-col>
                                    </van-row>
                                </p>
                                <p style="margin: 5px 0">
                                    <van-row>
                                        <van-col span="12">
                                            <span style="color: #FFFFFF;border-radius: 2px;padding: 0px 5px;background-color: #5083ED;margin-right: 10px">{{tripDetails.carNumber}}</span>
                                        </van-col>
                                        <van-col span="12" style="display: flex;align-items: center"><img
                                                src="./../../static/images/car.png"
                                                style="width: 18px;height: 18px"/><span
                                                style="font-size: 14px;color: #5E5E5E">{{tripDetails.carName}}</span></van-col>
                                    </van-row>
                                </p>
                                <p style="margin: 5px 0;">
                                    <van-row>
                                        <van-col span="12">
                                            <div><i class="startTag"></i>发车地点:{{tripDetails.startPlace}}</div>
                                        </van-col>
                                        <van-col span="12" style="display: flex;align-items: center">
                                            <div><i class="endTag"></i>目的地:{{tripDetails.endPlace}}</div>
                                        </van-col>
                                    </van-row>
                                </p>
                            </div>
                        </div>
                    </van-col>
                </van-row>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>

                <div>
                    <div style="margin-bottom: 10px"><span style="font-weight: bold">路线：</span><span>{{tripDetails.tripLine}}</span>
                    </div>
                    <div style="margin-bottom: 10px"><span style="font-weight: bold">座位数：</span><span>1位（{{tripDetails.tripPrice}}元）</span>
                    </div>
                    <div style="margin-bottom: 10px" v-for="(pass,index) in passList" :key="index"><span style="font-weight: bold">乘车人：</span><span>{{pass.nickname}}</span></div>
                    <div style="margin-bottom: 10px" v-if="passList.length == '0'"><span style="font-weight: bold">乘车人：</span><span>暂无</span></div>
                </div>
                <!--<van-row>-->
                <!--<van-col span="4" align="right">路线:</van-col>-->
                <!--<van-col span="20">上河湾出发，李各庄，康居，果园，少年宫，万象汇，京城高速，芍药居，西坝河，东直门重点。</van-col>-->
                <!--</van-row>-->
            </div>
            <!--<div style="width: 100%;height: 100%;position: absolute;top: 0;background:rgba(0, 0, 0, 0.3);"></div>-->
        </div>
        <div class="assess" align="right">
            <van-button type="default" :color="isFollow == '0'?'#0CC893':'#9E9E9E'"
                        style="font-size: 14px;margin-bottom: 10px;height: 28px;width: 72px;border-radius: 5px"
                        size="mini" @click="followUser">
                {{isFollow=='0'?'关注':'已关注'}}
            </van-button>
            <van-button type="default" color="#0CC893" @click="addBlackList"
                        style="font-size: 14px;margin-bottom: 10px;height: 28px;width: 72px;border-radius: 5px"
                        size="mini">黑名单
            </van-button>
            <van-button type="default" color="#0CC893"
                        style="font-size: 14px;margin-bottom: 10px;height: 28px;width: 72px;border-radius: 5px"
                        size="mini" @click="linkComplain">投诉
            </van-button>
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
    import {Row,Image, Col, Divider, Button, Rate, Tag, Field, CellGroup,Tabbar, TabbarItem} from 'vant';

    import request from '../../utils/request'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        name: "otherOpt",
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Image.name]:Image,
            [Divider.name]: Divider,
            [Button.name]: Button,
            [Rate.name]: Rate,
            [Tag.name]: Tag,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active:"",
                title: "其他操作",
                isFollow: "0",
                tag:'2',
                tripDetails:{},
                passList:[],
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person
            }
        },
        methods: {
            //跳转投诉页面
            linkComplain(){
                let tripId = this.$route.query.tripId;
                this.$router.push({path:"complain-passenger",query:{userId:this.tripDetails.driverId,tripId:tripId}});
            },

            onClickLeft() {

            },
            //加入黑名单
            addBlackList() {
                request.sendPost({
                    url: '/user/center/blackadd',
                    params: {
                        blackuserId:this.tripDetails.driverId,
                        tag:this.tag,//用户标签：1 乘客 2 车主
                    }
                }).then((res)=>{
                    if (res.data.code === 0) {
                        this.$toast.success("加入黑名单成功");
                    }else {
                        this.$toast.fail(res.data.msg);
                    }
                })
            },
            //详情
            initData(){
                let tripId = this.$route.query.tripId;
                request.sendGet({
                    url:"/sharecar/pass/tripdetail/"+tripId,
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.tripDetails = res.data.data.driverinfo;

                        let tripInfo = res.data.data.tripInfo;
                        this.tripDetails.tripDate = tripInfo.tripDate;
                        this.tripDetails.tripLine = tripInfo.tripLine;
                        this.tripDetails.startPlace = tripInfo.startPlace;
                        this.tripDetails.endPlace = tripInfo.endPlace;
                        this.tripDetails.tripPrice = tripInfo.tripPrice;

                        //乘车人

                    }
                });

                request.sendGet({
                    url:"/sharecar/trip/passlist/"+tripId,
                    params: {}
                }).then(res =>{
                    if(res.data.code==0){
                        this.passList = res.data.rows;

                        console.log(this.passList)
                    }else{
                        //接口错误

                    }
                })

            },

            followUser() {
                if (this.isFollow == '0') {
                    //关注
                    request.sendPost({
                        url: "/user/center/follow",
                        params: {
                            followerId: this.tripDetails.driverId
                        }
                    }).then(res => {
                        if (res.data.code == '0') {
                            // this.isFollow = '1'
                            this.$toast.success("关注成功");
                        }else {
                            this.$toast.fail(res.data.msg)
                        }
                    })

                } else {
                    //取消关注
                    this.isFollow = '0'
                }
            }
        },
        created(){
            this.initData()
            // this.tag = this.$route.query.tag;
        }
    }
</script>

<style scoped>
    .userInfo {
        width: 85%;
        margin: 0px auto;
        padding: 5px 10px;
        background: #FFFFFF;
        font-size: 14px;
    }

    /deep/ .van-cell {
        padding: 0;
    }

    .assess {
        padding: 10px 15px;
        background: #FFFFFF;
    }

    .card {
        padding: 10px;
        margin: 15px auto;
        border: 1px solid #ECECEC;
    }

    .assessTag {
        margin: 15px auto 55px;
    }

    .tagStyle {
        margin: 0.4rem 0.5rem;
    }

    .startTag {
        width: 10px;
        display: inline-block;
        height: 10px;
        background: #0CC893;
        border-radius: 50%;
        margin-right: 5px;
    }

    .endTag {
        width: 10px;
        display: inline-block;
        height: 10px;
        background: #FF0200;
        border-radius: 50%;
        margin-right: 5px;
    }
</style>

