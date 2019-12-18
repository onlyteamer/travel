<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" :title="title" left-arrow @click-left="onClickLeft" right-text="加入群聊"
                         @click-right="joinGroupChat"/>
        </div>
        <div class="content">
            <div class="info-wrap">
                <div>
                    <div style="display: flex;height:35px;line-height: 35px">
                        <div><img :src="blueTime" width="13px" height="13px"><span
                                class="place" style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                        <div><img :src="blueTime" width="13px" height="13px"><span class="place"
                                                                                   style="margin-left: 7px;">上河湾</span>
                        </div>
                    </div>
                    <div style="display: flex;height:35px;line-height: 35px">
                        <div><img :src="redTime" width="13px" height="13px"><span class="place"
                                                                                  style="margin-left: 7px;margin-right: 13px">5:20</span>
                        </div>
                        <div><img :src="redTime" width="13px" height="13px"><span class="place"
                                                                                  style="margin-left: 7px;">西坝河</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="list-price">￥20</span>
                </div>
            </div>
            <div class="item">
                <div class="tag-wrap">
                    <img :src="upTag">
                    <img :src="downTag">
                </div>
                <div class="list-wrap">
                    <van-list
                            :offset="10"
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad"
                            :immediate-check="false"
                    >
                        <div v-for="item in 20" :key="item.id" class="item-li">
                            <div class="station-item">
                                <span>卧龙坡</span>
                                <span>06:54</span>
                            </div>
                        </div>
                    </van-list>
                </div>
            </div>
        </div>
        <aMap
                ref="hotelMap" id="hotelContainer"
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
    import aMap from './../../components/amap_point'

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
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
            }
        },
        methods: {
            joinGroupChat() {

            },
            initData() {
                request.sendGet({
                    url: '/sharecar/pass/list',
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
                        this.dataMain.data = this.dataMain.data.concat(res.data.rows);
                    }

                    if (this.dataMain.total === this.dataMain.data.length) {
                        this.finished = true;
                    }
                    this.loading = false;
                });
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
        },
        mounted() {
            let height = window.innerHeight;
            this.offset = height - 46 - 70 - 250 - 15;
            this.mapHeight = this.offset + 'px';

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
        padding: 15px;
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
        height: auto;
    }

    .list-wrap {
        flex: 1;
        height: 100%;
    }

    /deep/ .van-list {
        height: 100%;
    }

    .station-item {

    }
</style>