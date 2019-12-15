<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="tab">
            <van-tabs v-model="strokeType" @change="changeTab" color="#5083ED" title-active-color="#5083ED" title-inactive-color="#202020">
                <van-tab title="乘客行程"></van-tab>
                <van-tab title="车主行程"></van-tab>
            </van-tabs>
        </div>
        <div style="margin-top: 105px">
            <div v-for="(item,index) in passTripList" :key="index" v-if="strokeType == '0'">
                <div class="listInfo">
                    <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                        <van-col span="14">
                            2019年12月04日 05:20
                        </van-col>
                        <van-col span="5" style="font-weight: bold">
                            ¥ 20
                        </van-col>
                        <van-col span="5" align="right" :style="{color:index == '1'?'#FF0200':'#202020'}">
                            {{index =='1'?'待完成':'已完成'}}
                        </van-col>
                    </van-row>

                    <van-row style="padding: 5px 2px">
                        <van-col span="12">
                            <p><span>发车地点：上河湾</span></p>
                            <p><span>座位：3/ 4个</span></p>
                            <p v-if="index == '1'"><span>待确认：1人</span></p>
                        </van-col>
                        <van-col span="12">
                            <p><span>目的地：安贞门</span></p>
                            <p><span>车型：银色大众速腾</span></p>
                            <p v-if="index == '1'"><span>已确认：2人</span></p>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="index == '1'">
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">分享
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkCarPosition">车主位置
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">联系车主
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button @click="goCarFate" type="default" color="#0CC893"
                                        style="font-size: 14px;width: 96%;height: 28px" size="mini">同车缘分
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="index == '1'">
                        <van-col span="6">

                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">已到达
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">上车支付
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkToCancel(item)">取消行程
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="index != '1'">
                        <van-col span="6">

                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkCarAppraise">行车评价
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="goCarFate">同车缘分
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">其他操作
                            </van-button>
                        </van-col>
                    </van-row>

                </div>
            </div>

            <div v-for="(item,index) in carOwnerTripList" v-if="strokeType != '0'">
                <div class="listInfo">
                    <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                        <van-col span="14">
                            2019年12月04日 05:20
                        </van-col>
                        <van-col span="5" style="font-weight: bold">
                            ¥ 20
                        </van-col>
                        <van-col span="5" align="right" :style="{color: index == '2'?'#202020':'#FF0200'}">
                            {{index =='2'?'已完成':'待出行'}}
                        </van-col>
                    </van-row>

                    <van-row style="padding: 5px 2px">
                        <van-col span="12">
                            <p><span>发车地点：上河湾</span></p>
                            <p><span>座位：3/ 4个</span></p>
                            <p><span v-if="index != 2">待确认：1人</span></p>
                        </van-col>
                        <van-col span="12">
                            <p><span>目的地：安贞门</span></p>
                            <p><span>车型：银色大众速腾</span></p>
                            <p><span v-if="index != 2">已确认：2人</span></p>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="index != '2'">
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">分享
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">已发车
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="changeArrive('1')">已到达
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button @click="goPassengerList" type="default" color="#0CC893"
                                        style="font-size: 14px;width: 96%;height: 28px" size="mini">乘客
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="index != 2">
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">调整座位
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">设为车满
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">修改行程
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkToCancel(item)">取消行程
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row v-if="index == '2'" style="margin: 10px 0">
                        <van-col span="6" offset="18">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">乘客
                            </van-button>
                        </van-col>
                    </van-row>

                    <div class="cover" v-if="index == '3'"></div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Tab, Tabs, Divider, Row, Col, Button, Popup, Dialog, Toast} from 'vant';

    import request from '../../utils/request'

    export default {
        name: "myStroke",
        components: {
            Title,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Divider.name]: Divider,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Dialog.name]: Dialog,
            [Toast.name]: Toast
        },
        data() {
            return {
                title: "我的行程",
                strokeType: "0",
                passTripList: [],
                carOwnerTripList: [
                    {}, {}, {}
                ]
            }
        },
        mounted() {
            this.changeTab(this.strokeType);
        },

        methods: {

            changeTab(val){
               if(val == '0'){
                   //乘客
                    this.initPassTripList();
               }else {
                   //车主
                    this.initCarOwnerTripList();
               }
            },

            initCarOwnerTripList(){
                request.sendGet({
                    url: "/sharecar/trip/list",
                    params: {}
                }).then(res => {
                    if (res.data.code == 0) {
                        this.carOwnerTripList = res.data.rows;
                    } else {
                        //接口错误

                    }
                })
            },

            initPassTripList() {
                request.sendGet({
                    url: "/sharecar/pass/triplist",
                    params: {}
                }).then(res => {
                    if (res.data.code == 0) {
                        this.passTripList = res.data.rows;
                    } else {
                        //接口错误

                    }
                })
            },

            //已到达
            changeArrive(val) {
                // localStorage.setItem("openid", "abcdefghigklmm");
                Dialog.confirm({
                    title: '',
                    message: '是否确认已到达'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/sharecar/trip/arrive/" + val,
                        params: {}
                    }).then(res => {
                        if (res.data.code == '0') {
                            Toast.success("操作成功")
                        } else {
                            Toast.fail("操作失败")
                        }
                    })
                }).catch(() => {
                    //取消

                });
            },


            onClickLeft() {

                this.$router.back(-1)
            },
            goCarFate() {
                this.$router.push({path: '/carFate'});
            },
            goPassengerList() {
                this.$router.push({path: '/passengerList'});
            },
            linkCarPosition() {
                this.$router.push({path: '/carOwnPosition'});
            },
            linkCarAppraise() {
                this.$router.push({path: '/carOwnerAppraise'});
            },

            //跳转取消
            linkToCancel(val) {

                if (this.strokeType == '0') {
                    this.$router.push({path: '/cancelTrip-passenger', query: {tripId: val.id}})
                } else {
                    this.$router.push({path: '/cancelTrip-driver', query: {tripId:val.id,seat:val.seatNum,confirm:val.confirmNum,unconfig:val.unconfirm}})
                }
            }
        }
    }
</script>

<style scoped>
    body {
        background: #FFFFFF;
    }

    .contain {

    }

    .tab {
        border-top: 1px solid #ECECEC;
        margin-top: 46px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }

    .listInfo {
        width: 90%;
        margin: 10px auto;
        background: #FFFFFF;
        padding: 5px 10px;
        font-size: 14px;
        position: relative;
    }

    .cover {
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .popInfo {
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        background: #FFFFFF;
        padding: 5px 10px;
    }
</style>
