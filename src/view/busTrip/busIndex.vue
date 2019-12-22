<template>
    <div class="contain">
        <div class="header">
            <Title :title="title" @onClickLeft="onClickLeft"></Title>
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
            <van-swipe :autoplay="3000" style="height: 200px">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <!--<img :src="image" width="100px" height="100px"/>-->
                    <div :style="{width: '100%',height: '100%',backgroundImage:'url('+image+')'}"></div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="notice">
            <van-notice-bar
                    color="#0BCA92"
                    background="#FFFFFF"
                    :left-icon="laba"
                    :scrollable="false"
                    :text="notice"
            >

            </van-notice-bar>
        </div>
        <div class="travel">
            <van-tabs v-model="header_active">
                <van-tab title="通勤班车">
                    <van-cell-group>
                        <van-field
                                v-model="strokeInfo.startPlace"
                                placeholder="出发地点"
                                label=""
                                label-width="5px"
                                :left-icon="greenBar"
                        />
                    </van-cell-group>
                    <van-divider style="width: 90%;margin: 0 auto"/>
                    <van-cell-group>
                        <van-field
                                v-model="strokeInfo.endPlace"
                                placeholder="目的地点"
                                label=""
                                label-width="5px"
                                :left-icon="redBar"
                        />
                    </van-cell-group>
                    <van-divider style="width: 90%;margin: 0 auto"/>
                    <div align="center" style="margin-bottom: 10px">
                        <van-button @click="goCarList" color="#0CC893" style="width: 95%">搜索</van-button>
                    </div>
                </van-tab>
                <van-tab title="旅游班车">
                    <van-cell-group>
                        <van-field
                                v-model="strokeInfo.startPlace"
                                placeholder="出发地点"
                                label=""
                                label-width="5px"
                                :left-icon="greenBar"
                        />
                    </van-cell-group>
                    <van-divider style="width: 90%;margin: 0 auto"/>
                    <van-cell-group>
                        <van-field
                                v-model="strokeInfo.endPlace"
                                placeholder="目的地点"
                                label=""
                                label-width="5px"
                                :left-icon="redBar"
                        />
                    </van-cell-group>
                    <van-divider style="width: 90%;margin: 0 auto"/>
                    <div align="center" style="margin-bottom: 10px">
                        <van-button @click="goCarList" color="#0CC893" style="width: 95%">搜索</van-button>
                    </div>
                </van-tab>
            </van-tabs>

        </div>

        <div class="listInfo">
            <div class="list-title">热门线路</div>
            <van-list
                    v-model="loading"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="onLoad"
                    :offset="10"
                    :immediate-check="false"
            >
                <div v-for="(item,index) in busTripList" :key="index" @click="linkBusDetail(item.busid)">
                    <div class="card">
                        <div style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;height: 45px;justify-content: space-between">
                            <span class="line">{{item.linename}}：{{item.startname}} →  {{item.endname}}</span>
                            <span class="list-price">￥{{item.ticketPrice}}</span>
                        </div>
                        <div style="display: flex;align-items: center;justify-content: space-between;height: 72px">
                            <div>
                                <div style="display: flex;height:35px;line-height: 35px">
                                    <div><img :src="blueTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">{{item.starttime}}</span></div>
                                    <div><img :src="blueTime" width="13px" height="13px"><span  style="margin-left: 7px;">{{item.startname}}</span></div>
                                </div>
                                <div style="display: flex;height:35px;line-height: 35px">
                                    <div><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">{{item.endtime}}</span></div>
                                    <div><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;">{{item.endname}}</span></div>
                                </div>
                            </div>
                            <div>
                                <van-button @click="" color="#0CC893" style="width: 66px;height: 37px;line-height: 37px;padding: 0">去抢票</van-button>
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>

        <div class="footer">
            <van-tabbar v-model="active" active-color="#FF0200" inactive-color="#FFFFFF">
                <van-tabbar-item :icon="car" to="/busList">预定班车</van-tabbar-item>
                <van-tabbar-item :icon="scan" to="/ticketList">乘车验票</van-tabbar-item>
                <van-tabbar-item :icon="user" to="/user">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import {
        NavBar,
        Row,
        Col,
        Image,
        Cell,
        CellGroup,
        Field,
        Divider,
        Button,
        Tabbar,
        Tab,
        Tabs,
        TabbarItem,
        Toast,
        NoticeBar,
        List,
        Swipe,
        SwipeItem
    } from 'vant';
    import logo from './../../static/images/logo.png'
    import laba from './../../static/images/laba.png'
    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'
    import car from './../../static/images/busTrip/car.png'
    import scan from './../../static/images/busTrip/scan.png'
    import chengK from './../../static/images/chengk.png'
    import user from './../../static/images/busTrip/user.png'
    import blueTime from './../../static/images/busTrip/blue_time.png'
    import redTime from './../../static/images/busTrip/red_time.png'

    import backOne from './../../static/images/backOne.jpg'
    import backTwo from './../../static/images/backTwo.jpg'

    import request from '../../utils/request'
    import moment from 'moment'

    import Title from './../../components/header'

    export default {
        components: {
            Title,
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [NoticeBar.name]: NoticeBar,
            [Col.name]: Col,
            [Image.name]: Image,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Divider.name]: Divider,
            [Button.name]: Button,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [Toast.name]: Toast,
            [List.name]: List,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem
        },
        data() {
            return {
                notice:"",
                images: [
                    backOne,
                    backTwo
                ],
                title:"绿色班车",
                header_active: 0,
                error: false,
                loading: false,
                logo: logo,
                laba: laba,
                greenBar: greenBar,
                redBar: redBar,
                chengK: chengK,
                car: car,
                scan: scan,
                blueTime: blueTime,
                redTime: redTime,
                user: user,
                active: 0,
                strokeInfo: {
                    startPlace: "",
                    endPlace: "",
                    driveTime: "",
                    week: ""
                },
                busTripList:[]
            }
        },
        mounted() {
            //初始化列表
            this.initListData();

            this.initNotice();

            this.initAdvList();
        },
        methods: {
            //广告位
            initAdvList(){
                //1-拼车 2-班车 3-班车验票
                let positionId = 2;
                request.sendGet({
                    url:"/common/advertlist/"+ positionId,
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.images = res.data.rows;
                    }
                })
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

            //列表
            initListData() {
                request.sendGet({
                    url:"/bus/list",
                    params:{
                        pageNum:"1",
                        pageSize:"10",
                        //1-通勤 2-旅游
                        type:"1"
                    }
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.busTripList = this.busTripList.concat(res.data.rows);
                    }
                })
            },

            linkBusDetail(val){
                this.$router.push({path:"/busDetail",query:{busid:val}})
            },

            cancel() {
                this.showPop = false
            },

            async onLoad() {
                console.log(1111);
            },

            onClickLeft() {
                // Toast('返回');
                this.$router.back(-1);
            },
            goCarList() {
                if (!this.strokeInfo.startPlace) {
                    Toast.fail("请填写出发地点");
                    return;
                }
                if (!this.strokeInfo.endPlace) {
                    Toast.fail("请填写目的地点");
                    return;
                }
                this.$router.push({path: '/resultList',query:{
                        startPlace:this.strokeInfo.startPlace,
                        endPlace:this.strokeInfo.endPlace,
                        type:this.header_active
                    }});
            },
        },
        created() {
        },
    }
