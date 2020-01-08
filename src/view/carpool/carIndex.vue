<template>
    <div class="contain">
        <div class="header">
            <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
            <!--<van-row type="flex" justify="center" gutter="30">-->
                <!--<van-col span="6">-->
                    <!--<div class="logo">-->
                        <!--<van-image-->
                                <!--width="60"-->
                                <!--height="60"-->
                                <!--:src="logo"-->
                        <!--/>-->
                    <!--</div>-->
                <!--</van-col>-->
                <!--<van-col span="15">-->
                    <!--<div class="tag">-->
                        <!--<h3>昌坤出行</h3>-->
                        <!--<p>让你省心、安心、放心！</p>-->
                    <!--</div>-->
                <!--</van-col>-->
            <!--</van-row>-->
            <van-swipe :autoplay="3000" style="height: 200px;margin-top: 0px">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <!--<img :src="image" width="100px" height="100px"/>-->
                    <div :style="{width: '100%',height: '100%',backgroundImage:'url('+image+')'}"></div>
                </van-swipe-item>
            </van-swipe>


        </div>
        <div class="notice">
            <div>
                <van-notice-bar
                        color="#0BCA92"
                        background="#FFFFFF"
                        :left-icon="laba"
                        :scrollable="true"
                        :text="notice"
                >
                </van-notice-bar>
            </div>
        </div>
        <div class="travel">
            <van-cell title="常用路线选择:" is-link title-style="color:#0CC893" :value="strokeInfo.lineName" @click="openDefaultLine" />
            <!--<van-cell-group>-->
                <!--<van-field-->
                        <!--v-model="strokeInfo.startPlace"-->
                        <!--placeholder="出发地点"-->
                        <!--label=""-->
                        <!--label-width="5px"-->
                        <!--:left-icon="greenBar"-->
                <!--/>-->
            <!--</van-cell-group>-->
            <van-cell-group >
                <van-field
                        v-model="strokeInfo.startDate"
                        placeholder="开始时间"
                        label=""
                        label-width="5px"
                        :left-icon="greenBar"
                        disabled
                        @click="()=>{showPop = true;flag = '0'}"
                />
            </van-cell-group>
            <van-divider style="width: 90%;margin: 0 auto" />
            <!--<van-cell-group >-->
                <!--<van-field-->
                        <!--v-model="strokeInfo.endPlace"-->
                        <!--placeholder="目的地点"-->
                        <!--label=""-->
                        <!--label-width="5px"-->
                        <!--:left-icon="redBar"-->
                <!--/>-->
            <!--</van-cell-group>-->
            <van-cell-group >
                <van-field
                        v-model="strokeInfo.endDate"
                        placeholder="下车时间"
                        label=""
                        label-width="5px"
                        :left-icon="redBar"
                        disabled
                        @click="()=>{showPop = true;flag = '1'}"
                />
            </van-cell-group>
            <!--<van-divider  style="width: 90%;margin: 0 auto"/>-->
            <!--<van-cell-group >-->
                <!--<van-field-->
                        <!--v-model="strokeInfo.driveTime"-->
                        <!--placeholder="乘车时间"-->
                        <!--label=""-->
                        <!--label-width="5px"-->
                        <!--:left-icon="timeBar"-->
                        <!--disabled-->
                        <!--@click="showPop = true"-->
                <!--/>-->
            <!--</van-cell-group>-->
            <div align="center" style="margin-bottom: 10px">
                <van-button @click="goCarList"  color="#0CC893" style="width: 95%">立即找车</van-button>
            </div>
        </div>

        <div class="listInfo">
            <!--<van-list-->
                    <!--v-model="loading"-->
                    <!--:error.sync="error"-->
                    <!--error-text="请求失败，点击重新加载"-->
                    <!--@load="onLoad"-->
                    <!--:offset="10"-->
                    <!--:immediate-check="false"-->
            <!--&gt;-->

            <div v-for="(item,index) in newTripList" :key="index">
                <div class="card" @click="linkLineDetails(item.tripId)">
                    <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;padding: 8px 2px;">
                        <van-col span="16">
                            <span class="datetime">{{item.tripDate}}</span>
                        </van-col>
                        <van-col span="8" style="text-align: right">
                            <span>座位:</span>
                            <span class="seatNum">{{item.totalSeats}}个</span>
                        </van-col>
                    </van-row>
                    <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;">
                        <van-col span="16">
                            <p class="datetime"><i class="greenBar"></i>{{item.startPlace}}</p>
                            <p class="datetime"><i class="redBar"></i>{{item.endPlace}}</p>
                        </van-col>
                        <van-col span="8" style="text-align: right">
                            <div class="price">￥{{item.tripPrice}}</div>
                        </van-col>
                    </van-row>
                    <van-row style="padding: 0px 2px;display: flex;align-items: center;">
                        <van-col span="6">
                            <van-image
                                    width="60"
                                    height="60"
                                    :src="listImg"
                            />
                        </van-col>
                        <van-col span="10">
                            <p style="display: flex;align-items: center"><span style="color: #5083ED">【车主】</span> {{item.nickname}} <img src="../../static/images/sexTag.png" style="width: 13px;height: 13px;display: inline-block;margin-left: 5px" v-if="item.sex == '1'"><img src="../../static/images/man.png" style="width: 13px;height: 13px;display: inline-block;margin-left: 5px" v-else></p>
                            <p><span>【车型】</span>{{item.carNumber}}</p>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <!--</van-list>-->
        </div>


        <div class="footer">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF" style="background:#5083ED ">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>

        <van-popup
                v-model="showPop"
                position="bottom"
                :style="{ height: '30%' }"
        >
            <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    :visible-item-count="3"
                    @cancel="cancel"
                    @confirm="changeTimer"
            />
        </van-popup>

        <van-popup
                v-model="showLinePop"
                position="bottom"
                :style="{ height: '30%' }"
        >
            <van-picker
                    show-toolbar
                    title=""
                    :visible-item-count="3"
                    :columns="columns"
                    @cancel="showLinePop = false"
                    @confirm="changeDefaultLine"
            />
        </van-popup>
    </div>
