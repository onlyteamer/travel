<template>
    <div>
        <div class="info-wrap">
            <van-row style="height: 40px">
                <van-col span="8" style="height: 40px" @click="onClickLeft">
                    <div><img src="../../static/images/left.png" style="width: 11px;height: 18px"/></div>
                </van-col>
                <van-col span="8" style="height: 40px;text-align: center"><span style="color: white;font-size: 16px;">积分详情</span>
                </van-col>
            </van-row>
            <div>
                <van-row style="height: 69px">
                    <van-col span="12" class="item-col">
                        <div class="item-col-wrap">
                            <div style="font-size: 14px;color: white">当前积分</div>
                            <div style="font-size: 20px;color: white;font-weight: bold">8000</div>
                        </div>
                    </van-col>
                    <van-col span="12" class="item-col">
                        <div class="item-col-wrap">
                            <div style="font-size: 14px;color: white">累积积分</div>
                            <div style="font-size: 20px;color: white;font-weight: bold">12000</div>
                        </div>
                    </van-col>
                </van-row>
                <van-row style="height: 69px">
                    <van-col span="12" class="item-col">
                        <div style="font-size: 14px;color: white">今日获得</div>
                        <div style="font-size: 20px;color: white;font-weight: bold">200</div>
                    </van-col>
                    <van-col span="12" class="item-col">
                        <div style="font-size: 14px;color: white">累积消费</div>
                        <div style="font-size: 20px;color: white;font-weight: bold">5000</div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="content">
            <div style="position: relative;top: -35px;">
                <div class="content-title">积分明细</div>
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <div style="padding: 0 15px;background-color: white">
                        <van-row v-for="item in list" :key="item.id" class="item">
                            <van-col span="9" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">
                                {{item.year}}
                            </van-col>
                            <van-col span="3" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">
                                {{item.time}}
                            </van-col>
                            <van-col span="7" style="color:#202020;font-size: 14px;height: 50px;line-height: 50px">
                                {{item.name}}
                            </van-col>
                            <van-col span="5" style="color: #FF7E00;font-size: 14px;height: 50px;line-height: 50px">
                                {{item.value}}积分
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

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
        },
        data() {
            return {
                loading: false,
                finished: false,
                list: [{id: '1', time: '8:30', year: '2019年12月30日', name: '拼车出行收益', value: '20', type: '1'},
                    {id: '2', time: '8:30', year: '2019年12月30日', name: '拼车出行收益', value: '100', type: '-1'},
                    {id: '3', time: '8:30', year: '2019年12月30日', name: '拼车出行收益', value: '80', type: '-1'},
                    {id: '4', time: '8:30', year: '2019年12月30日', name: '拼车出行收益', value: '120', type: '1'},
                ],
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            onLoad() {
                // 异步更新数据
                //     setTimeout(() => {
                //         for (let i = 0; i < 10; i++) {
                //             this.list.push(this.list.length + 1);
                //         }
                //         // 加载状态结束
                //         this.loading = false;
                //
                //         // 数据全部加载完成
                //         if (this.list.length >= 40) {
                //             this.finished = true;
                //         }
                //     }, 500);
            }
        }
    }
</script>

<style scoped>
    .content-title {
        height: 35px;
        background-color: white;
        line-height: 35px;
        border-radius: 6px 6px  0 0 ;
        text-align: center;
        color: #0CC893;
        font-size: 16px;
        font-weight: bold;
    }
    .item{
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
        height: 220px;
        padding: 20px 15px 0 15px;
    }
</style>