</script>

<style scoped>
    /deep/ .van-tabs__line {
        background-color: #0CC893;
    }

    /deep/ .van-tab {
        color: #202020;
    }

    /deep/ .van-tab--active {
        color: #0CC893;
    }

    .van-nav-bar {
        position: relative;
        height: 46px;
        line-height: 46px;
        text-align: center;
        background-color: transparent;
        -webkit-user-select: none;
        user-select: none;
    }

    .van-hairline--bottom::after {
        border-bottom-width: 0px;
    }

    .van-icon-arrow-left {
        color: #fff;
    }

    .van-nav-bar__title {
        max-width: 60%;
        margin: 0 auto;
        color: #fff;
        font-weight: 500;
        font-size: 16px;
    }

    .contain {
        background: #F6F6F6;
        overflow-x: hidden;
    }

    .list-title {
        height: 45px;
        line-height: 45px;
        width: 90%;
        margin: auto;
        font-weight: bold;
        font-size: 16px;
        color: #202020
    }

    .logo {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header {
        /*background-image: linear-gradient(49deg, #05CF8A, #5C77FE);*/
        /*opacity: 1;*/
    }

    .tag {
        color: #fff;
    }

    .travel {
        background: #fff;
        border: 1px solid #f1f1f1;
    }

    .listInfo {
        margin-bottom: 60px;
    }

    .listInfo .card {
        width: 90%;
        margin: 0 auto;
        font-size: 14px;
        padding: 0 5px;
        margin-bottom: 10px;
        background: #fff;
        border-radius: 5px;
    }

    .line {
             color: #5083ED;
             font-size: 14px;
             font-weight: bold;
         }


    .list-price {
        font-weight: bold;
        font-size: 22px;
        color: #FF0200;
    }

    .footer {
        width: 100%;
    }

    .van-tabbar {
        background: #5083ED;
    }
</style>