</template>

<script>
    import {NavBar,Row,Col,Image,NoticeBar,Cell,CellGroup,Field,Divider,Button,Card,Tabbar, TabbarItem,Toast ,DatetimePicker,Popup,List,Picker ,Swipe, SwipeItem } from 'vant';
    import Title from './../../components/header'
    import logo from './../../static/images/logo.png'
    import laba from './../../static/images/laba.png'
    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'
    import timeBar from './../../static/images/timer.png'
    import listImg from './../../static/images/listImg.png'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'
    import backOne from './../../static/images/backOne.jpg'
    import backTwo from './../../static/images/backTwo.jpg'

    import request from '../../utils/request'
    import moment from 'moment'


    export default {
        name: "carIndex",
        components: {
            Title,
            [NavBar.name]:NavBar,
            [Row.name]:Row,
            [Col.name]:Col,
            [Image.name]:Image,
            [NoticeBar.name]:NoticeBar,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Field.name]:Field,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [Card.name]:Card,
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem,
            [Toast.name]:Toast,
            [DatetimePicker.name]:DatetimePicker,
            [Popup.name]:Popup,
            [List.name]:List,
            [Picker.name]:Picker,
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem,
        },
        data(){
            return{
                title:"共享拼车",
                images: [
                    backOne,
                    backTwo
                ],
                newTripList:[],
                flag:"0",
                notice:"",
                columns:[],
                lineList:[],
                showLinePop:false,
                error: false,
                loading: false,
                minDate: new Date(),
                currentDate:"",
                showPop:false,
                logo:logo,
                laba:laba,
                greenBar:greenBar,
                redBar:redBar,
                timeBar:timeBar,
                listImg:listImg,
                chengK:chengK,
                xingC:xingC,
                push:push,
                person:person,
                active: 0,
                strokeInfo:{
                    startPlace:"",
                    endPlace:"",
                    driveTime:"",
                    week:"",
                    startDate:"",
                    endDate:"",
                    lineId:"",
                    lineName:""
                }
            }
        },
        mounted(){
            //初始化列表
            this.initListData();

            this.initNotice();

            this.initAdvList();
            this.initLineData();
        },
        methods: {
            //详情
            linkLineDetails(val){
                this.$router.push({path:"/lineDetails",query:{tripId:val}})
            },

            //通知
            initNotice(){
                request.sendGet({
                    url:"/common/notice/list",
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        let list = res.data.data;
                        list.forEach(e =>{
                           this.notice += e.title+"       ";

                        });
                    }
                })

            },

            //广告位
            initAdvList(){
                //1-拼车 2-班车 3-班车验票
                let positionId = 1;
                request.sendGet({
                    url:"/common/advertlist/"+ positionId,
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.images = res.data.rows;
                    }
                })
            },

            //常用线路
            changeDefaultLine(val){
                this.lineList.forEach(e =>{
                    if(e.lineName == val){
                        let arr = [];
                        arr = e.lineName.split("--");
                        this.strokeInfo.startPlace = arr[0];
                        this.strokeInfo.endPlace = arr[1];
                        this.strokeInfo.lineId = e.lineId;
                        this.strokeInfo.lineName = e.lineName;
                    }
                });
                this.showLinePop = false;
            },

            openDefaultLine(){
                this.showLinePop = true;
            },
            initLineData(){
                    request.sendGet({
                        url:"/user/center/linelist",
                        params:{}
                    }).then(res =>{
                        if(res.data.code === 0){
                            //处理数据
                            this.lineList = res.data.rows;
                            this.columns = [];
                            this.lineList.forEach(e =>{
                                this.columns.push(e.lineName);
                                if(e.isDefault === 1){
                                    let arr = [];
                                    arr = e.lineName.split("--");
                                    this.strokeInfo.startPlace = arr[0];
                                    this.strokeInfo.endPlace = arr[1];
                                    this.strokeInfo.lineId = e.lineId;
                                    this.strokeInfo.lineName = e.lineName;
                                }
                            });
                        }
                    });
            },

            //列表
            initListData(){
                request.sendGet({
                    url:"/sharecar/pass/newtrips",
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.newTripList = res.data.rows;
                    }
                })
            },

            cancel(){
                this.showPop = false
            },

            changeTimer(val){
                // let timer = this.formatTime(val.getTime());
                //
                // this.stroke.startDate = timer;
                var timer = moment(val).format("YYYY-MM-DD HH:mm");
                // this.strokeInfo.driveTime = timer;
                if(this.flag == '0'){
                    this.strokeInfo.startDate = timer;
                    let week = moment(val).format('d');
                    this.strokeInfo.week = week;
                }else {
                    this.strokeInfo.endDate = timer;
                }
                this.showPop = false;
            },

            async  onLoad() {

            },

            onClickLeft() {
                // Toast('返回');
                this.$router.back(-1);
            },
            goCarList(){
                console.log(this.strokeInfo)
                // if(!this.strokeInfo.startPlace){
                //     Toast.fail("请填写出发地点");
                //     return;
                // }
                // if(!this.strokeInfo.endPlace){
                //     Toast.fail("请填写目的地点");
                //     return;
                // }
                // if(!this.strokeInfo.driveTime){
                //     Toast.fail("请填写乘车时间");
                //     return;
                // }
                if(!this.strokeInfo.startDate){
                    Toast.fail("请填写开始时间");
                    return;
                }
                if(!this.strokeInfo.endDate){
                    Toast.fail("请填写结束时间");
                    return;
                }
                if(!this.strokeInfo.lineId){
                    Toast.fail("请选择路线");
                    return;
                }
                console.log(this.strokeInfo);
                sessionStorage.removeItem("queryStroke");
                sessionStorage.setItem("queryStroke",JSON.stringify(this.strokeInfo));
                this.$router.push({path:'/carLine'});
            }
        },

    }
