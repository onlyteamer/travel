<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="6">预定座位数</van-col>
                <van-col span="18">
                    <van-col v-for="item in stroke.totalSeats" style="padding-bottom:5px " :key="item">
                        <van-tag :color="stroke.seatCount == item?'#0CC893':'#FFFFFF'"
                                 :text-color="stroke.seatCount == item?'#FFFFFF':'#202020'" class="seatTag"
                                 @click="changeSeat(item)">{{item}}座
                        </van-tag>
                    </van-col>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">剩余{{stroke.totalSeats-stroke.bookSeat}}座</van-col>
                <van-col span="14" style="color: #FF0200">每人限预定{{stroke.totalSeats}}座</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center">
                <van-col span="13">
                    <div>
                        <van-field
                                v-model="stroke.startPlace"
                                placeholder="上车地点"
                                label=""
                                label-width="5px"
                                :left-icon="greenBar"
                        />
                    </div>
                </van-col>
                <van-col span="11">
                    <van-button size="small">上次行程上车地点
                        <van-icon name="location" color="#0CC893"/>
                    </van-button>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center">
                <van-col span="13">
                    <div>
                        <van-field
                                v-model="stroke.endPlace"
                                placeholder="下车地点"
                                label=""
                                label-width="5px"
                                :left-icon="redBar"
                        />
                    </div>
                </van-col>
                <van-col span="11">
                    <van-button size="small">上次行程上车地点
                        <van-icon name="location" color="#FF0200"/>
                    </van-button>
                </van-col>
            </van-row>

            <van-row style="display: flex;align-items: center">
                <van-col span="24">
                    <van-field v-model="stroke.riderNames" placeholder="乘客人姓名" label="" label-width="5px"
                               left-icon="user-circle-o" disabled/>
                </van-col>
            </van-row>

            <van-row style="display: flex;align-items: center;border-bottom: 1px solid #ECECEC;padding: 0px 2px 12px">
                <van-col span="15">
                    <div>
                        <van-tag :color="stroke.riderIds === item.id?'#0CC893':'#FFFFFF'"
                                 :text-color="stroke.riderIds === item.id?'#FFFFFF':'#202020'"
                                 style="border: 1px solid #CFCFCF" class="contactTag"
                                 v-for="item in normalRiders" :key="item.id" @click="selectRider(item)">
                            {{item.passName}}
                        </van-tag>
                    </div>
                </van-col>
                <van-col span="9" align="right" @click="goPassenger">（常用联系人）</van-col>
            </van-row>


            <van-row style="border-bottom: 1px solid #ECECEC;padding: 8px 0px">
                <van-col span="24">
                    <div>
                        <van-field
                                placeholder="大件行李——如有行李请备注"
                                label=""
                                label-width="5px"
                                left-icon="cart-circle"
                        />
                    </div>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 8px 0px">
                <van-col span="24">
                    <van-field v-model="stroke.phone" placeholder="乘客手机号" label="" label-width="5px"
                               left-icon="phone-circle-o"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 0px;">
                <van-col span="24">
                    <van-checkbox v-model="checked" checked-color="#07c160" shape="square">阅读并同意《免责协议和条款》和《平台支付条款》
                    </van-checkbox>
                </van-col>
            </van-row>

            <van-row>
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#0CC893" style="width: 100%;margin: 0 auto" @click="reserveCar">
                        预定（{{stroke.price}}元/座）
                    </van-button>
                </van-col>
            </van-row>

            <van-row>
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#9E9E9E" style="width: 100%;margin: 0 auto" @click="goMyStroke">
                        取消
                    </van-button>
                </van-col>
            </van-row>
        </div>
        <div class="footer">
            <div>
                <van-icon name="warning" color="#F55456"/>
                注意:
            </div>
            <div class="notice">
                1. 后台设置规则1；设置规则1；设置规则1； 1. 后台设置规则1设置规则1；设置规则1；； 1. 后台设置规则1；
            </div>

        </div>
        <van-popup v-model="showPassenger" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="passengerData" show-toolbar value-key="passName" @cancel="showPassenger = false"
                        :visible-item-count="3"
                        @confirm="onPassengerChange"/>
        </van-popup>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Icon, Checkbox, CheckboxGroup, Button, Tag, Field, Popup, Picker, Toast} from 'vant';

    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'
    import request from '../../utils/request'

    export default {
        name: "reserve",
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Button.name]: Button,
            [Tag.name]: Tag,
            [Field.name]: Field,
            [Toast.name]: Toast,
            [Popup.name]: Popup,
            [Picker.name]: Picker
        },
        data() {
            return {
                showPassenger: false,
                passengerData: [],
                redBar: redBar,
                greenBar: greenBar,
                checked: true,
                title: "预约",
                normalRiders: [],
                stroke: {
                    startPlace: "",
                    endPlace: "",
                    tripId: "",
                    riderNames: '',
                    riderIds: '',
                    phone: "",
                    seatCount: "",
                    price: "",
                    remark: "",
                    bookSeat: "",
                    totalSeats: ""
                }
            }
        },
        methods: {
            onPassengerChange(picker, values) {
                this.stroke.riderNames = picker.passName;
                this.stroke.riderIds = picker.id;
                this.stroke.phone = picker.passPhone;
                this.showPassenger = false;
            },
            goPassenger() {
                this.showPassenger = true;
            },
            //预约
            reserveCar() {
                if (!this.checked) {
                    Toast.fail("请选协议后进行操作");
                    return;
                }

                if (!this.stroke.phone) {
                    Toast.fail("乘客手机号不能为空");
                    return;
                }
                if (!this.stroke.startPlace) {
                    Toast.fail("上车地点不能为空");
                    return;
                }
                if (!this.stroke.endPlace) {
                    Toast.fail("下车地点不能为空");
                    return;
                }

                if (!this.stroke.riderIds) {
                    Toast.fail("乘客不能为空");
                    return;
                }

                request.sendPost({
                    url: '/sharecar/pass/booktrip',
                    params: this.stroke
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$router.push({path: '/myStroke'});
                    } else {
                        Toast(res.data.msg);
                    }

                })

            },
            onClickLeft() {
                this.$router.back(-1);
            },
            goMyStroke() {
                this.$router.push({path: '/myStroke'});
            },
            changeSeat(item) {
                let val = this.stroke.totalSeats - this.stroke.bookSeat;
                if (item > val) {
                    return;
                }
                this.stroke.seatCount = item;
            },
            selectRider(data) {
                this.stroke.riderNames = data.passName;
                this.stroke.riderIds = data.id;
                this.stroke.phone = data.passPhone;
            },
            queryTrip() {
                request.sendPost({
                    url: '/sharecar/pass/booktripinfo/' + this.stroke.tripId,
                    params: {}
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.normalRiders = res.data.data.passengerList;
                        if (this.normalRiders.length > 0) {
                            this.stroke.riderNames = this.normalRiders[0].passName;
                            this.stroke.riderIds = this.normalRiders[0].id;
                            this.stroke.phone = this.normalRiders[0].passPhone;
                        }
                        this.stroke.startPlace = res.data.data.startPlace;
                        this.stroke.endPlace = res.data.data.endPlace;
                        this.stroke.price = res.data.data.tripPrice;
                        this.stroke.bookSeat = res.data.data.bookSeat;
                        this.stroke.totalSeats = res.data.data.totalSeats;
                    }
                })
            },
            initPassengerData() {
                //TODO 需要处理一下分页
                request.sendGet({
                    url: '/sharecar/pass/list',
                    params: {
                        pageSize: 99,
                        pageNum: 1,
                    }
                }).then((res) => {
                    this.passengerData = res.data.rows;

                });
            },
        },
        created() {
            this.stroke.tripId = this.$route.query.id;
            this.queryTrip();
            this.initPassengerData();
        }
    }
</script>

<style scoped>
    body {
        background: #FFFFFF;
    }

    .contain {
        background: #FFFFFF;
        font-size: 14px;
    }

    .contain .content {
        border-top: 1px solid #ECECEC;
        width: 90%;
        margin: 46px auto 0;
        color: #202020;
    }

    .contain .content .valStyle {
        color: #9E9E9E;
        font-size: 14px;
    }

    .seatTag {
        width: 30px;
        height: 20px;
        font-size: 16px;
        margin-left: 5px;
        justify-content: center;
        border: 1px solid #CFCFCF
    }

    .contactTag {
        width: 30px;
        height: 20px;
        font-size: 14px;
        margin-right: 5px;
        justify-content: center;
    }

    .van-cell {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0px;
        overflow: hidden;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
    }

    .footer {
        width: 90%;
        margin: 0 auto;
        padding: 5px 0;
    }

    .footer .notice {
        margin-top: 6px;
        line-height: 24px;
    }

</style>
