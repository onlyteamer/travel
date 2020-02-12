<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div style="margin-bottom: 55px">
            <div class="black" v-for="(item,index) in passList" :key="index">
                <div>
                    <van-row style="display: flex;align-items: center"
                             @click="goPassengerDetails(item.showPassenger.userId)">
                        <van-col span="14">
                            <div style="display: flex;align-items: center">
                                <img :src="item.showPassenger.headimgurl?item.showPassenger.headimgurl:defaultAvatar"
                                     style="height: 50px;width: 50px;margin-right: 10px">
                                <div>
                                    <p style="margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">{{item.showPassenger.nickname}}</span>
                                        <img src="../../static/images/sexTag.png"
                                             style="width: 12px;height: 12px;margin-left: 5px"
                                             v-if="item.showPassenger.sex == '1'"><img
                                                src="./../../static/images/man.png"
                                                style="width: 12px;height: 12px;margin-left: 5px"
                                                v-else></p>
                                    <p style="margin: 5px 0">
                                        <img src="./../../static/images/xin.png"
                                             style="width: 14px;height: 14px;margin-right: 5px"/><span>{{item.showPassenger.goodCount}}</span>
                                        <img src="./../../static/images/unhapply.png"
                                             style="width: 14px;height: 14px;margin: 0 5px 0 20px"/> <span>{{item.showPassenger.badCount}}</span>
                                    </p>
                                    <p style="margin: 5px 0">
                                        <span style="color: #5E5E5E">乘车地点：{{item.showPassenger.startPlace}}</span>
                                    </p>
                                </div>
                            </div>
                        </van-col>
                        <van-col span="10" align="right">
                            <div>
                                <div class="userType" v-if="item.showPassenger.tag == '0'">乘客</div>
                            </div>
                            <div style="color: #5E5E5E;margin: 5px 0">乘坐过 {{item.showPassenger.passCount}} 次</div>
                            <div>
                                <div style="color: #5E5E5E">下车地点：{{item.showPassenger.endPlace}}</div>
                            </div>
                        </van-col>
                    </van-row>
                    <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
                    <!--乘客状态：0:待确认 1:已确认 2:已拒绝 3:已取消-->
                    <van-row gutter="10">
                        <van-col span="6" v-if="item.refuseBtn===1">
                            <van-button type="default" color="#9E9E9E" size="mini"
                                        style="line-height: 34px;height: 34px;font-size: 14px;width: 100%"
                                        @click="confirmTrip(item.showPassenger)">
                                拒绝
                            </van-button>
                        </van-col>
                        <van-col span="6" v-if="item.agreeBtn===1">
                            <van-button type="default" color="#0CC893" size="mini"
                                        style="line-height: 34px;height: 34px;font-size: 14px;width: 100%;"
                                        @click="passTrip(item.showPassenger)">预约确定
                            </van-button>
                        </van-col>
                        <van-col span="6" v-if="item.arriveBtn===1">
                            <van-button type="default" color="#0CC893" size="mini"
                                        style="line-height: 34px;height: 34px;font-size: 14px;width: 100%;"
                                        @click="changeArrive(item.showPassenger.userId)">已到达
                            </van-button>
                        </van-col>
                        <van-col span="6" v-if="item.phoneBtn===1">
                            <van-button type="default" color="#0CC893" size="mini"
                                        style="line-height: 34px;height: 34px;font-size: 14px;width: 100%;"
                                        @click="call(item.showPassenger.telphone)">电话
                            </van-button>
                        </van-col>
                        <!--tripState 行程状态：0 待出行 1 已完成 2 已取消 3 已终止 4 已发车 5 待确认 -->
                        <van-col span="6" style="margin-right: 10px" v-if="item.evaluateBtn===1">
                            <van-button type="default" @click="goPassengerAppraise(item.showPassenger.userId)" color='#0CC893'
                                        style="line-height: 34px;height: 34px;font-size: 14px;width: 100%;">评价
                            </van-button>
                        </van-col>
                        <!--预约状态：0 未确认，1 已确认，2 已拒绝， 3 已取消，4 已到达 5 已支付-->
                        <van-col span="6" style="float: right;text-align:right;"
                                 v-if="item.showPassenger.passState !== 0">
                            <span style="color:#FFFFFF;height: 34px;font-size: 14px;width: fit-content;padding: 3px 4px;border-radius: 5px;background: #0CC893;margin-left: 10px"
                                  v-if="item.showPassenger.passState === 1||item.showPassenger.passState === 4">
                                 {{item.showPassenger.passState === 1?'已确认':'已到达'}}
                            </span>
                            <span style="color:#FFFFFF;height: 34px;font-size: 14px;width: fit-content;padding: 3px 4px;background: #ff2626;border-radius: 5px;margin-left: 10px"
                                  v-if="item.showPassenger.passState === 2 ||item.showPassenger.passState === 3">
                                {{item.showPassenger.passState === 2?'已拒绝':'已取消'}}
                            </span>
                            <span style="color:#FFFFFF;background:#5083ED;padding:3px 4px;border-radius:5px;height: 34px;font-size: 14px;width: fit-content;margin-left: 10px"
                                  v-if="item.showPassenger.passState === 5">
                               已支付
                            </span>
                        </van-col>
                    </van-row>
                    <!--乘客状态：0:待确认 1:已确认 2:已拒绝 3:已取消-->
                </div>
            </div>
        </div>

        <div style="width: 100%">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>
        <van-popup v-model="showtime" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="timeData" show-toolbar @cancel="showtime = false"
                        :visible-item-count="3"
                        @confirm="ontimeChange"/>
        </van-popup>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Divider, Popup, Button, Dialog, Tabbar, TabbarItem, Picker} from 'vant';

    import avatar from "../../static/images/userAvatar.png"

    import request from '../../utils/request'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        name: "passengerList",
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Divider.name]: Divider,
            [Button.name]: Button,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [Dialog.name]: Dialog,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
        },
        data() {
            return {
                showtime: false,
                active: "",
                title: "乘客列表",
                passList: [],
                defaultAvatar: avatar,
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                tripState: '',
                tripId: '',
                timeData: ['1分钟', '5分钟', '10分钟', '15分钟', '20分钟', '25分钟', '30分钟'],
                definition:{
                    bookId:'',
                    tripId:'',
                }
            }
        },
        mounted() {
            this.tripState = this.$route.query.tripState;
            this.tripId = this.$route.query.tripId;
            //初始化列表数据
            this.initPassList();

        },

        methods: {
            ontimeChange(value) {
                request.sendPost({
                    url: '/sharecar/trip/confirm',
                    params: {
                        bookId: this.definition.bookId,
                        state: 1,//1预约确认 2拒绝
                        tripId: this.definition.tripId,
                        minute:value.split("分钟")[0]
                    }
                }).then(res => {
                    //刷新列表
                    if (res.data.code === 0) {
                        this.initPassList();
                        this.$toast(res.data.msg);
                        this.showtime = false;
                    }
                })
            },
            call(val) {
                if (val) {
                    window.location.href = "tel:" + val;
                } else {
                    this.$toast("暂无联系方式");
                }
            },
            changeArrive(passengerId) {
                let tripId = this.tripId;
                Dialog.confirm({
                    title: '已到达',
                    message: '车主已到达发车地点，通知乘客乘车地点等候'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/sharecar/trip/arrive/" + tripId,
                        params: {
                            passengerId: passengerId
                        }
                    }).then(res => {
                        if (res.data.code == '0') {
                            this.$toast.success(res.data.msg)
                        } else {
                            this.$toast.fail(res.data.msg)
                        }
                    })
                }).catch(() => {
                    //取消

                });
            },
            //行车评价
            goPassengerAppraise(val) {
                let tripId = this.tripId;
                this.$router.push({path: '/passengerAppraise', query: {tripId: tripId, passengerId: val}});
            },

            goPassengerDetails(val) {
                this.$router.push({path: '/passengerDetails', query: {userId: val}});
            },
            initPassList() {
                //获取行程id
                let tripId = this.tripId;

                request.sendGet({
                    url: "/sharecar/trip/passlist/" + tripId,
                    params: {}
                }).then(res => {
                    if (res.data.code == 0) {
                        this.passList = res.data.rows;
                    }
                })
            },

            confirmTrip(val) {
                Dialog.confirm({
                    title: '拒绝确定',
                    message: '是否拒绝该乘客乘车？'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: '/sharecar/trip/confirm',
                        params: {
                            bookId: val.bookId,
                            state: 2,//1预约确认 2拒绝
                            tripId: val.tripId
                        }
                    }).then(res => {
                        //刷新列表
                        if (res.data.code === 0) {
                            this.initPassList();
                            this.$toast(res.data.msg);
                        }
                    })
                }).catch(() => {
                    //取消

                });
            },
            passTrip(val) {
                this.showtime = true;
                this.definition.bookId=val.bookId;
                this.definition.tripId=val.tripId;
            }
        }
    }
</script>

<style scoped>

    .black {
        width: 90%;
        margin: 10px auto;
        padding: 5px 10px 10px 5px;
        background: #FFFFFF;
        font-size: 14px;
    }

    .userType {
        width: fit-content;
        padding: 2px 8px;
        border-radius: 5px;
        color: #FFFFFF;
        background: #0CC893;
    }

    .removeTag {
        width: fit-content;
        padding: 2px 8px;
        margin-top: 10px;
        color: #0CC893;
        border-radius: 5px;
        border: 1px solid #0CC893;
    }
</style>
