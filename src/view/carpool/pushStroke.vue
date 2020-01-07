<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="openTimer">
                <van-col span="8">始发时间</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="stroke.tripDateTime" placeholder="请选择始发时间" disabled style="padding: 0"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="changeLine">
                <van-col span="8">线路</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="stroke.directLine" placeholder="请选择线路" disabled style="padding: 0"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="changePoint">
                <van-col span="8">方向</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="stroke.point" placeholder="请选择方向" disabled style="padding: 0"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="8">行驶路线</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="stroke.tripLine" type="textarea" autosize
                               placeholder="上河湾出发，李哥庄，绿地，果园，少年宫，万象城"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">发车地</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="stroke.startPlace" style="padding: 0" placeholder="请输入发车地"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">目的地</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="stroke.endPlace" style="padding: 0" placeholder="请输入目的地"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px" @click="openSeat">
                <van-col span="8">座位数</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="stroke.totalSeat" disabled style="padding: 0" placeholder="请输入座位数"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">价格</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="stroke.tripPrice" style="padding: 0" placeholder="请输入价格"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px" @click="changeCar">
                <van-col span="8">车辆信息</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="stroke.carInfo" style="padding: 0" placeholder="请选择车辆信息"/>
                </van-col>
                <van-col span="2">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;">
                <van-col span="8" style="display: flex;align-items: center;min-height: 80px"><span>备注信息</span></van-col>
                <van-col span="14" class="valStyle" style="min-height: 80px">
                    <van-field v-model="stroke.remark" style="padding: 0" type="textarea" autosize
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
            <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    @cancel="cancel"
                    @confirm="changeTimer"
                    :visible-item-count="3"
                    @formatter="formatDate"
            />
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
                showSeat:false,
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
                seatData:[{code:'1',name:'1位'},
                    {code:'2',name:'2位'},
                    {code:'3',name:'3位'},
                    {code:'4',name:'4位'},
                    {code:'5',name:'5位'},
                    {code:'6',name:'6位'}]
            }
        },
        methods: {
            openSeat(){
                this.showSeat= true;
            },
            formatDate(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
            onSeatChange(picker){
                this.stroke.totalSeat = picker.code;
                this.showSeat= false;
            },
            //线路
            onLineChange(picker, values) {
                this.stroke.directLine = picker.lineName;
                this.stroke.directLineid = picker.lineId;
                this.stroke.point = '';
                this.stroke.endPlace = '';
                this.stroke.startPlace = '';
                this.stroke.direction = '';
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
                this.stroke.carInfo = picker.name;
                this.stroke.carId = picker.id;
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
                this.stroke.direction = picker.pointId;
                this.stroke.point = picker.pointName;
                this.stroke.startPlace = picker.pointName;
                this.stroke.endPlace = picker.endPlace;
                this.showPoint = false;
            },
            //发布行程
            pushStroke() {
                if (!this.checked) {
                    Toast.fail("请同意协议再提交");
                    return;
                }
                if (!this.stroke.tripDateTime) {
                    Toast.fail("始发时间不能为空");
                    return;
                }
                if (!this.stroke.tripLine) {
                    Toast.fail("行驶路线不能为空");
                    return;
                }
                if (!this.stroke.totalSeat) {
                    Toast.fail("座位数不能为空");
                    return;
                }
                if (!this.stroke.tripPrice) {
                    Toast.fail("价格不能为空");
                    return;
                }
                request.sendPost({
                    url: '/sharecar/trip/add',
                    params: this.stroke
                }).then((res) => {
                    if (res.data.code == 0) {
                        Toast("行程发布成功,审核后自动发布行程");
                        this.$router.back(-1);
                    } else {
                        Toast(res.data.msg);
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
            changeTimer(val) {
                let timer = this.formatTime(val.getTime());
                this.stroke.tripDateTime = timer;
                this.showPop = false;
            },

            formatTime(timestamp) {
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                return moment(date).format("YYYY-MM-DD hh:mm")
            },

            initData() {
                request.sendGet({
                    url: '/sharecar/trip/defaultinfo',
                    params: {}
                }).then((res) => {
                    if (res.data.code === 0) {
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
                                this.stroke.directLineid = linesData[i].lineId;
                                this.stroke.directLine = linesData[i].lineName;
                                this.stroke.direction = linesData[i].endId;
                                this.stroke.point = linesData[i].endIdName;
                                this.stroke.startPlace = linesData[i].startName;
                                this.stroke.endPlace = linesData[i].endIdName;
                            }

                        }
                        let carinfo = res.data.data.carinfo;
                        for (let i in carinfo) {
                            let car = {};
                            car.id = i;
                            car.name = carinfo[i];
                            this.carData.push(car);
                        }
                        let tripinfo = res.data.data.tripinfo;
                        if (tripinfo) {
                            this.stroke.totalSeat = tripinfo.totalSeat;
                            this.stroke.tripPrice = tripinfo.tripPrice;
                            this.stroke.remark = tripinfo.remark;
                        }

                    }
                })
            }
        }
        ,
        created() {
            this.initData();
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


</style>
