<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="openTimer">
                <van-col span="8">始发时间</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="tripInfo.tripDateTime" placeholder="请选择始发时间" disabled style="padding: 0"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="changeLine">
                <van-col span="8">线路</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="tripInfo.directLine" placeholder="请选择线路" disabled style="padding: 0"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="changePoint">
                <van-col span="8">方向</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="tripInfo.point" placeholder="请选择方向" disabled style="padding: 0"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="8">行驶路线</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="tripInfo.tripLine" type="textarea" autosize
                               placeholder="上河湾出发，李哥庄，绿地，果园，少年宫，万象城"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">发车地</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="tripInfo.startPlace" style="padding: 0" placeholder="请输入发车地"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">目的地</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="tripInfo.endPlace" style="padding: 0" placeholder="请输入目的地"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="openSeat">
                <van-col span="8">座位数</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="tripInfo.totalSeat" disabled style="padding: 0" placeholder="请输入座位数"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="openPrice">
                <van-col span="8">价格</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="tripInfo.tripPrice" disabled style="padding: 0" placeholder="请输入价格"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px" @click="changeCar">
                <van-col span="8">车辆信息</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="tripInfo.carInfo" style="padding: 0" placeholder="请选择车辆信息"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;">
                <van-col span="8" style="display: flex;align-items: center;min-height: 80px"><span>备注信息</span></van-col>
                <van-col span="14" class="valStyle" style="min-height: 80px">
                    <van-field v-model="tripInfo.remark" style="padding: 0" type="textarea" autosize
                               placeholder="请输入备注信息"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 0px;font-size: 13px">
                <van-col span="24">
                    <van-checkbox v-model="checked" checked-color="#07c160" shape="square">阅读并同意<span
                            @click="goAgreement('1')">《免责协议和条款》</span>和<span @click="goAgreement('2')">《平台支付条款》</span>
                    </van-checkbox>
                </van-col>
            </van-row>

            <van-row>
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#0CC893" style="width: 100%;margin: 0 auto" @click="pushStroke">
                        发布行程
                    </van-button>
                </van-col>
            </van-row>

            <van-row>
                <van-col span="24" style="padding: 10px 0">
                    <van-button @click="onClickLeft" type="default" color="#9E9E9E" style="width: 100%;margin: 0 auto">
                        取消
                    </van-button>
                </van-col>
            </van-row>
        </div>

        <div class="footer">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>

        <van-popup v-model="showLine" position="bottom" :style="{height:'30%'}">
            <van-picker :columns="lineData" value-key="lineName" show-toolbar @cancel="showLine = false"
                        :visible-item-count="3"
                        @confirm="onLineChange"/>
        </van-popup>
        <van-popup v-model="showPop" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="datesColumns" show-toolbar @cancel="cancel " :visible-item-count="3"
                        @confirm="changeTimer"/>
        </van-popup>

        <van-popup v-model="showPoint" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="pointData2" show-toolbar value-key="pointName" @cancel="showPoint = false"
                        :visible-item-count="3"
                        @confirm="onChange"/>
        </van-popup>

        <van-popup v-model="showCar" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="carData" show-toolbar value-key="name" @cancel="showCar = false"
                        :visible-item-count="3"
                        @confirm="onCarChange"/>
        </van-popup>

        <van-popup v-model="showSeat" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="seatData" show-toolbar value-key="name" @cancel="showSeat = false"
                        :visible-item-count="3"
                        @confirm="onSeatChange"/>
        </van-popup>

        <van-popup v-model="showPrice" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="priceData" show-toolbar  @cancel="showPrice = false"
                        :visible-item-count="3"
                        @confirm="onPriceChange"/>
        </van-popup>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {
        Cell,
        CellGroup,
        DatetimePicker,
        Popup,
        Row,
        Col,
        Icon,
        Picker,
        Checkbox,
        CheckboxGroup,
        Button,
        Toast,
        Field,
        Tabbar,
        TabbarItem
    } from 'vant';
    import request from '../../utils/request'
    import moment from 'moment'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        name: "pushStroke",
        components: {
            Title,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Picker.name]: Picker,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Button.name]: Button,
            [Toast.name]: Toast,
            [Field.name]: Field,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                showPrice:false,
                showSeat: false,
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                active: 2,
                checked: true,
                title: "发布行程",
                minDate: new Date(),
                currentDate: new Date(),
                showPop: false,
                showPoint: false,
                showLine: false,
                showCar: false,
                stroke: {
                    carId: '',
                    directLineid: "",
                    directLine: "",
                    point: "",
                    endPlace: "",
                    startPlace: "",
                    totalSeat: "",
                    tripDateTime: "",
                    tripLine: "",
                    tripPrice: "",
                    route: "",
                    carInfo: "",
                    remark: ""
                },
                pointData: [],
                pointData2: [],
                lineData: [],
                carData: [],
                priceData:[
                    18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35
                ],

                seatData: [{code: '1', name: '1位'},
                    {code: '2', name: '2位'},
                    {code: '3', name: '3位'},
                    {code: '4', name: '4位'},
                    {code: '5', name: '5位'},
                    {code: '6', name: '6位'}],
                datesColumns: [],
                tripInfo: {},
            }
        },
        methods: {
            openPrice(){
                this.showPrice = true;
            },
            onPriceChange(val){
                this.tripInfo.tripPrice = val;
                this.showPrice = false;
            },

            openSeat() {
                this.showSeat = true;
            },
            onSeatChange(picker) {
                this.tripInfo.totalSeat = picker.code;
                this.showSeat = false;
            },
            //线路
            onLineChange(picker) {
                this.tripInfo.directLine = picker.lineName;
                this.tripInfo.directLineid = picker.lineId;
                this.tripInfo.point = '';
                this.tripInfo.direction = '';
                this.pointData2 = [];
                for (let i in this.pointData) {
                    if (this.pointData[i].lineId === picker.lineId) {
                        let point1 = {
                            "pointId": this.pointData[i].endId,
                            "pointName": this.pointData[i].endIdName,
                            "endPlace": this.pointData[i].startName
                        };
                        let point2 = {
                            "pointId": this.pointData[i].startId,
                            "pointName": this.pointData[i].startName,
                            "endPlace": this.pointData[i].endIdName
                        };
                        this.pointData2.push(point1);
                        this.pointData2.push(point2);
                        this.tripInfo.direction = this.pointData[i].endId;
                        this.tripInfo.point = this.pointData[i].endIdName;
                    }
                }
                this.showLine = false;
            },
            changeLine() {
                this.showLine = true;
            },
            changeCar() {
                this.showCar = true;
            },
            onCarChange(picker, values) {
                this.tripInfo.carInfo = picker.name;
                this.tripInfo.carId = picker.id;
                this.showCar = false;
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            changePoint() {
                this.showPoint = true;
            },
            //方向
            onChange(picker, values) {
                this.tripInfo.direction = picker.pointId;
                this.tripInfo.point = picker.pointName;
                this.showPoint = false;
            },
            //发布行程
            pushStroke() {
                if (!this.checked) {
                    Toast.fail("请同意协议再提交");
                    return;
                }
                if (!this.tripInfo.tripDateTime) {
                    Toast.fail("始发时间不能为空");
                    return;
                }
                if (!this.tripInfo.tripLine) {
                    Toast.fail("行驶路线不能为空");
                    return;
                }
                if (!this.tripInfo.totalSeat) {
                    Toast.fail("座位数不能为空");
                    return;
                }
                if (!this.tripInfo.tripPrice) {
                    Toast.fail("价格不能为空");
                    return;
                }
                request.sendPost({
                    url: '/sharecar/trip/add',
                    params: this.tripInfo
                }).then((res) => {
                    if (res.data.code === 0) {
                        Toast("行程发布成功,审核后自动发布行程");
                        this.$router.back(-1);
                    } else{
                        Toast.fail(res.data.msg);
                    }
                })
            },
            openTimer() {
                this.showPop = true;
            },
            cancel() {
                this.showPop = false
            },
            goAgreement(val) {
                this.$router.push({path: '/agreement', query: {name: '绿色出行用户协议', id: val}})
            },
            changeTimer(picker) {
                let timer = '';
                let year = moment().format("YYYY");
                let str = picker[0].split("月");
                let month = str[0];
                let day = str[1].split("日")[0];
                let hour = picker[1].split("点")[0];
                let minute = picker[2].split("分")[0];
                timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                this.tripInfo.tripDateTime = timer;
                this.showPop = false;
            },

            initData() {
                request.sendGet({
                    url: '/sharecar/trip/defaultinfo',
                    params: {}
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.tripInfo = res.data.data.tripinfo?res.data.data.tripinfo:{};
                        let linesData = res.data.data.lineinfo;
                        for (let i in linesData) {
                            let point = {};
                            point.endId = linesData[i].endId;
                            point.startId = linesData[i].startId;
                            point.endIdName = linesData[i].endIdName;
                            point.startName = linesData[i].startName;
                            point.lineId = linesData[i].lineId;
                            this.pointData.push(point);
                            let line = {};
                            line.lineId = linesData[i].lineId;
                            line.lineName = linesData[i].lineName;
                            this.lineData.push(line);
                            if (linesData[i].default === 1) {
                                this.onLineChange(linesData[i]);
                            }

                        }
                        let carinfo = res.data.data.carinfo;
                        for (let i in carinfo) {
                            let car = {};
                            car.id = i;
                            car.name = carinfo[i];
                            this.carData.push(car);
                            this.tripInfo.carInfo = car.name;
                            this.tripInfo.carId = car.id;
                        }
                    }else if(res.data.code===400) {
                        this.$router.push({path: '/simpleAuth'});
                    }else if(res.data.code===401){
                        Toast(res.data.msg);
                    }
                })
            },
            monthDay() {
                let dates = [];
                let hours = [];
                let minutes = [];

                for (let i = 0; i < 60; i++) {
                    if (i < 10) {
                        minutes[i] = '0' + i + '分';
                    } else {
                        minutes[i] = i + '分';
                    }
                }
                for (let i = 0; i < 24; i++) {
                    if (i < 10) {
                        hours[i] = '0' + i + '点';
                    } else {
                        hours[i] = i + '点';
                    }

                }
                for (let i = 0; i < 365; i += 1) {
                    dates[i] = moment().add(i, 'days').locale('zh-cn').format("MM月DD日dddd");
                }
                this.datesColumns = [
                    {
                        values: Object.values(dates),
                        className: 'day'
                    },
                    {
                        values: Object.values(hours),
                        className: 'hour',
                        defaultIndex: 2,
                    },
                    {
                        values: Object.values(minutes),
                        className: 'min',
                        defaultIndex: 3
                    }
                ];
            }
        },
        created() {
            this.initData();
            this.monthDay();
        }
    }
</script>

<style scoped>
    body {
        background: #FFFFFF;
    }

    .contain {
        background: #FFFFFF;
    }

    .contain .content {
        border-top: 1px solid #ECECEC;
        width: 90%;
        margin: 0px auto 45px;
        color: #202020;
    }

    .contain .content .valStyle {
        color: #9E9E9E;
        font-size: 14px;
    }

    .footer {
        width: 100%;
    }

    /deep/ .day {
        flex: 0.6 !important;
    }

    /deep/ .min {
        flex: 0.2 !important;
    }

    /deep/ .hour {
        flex: 0.2 !important;
    }


</style>
