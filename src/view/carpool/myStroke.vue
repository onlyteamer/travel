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
                            {{item.tripDate}}
                        </van-col>
                        <van-col span="5" style="font-weight: bold">
                            ¥ {{item.tripPrice}}
                        </van-col>
                        <van-col span="5" align="right" :style="{color:item.tripState == '已完成'?'#202020':'#FF0200'}">
                            {{item.tripState}}
                        </van-col>
                    </van-row>

                    <van-row style="padding: 5px 2px">
                        <van-col span="12">
                            <p><span>发车地点：{{item.startPlace}}</span></p>
                            <p><span>车牌：{{item.carInfo}}</span></p>
                            <!--<p v-if="index == '1'"><span>待确认：1人</span></p>-->
                        </van-col>
                        <van-col span="12">
                            <p><span>目的地：{{item.endPlace}}</span></p>
                            <p><span>车型：{{item.carNumber}}</span></p>
                            <!--<p v-if="index == '1'"><span>已确认：2人</span></p>-->
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="item.tripState != '已完成'">
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
                                        size="mini" @click="contactCar(item.driverPhone)">联系车主
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button @click="goCarFate(item.tripId)" type="default" color="#0CC893"
                                        style="font-size: 14px;width: 96%;height: 28px" size="mini">同车缘分
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="item.tripState != '已完成'">
                        <van-col span="6">

                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="changeArrive(item.tripId)">已到达
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="passengerPayment(item)">上车支付
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkToCancel(item)">取消行程
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="item.tripState == '已完成'">
                        <van-col span="6">

                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkCarAppraise">行车评价
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="goCarFate(item.tripId)">同车缘分
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkOpt(item)">其他操作
                            </van-button>
                        </van-col>
                    </van-row>

                </div>
            </div>

            <div v-for="(item,index) in carOwnerTripList" v-if="strokeType != '0'">
                <div class="listInfo">
                    <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                        <van-col span="14">
                            {{item.tripDate}}
                        </van-col>
                        <van-col span="5" style="font-weight: bold">
                            ¥ {{item.tripPrice}}
                        </van-col>
                        <van-col span="5" align="right" :style="{color: item.tripState == '1'?'#202020':'#FF0200'}">
                            {{item.tripState =='1'?'已完成':(item.tripState =='0'?'待出行':(item.tripState == '2'?'已取消':'已终止'))}}
                        </van-col>
                    </van-row>

                    <van-row style="padding: 5px 2px">
                        <van-col span="12">
                            <p><span>发车地点：{{item.startPlace}}</span></p>
                            <p><span>座位：{{item.confirmSeats}}/ {{item.totalSeats}}个</span></p>
                            <p><span v-if="index != 2">待确认：{{item.unconfirmSeats}}人</span></p>
                        </van-col>
                        <van-col span="12">
                            <p><span>目的地：{{item.endPlace}}</span></p>
                            <p><span>车型：{{item.carName}}</span></p>
                            <p><span v-if="index != 2">已确认：{{item.confirmSeats}}人</span></p>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="item.tripState != '1'">
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
                                        size="mini" @click="changeArrive(item.tripId)">已到达
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button @click="goPassengerList(item.tripId)" type="default" color="#0CC893"
                                        style="font-size: 14px;width: 96%;height: 28px" size="mini">乘客
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="item.tripState != 1">
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="showSeat(item.tripId)">调整座位
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="fullSeat(item.tripId)">设为车满
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkUpdateStroke(item.tripId)">修改行程
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkToCancel(item)">取消行程
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row v-if="item.tripState == '1'" style="margin: 10px 0">
                        <van-col span="6" offset="18">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="goPassengerList(item.tripId)">乘客
                            </van-button>
                        </van-col>
                    </van-row>

                    <div class="cover" v-if="item.tripState == '3'||item.tripState == '2'"></div>
                </div>

            </div>
        </div>

        <van-dialog
                v-model="showSeatDialog"
                title="座位调整"
                show-cancel-button
                @confirm="updateSeat"
        >
            <van-field
                    v-model="changeSeatInfo.seatCount"
                    type="number"
                    label="座位数"
                    placeholder="请输入座位数"
                    required
            />
        </van-dialog>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Tab, Tabs, Divider, Row, Col, Button, Popup, Dialog, Toast,Field } from 'vant';

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
            [Toast.name]: Toast,
            [Field.name]:Field,
            [Dialog.Component.name]:Dialog.Component
        },
        data() {
            return {
                showSeatDialog:false,
                changeSeatInfo:{
                    tripId:"",
                    seatCount:""
                },
                title: "我的行程",
                strokeType: "0",
                passTripList: [],
                carOwnerTripList: []
            }
        },
        mounted() {
            let strokeType = sessionStorage.getItem("strokeType");
            if(strokeType){
                this.strokeType = Number(strokeType);
            }
            this.changeTab(this.strokeType);
        },

        methods: {

            contactCar(val){
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

            changeTab(val){
               if(val == '0'){
                   //乘客
                    this.initPassTripList();
               }else {
                   //车主
                    this.initCarOwnerTripList();
               }
            },

            updateSeat(){
                if(!this.changeSeatInfo.seatCount){
                    Toast.fail("请填写座位数");
                    return;
                }

                request.sendPost({
                    url:"/sharecar/trip/updateseat/"+this.changeSeatInfo.seatCount,
                    params:{
                        tripId:this.changeSeatInfo.tripId
                    }
                }).then(res =>{
                    if(res.data.code == '0'){
                        Toast.success("操作成功");
                    }else {
                        Toast.fail("操作失败")
                    }

                })
            },

            showSeat(val){
                this.showSeatDialog = true;
                this.changeSeatInfo.tripId = val;
            },
            fullSeat(val){
                Dialog.confirm({
                    title: '',
                    message: '是否确认设置车满'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/sharecar/trip/full/" + val,
                        params: {}
                    }).then(res => {
                        if (res.data.code == '0') {
                            Toast.success("操作成功");
                        } else {
                            Toast.fail("操作失败")
                        }
                    })
                })
            },

            //上车支付
            passengerPayment(val){
                Dialog.confirm({
                    title: '',
                    message: '是否确认上车支付'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/sharecar/pass/pay/" + val.tripId,
                        params: {}
                    }).then(res => {
                        if (res.data.code == '0') {
                            Toast.success("操作成功");
                            this.changeSeatInfo.seatCount = "";
                        } else {
                            Toast.fail("操作失败")
                        }
                    })
                })
            },

            initCarOwnerTripList(){
                request.sendGet({
                    url: "/sharecar/trip/list",
                    params: {
                        pageNum:1,
                        pageSize:10
                    }
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
                    params: {
                        pageNum:1,
                        pageSize:10
                    }
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
               if(this.strokeType == '0'){
                   //乘客
                   Dialog.confirm({
                       title: '',
                       message: '是否确认已到达'
                   }).then(() => {
                       // 确定
                       request.sendPost({
                           url: "/sharecar/pass/arrive/" + val,
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
               }else {
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
               }
            },


            onClickLeft() {
                this.$router.back(-1)
            },
            goCarFate(val) {
                sessionStorage.setItem("strokeType","0");
                this.$router.push({path: '/carFate',query:{tripId:val}});
            },
            goPassengerList(val) {
                sessionStorage.setItem("strokeType","1");
                this.$router.push({path: '/passengerList',query:{tripId:val}});
            },
            linkCarPosition() {
                sessionStorage.setItem("strokeType","0");
                this.$router.push({path: '/carOwnPosition'});
            },

            //行车评价
            linkCarAppraise() {
                sessionStorage.setItem("strokeType","0");
                this.$router.push({path: '/carOwnerAppraise'});
            },
            linkOpt(val){
                sessionStorage.setItem("strokeType","0");
                this.$router.push({path:'/otherOpt',query:{tripId:val.tripId}})
            },
            linkUpdateStroke(val){
                sessionStorage.setItem("strokeType","1");
                this.$router.push({path:'/updateStroke',query:{tripId:val}})
            },

            //跳转取消
            linkToCancel(val) {

                if (this.strokeType == '0') {
                    sessionStorage.setItem("strokeType","0");
                    this.$router.push({path: '/cancelTrip-passenger', query: {tripId: val.tripId}})
                } else {
                    sessionStorage.setItem("strokeType","1");
                    this.$router.push({path: '/cancelTrip-driver', query: {tripId:val.tripId,seat:val.seatNum,confirm:val.confirmNum,unconfig:val.unconfirm}})
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
