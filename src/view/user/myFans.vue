<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div style="margin-top: 55px">
            <van-list
                    :offset="10"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
            >
                <div class="black" v-for="(item,index) in dataMain.data" :key="item.id">
                    <van-row style="display: flex;align-items: center">
                        <van-col span="12">
                            <div style="display: flex;align-items: center">
                                <img src="../../static/images/userAvatar.png"
                                     style="height: 50px;width: 50px;margin-right: 10px">
                                <div>
                                    <p style="margin: 5px 0"><span
                                            style="color: #5E5E5E;font-weight: bold">加菲猫</span><img
                                            src="../../static/images/sexTag.png"
                                            style="width: 12px;height: 12px;margin-left: 5px"></p>
                                    <p style="margin: 5px 0">
                                        <img src="./../../static/images/xin.png"
                                             style="width: 14px;height: 14px;margin-right: 5px"/><span>231</span>
                                        <img src="./../../static/images/unhapply.png"
                                             style="width: 14px;height: 14px;margin: 0 5px 0 20px"/> <span>3</span>
                                    </p>
                                    <p style="margin: 5px 0">
                                        <span style="color: #5E5E5E">乘坐2次</span>
                                    </p>
                                </div>
                            </div>
                        </van-col>
                        <van-col span="12" align="right">
                            <div>
                                <div class="userType" v-if="index%2 != '0'">车主</div>
                                <div v-else class="passer">乘客</div>
                            </div>
                            <div>
                                <div class="removeTag" @click="follow(index)">关注</div>
                            </div>
                        </van-col>
                    </van-row>


                </div>
            </van-list>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, List} from 'vant';
    import request from '../../utils/request'

    export default {
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List
        },
        data() {
            return {
                title: "我的粉丝",
                isOneHttp: true,
                loading: false,
                finished: false,
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            follow(index) {
                let data = this.dataMain.data[index];
                request.sendPost({
                    url: '/user/center/follow',
                    params: {
                        followerId: data.id
                    }
                }).then((res) => {
                    this.dataMain.data.splice(index);
                })
            },
            goPassengerDetails(val) {
                if (val) {
                    if (val % 2 != 0) {
                        this.$router.push({path: '/carOwnerDetails'});
                    } else {
                        this.$router.push({path: '/passengerDetails'});
                    }
                } else {
                    this.$router.push({path: '/passengerDetails'});
                }

            },
            initData() {
                //TODO 还未改成我的粉丝接口
                request.sendGet({
                    url: '/user/center/blacklist',
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

    .black {
        width: 90%;
        margin: 10px auto;
        padding: 5px 10px;
        background: #FFFFFF;
        font-size: 14px;
    }

    .userType {
        width: fit-content;
        padding: 2px 8px;
        border-radius: 5px;
        color: #FFFFFF;
        background: #5083ED;
    }

    .removeTag {
        width: fit-content;
        padding: 2px 8px;
        margin-top: 10px;
        color: #0CC893;
        border-radius: 5px;
        border: 1px solid #0CC893;
    }

    .passer {
        width: fit-content;
        padding: 2px 8px;
        border-radius: 5px;
        color: #FFFFFF;
        background: #0CC893;
    }

</style>
