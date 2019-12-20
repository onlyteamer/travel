<template>
    <div>
        <div style="position: fixed;top: 0;height: 46px;width: 100%">
            <van-nav-bar :fixed="true" left-arrow @click-left="onClickLeft"/>
            <div style="position: fixed;top:0;width: 92%;z-index: 9999;left: 8%">
                <van-tabs v-model="header_active">
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
                    <van-tab title="待乘车">
                        <div class="currentDate" v-if="showAll">{{currentDate}}</div>
                        <van-list v-model="toride.loading" :finished="toride.finished" finished-text="没有更多了"
                                  @load="onTorideLoad" v-if="showAll">
                            <div v-for="item in toride.data" :key="item.id">
                                <div class="card">
                                    <div style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;height: 45px;justify-content: space-between">
                                        <span class="line">昌坤出行3线：上河湾 →  西坝河</span>
                                        <span class="list-price">￥20</span>
                                    </div>
                                    <div style="display: flex;align-items: center;justify-content: space-between;height: 85px">
                                        <div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div><img :src="blueTime" width="13px" height="13px"><span
                                                        style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                                                <div><img :src="blueTime" width="13px" height="13px"><span
                                                        style="margin-left: 7px;">上河湾</span></div>
                                            </div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div><img :src="redTime" width="13px" height="13px"><span
                                                        style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                                                <div><img :src="redTime" width="13px" height="13px"><span
                                                        style="margin-left: 7px;">西坝河</span></div>
                                            </div>
                                        </div>
                                        <div style="display: flex;flex-direction: column;justify-content:space-around;height: 100%">
                                            <van-button type="default"
                                                        style="width:66px;height:28px;line-height:28px;background: #0CC893;color: #FFFFFF;border-radius: 5px">
                                                验票
                                            </van-button>
                                            <van-button type="default"
                                                        style="width:66px;height:28px;line-height:28px;background: #9E9E9E;color: #FFFFFF;border-radius: 5px">
                                                退票
                                            </van-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                        <van-button @click="goAll" style="margin-top:15px;width: 100%;height:44px"
                                    plain color="#0CC893" type="default" v-if="showAll">
                            查看全部
                        </van-button>
                        <van-list v-model="toride.loading" :finished="toride.finished" finished-text="没有更多了"
                                  @load="onTorideLoadAll" style="margin-top: 15px" v-if="!showAll">
                            <van-collapse v-model="tripName" accordion>
                                <van-collapse-item :title="item.dateTime" :name="item.orderId"
                                                   v-for="(item,index) in tripAllList.data" :key="index">
                                    <van-row v-for="(line,indexNum) in item.strokeList" :key="indexNum"
                                             style="margin-bottom: 10px;color: #5083ED">
                                        <van-col span="14">{{line.lineName}}</van-col>
                                        <van-col span="10" style="color: #0CC893;text-align: right">
                                            <div style="display: inline-block">
                                                <van-button type="default" size="small"
                                                            style="background: #0CC893;color: #FFFFFF;border-radius: 5px">
                                                    验票
                                                </van-button>
                                                <van-button type="default" size="small"
                                                            style="margin-left: 5px;background: #9E9E9E;color: #FFFFFF;border-radius: 5px">
                                                    退票
                                                </van-button>
                                            </div>
                                        </van-col>
                                    </van-row>
                                </van-collapse-item>
                            </van-collapse>
                        </van-list>
                    </van-tab>
                    <van-tab title="全部订单">
                        <van-list v-model="allOrder.loading" :finished="allOrder.finished" finished-text="没有更多了"
                                  @load="onAllOrderLoad" style="margin-top: 15px">
                            <van-collapse v-model="activeName" accordion>
                                <van-collapse-item :title="item.dateTime" :name="item.orderId"
                                                   v-for="(item,index) in allOrder.data" :key="index">
                                    <van-row v-for="(line,indexNum) in item.strokeList" :key="indexNum"
                                             style="margin-bottom: 10px;color: #5083ED">
                                        <van-col span="18">{{line.lineName}}</van-col>
                                        <van-col span="6" style="color: #0CC893;text-align: right">{{line.flag ==
                                            '0'?'待乘车':'已完成'}}
                                        </van-col>
                                    </van-row>
                                </van-collapse-item>
                            </van-collapse>
                        </van-list>
                    </van-tab>
                    <van-tab title="退款订单">
                        <van-list v-model="refund.loading" :finished="refund.finished" finished-text="没有更多了"
                                  @load="onRefundLoad" style="margin-top: 15px">
                            <van-collapse v-model="refundNum" accordion>
                                <van-collapse-item :title="item.dateTime" :name="item.orderId"
                                                   v-for="(item,index) in refund.data" :key="index">
                                    <van-row v-for="(line,indexNum) in item.strokeList" :key="indexNum"
                                             style="margin-bottom: 10px;color: #202020;font-weight: bold">
                                        <van-col span="18">{{line.lineName}}</van-col>
                                        <van-col span="6" style="color: #5E5E5E;text-align: right">{{line.flag ==
                                            '3'?'已退款':''}}
                                        </van-col>
                                    </van-row>
                                </van-collapse-item>
                            </van-collapse>
                        </van-list>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Tabs, Tab, Toast, List, Collapse, CollapseItem, Row, Col} from 'vant';
    import request from '../../utils/request'
    import moment from 'moment'
    import blueTime from './../../static/images/busTrip/blue_time.png'
    import redTime from './../../static/images/busTrip/red_time.png'

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
            [Col.name]: Col
        },
        data() {
            return {
                tripName: 1,
                showAll: true,
                refundNum: 1,
                activeName: 1,
                currentDate: moment().format("YYYY年MM月"),
                header_active: 0,
                active: 0,
                blueTime: blueTime,
                redTime: redTime,
                refund: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
                allOrder: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
                tripAllList: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
                toride: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                }
            }
        },
        methods: {
            onClick() {
                switch (this.active) {
                    case 0:
                        if(this.showAll){
                            this.toride.isOneHttp = true;
                            this.toride.loading = false;
                            this.toride.finished = false;
                            this.toride.data = [];
                            this.toride.pageNum = 1;
                            this.toride.total = 0;
                            this.initTorideData();
                        }else{
                            this.tripAllList.isOneHttp = true;
                            this.tripAllList.loading = false;
                            this.tripAllList.finished = false;
                            this.tripAllList.data = [];
                            this.tripAllList.pageNum = 1;
                            this.tripAllList.total = 0;
                            this.initTripAllList();
                        }
                        break;
                    case 1:
                        this.allOrder.isOneHttp = true;
                        this.allOrder.loading = false;
                        this.allOrder.finished = false;
                        this.allOrder.data = [];
                        this.allOrder.pageNum = 1;
                        this.allOrder.total = 0;
                        this.initAllOrderData();
                        break;
                    case 2:
                        this.refund.isOneHttp = true;
                        this.refund.loading = false;
                        this.refund.finished = false;
                        this.refund.data = [];
                        this.refund.pageNum = 1;
                        this.refund.total = 0;
                        this.initRefundData();
                        break;
                }
            },

            initTripAllList(){
                request.sendPost({
                    url: '/bus/checklist',
                    params: {
                        ischeck: 0,
                        isrefund: 0,
                        pageNum: this.tripAllList.pageNum,
                        pageSize: this.tripAllList.pageSize,
                    }
                }).then((res) => {
                    this.tripAllList.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.tripAllList.isOneHttp) {
                        this.tripAllList.data = res.data.rows;
                        this.tripAllList.isOneHttp = false;
                    } else {
                        this.tripAllList.data = this.tripAllList.data.concat(res.data.rows);
                    }

                    if (this.tripAllList.total === this.tripAllList.data.length) {
                        this.tripAllList.finished = true;
                    }
                    this.tripAllList.loading = false;
                })
            },
            onTorideLoadAll() {
                if (this.tripAllList.total > this.tripAllList.data.length) {
                    this.tripAllList.pageNum += 1;
                    this.initTripAllList();
                }
            },

            goAll() {
                this.showAll = false;
                this.tripAllList.isOneHttp = true;
                this.tripAllList.loading = false;
                this.tripAllList.finished = false;
                this.tripAllList.data = [];
                this.tripAllList.pageNum = 1;
                this.tripAllList.total = 0;
                this.initTripAllList();
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            onRefundLoad() {
                if (this.refund.total > this.refund.data.length) {
                    this.refund.pageNum += 1;
                    this.initRefundData();
                }
            },
            initRefundData() {
                request.sendPost({
                    url: '/bus/refundlist',
                    params: {
                        pageNum: this.refund.pageNum,
                        pageSize: this.refund.pageSize,
                    }
                }).then((res) => {
                    this.refund.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.refund.isOneHttp) {
                        this.refund.data = res.data.rows;
                        this.refund.isOneHttp = false;
                    } else {
                        this.refund.data = this.refund.data.concat(res.data.rows);
                    }

                    if (this.refund.total === this.refund.data.length) {
                        this.refund.finished = true;
                    }
                    this.refund.loading = false;
                })
            },
            onAllOrderLoad() {
                if (this.allOrder.total > this.allOrder.data.length) {
                    this.allOrder.pageNum += 1;
                    this.initAllOrderData();
                }
            },
            initAllOrderData(){
                request.sendPost({
                    url: '/bus/checklist',
                    params: {
                        pageNum: this.allOrder.pageNum,
                        pageSize: this.allOrder.pageSize,
                    }
                }).then((res)=>{
                    this.allOrder.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.allOrder.isOneHttp) {
                        this.allOrder.data = res.data.rows;
                        this.allOrder.isOneHttp = false;
                    } else {
                        this.allOrder.data = this.allOrder.data.concat(res.data.rows);
                    }

                    if (this.allOrder.total === this.allOrder.data.length) {
                        this.allOrder.finished = true;
                    }
                    this.allOrder.loading = false;
                })

            },
            onTorideLoad() {
                if (this.toride.total > this.toride.data.length) {
                    this.toride.pageNum += 1;
                    this.initTorideData();
                }
            },
            initTorideData() {
                request.sendPost({
                    url: '/bus/checklist',
                    params: {
                        dateStr: moment().format("YYYY-MM-DD"),
                        ischeck: 0,
                        isrefund: 0,
                        pageNum: this.toride.pageNum,
                        pageSize: this.toride.pageSize,
                    }
                }).then((res) => {
                    this.toride.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.toride.isOneHttp) {
                        this.toride.data = res.data.rows;
                        this.toride.isOneHttp = false;
                    } else {
                        this.toride.data = this.toride.data.concat(res.data.rows);
                    }

                    if (this.toride.total === this.toride.data.length) {
                        this.toride.finished = true;
                    }
                    this.toride.loading = false;
                })
            }
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


</style>

<style>
    .van-collapse-item__content {
        padding: 15px 10px;
    }

    .van-cell {
        padding: 10px;
    }
</style>
