<template>
    <div>
        <div>
            <!--<van-nav-bar :fixed="true" :title="busInfo.linename" left-arrow @click-left="onClickLeft"/>-->
            <van-nav-bar :fixed="true" :title="busInfo.linename"/>
        </div>
        <div class="content">
            <div class="line-info-wrap">
                <div class="line-info">
                    <div>
                        <div>
                            <van-icon name="location" color="#0CC893"/>
                            <span style="font-size: 16px">{{busInfo.startname}}</span></div>
                        <div style="text-align: center;font-size: 14px">{{busInfo.starttime}}</div>
                    </div>
                    <div>
                        <img src="../../static/images/right.png" width="51px" height="30px">
                    </div>
                    <div>
                        <div>
                            <van-icon name="location" color="#FF0200"/>
                            <span style="font-size: 16px">{{busInfo.endname}}</span></div>
                        <div style="text-align: center;font-size: 14px">{{busInfo.endtime}}</div>
                    </div>
                </div>
            </div>
            <div style=" background-color: white;">
                <div class="date-title">
                    <van-row>
                        <van-col span="6" style="text-align: center">
                            <van-button icon="arrow-left" type="primary" @click="preMonth" plain
                                        color="#333" style="border:none;"/>
                        </van-col>
                        <van-col span="12" style="text-align: center">
                            <span>{{dateTitle}}</span>
                        </van-col>
                        <van-col span="6" style="text-align: center">
                            <van-button icon="arrow" type="primary" @click="nextMonth" plain color="#333"
                                        style="border:none;"/>
                        </van-col>
                    </van-row>
                </div>
                <div class="data-week-title">
                    <span v-for="item in week" :key="item">{{item}}</span>
                </div>
                <div v-for="val in ticketData" class="date-li">
                    <div v-for="(item,index) in val" :class="getItemClass(item)" ref="item" @click="addBuyTicket(item)">
                        <div>{{item?item.date:'&nbsp;&nbsp;&nbsp;&nbsp;'}}</div>
                        <div :class="generateClassName(item)" style="font-size: 12px;">{{item?item.statename:'&nbsp;&nbsp;&nbsp;&nbsp;'}}</div>
                    </div>
                </div>
            </div>
            <div class="tick-wrap">
                <span style="color: #202020;font-size: 16px;">张数</span>
                <span>
                    <span style="color: #0CC893;font-size: 22px;">{{num}}</span>
                    <span style="color: #202020;font-size: 16px;">张</span>
                </span>
            </div>
            <div class="tick-wrap">
                <span style="color: #202020;font-size: 16px;">票价</span>
                <span style="color: #FF0200;font-size: 22px;">￥{{amount}}</span>
            </div>

            <div class="btn-wrap">
                <van-button @click="buy" style="width: 100%;height:44px" color="#0CC893" type="default">
                    确认购票
                </van-button>
            </div>
            <div style="padding: 10px">
                <div>
                    <van-icon name="warning" color="#F55456"/>
                    注意:
                </div>
                <div class="notice">
                    <div>
                        1、每人每次能购买一张车票
                    </div>
                    <div>
                        2、如购买多张，需要多次购买
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="car" to="/busIndex">预定巴士</van-tabbar-item>
                <van-tabbar-item :icon="scan" to="/ticketList">乘车验票</van-tabbar-item>
                <van-tabbar-item :icon="user" to="/user">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Icon, Tabbar, TabbarItem, Row, Col} from 'vant';
    import Kalendar from 'kalendar';
    import request from '../../utils/request';
    import moment from 'moment';

    import car from './../../static/images/busTrip/car.png'
    import scan from './../../static/images/busTrip/scan.png'
    import user from './../../static/images/busTrip/user.png'

    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Icon.name]: Icon,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
        },
        data() {
            return {
                startnum: 0,//日期从第几位开始
                user: user,
                car: car,
                scan: scan,
                active: "",
                num: 0,//购票张数
                amount: 0,
                currentDate: moment(),
                chooseDate: [],
                busid: '',
                lineid: '',
                busInfo: {
                    busnumber: "",
                    endid: "",
                    endname: "",
                    endtime: "",
                    lineid: "",
                    linename: "",
                    startid: "",
                    startname: "",
                    starttime: "",
                    ticketPrice: ""
                },
                ticketData: {},
                data: [],
                dateTitle: moment().format('YYYY年MM月'),
                week: ["日", "一", "二", "三", "四", "五", "六"]
            }
        },
        methods: {
            nextMonth() {
                this.currentDate = moment(this.currentDate, 'YYYY-MM').add(1, 'months');
                this.dateTitle = this.currentDate.format('YYYY年MM月');
                let elArr = this.$refs.item;
                for (let i = 0; i < elArr.length; i++) {
                    let el = elArr[i];
                    el.classList.remove('choose');
                }
                this.initData();
            },
            preMonth() {
                this.currentDate = moment(this.currentDate, 'YYYY-MM').subtract(1, 'months');
                this.dateTitle = this.currentDate.format('YYYY年MM月');

                let elArr = this.$refs.item;
                for (let i = 0; i < elArr.length; i++) {
                    let el = elArr[i];
                    el.classList.remove('choose');
                }

                this.initData();

            },
            getItemClass(item) {
                if (item) {
                    switch (item.state) {
                        case 2:
                            return 'date-item date-item-bought';
                        case  5:
                            return 'date-item date-item-sellOut';
                        default:
                            return 'date-item date-item-default';
                    }
                }
                return 'date-item date-item-default';
            },
            generateClassName(item) {
                if (item) {
                    switch (item.state) {
                        case 0:
                            return '';
                        case 1:
                            return 'haveTicket';
                        case 2:
                            return 'bought';
                        case 3:
                            return 'rest';
                        case 4:
                            return 'saleStop';
                        case 5:
                            return 'sellOut';
                    }
                }
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            addBuyTicket(item) {
                if (item && (item.state === 1 || item.state === 2)) {
                    let index2 = this.chooseDate.indexOf(item.dateText);
                    if (index2 === -1) {
                        this.chooseDate.push(item.dateText);
                        let el = this.$refs.item[item.date - 1 + this.startnum];
                        el.classList.add('choose');
                        // el.style.backgroundColor = '#0CC893';
                        // el.style.color = '#fff';
                        this.num += 1;
                    } else {
                        this.chooseDate.splice(index2, 1);
                        let el = this.$refs.item[item.date - 1 + this.startnum];
                        el.classList.remove('choose');
                        //  if (item.state === 2) {
                        //      el.style.backgroundColor = '#5083ED';
                        //      el.style.color = '#fff';
                        //  } else {
                        //      el.style.backgroundColor = '#fff';
                        //      el.style.color = '#202020';
                        // }

                        this.num -= 1;
                    }
                    this.amount = this.num * this.busInfo.ticketPrice;
                }
            },
            buy() {
                if (this.num === 0) {
                    this.$toast.fail("请先选择车票日期");
                    return;
                }
                this.$router.push({
                    path: '/ticketPayment',
                    query: {
                        'num': this.num,
                        'amount': this.amount,
                        'busid': this.busid,
                        'lineid': this.lineid,
                        'dateStr': this.chooseDate
                    }
                });
            },
            queryBus() {
                request.sendPost({
                    url: '/bus/selectLineInfo/' + this.busid,
                    params: {}
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.busInfo = res.data.data;
                    }
                })
            },
            initData() {
                let currentDate = this.currentDate.format('YYYY-MM')
                request.sendPost({
                    url: '/bus/ticketlist',
                    params: {
                        month: currentDate,
                        busid: this.busid,
                        lineid: this.lineid
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.data = res.data.rows;
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                    let date = new Date(this.currentDate);
                    this.initKalendar(date);
                })
            },
            initKalendar(date) {
                let arr = {};
                if (this.data && this.data.length > 0) {
                    for (let i = 0, len = this.data.length; i < len; i++) {
                        let k = this.data[i].date;
                        let v1 = this.data[i].statename;
                        let v2 = this.data[i].state;
                        arr[k] = {'statename': v1, 'state': v2};
                    }
                }
                let continuous = false;
                let mount = arr;
                let unifiedMount = {
                    // state: '售票'
                };
                this.ticketData = Kalendar.monthly({
                    date: date,
                    mount: mount,
                    unifiedMount: unifiedMount,
                    continuous: continuous
                });
                let num = 0;
                for (let i = 0; i < this.ticketData[0].length; i++) {
                    if (!this.ticketData[0][i]) {
                        num += 1;
                    }
                }
                this.startnum = num;

                let currentMonth = moment(date).format("MM");
                for (let index in this.chooseDate) {
                    let date1 = this.chooseDate[index];
                    let month = moment(date1).format("MM");
                    let day = parseInt(moment(date1).format("DD"));
                    if (month === currentMonth) {
                        let el = this.$refs.item[day - 1 + this.startnum];
                        el.classList.add('choose');
                    }
                }
            }
        },
        created() {
            this.busid = this.$route.query.busid;
            this.lineid = this.$route.query.lineid;
            this.initData();
            this.queryBus();
        }
    }
