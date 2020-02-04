<template>
    <div>
        <div class="info-wrap">
            <div>
                <van-row style="height: 69px">
                    <van-col span="12" class="item-col">
                        <div class="item-col-wrap">
                            <div style="font-size: 14px;color: white">当前积分</div>
                            <div style="font-size: 20px;color: white;font-weight: bold">{{definition.total}}</div>
                        </div>
                    </van-col>
                    <van-col span="12" class="item-col">
                        <div class="item-col-wrap">
                            <div style="font-size: 14px;color: white">累积积分</div>
                            <div style="font-size: 20px;color: white;font-weight: bold">{{definition.all}}</div>
                        </div>
                    </van-col>
                </van-row>
                <van-row style="height: 69px">
                    <van-col span="12" class="item-col">
                        <div style="font-size: 14px;color: white">今日获得</div>
                        <div style="font-size: 20px;color: white;font-weight: bold">{{definition.today}}</div>
                    </van-col>
                    <van-col span="12" class="item-col">
                        <div style="font-size: 14px;color: white">累积消费</div>
                        <div style="font-size: 20px;color: white;font-weight: bold">{{definition.consum}}</div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="content">
            <div style="position: relative;top: -35px;">
                <div class="content-title">积分明细</div>
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <div style="padding: 0 15px;background-color: white">
                        <van-row v-for="(item,index) in dataMain.data" :key="index" class="item">
                            <van-col span="8" style="text-align:center;tcolor: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">
                                {{item.date}}
                            </van-col>
                            <!--                            <van-col span="3" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">-->
                            <!--                                {{item.time}}-->
                            <!--                            </van-col>-->
                            <van-col span="8" style="text-align:center;color:#202020;font-size: 14px;height: 50px;line-height: 50px">
                                {{item.operation}}
                            </van-col>
                            <!--                            积分明细  type =1  增加积分  type=2 减积分-->
                            <van-col span="8" style="text-align:center;color: #FF7E00;font-size: 14px;height: 50px;line-height: 50px">
                                {{item.type===1?'+':'-'}} {{item.integralnum}}积分
                            </van-col>
                        </van-row>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>
<!--我的积分-->
<script>
    import {NavBar, Row, Col, List} from 'vant';
    import requset from '../../utils/request';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
        },
        data() {
            return {
                isOneHttp: true,
                loading: false,
                finished: false,
                list: [],
                definition: {},
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            initIntegral() {
                requset.sendGet({
                    url: '/user/center/integraltotal',
                    params: {}
                }).then(res => {
                    if (res.data.code === 0) {
                        this.definition = res.data.data;
                    }
                })
            },
            initList() {
                requset.sendGet({
                    url: '/user/center/integralinfo',
                    params: {
                        pageNum: this.dataMain.pageNum,
                        pageSize: this.dataMain.pageSize,
                    }
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
            onLoad() {
                if (this.dataMain.total > this.dataMain.data.length) {
                    this.dataMain.pageNum += 1;
                    this.initList();
                }
            }
        },
        created() {
            this.initIntegral();
            this.initList();
        }
    }
</script>

<style scoped>
    .content-title {
        height: 35px;
        background-color: white;
        line-height: 35px;
        border-radius: 6px 6px 0 0;
        text-align: center;
        color: #0CC893;
        font-size: 16px;
        font-weight: bold;
    }

    .item {
        border-bottom: 1px solid #ECECEC;
    }

    .item-col-wrap {
        width: 100%;
        height: 100%;
        border-bottom: 1px white dashed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .item-col {
        text-align: center;
        height: 69px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 33px;
    }

    .content {
        background-color: white;

    }

    /deep/ .van-cell:not(:last-child)::after {
        border: none;
    }

    /deep/ .van-field__label {
        font-weight: bold !important;
        font-size: 14px !important;
        color: #202020 !important;
    }

    .bag-wrap-item img {
        width: auto;
        height: 20px;
    }

    .bag-wrap-item div {
        font-size: 14px;
        color: #666666;
        margin-top: 12px;
    }

    .func-content-item img {
        width: 22px;
        height: 22px;
    }

    .func-content-item span {
        font-size: 14px;
        color: #666666;
        padding-top: 8px;
    }

    .bag-wrap .bag-col:last-child {
        border: none;
    }

    .content {
        background-color: #F6F6F6;
        padding: 0 15px;
        position: relative;
    }

    .info-wrap {
        background-image: -webkit-linear-gradient(-49deg, #5C77FE, #05CF8A);
        background-image: linear-gradient(-49deg, #5C77FE, #05CF8A);
        height: 176px;
        padding: 20px 15px 0 15px;
    }
</style>