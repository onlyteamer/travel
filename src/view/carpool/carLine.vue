<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="dateTag">
            <van-tabs type="card" v-model="active" :swipe-threshold="7" background="#FFFFFF" color="#5083ED"
                      title-active-color="#FFFFFF" title-inactive-color="#202020">
                <van-tab title="周日"></van-tab>
                <van-tab title="周一"></van-tab>
                <van-tab title="周二"></van-tab>
                <van-tab title="周三"></van-tab>
                <van-tab title="周四"></van-tab>
                <van-tab title="周五"></van-tab>
                <van-tab title="周六"></van-tab>
            </van-tabs>

            <div class="placeTab">
                <van-tabs type="card" color="#0CC893" title-active-color="#FFFFFF" title-inactive-color="#0CC893">
                    <van-tab title="全部"></van-tab>
                    <van-tab :title="'去'+startPlace"></van-tab>
                    <van-tab :title="'去'+endPlace"></van-tab>
                </van-tabs>
            </div>
        </div>


        <div class="content">
            <van-list
                    :offset="10"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
            >
                <div v-for="(item,index) in dataMain.data" :key="item.id">
                    <div class="carBar">
                        <div @click="linkStrokeDetails(item.tripId)">
                        <van-row>
                            <van-col span="6">
                                <div style="display: flex;align-items: center;"><i
                                        style="width: 8px;height:8px;border-radius: 50%;background: #0CC893;margin-right: 5px"></i><span>{{item.startPlace}}</span>
                                </div>

                            </van-col>
                            <van-col span="12">
                                <div style="text-align: center;color: #FF0200">{{item.tripDateTime}}</div>
                            </van-col>
                            <van-col span="6">
                                <div style="align-items: center;text-align: right"><i
                                        style="width: 8px;height:8px;border-radius: 50%;display:inline-block;background: #FF0200;margin-right: 5px"></i><span>{{item.endPlace}}</span>
                                </div>
                            </van-col>
                        </van-row>
                        <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }"/>
                        <van-row style="display: flex;align-items: center;">
                            <van-col span="20">
                                <div style="display: flex;align-items: center">
                                    <img src="../../static/images/userAvatar.png" style="height: 44px;width: 44px">
                                    <div>
                                        <p style="font-size: 14px;margin: 5px 0"><span
                                                style="color: #5083ED;font-weight: bold">【车主】</span><span
                                                style="color: #5E5E5E">{{item.nickname}}</span>
                                            <img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="item.sex == '1'">
                                            <img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-else>
                                            <span class="collect"><img src="./../../static/images/xin.png"
                                                                       style="width: 14px">{{item.goodCount}}</span></p>
                                        <p style="font-size: 14px;margin: 5px 0"><span
                                                style="color: #202020;font-weight: bold">【车型】</span><span
                                                style="color: #5E5E5E">{{item.carName}}</span></p>
                                    </div>
                                </div>
                            </van-col>
                            <van-col span="4">
                                <div style="">￥{{item.tripPrice}}</div>
                            </van-col>
                        </van-row>
                        <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }"/>
                        <van-row style="color: #202020;font-weight: bold;font-size: 14px">
                            <van-col span="6">
                                <div>剩余座位:</div>
                            </van-col>
                            <van-col span="18">
                                <div>{{item.totalSeats-item.bookSeats}}</div>
                            </van-col>
                        </van-row>
                        </div>
                        <van-row style="color: #202020;font-weight: bold;font-size: 14px;margin: 10px 0">
                            <van-col span="8">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 95%;height: 34px"
                                            size="mini">分享
                                </van-button>
                            </van-col>
                            <van-col span="8">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 95%;height: 34px"
                                            size="mini" @click="showMobile(item.driverPhone)">电话
                                </van-button>
                            </van-col>
                            <van-col span="8">
                                <van-button type="default" @click="goDeclare(item.tripId)" color="#0CC893"
                                            style="font-size: 14px;width: 95%;height: 34px" size="mini">马上预约
                                </van-button>
                            </van-col>
                        </van-row>

                    </div>
                </div>
            </van-list>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Tab, Tabs, Divider, Row, Col, Button,List,Dialog} from 'vant';
    import request from "../../utils/request";

    export default {
        name: "carLine",
        components: {
            Title,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Divider.name]: Divider,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [List.name]:List,
            [Dialog.name]:Dialog
        },
        data() {
            return {
                title: "线路：北京←→密云",
                active: 1,
                isOneHttp: true,
                loading: false,
                finished: false,
                startPlace:"",
                endPlace:"",
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },

                lineInfo:{

                }
            }
        },
        mounted() {
            let info = JSON.parse(sessionStorage.getItem("queryStroke"));
            this.lineInfo = info;
            this.title = "线路："+ info.lineName;
            this.startPlace = info.startPlace;
            this.endPlace = info.endPlace;
            this.active = Number(info.week);

            this.initData();
        },

        methods: {

            //手机号
            showMobile(val){
                let mobile = "";
                if(val){
                    mobile = val;
                }

                Dialog.alert({
                    message: '手机号:'+mobile
                }).then(() => {
                    // on close
                });
            },

            //跳转详情页
            linkStrokeDetails(tripId){
                this.$router.push({path:"/lineDetails",query:{tripId:tripId}})
            },

            onClickLeft() {
                this.$router.back(-1);
            },
            goDeclare(id) {
                //车辆预约
                this.$router.push({path: '/declare',query:{id:id}});
            },
            onLoad() {
                if (this.dataMain.total > this.dataMain.data.length) {
                    this.dataMain.pageNum += 1;
                    this.initData();
                }
            },
            initData() {
                request.sendGet({
                    url:"/sharecar/pass/select/"+ this.lineInfo.lineId,
                    params: {
                        startDate:this.lineInfo.startDate,
                        endDate:this.lineInfo.endDate,
                        lineId:this.lineInfo.lineId,
                        pageNum:"1",
                        pageSize:"100"
                    }
                    // url: '/sharecar/trip/list',
                    // params: {
                    //     pageSize: this.dataMain.pageSize,
                    //     pageNum: this.dataMain.pageNum,
                    // }
                }).then((res) => {
                    this.dataMain.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.isOneHttp) {
                        this.dataMain.data = res.data.rows;
                        this.isOneHttp = false;
                    } else {
                        this.dataMain.data = this.dataMain.data.concat(res.data.rows);
                    }

                    if (this.dataMain.total === this.dataMain.data.length) {
                        this.finished = true;
                    }
                    this.loading = false;
                });
            },
        },
        created() {

        }
    }
</script>

<style scoped>
    body {
        background: #FFFFFF;
    }

    .contain {

    }

    .content {
        margin-top: 130px;

    }

    .dateTag {
        top: 48px;
        width: 100%;
        position: fixed;
        z-index: 999;
        background-color: #F6F6F6;
    }

    .placeTab {
        margin: 13px auto;
        width: 90%;
    }

    .carBar {
        width: 90%;
        margin: 0 auto;
    }

    .collect {
        display: inline-block;
        padding: 0 5px;
        margin-left: 25px;
        border: 1px solid #CFCFCF;
        border-radius: 2px;
    }

    .carBar {
        background: #FFFFFF;
        margin-bottom: 10px;
        padding: 5px 8px;
    }

    /deep/ .van-tabs__nav--card {
        box-sizing: border-box;
        height: 30px;
        margin: 0;
        border: 1px solid #ee0a24;
        border-radius: 2px;
    }

</style>

