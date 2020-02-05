<template>
    <div>
        <div class="content" style="margin-bottom: 55px">
            <div class="item flex">
                <span style="color:#202020;font-size: 14px">车辆信息</span>
                <van-button type="default" color="#0CC893" @click="goAdd"
                            style="width: 66px;height: 25px;padding: 0;line-height: 25px">增加
                </van-button>
            </div>
            <div v-for="item in dataMain.data" :key="item.id" style="margin-top: 10px">
                <div class="row-wrap">
                    <div class="row-wrap-title">
                        <span style="font-size: 16px;color: #202020;font-weight: bold">{{item.carName}}</span>
                        <van-button type="default" color="#0CC893" plain @click="goEdit(item.id)"
                                    style="width: 66px;height: 25px;padding: 0;line-height: 25px">编辑
                        </van-button>
                    </div>
                    <div class="row-wrap-content">
                        <van-row style="height: 50%;display: flex;align-items: center;">
                            <van-col span="12" class="col-flex">
                                <img src="../../static/images/cp.png" width="16px" height="14px"/>
                                <span>车牌：</span>
                                <span>{{item.carNumber}}</span>
                            </van-col>
                            <van-col span="12" class="col-flex">
                                <img src="../../static/images/cx.png" width="17px" height="14px"/>
                                <span>车型：</span>
                                <span>{{item.carType}}</span>
                            </van-col>
                        </van-row>
                        <van-row style="height: 50%;display: flex;align-items: center;">
                            <van-col span="12" class="col-flex">
                                <img src="../../static/images/ys.png" width="15px" height="15px"/>
                                <span>颜色：</span>
                                <span>{{item.carColor}}</span>
                            </van-col>
                            <van-col span="12" class="col-flex">
                                <img src="../../static/images/sfrz.png" width="17px" height="16px"/>
                                <span>是否认证：</span>
                                <!-- 0 是认证不通过 1 认证通过-->
                                <span>{{item.isAudited === 1?'认证通过':'认证不通过'}}</span>
                            </van-col>
                        </van-row>
                    </div>
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
    </div>
</template>

<script>
    import {NavBar, Field, Row, Col, Button,Tabbar,TabbarItem} from 'vant';
    import request from "../../utils/request";
    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Row.name]: Row,
            [Col.name]: Col,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active:"",
                isOneHttp: true,
                loading: false,
                finished: false,
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            goAdd() {
                this.$router.push({path: '/ownerCertificationRemind'});
            },
            goEdit(id) {
                this.$router.push({path: '/addCar', query: {'id': id}});
            },
            initData() {
                request.sendPost({
                    url: '/user/center/carlist',
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
    .row-wrap {
        height: 127px;
        background-color: white;
        padding: 0 10px;
    }

    .row-wrap-title {
        height: 47px;
        border-bottom: 1px solid #ECECEC;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .row-wrap-content {
        height: 79px;
    }

    .content {
        padding: 12px 15px;
    }

    .flex {
        height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        align-items: center;
    }

    .col-flex {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .col-flex img {
        margin-right: 3px;
    }

    .col-flex span {
        font-size: 14px;
        color: #202020;
    }

    .item {
        background-color: white;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }
</style>
