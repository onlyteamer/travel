<template>
    <div>
        <div>
            <van-nav-bar title="账单明细" :fixed="true" left-arrow @click-left="onClickLeft"/>
        </div>
        <div style="margin-top: 46px;">
            <van-tabs sticky type="card" v-model="active" @click="onClick" title-active-color="#fff"
                      title-inactive-color="#0CC893" color="#0CC893">
                <van-tab title="消费">
                    <van-list v-model="consumeData.loading" :finished="consumeData.finished" finished-text="没有更多了"
                              @load="onConsumeDataLoad">
                        <div style="padding: 0 15px;background-color: white">
                            <van-row v-for="item in consumeData.data" :key="item.id" class="item">
                                <van-col span="8" class="item-text" style="text-align: left">
                                    {{item.dealDate}}
                                </van-col>
                                <van-col span="4" class="item-text">
                                    {{item.dealTime}}
                                </van-col>
                                <van-col span="8" class="item-text" style="color:#202020;">
                                    {{item.dealTitle}}
                                </van-col>
                                <van-col span="4" class="item-text" style="text-align: right">
                                    -{{item.dealNumber}}
                                </van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="收益">
                    <van-list v-model="incomeData.loading" :finished="incomeData.finished" finished-text="没有更多了"
                              @load="onIncomeDataLoad">
                        <div style="padding: 0 15px;background-color: white">
                            <van-row v-for="item in incomeData.data" :key="item.id" class="item">
                                <van-col span="8" class="item-text" style="text-align: left">
                                    {{item.dealDate}}
                                </van-col>
                                <van-col span="4" class="item-text">
                                    {{item.dealTime}}
                                </van-col>
                                <van-col span="8" class="item-text" style="color:#202020;">
                                    {{item.dealTitle}}
                                </van-col>
                                <van-col span="4" class="item-text" style="text-align: right">
                                    +{{item.dealNumber}}
                                </van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="充值">
                    <van-list v-model="rechargeData.loading" :finished="rechargeData.finished" finished-text="没有更多了"
                              @load="onRechargeDataLoad">
                        <div style="padding: 0 15px;background-color: white">
                            <van-row v-for="item in rechargeData.data" :key="item.id" class="item">
                                <van-col span="8" class="item-text" style="text-align: left">
                                    {{item.dealDate}}
                                </van-col>
                                <van-col span="4" class="item-text">
                                    {{item.dealTime}}
                                </van-col>
                                <van-col span="8" class="item-text"style="color:#202020;">
                                    {{item.dealTitle}}
                                </van-col>
                                <van-col span="4" class="item-text" style="color: #FF0200;text-align: right">
                                    +{{item.dealNumber}}
                                </van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="提现">
                    <van-list v-model="cashoutData.loading" :finished="cashoutData.finished" finished-text="没有更多了"
                              @load="onCashoutDataLoad">
                        <div style="padding: 0 15px;background-color: white">
                            <van-row v-for="item in cashoutData.data" :key="item.id" class="item">
                                <van-col span="8" class="item-text" style="text-align: left">
                                    {{item.dealDate}}
                                </van-col>
                                <van-col span="4" class="item-text">
                                    {{item.dealTime}}
                                </van-col>
                                <van-col span="8" class="item-text" style="color:#202020;">
                                    {{item.dealTitle}}
                                </van-col>
                                <van-col span="4" class="item-text" style="text-align: right">
                                    -{{item.dealNumber}}
                                </van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<!--账单明细-->
