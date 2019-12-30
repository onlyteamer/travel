<template>
    <div>
        <div style="position: fixed;top: 0;height: 46px;width: 100%">
            <van-nav-bar :fixed="true" />
            <div style="position: fixed;top:0;width: 92%;z-index: 9999;left: 8%">
                <van-tabs v-model="header_active" @click="onClick">
                    <van-tab title="通勤班车">
                    </van-tab>
                    <van-tab title="旅游班车">
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="content">
            <div>
                <van-tabs sticky type="card" v-model="active" @click="onClick" title-active-color="#fff"
                          title-inactive-color="#0CC893" color="#0CC893">
                    <van-tab title="今日票据">
                        <div class="currentDate" v-if="showAll">{{currentDate}}</div>
                        <van-list v-if="showAll">
                            <div v-for="item in toride.data" :key="item.id" >
                                <div class="card">
                                    <div style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;height: 45px;justify-content: space-between">
                                        <span class="line">{{item.linename}}：{{item.startname}}->{{item.endname}}</span>
                                        <span class="list-price">￥{{item.ticketPrice}}</span>
                                    </div>
                                    <div style="display: flex;align-items: center;justify-content: space-between;height: 85px">
                                        <div @click="linkBusDetail(item.busid)" style="width: 70%">
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div style="width: 37%"><img :src="blueTime" width="13px" height="13px"><span
                                                        style="margin-left: 7px;margin-right: 13px">{{item.starttime}}</span>
                                                </div>
                                                <div><img :src="placeUp" width="13px" height="13px"><span
                                                        style="margin-left: 7px;">{{item.startname}}</span></div>
                                            </div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div style="width: 37%"><img :src="redTime" width="13px" height="13px"><span
                                                        style="margin-left: 7px;margin-right: 13px">{{item.endtime}}</span>
                                                </div>
                                                <div><img :src="placeDown" width="13px" height="13px"><span
                                                        style="margin-left: 7px;">{{item.endname}}</span></div>
                                            </div>
                                        </div>
                                        <div style="display: flex;flex-direction: column;justify-content:space-around;height: 100%">
                                            <van-button  :disabled="compareDate(item.starttime)" type="default" @click="checkTicket(item.id,item.checkcode)"
                                                        style="width:66px;height:28px;line-height:28px;background: #0CC893;color: #FFFFFF;border-radius: 5px">
                                                验票
                                            </van-button>
                                            <van-button type="default" @click="refundTicket(item.ticketid)"
                                                        style="width:66px;height:28px;line-height:28px;background: #9E9E9E;color: #FFFFFF;border-radius: 5px">
                                                退票
                                            </van-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                        <div style="text-align: center;margin: 12px 0px" v-if="toride.data&&toride.data.length <1">今日暂无可用票据</div>
                        <!--<van-button @click="goAll" style="margin-top:15px;width: 100%;height:44px"-->
                                    <!--plain color="#0CC893" type="default" v-if="showAll">-->
                            <!--查看全部-->
                        <!--</van-button>-->
                        <!--<van-list v-model="tripAllList.loading" :finished="tripAllList.finished" finished-text="没有更多了"-->
                                  <!--@load="onTorideLoadAll" style="margin-top: 15px" v-if="!showAll">-->
                            <!--<van-collapse v-model="tripName" accordion @change="initTripAllList($event)">-->
                                <!--<van-collapse-item :title="item.date" :name="item.date"-->
                                                   <!--v-for="(item,index) in tripAllList.dateList" :key="index">-->
                                    <!--<van-row v-for="(line,indexNum) in tripAllList.data" :key="line.id"-->
                                             <!--style="margin-bottom: 10px;color: #5083ED;display: flex;align-items: center;">-->
                                        <!--<van-col span="14" style="color: #5083ED;font-size: 14px;font-weight: bold">-->
                                            <!--<div>{{line.linename}}</div>-->
                                            <!--<div>{{line.startname}} -> {{line.endname}}</div>-->
                                        <!--</van-col>-->
                                        <!--<van-col span="10" style="color: #0CC893;text-align: right;font-size: 14px;">-->
                                            <!--<div style="display: inline-block">-->
                                                <!--<van-button :disabled="compareDate(item.date)" type="default" size="small" @click="checkTicket(line.id,line.checkcode)"-->
                                                            <!--style="background: #0CC893;color: #FFFFFF;border-radius: 5px">-->
                                                    <!--验票-->
                                                <!--</van-button>-->
                                                <!--<van-button type="default" size="small" @click="refundTicket(line.ticketid)"-->
                                                            <!--style="margin-left: 5px;background: #9E9E9E;color: #FFFFFF;border-radius: 5px">-->
                                                    <!--退票-->
                                                <!--</van-button>-->
                                            <!--</div>-->
                                        <!--</van-col>-->
                                    <!--</van-row>-->
                                <!--</van-collapse-item>-->
                            <!--</van-collapse>-->
                        <!--</van-list>-->
                    </van-tab>
                    <van-tab title="待乘车">
                        <van-list v-model="tripAllList.loading" :finished="tripAllList.finished" finished-text="没有更多了"
                                  @load="onTorideLoadAll" style="margin-top: 15px">
                            <van-collapse v-model="tripName" accordion @change="initTripAllList($event)">
                                <van-collapse-item :title="item.date" :name="item.date"
                                                   v-for="(item,index) in tripAllList.dateList" :key="index">
                                    <van-row v-for="(line,indexNum) in tripAllList.data" :key="line.id"
                                             style="margin-bottom: 10px;color: #5083ED;display: flex;align-items: center;">
                                        <van-col span="16" style="color: #5083ED;font-size: 14px;font-weight: bold">
                                            <div>{{line.linename}}</div>
                                            <div>{{line.startname}} -> {{line.endname}}</div>
                                        </van-col>
                                        <van-col span="8" style="color: #0CC893;text-align: right;font-size: 14px">
                                            <div >
                                                <span style="background: #9E9E9E;color: #FFFFFF;padding: 5px 10px;border-radius: 5px;margin-right: 10px"  @click="refundTicket(line.ticketid)">退票</span>
                                                <span>{{line.state }}</span>
                                            </div>
                                        </van-col>
                                    </van-row>
                                </van-collapse-item>
                            </van-collapse>
                        </van-list>
                    </van-tab>
                    <van-tab title="退款订单">
                        <van-list v-model="refund.loading" :finished="refund.finished" finished-text="没有更多了"
                                  @load="onRefundLoad" style="margin-top: 15px">
                            <van-collapse v-model="refundNum" accordion @change="initRefundData($event)">
                                <van-collapse-item :title="item.date" :name="item.date"
                                                   v-for="(item,index) in refund.dateList" :key="index">
                                    <van-row v-for="(line,indexNum) in refund.data" :key="line.id"
                                             style="margin-bottom: 10px;color: #202020;font-weight: bold">
                                        <van-col span="18" style="color: #5083ED;font-size: 14px;font-weight: bold">
                                            {{line.linename}}：{{line.startname}}->{{line.endname}}
                                        </van-col>
                                        <van-col span="6" style="color: #5E5E5E;text-align: right">{{line.state}}
                                        </van-col>
                                    </van-row>
                                </van-collapse-item>
                            </van-collapse>
                        </van-list>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

        <div class="footer">
            <van-tabbar v-model="footerActive" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF">
                <van-tabbar-item :icon="car" to="/busIndex">预定班车</van-tabbar-item>
                <van-tabbar-item :icon="scan" to="/ticketList">乘车验票</van-tabbar-item>
                <van-tabbar-item :icon="user" to="/user">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Tabs, Tab, Toast, List, Collapse, CollapseItem, Row, Col,Tabbar,TabbarItem,Image,Dialog} from 'vant';
    import request from '../../utils/request'
    import moment from 'moment'
    import blueTime from './../../static/images/busTrip/blue_time.png'
    import redTime from './../../static/images/busTrip/red_time.png'

    import placeDown from './../../static/images/busTrip/placeDown.png'
    import placeUp from './../../static/images/busTrip/placeUp.png'

    import car from './../../static/images/busTrip/car.png'
    import scan from './../../static/images/busTrip/scan.png'
    import user from './../../static/images/busTrip/user.png'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Toast.name]: Toast,
            [List.name]: List,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem,
            [Row.name]: Row,
            [Col.name]: Col,
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem,
            [Image.name]:Image,
            [Dialog.name]: Dialog,
        },
        data() {
            return {
                placeDown:placeDown,
                placeUp:placeUp,
                car: car,
                scan: scan,
                user: user,
                tripName: '',
                showAll: true,
                refundNum: '',
                activeName: '',
                currentDate: moment().format("YYYY年MM月DD日"),
                header_active: 0,
                active: 0,
                footerActive:1,
                blueTime: blueTime,
                redTime: redTime,
                refund: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    dateList: [],
                    pageSize: 20,
                    pageNum: 1,
                    total: 0
                },
                allOrder: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    dateList: [],
                    data: [],
                    pageSize: 20,
                    pageNum: 1,
                    total: 0
                },
                tripAllList: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    dateList: [],
                    data: [],
                    pageSize: 20,
                    pageNum: 1,
                    total: 0
                },
                toride: {
                    data: [],
                },

            }
        },
        methods: {

            //当天才能验票
            compareDate(date){
                let endTime =  new Date(date);
                let startTime = new Date();
                let days = moment(endTime).diff(moment(startTime), 'days');
                if(days == '0'){
                    return false;
                }else {
                    return true;
                }
            },

            checkTicket(id,checkcode) {
                Dialog.confirm({
                    title: '验票',
                    message:  '验票后不可退票,确认进行验票么？'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/bus/driverChecking",
                        params: {
                            isdriver: 0,
                            checkcode:checkcode
                        }
                    }).then(res => {
                        if (res.data.code == '0') {
                            Toast.success("验票成功");
                            this.$router.push({path: '/checkTicket', query: {'id': id}});
                        } else {
                            Toast.fail(res.data.msg)
                        }
                    })
                }).catch(res =>{

                })
            },
            refundTicket(id) {
                Dialog.confirm({
                    title: '退票',
                    message:  '是否确认退票？'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: '/bus/refundTicket',
                        params: {
                            ticketid: id
                        }
                    }).then((res) => {
                        if (res.data.code === 0) {
                            Toast(res.data.msg);
                            this.active = 2;
                            this.onClick();
                        } else {
                            Toast(res.data.msg);
                        }
                    })
                }).catch(res =>{

                });
            },

            onClick() {
                switch (this.active) {
                    case 0:
                        // if (this.showAll) {
                            this.toride.isOneHttp = true;
                            this.toride.loading = false;
                            this.toride.finished = false;
                            this.toride.data = [];
                            this.toride.pageNum = 1;
                            this.toride.total = 0;
                            this.initTorideData();
                        // }
                        // else {
                        //     this.tripAllList.isOneHttp = true;
                        //     this.tripAllList.loading = false;
                        //     this.tripAllList.finished = false;
                        //     this.tripAllList.data = [];
                        //     this.tripAllList.dateList = [];
                        //     this.tripAllList.pageNum = 1;
                        //     this.tripAllList.total = 0;
                        //     this.initTripAllDateList();
                        // }
                        break;
                    case 1:
                        this.tripAllList.isOneHttp = true;
                        this.tripAllList.loading = false;
                        this.tripAllList.finished = false;
                        this.tripAllList.data = [];
                        this.tripAllList.dateList = [];
                        this.tripAllList.pageNum = 1;
                        this.tripAllList.total = 0;
                        this.initTripAllDateList();
                        // this.allOrder.isOneHttp = true;
                        // this.allOrder.loading = false;
                        // this.allOrder.finished = false;
                        // this.allOrder.data = [];
                        // this.allOrder.dateList = [];
                        // this.allOrder.pageNum = 1;
                        // this.allOrder.total = 0;
                        // this.initAllOrderDateList();
                        break;
                    case 2:
                        this.refund.isOneHttp = true;
                        this.refund.loading = false;
                        this.refund.finished = false;
                        this.refund.data = [];
                        this.refund.dateList = [];
                        this.refund.pageNum = 1;
                        this.refund.total = 0;
                        this.initRefundDateList();
                        break;
                }
            },

            initTripAllList(e) {
                request.sendPost({
                    url: '/bus/checklist',
                    params: {
                        ischeck: 0,
                        isrefund: 0,
                        type:this.header_active===0?'1':'2',
                        dateStr: e
                    }
                }).then((res) => {
                    this.tripAllList.data = res.data.rows;
                })
            },
            initTripAllDateList() {
                request.sendPost({
                    url: '/bus/orderDateList',
                    params: {
                        ischeck: 0,
                        isrefund: 0,
                        type:this.header_active===0?'1':'2',
                        pageNum: this.tripAllList.pageNum,
                        pageSize: this.tripAllList.pageSize,
                    }
                }).then((res) => {
                    this.tripAllList.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.tripAllList.isOneHttp) {
                        this.tripAllList.dateList = res.data.rows;
                        this.tripAllList.isOneHttp = false;
                    } else {
                        this.tripAllList.dateList = this.tripAllList.dateList.concat(res.data.rows);
                    }

                    if (this.tripAllList.total === this.tripAllList.dateList.length) {
                        this.tripAllList.finished = true;
                    }
                    this.tripAllList.loading = false;
                })
            },
            onTorideLoadAll() {
                if (this.tripAllList.total > this.tripAllList.data.length) {
                    this.tripAllList.pageNum += 1;
                    this.initTripAllDateList();
                }
            },

            goAll() {
                this.showAll = false;
                this.tripAllList.isOneHttp = true;
                this.tripAllList.loading = false;
                this.tripAllList.finished = false;
                this.tripAllList.data = [];
                this.tripAllList.dateList = [];
                this.tripAllList.pageNum = 1;
                this.tripAllList.total = 0;
                this.initTripAllDateList();
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            onRefundLoad() {
                if (this.refund.total > this.refund.dateList.length) {
                    this.refund.pageNum += 1;
                    this.initRefundDateList();
                }
            },
            initRefundData(e) {
                request.sendPost({
                    url: '/bus/refundlist',
                    params: {
                        type:this.header_active===0?'1':'2',
                        dateStr: e
                    }
                }).then((res) => {
                    this.refund.data = res.data.rows;
                })
            },
            initRefundDateList() {
                request.sendPost({
                    url: '/bus/refundDateList',
                    params: {
                        type:this.header_active===0?'1':'2',
                        pageNum: this.refund.pageNum,
                        pageSize: this.refund.pageSize,
                    }
                }).then((res) => {
                    this.refund.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.refund.isOneHttp) {
                        this.refund.dateList = res.data.rows;
                        this.refund.isOneHttp = false;
                    } else {
                        this.refund.dateList = this.refund.dateList.concat(res.data.rows);
                    }

                    if (this.refund.total === this.refund.dateList.length) {
                        this.refund.finished = true;
                    }
                    this.refund.loading = false;

                })
            },
            onAllOrderLoad() {
                if (this.allOrder.total > this.allOrder.dateList.length) {
                    this.allOrder.pageNum += 1;
                    this.initAllOrderDateList();
                }
            },
            changeAllOrder(e) {
                request.sendPost({
                    url: '/bus/checklist',
                    params: {
                        type:this.header_active===0?'1':'2',
                        dateStr: e
                    }
                }).then((res) => {
                    this.allOrder.data = res.data.rows;
                });
            },
            initAllOrderDateList() {
                request.sendPost({
                    url: '/bus/orderDateList',
                    params: {
                        type:this.header_active===0?'1':'2',
                        pageNum: this.allOrder.pageNum,
                        pageSize: this.allOrder.pageSize,
                    }
                }).then((res) => {
                    this.allOrder.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.allOrder.isOneHttp) {
                        this.allOrder.dateList = res.data.rows;
                        this.allOrder.isOneHttp = false;
                    } else {
                        this.allOrder.dateList = this.allOrder.data.concat(res.data.rows);
                    }

                    if (this.allOrder.total === this.allOrder.dateList.length) {
                        this.allOrder.finished = true;
                    }
                    this.allOrder.loading = false;
                })
            },
            initTorideData() {
                request.sendPost({
                    url: '/bus/checklist',
                    params: {
                        type:this.header_active===0?'1':'2',
                        dateStr: moment().format("YYYY-MM-DD"),
                        ischeck: 0,
                        isrefund: 0,
                    }
                }).then((res) => {
                    this.toride.data = res.data.rows;
                })
            },
            linkBusDetail(val) {
                this.$router.push({path: "/busDetail", query: {busid: val}})
            },
        },
        created() {
            this.initTorideData();
        }
    }
</script>

<style scoped>
    /deep/ .van-tabs__line {
        background-color: #0CC893;
    }

    /deep/ .van-tabs__nav--card {
        margin: 0;
    }

    /deep/ .van-tab {
        color: #202020;
    }

    /deep/ .van-tab--active {
        color: #0CC893;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .content {
        padding: 15px;
        margin-top: 46px;
    }

    .currentDate {
        background-color: white;
        height: 37px;
        line-height: 37px;
        text-align: center;
        font-weight: bold;
        color: #202020;
        font-size: 18px;
        margin-top: 12px;
    }

    .card {
        font-size: 14px;
        padding: 0 5px;
        margin-top: 10px;
        background: #fff;
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
</style>

<style>
    .van-collapse-item__content {
        padding: 15px 10px;
    }

    .van-cell {
        padding: 10px;
    }

    .van-tabbar {
        background: #5083ED;
    }
</style>
