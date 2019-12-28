<template>
    <div>
        <div>
            <!--<van-nav-bar :fixed="true" title="班车列表" left-arrow @click-left="onClickLeft"/>-->
        </div>
        <div class="content">
            <van-list
                :offset="10"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
        >
            <div v-for="item in dataMain.data" :key="item.id" @click="linkBusDetail(item.busid)">
                <div class="card">
                    <div style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;height: 45px;justify-content: space-between">
                        <span class="line">{{item.linename}}：{{item.startname}} →  {{item.endname}}</span>
                        <span class="list-price">￥{{item.ticketPrice}}</span>
                    </div>
                    <div style="display: flex;align-items: center;justify-content: space-between;height: 72px">
                        <div style="width: 70%">
                            <div style="display: flex;height:35px;line-height: 35px">
                                <div style="width:37%"><img :src="blueTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">{{item.starttime}}</span></div>
                                <div><img :src="placeUp" width="13px" height="13px"><span  style="margin-left: 7px;">{{item.startname}}</span></div>
                            </div>
                            <div style="display: flex;height:35px;line-height: 35px">
                                <div style="width: 37%"><img :src="redTime" width="13px" height="13px"><span style="margin-left: 7px;margin-right: 13px">{{item.endtime}}</span></div>
                                <div><img :src="placeDown" width="13px" height="13px"><span style="margin-left: 7px;">{{item.endname}}</span></div>
                            </div>
                        </div>
                        <div>
                            <van-button @click="gobuyTicket(item)" color="#0CC893" style="width: 66px;height: 37px;line-height: 37px;padding: 0">去抢票</van-button>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        </div>
    </div>
</template>

<script>
    import {NavBar, Toast, List,Image, Button} from 'vant';
    import request from "../../utils/request";
    import blueTime from './../../static/images/busTrip/blue_time.png'
    import redTime from './../../static/images/busTrip/red_time.png'

    import placeDown from './../../static/images/busTrip/placeDown.png'
    import placeUp from './../../static/images/busTrip/placeUp.png'

    export default {
        components: {
            [NavBar.name]:NavBar,
            [Image.name]:Image,
            [Toast.name]:Toast,
            [List.name]:List,
            [Button.name]: Button,
        },
        data() {
            return {
                placeDown:placeDown,
                placeUp:placeUp,
                isOneHttp: true,
                loading: false,
                finished: false,
                blueTime: blueTime,
                redTime: redTime,
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
            }
        },
        methods: {
            gobuyTicket(item){
                this.$router.push({path:'/buyTicket',query:{'busid':item.busid,'lineid':item.lineid}});
            },
            initData() {
                request.sendGet({
                    url: '/bus/getAllBusList',
                    params: {
                        pageSize: this.dataMain.pageSize,
                        pageNum: this.dataMain.pageNum,
                    }
                }).then((res) => {
                    this.dataMain.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.isOneHttp) {
                        this.dataMain.data = res.data.rows;
                        this.isOneHttp = false;
                    } else {
                        this.dataMain.data=this.dataMain.data.concat(res.data.rows);
                    }

                    if (this.dataMain.total === this.dataMain.data.length) {
                        this.finished = true;
                    }
                    this.loading = false;
                });
            },
            linkBusDetail(val){
                this.$router.push({path:"/busDetail",query:{busid:val}})
            },


            onClickLeft() {
                this.$router.back(-1);
            },
            onLoad() {
                if (this.dataMain.total > this.dataMain.data.length) {
                    this.dataMain.pageNum += 1;
                    this.initData();
                }
            },
        },
        created() {
            this.initData();

        }
    }
</script>

<style scoped>
    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }
    .content {
        padding: 15px;
        /*margin-top: 46px;*/
    }
     .card {
        font-size: 14px;
        padding: 0 5px;
        margin-bottom: 10px;
        background: #fff;
    }
    .line {
        color: #5083ED;
        font-size: 14px;
        font-weight: bold;
    }

    .list-price {
        font-weight: bold;
        font-size: 22px;
        color: #FF0200;
    }
</style>
