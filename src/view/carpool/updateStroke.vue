<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">始发时间</van-col>
                <van-col span="16" class="valStyle" @click="openTimer">
                    <van-field v-model="stroke.tripDateTime" placeholder="请选择始发时间" disabled style="padding: 0"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">线路</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="stroke.directLine" placeholder="请选择线路" disabled style="padding: 0"/>
                </van-col>
                <van-col span="2" @click="changeLine">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">方向</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="stroke.point" placeholder="请选择方向" disabled style="padding: 0"/>
                </van-col>
                <van-col span="2" @click="changePoint">
                    <van-icon name="arrow" color="#9E9E9E"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="8">行驶路线</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="stroke.tripLine" type="textarea" autosize placeholder="上河湾出发，李哥庄，绿地，果园，少年宫，万象城"/>
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
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">座位数</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="stroke.totalSeat" style="padding: 0" placeholder="请输入座位数"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">价格</van-col>
                <van-col span="16" class="valStyle">
                    <van-field v-model="stroke.tripPrice" style="padding: 0" placeholder="请输入价格"/>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                <van-col span="8">车辆信息</van-col>
                <van-col span="14" class="valStyle">
                    <van-field v-model="stroke.carInfo" style="padding: 0" placeholder="请选择车辆信息"/>
                </van-col>
                <van-col span="2" @click="changeCar">
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

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 0px;" >
                <van-col span="24">
                    <van-checkbox v-model="checked" checked-color="#07c160" shape="square">阅读并同意<span
                            @click="goAgreement('1')">《免责协议和条款》</span>和<span @click="goAgreement('2')">《平台支付条款》</span>
                    </van-checkbox>
                </van-col>
            </van-row>

            <van-row >
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#0CC893" style="width: 100%;margin: 0 auto" @click="updateStroke">修改行程</van-button>
                </van-col>
            </van-row>

            <van-row >
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#9E9E9E" style="width: 100%;margin: 0 auto" @click="goback">取消</van-button>
                </van-col>
            </van-row>
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
        Field
    } from 'vant';
    import request from '../../utils/request'
    import moment from 'moment'

    export default {
        name: "updateStroke",
        components:{
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
            [Field.name]: Field
        },
        data(){
            return{
                checked: true,
                title: "修改行程",
                minDate: new Date(),
                currentDate: new Date(),
                showPop: false,
                showPoint: false,
                showLine: false,
                showCar:false,
                stroke: {
                    carBrand: "",
                    carColor: "",
                    carNumber: "",
                    carType: "",
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
                carData: []
            }
        },
        mounted(){
            this.initData();
            this.getStrokeDetails();
        },

        methods:{
            //行车详情
            getStrokeDetails(){
                let tripId = this.$route.query.tripId;

                request.sendGet({
                    url:"/sharecar/trip/select/"+tripId,
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){

                        let carinfo = res.data.data.carinfo;

                        let lineinfo = res.data.data.lineinfo;
                        let tripinfo = res.data.data.tripinfo;
                        let carKey = Object.keys(carinfo);
                        console.log(carKey);
                        this.stroke.carInfo = carinfo[carKey[0]];
                        this.stroke.tripId = tripId;
                        this.stroke.carId = carKey;

                        this.stroke.seatCount = tripinfo.totalSeat;
                        this.stroke.tripPrice =  tripinfo.tripPrice;
                        this.stroke.tripDateTime = tripinfo.tripDateTime;

                        this.stroke.remark = tripinfo.remark;

                        this.stroke.directLine = lineinfo.lineName;
                        this.stroke.directLineid = lineinfo.lineId;
                        this.stroke.tripLine = tripinfo.tripLine;
                        // this.stroke.point = ;
                        this.stroke.direction = tripinfo.direction;
                        this.stroke.startPlace = lineinfo.startName;
                        this.stroke.endPlace = lineinfo.endIdName;

                        //初始化方向
                        this.pointData2 = [];
                        console.log(this.pointData);
                        for (let i in this.pointData) {
                            if (this.pointData[i].lineId == lineinfo.lineId) {
                                //方向
                                if(this.pointData[i].endId == tripinfo.direction){
                                    this.stroke.point  = this.pointData[i].endIdName;
                                }

                                if(this.pointData[i].startId == tripinfo.direction){
                                    this.stroke.point  = this.pointData[i].startName;
                                }

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
                    }
                })
            },

            //修改行程
            updateStroke(){
                if (!this.checked) {
                    Toast.fail("请同意协议再提交");
                    return;
                }
                if (!this.stroke.tripDateTime) {
                    Toast.fail("始发时间不能为空");
                    return;
                }
                // if (!this.stroke.route) {
                //     Toast.fail("行驶路线不能为空");
                //     return;
                // }
                if (!this.stroke.totalSeat) {
                    Toast.fail("座位数不能为空");
                    return;
                }
                if (!this.stroke.tripPrice) {
                    Toast.fail("价格不能为空");
                    return;
                }
                console.log(this.stroke)
                request.sendPost({
                    url: '/sharecar/trip/update',
                    params: this.stroke
                }).then((res) => {
                    if (res.data.code == 0) {
                        Toast("更新成功");
                        this.$router.back(-1);
                    } else {
                        Toast(res.data.msg);
                    }
                })
            },

            //返回
            goback(){
                this.$router.back(-1);
            },

            //线路
            onLineChange(picker, values) {
                this.stroke.directLine = picker.lineName;
                this.stroke.directLineid = picker.lineId;
                this.stroke.point = '';
                this.stroke.endPlace = '';
                this.stroke.startPlace = '';
                this.stroke.direction = '';
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
            changeCar(){
                this.showCar = true;
            },
            onCarChange(picker, values){
                this.stroke.carInfo = picker.name;
                request.sendPost({
                    url: '/user/center/selectcar',
                    params: {
                        id: picker.id
                    }
                }).then((res)=>{
                    if(res.data.code===0){
                        this.stroke.carBrand = res.data.data.carBrand;
                        this.stroke.carColor = res.data.data.carColor;
                        this.stroke.carNumber = res.data.data.carNumber;
                        this.stroke.carType = res.data.data.carType;
                    }
                    this.showCar = false;
                })
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

            openTimer() {
                this.showPop = true;
            },
            cancel() {
                this.showPop = false
            },
            goAgreement(val) {
                this.$router.push({path: '/agreement', query: {name: '绿色出行用户协议',id:val}})
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
                                this.stroke.direction = linesData[i].endId;
                                this.stroke.startPlace = linesData[i].startName;
                                this.stroke.endPlace = linesData[i].endIdName;
                            }

                        }
                        let carinfo = res.data.data.carinfo;
                        for (let i in carinfo){
                            let car = {};
                            car.id = i;
                            car.name = carinfo[i];
                            this.carData.push(car);
                        }
                        let tripinfo = res.data.data.tripinfo;
                        if(tripinfo){
                            this.stroke.totalSeat = tripinfo.totalSeat;
                            this.stroke.tripPrice = tripinfo.tripPrice;
                            this.stroke.remark = tripinfo.remark;
                        }

                    }
                })
            }
        }
    }
</script>

<style scoped>
    body{
        background: #FFFFFF;
    }

    .contain{
        background: #FFFFFF;
    }

    .contain .content{
        border-top: 1px solid #ECECEC;
        width: 90%;
        margin: 46px auto 15px;
        color: #202020;
    }

    .contain .content .valStyle{
        color: #9E9E9E;
        font-size: 14px;
    }

</style>