</script>

<style scoped>
    /*-----------日历模块样式start--------------*/
    /*!!!!不要换class位置 ,会对样式产生影响*/
    .choose {
        background-color: #0CC893 !important;
        color: #fff !important;
    }

    .saleStop {
        color: #0CC893;
    }

    .haveTicket {
        /*color: #202020;*/
    }

    .rest {
        color: #FF0200;
    }

    .sellOut {
        color: #5E5E5E;
    }

    .bought {
        color: #fff;
    }

    .date-item-sellOut {
        background-color: #CFCFCF;
        color: #5E5E5E;
    }

    .date-item-default {
        background-color: white;
        color: #202020;
    }

    .date-item-bought {
        background-color: #5083ED;
        color: white;
    }

    .date-item {
        border-right: 1px solid #ECECEC;
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    /*-----------日历模块样式end--------------*/
    .tick-wrap {
        height: 48px;
        background-color: white;
        border-bottom: 1px solid #ECECEC;
        font-weight: bold;
        padding: 0 33px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .btn-wrap {
        background-color: white;
        padding: 14px 15px;
    }

    .date-li {
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #ECECEC;
    }


    .date-title {
        height: 48px;
        text-align: center;
        font-size: 18px;
        line-height: 48px;
        font-weight: bold;
        color: #202020;
        border-bottom: 1px #ECECEC solid;
    }

    .data-week-title {
        height: 31px;
        border-bottom: 1px #ECECEC solid;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 12px;
        color: #5E5E5E;
    }

    .data-week-title span:first-child {
        color: #0CC893
    }

    .data-week-title span:last-child {
        color: #0CC893
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .content {
        margin-top: 46px;
        margin-bottom: 50px;
    }

    .line-info-wrap {
        background-color: #F6F6F6;
        padding: 12px 13px;
        height: 90px;
    }

    .line-info {
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: space-around;
        background-color: white;
        font-weight: bold;
        color: #202020;
    }

    .footer {
        width: 100%;
    }

</style>
