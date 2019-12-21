<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" :title="title" left-arrow @click-left="onClickLeft" right-text="加入群聊"
                         @click-right="joinGroupChat"/>
        </div>
        <div class="content">
            <div class="info-wrap">
                <div style="width: 80%">
                    <div style="display: flex;height:35px;line-height: 35px">
                        <div style="width: 37%"><img :src="blueTime" width="13px" height="13px"><span
                                class="place" style="margin-left: 7px;margin-right: 13px">{{lineDetails.starttime}}</span></div>
                        <div><img :src="blueTime" width="13px" height="13px"><span class="place" style="margin-left: 7px;">{{lineDetails.startname}}</span>
                        </div>
                    </div>
                    <div style="display: flex;height:35px;line-height: 35px">
                        <div style="width: 37%"><img :src="redTime" width="13px" height="13px"><span class="place" style="margin-left: 7px;margin-right: 13px">{{lineDetails.endtime}}</span>
                        </div>
                        <div><img :src="redTime" width="13px" height="13px"><span class="place" style="margin-left: 7px;">{{lineDetails.endname}}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="list-price">￥{{lineDetails.ticketPrice}}</span>
                </div>
            </div>
            <div class="item">
                <!--<div class="tag-wrap">-->
                    <!--<img :src="upTag">-->
                    <!--<img :src="downTag">-->
                <!--</div>-->
                <div class="list-wrap">
                    <!--<van-list-->
                            <!--:offset="10"-->
                            <!--v-model="loading"-->
                            <!--:finished="finished"-->
                            <!--finished-text=""-->
                            <!--@load="onLoad"-->
                            <!--:immediate-check="false">-->
                        <div v-for="(item,index) in lineDetailsList" :key="item.id"
                             :class='index==(listSize-1)?"item-li last-station":"item-li"'>
                            <img :src="upTag" style="position: absolute;top: 0px;width: 20px;height: 23px" v-if="index == '0'">
                            <img :src="downTag" style="position: absolute;top: 0px;width: 20px;height: 23px" v-if="index == (listSize-1)">
                            <div class="station-item">
                                <div class="name"><span style="margin-left: 5px">卧龙坡</span></div>
                                <span class="time">06:54</span>
                            </div>
                        </div>
                    <!--</van-list>-->
                </div>
            </div>
            <div style="height: 42px; display: flex;align-items: center;justify-content: center">
                <img :src="down" width="11px" height="21px">
                <span style="color: #5E5E5E;font-size: 12px;margin: 0 14px">向下滑动查看更多站点</span>
                <img :src="down" width="11px" height="21px">
            </div>
        </div>
        <aMap
                id="userPosition"
                :lon="carInfo.lon"
                :lat="carInfo.lat"
                :height="mapHeight" width="100%">
        </aMap>
    </div>
</template>

<script>
    import {NavBar, Button, Tabbar, Tab, Toast, List} from 'vant';
    import request from '../../utils/request'
    import blueTime from './../../static/images/busTrip/blue_time.png'
    import redTime from './../../static/images/busTrip/red_time.png'
    import down from '../../static/images/busTrip/down.png'
    import downTag from '../../static/images/busTrip/down-tag.png'
    import upTag from '../../static/images/busTrip/up-tag.png'
    import aMap from './../../components/map_currentPosition'

    export default {
        components: {
            aMap,
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Tabbar.name]: Tabbar,
            [Toast.name]: Toast,
            [List.name]: List,
            [Tab.name]: Tab,
        },
        data() {
            return {
                mapHeight: '',
                offset: 0,
                downTag: downTag,
                upTag: upTag,
                blueTime: blueTime,
                redTime: redTime,
                down: down,
                title: '昌坤出行3线',
                isOneHttp: true,
                loading: false,
                finished: false,
                carInfo: {
                    lat: "39.865042",
                    lon: "116.379028"
                },
                lineDetails:{

                },
                lineDetailsList:[],
                listSize:""
            }
        },
        methods: {
            joinGroupChat() {

            },
            initData() {
                let busid = this.$route.query.busid;
                request.sendPost({
                    url:"/bus/selectLineInfo/"+ busid,
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.lineDetails = res.data.data;

                        this.queryLineDetailsList(busid);
                    }
                })
            },
            queryLineDetailsList(busid){
                if(busid){
                    request.sendGet({
                        url:"/bus/lineDetailList",
                        params:{
                            id:busid
                        }
                    }).then(res =>{
                        if(res.data.code == '0'){
                            this.lineDetailsList = res.data.rows;
                            this.listSize = res.data.total;
                        }
                    })
                }
            },

            onClickLeft() {
                this.$router.back(-1);
            }
        },
        created() {
            this.initData();
        },
        mounted() {
            let height = window.innerHeight;
            this.offset = height - 46 - 70 - 250  - 42;
            this.mapHeight = this.offset+'px';
        },
    }
</script>

<style scoped>
    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .item {
        height: 200px;
        padding: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .content {
        overflow-y: hidden;
        padding: 15px 15px 0 15px;
        margin-top: 46px;
        background-color: white;
    }

    .place {
        color: #202020;
        font-size: 16px;
        font-weight: bold;
    }

    .list-price {
        font-weight: bold;
        font-size: 36px;
        color: #FF0200;
        margin-right: 28px;
    }

    .info-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 72px;
        border-bottom: 1px solid #ECECEC;
        overflow-y: auto;
    }

    .tag-wrap {
        width: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tag-wrap img {
        width: 20px;
        height: 23px;
    }

    .list-wrap {
        flex: 1;
        height: 100%;
        width: 100%;
        overflow-x:hidden;
        position: relative;
    }

    /deep/ .van-list {
        height: 100%;
        width: 105%;
        overflow-x:hidden ;
        overflow-y: auto;
    }

    .station-item {
        padding-left: 7px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 20px;
    }

    .item-li:after {
        top: 26px;
        left: 17px;
        content: '';
        position: absolute;
        border-right: 1px solid #0CC893;
        height: 10px;
        margin-left: 20px;
    }

    .item-li {
        position: relative;
        margin-bottom: 10px;
        margin-right: 5%;
    }

    .last-station:after {
        content: '';
        border: none;
    }

    .last-station {
        margin-bottom: 0px;
    }

    .station-item .name {
        border: 1px solid #0CC893;
        height: 23px;
        line-height: 23px;
        padding: 0 12px 0 6px;
        border-radius: 13px;
        font-size: 12px;
        color: #0CC893;
    }

    .station-item > .name:before {
        content: '●';
        width: 7px;
        height: 7px;
        color: #0CC893;
    }

    .station-item .time {
        color: #202020;
        font-size: 12px;
    }
</style>
