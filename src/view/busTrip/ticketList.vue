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
                        <div class="currentDate">{{currentDate}}</div>
                        <van-list v-model="toride.loading" :finished="toride.finished" finished-text="没有更多了"
                                  @load="onTorideLoad">
                            <div v-for="item in 3" :key="item">
                                <div class="card">
                                    <div style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;height: 45px;justify-content: space-between">
                                        <span class="line">昌坤出行3线：上河湾 →  西坝河</span>
                                        <span class="list-price">￥20</span>
                                    </div>
                                    <div style="display: flex;align-items: center;justify-content: space-between;height: 72px">
                                        <div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div><img :src="blueTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                                                <div><img :src="blueTime" width="13px" height="13px"><span  style="margin-left: 7px;">上河湾</span></div>
                                            </div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                                                <div><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;">西坝河</span></div>
                                            </div>
                                        </div>
                                        <div>
                                            <van-button  color="#0CC893" style="width: 66px;height: 37px;line-height: 37px;padding: 0">去抢票</van-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-tab>
                    <van-tab title="全部订单">
                        <div class="currentDate">{{currentDate}}</div>
                        <van-list v-model="allOrder.loading" :finished="allOrder.finished" finished-text="没有更多了"
                                  @load="onAllOrderLoad">
                            <div v-for="item in 3" :key="item">
                                <div class="card">
                                    <div style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;height: 45px;justify-content: space-between">
                                        <span class="line">昌坤出行3线：上河湾 →  西坝河</span>
                                        <span class="list-price">￥20</span>
                                    </div>
                                    <div style="display: flex;align-items: center;justify-content: space-between;height: 72px">
                                        <div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div><img :src="blueTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                                                <div><img :src="blueTime" width="13px" height="13px"><span  style="margin-left: 7px;">上河湾</span></div>
                                            </div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                                                <div><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;">西坝河</span></div>
                                            </div>
                                        </div>
                                        <div>
                                            <van-button  color="#0CC893" style="width: 66px;height: 37px;line-height: 37px;padding: 0">去抢票</van-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-tab>
                    <van-tab title="退款订单">
                        <div class="currentDate">{{currentDate}}</div>
                        <van-list v-model="refund.loading" :finished="refund.finished" finished-text="没有更多了"
                                  @load="onRefundLoad">
                            <div v-for="item in 3" :key="item">
                                <div class="card">
                                    <div style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;height: 45px;justify-content: space-between">
                                        <span class="line">昌坤出行3线：上河湾 →  西坝河</span>
                                        <span class="list-price">￥20</span>
                                    </div>
                                    <div style="display: flex;align-items: center;justify-content: space-between;height: 72px">
                                        <div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div><img :src="blueTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                                                <div><img :src="blueTime" width="13px" height="13px"><span  style="margin-left: 7px;">上河湾</span></div>
                                            </div>
                                            <div style="display: flex;height:35px;line-height: 35px">
                                                <div><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                                                <div><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;">西坝河</span></div>
                                            </div>
                                        </div>
                                        <div>
                                            <van-button  color="#0CC893" style="width: 66px;height: 37px;line-height: 37px;padding: 0">去抢票</van-button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </van-list>
                    </van-tab>
                </van-tabs>
            </div>
            <van-button @click="goAll" style="margin-top:15px;width: 100%;height:44px"
                        plain  color="#0CC893" type="default">
                查看全部
            </van-button>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Tabs, Tab, Toast, List} from 'vant';
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
        },
        data() {
            return {
                currentDate: moment().format("YYYY年MM月"),
                header_active: 0,
                active:0,
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
            onClick(){

            },
            goAll(){

            },
            onClickLeft() {
                this.$router.back(-1);
            },
            onRefundLoad() {

            },
            onAllOrderLoad() {

            },
            onTorideLoad() {

            }
        },
        created() {
            // this.initData();
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