<script>
    import {NavBar, Tab, Tabs, Row, Col, List} from 'vant';
    import request from "../../utils/request"

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
        },
        data() {
            return {
                active: 1,
                incomeData: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },//收益
                consumeData: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },//消费
                cashoutData: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },//提现
                rechargeData: {
                    isOneHttp: true,
                    loading: false,
                    finished: false,
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                }//充值
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            onClick() {
                this.initData();
            },
            initIncomeData() {
                request.sendGet({
                    url: '/user/center/incomelist',
                    params: {
                        pageSize: this.incomeData.pageSize,
                        pageNum: this.incomeData.pageNum,
                    }
                }).then((res) => {
                    this.incomeData.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.incomeData.isOneHttp) {
                        this.incomeData.data = res.data.rows;
                        this.incomeData.isOneHttp = false;
                    } else {
                        this.incomeData.data = this.incomeData.data.concat(res.data.rows);
                    }
                    if (this.incomeData.total === this.incomeData.data.length) {
                        this.incomeData.finished = true;
                    }
                    this.incomeData.loading = false;
                })
            },
            onIncomeDataLoad() {
                if (this.incomeData.total > this.incomeData.data.length) {
                    this.incomeData.pageNum += 1;
                    this.initIncomeData();
                }
            },
            initConsumeData() {
                request.sendGet({
                    url: '/user/center/consumelist',
                    params: {
                        pageSize: this.consumeData.pageSize,
                        pageNum: this.consumeData.pageNum,
                    }
                }).then((res) => {
                    this.consumeData.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.consumeData.isOneHttp) {
                        this.consumeData.data = res.data.rows;
                        this.consumeData.isOneHttp = false;
                    } else {
                        this.consumeData.data = this.consumeData.data.concat(res.data.rows);
                    }
                    if (this.consumeData.total === this.consumeData.data.length) {
                        this.consumeData.finished = true;
                    }
                    this.consumeData.loading = false;
                })
            },
            onConsumeDataLoad() {
                if (this.consumeData.total > this.consumeData.data.length) {
                    this.consumeData.pageNum += 1;
                    this.initConsumeData();
                }
            },
            initCashoutData() {
                request.sendGet({
                    url: '/user/center/cashoutlist',
                    params: {
                        pageSize: this.cashoutData.pageSize,
                        pageNum: this.cashoutData.pageNum,
                    }
                }).then((res) => {
                    this.cashoutData.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.cashoutData.isOneHttp) {
                        this.cashoutData.data = res.data.rows;
                        this.cashoutData.isOneHttp = false;
                    } else {
                        this.cashoutData.data = this.cashoutData.data.concat(res.data.rows);
                    }
                    if (this.cashoutData.total === this.cashoutData.data.length) {
                        this.cashoutData.finished = true;
                    }
                    this.cashoutData.loading = false;
                })
            },
            onCashoutDataLoad() {
                if (this.cashoutData.total > this.cashoutData.data.length) {
                    this.cashoutData.pageNum += 1;
                    this.initCashoutData();
                }
            },
            initRechargeData() {
                request.sendGet({
                    url: '/user/center/rechargelist',
                    params: {
                        pageSize: this.rechargeData.pageSize,
                        pageNum: this.rechargeData.pageNum,
                    }
                }).then((res) => {
                    this.rechargeData.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.rechargeData.isOneHttp) {
                        this.rechargeData.data = res.data.rows;
                        this.rechargeData.isOneHttp = false;
                    } else {
                        this.rechargeData.data = this.rechargeData.data.concat(res.data.rows);
                    }
                    if (this.rechargeData.total === this.rechargeData.data.length) {
                        this.rechargeData.finished = true;
                    }
                    this.rechargeData.loading = false;
                })
            },
            onRechargeDataLoad() {
                if (this.rechargeData.total > this.rechargeData.data.length) {
                    this.rechargeData.pageNum += 1;
                    this.initRechargeData();
                }
            },
            initData() {
                switch (this.active) {
                    case 0:
                        this.consumeData.isOneHttp = true;
                        this.consumeData.loading = false;
                        this.consumeData.finished = false;
                        this.consumeData.data = [];
                        this.consumeData.pageNum = 1;
                        this.consumeData.total = 0;
                        this.initConsumeData();
                        break;
                    case 1:
                        this.incomeData.isOneHttp = true;
                        this.incomeData.loading = false;
                        this.incomeData.finished = false;
                        this.incomeData.data = [];
                        this.incomeData.pageNum = 1;
                        this.incomeData.total = 0;
                        this.initIncomeData();
                        break;
                    case 2:
                        this.rechargeData.isOneHttp = true;
                        this.rechargeData.loading = false;
                        this.rechargeData.finished = false;
                        this.rechargeData.data = [];
                        this.rechargeData.pageNum = 1;
                        this.rechargeData.total = 0;
                        this.initRechargeData();
                        break;
                    case 3:
                        this.cashoutData.isOneHttp = true;
                        this.cashoutData.loading = false;
                        this.cashoutData.finished = false;
                        this.cashoutData.data = [];
                        this.cashoutData.pageNum = 1;
                        this.cashoutData.total = 0;
                        this.initCashoutData();
                        break;
                }
            }
        },
        created: function () {
            this.active = this.$route.query.activeIndex;
            this.initData();
        }
    }
</script>

<style scoped>
    .item-text {
        text-align: center;
        color: #5E5E5E;
        font-size: 14px;
        height: 50px;
        line-height: 50px
    }

    /deep/ .van-tabs__nav--card {
        margin-left: 0;
        margin-right: 0;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .item {
        height: 50px;
    }
</style>