</script>

<style scoped>

    /*.van-nav-bar {*/
        /*position: relative;*/
        /*height: 46px;*/
        /*line-height: 46px;*/
        /*text-align: center;*/
        /*background-color:transparent;*/
        /*-webkit-user-select: none;*/
        /*user-select: none;*/
    /*}*/
    /*.van-hairline--bottom::after {*/
        /*border-bottom-width: 0px;*/
    /*}*/

    /*.van-icon-arrow-left{*/
        /*color: #fff;*/
    /*}*/

    /*.van-nav-bar__title {*/
        /*max-width: 60%;*/
        /*margin: 0 auto;*/
        /*color: #fff;*/
        /*font-weight: 500;*/
        /*font-size: 16px;*/
    /*}*/

    .contain{
        background: #F6F6F6;
        overflow-x: hidden;
    }

    .notice{
        background: #FFFFFF;

    }

    .logo{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header{
        /*background-image: linear-gradient(49deg, #05CF8A, #5C77FE);*/
        /*opacity:1;*/
    }

    .tag {
        color: #fff;
    }

    .travel{
        background: #fff;
        margin-bottom: 10px;
        border: 1px solid #f1f1f1;
    }
    .listInfo{
        margin-bottom: 60px;
        height: 300px;
    }

    .listInfo .card{
        width: 90%;
        margin: 0 auto;
        font-size: 14px;
        padding: 10px 5px;
        margin-bottom: 10px;
        background: #fff;
        border-radius: 5px;
    }

    .datetime{
        color: #5E5E5E;
        padding-left: 8px ;
    }

    .seatNum{
        font-weight: bold;
        margin-left: 8px;
    }

    .greenBar{
        border-radius: 50%;
        background: rgb(12, 200, 147);
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: 5px;
    }

    .redBar{
        border-radius: 50%;
        background: rgb(255, 42, 35);
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: 5px;
    }

    .price{
        height: 100%;
        width: 100%;
        font-size: 22px;
        color: red;
    }

    .footer{
        width: 100%;
    }



    .van-cell__value{
        text-align: left;
    }

</style>
