<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" :title="busInfo.linename" left-arrow @click-left="onClickLeft"/>
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
                <div class="date-title">{{dateTitle}}</div>
                <div class="data-week-title">
                    <span v-for="item in week" :key="item">{{item}}</span>
                </div>
                <div v-for="val in ticketData" class="date-li">
                    <div v-for="item in val" class="date-item">
                        <div>{{item?item.date:'&nbsp;&nbsp;&nbsp;&nbsp;'}}</div>
                        <div class="" style="font-size: 12px;color: #202020">{{item?item.state:'&nbsp;&nbsp;&nbsp;&nbsp;'}}</div>
                    </div>
                </div>
            </div>
            <div class="tick-wrap">
                <span style="color: #202020;font-size: 16px;">张数</span>
                <span>
                    <span style="color: #0CC893;font-size: 22px;">3</span>
                    <span style="color: #202020;font-size: 16px;">张</span>
                </span>
            </div>
            <div class="tick-wrap">
                <span style="color: #202020;font-size: 16px;">票价</span>
                <span style="color: #FF0200;font-size: 22px;">￥30</span>
            </div>
            <div class="btn-wrap">
                <van-button @click="buy" style="width: 100%;height:44px" color="#0CC893" type="default">
                    确认购票
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Icon} from 'vant';
    import Kalendar from 'kalendar';
    import request from '../../utils/request';
    import moment from 'moment';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Icon.name]: Icon,
        },
        data() {
            return {
                busid:'',
                lineid:'',
                busInfo:{
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
                dateTitle: moment().format('YYYY月MM日'),
                week: ["日", "一", "二", "三", "四", "五", "六"]
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            buy() {
                this.$router.push({path:'/ticketPayment'});
            },
            queryBus(){
              request.sendPost({
                  url: '/bus/selectLineInfo/'+this.busid,
                  params: {}
              }).then((res)=>{
                  if(res.data.code===0){
                      this.busInfo = res.data.data;
                  }

              })
            },
            initData(){
                request.sendPost({
                    url:'/bus/ticketlist',
                    params:{
                        month:moment().format("YYYY-MM-DD"),
                        busid:this.busid,
                        lineid:this.lineid
                    }
                }).then((res)=>{
                    console.log(res.data);
                    this.initKalendar();
                })
            },
            initKalendar() {
                let continuous = false;
                let date = new Date();
                let mount = {};
                let unifiedMount = {
                    state: '售票'
                };
                this.ticketData = Kalendar.monthly({
                    date: date,
                    mount: mount,
                    unifiedMount: unifiedMount,
                    continuous: continuous
                });
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

    .date-item {
        background-color: white;
        border-right: 1px solid #ECECEC;
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
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
</style>