<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" title="乘车人管理" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="item flex">
                <span style="color:#202020;font-size: 14px">乘车人信息</span>
                <van-button type="default" color="#0CC893" @click="goAdd"
                            style="width: 66px;height: 25px;padding: 0;line-height: 25px">添加
                </van-button>
            </div>
            <div class="item" style="margin-top: 10px;padding-left: 13px;padding-right: 9px">
                <van-list
                        :offset="10"
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        :immediate-check="false"
                >
                    <div v-for="item in dataMain.data" :key="item.id" class="item-li">
                        <div class="item-li-flex" style="align-items: flex-start">
                            <div>
                                <span style="color:#202020;font-size: 16px;margin-right: 8px;font-weight: bolder">{{item.passName}}</span>
                                <span v-if="item.isDefault===1" class="dft-tag">默认</span>
                            </div>
                            <div style="display:flex;align-items: center;margin-top: 5px">
                                <img src="../../static/images/idCard-black.png"
                                     style="width: 20px;height: 14px;margin-right: 3px"/>
                                <span>{{item.cardId}}</span>
                            </div>
                            <div style="display:flex;align-items: center;margin-top: 5px">
                                <img src="../../static/images/tel.png"
                                     style="width: 14px;height:14px;margin-right: 9px"/>
                                <span>{{item.passPhone}}</span>
                            </div>
                        </div>
                        <div class="item-li-flex" style="align-items: center;">
                            <van-button type="default" color="#5083ED" plain v-if="item.isDefault===0"
                                        @click="setDft(item.id)"
                                        style="width: 66px;height: 25px;margin-bottom:7px;padding: 0;line-height: 25px">
                                默认
                            </van-button>
                            <van-button type="default" color="#0CC893" plain @click="goEdit(item.id)"
                                        style="width: 66px;height: 25px;padding: 0;line-height: 25px">编辑
                            </van-button>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>
<!--乘车人管理-->
<script>
    import {NavBar, Button, List} from 'vant';
    import request from '../../utils/request';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [List.name]: List
        },
        data() {
            return {
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
                        this.dataMain.data=this.dataMain.data.concat(res.data.rows);
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
            goAdd() {
                this.$router.push({path: '/passenger-edit'});
            },
            goEdit(id) {
                this.$router.push({path: '/passenger-edit', query: {'id': id}});
            },
            setDft(id) {
                request.sendPost({
                    url: '/sharecar/pass/default/'+ id,
                    params: {}
                }).then((res) => {
                    this.isOneHttp = true;
                    this.dataMain.data = [];
                    this.dataMain.pageNum = 1;
                    this.dataMain.total = 0;
                    this.finished = false;
                    this.initData();
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
    .dft-tag {
        color: #5083ED;
        border: 1px solid #5083ED;
        background-color: #E2EBFE;
        font-size: 12px;
        padding: 3px 8px;
        width: auto;
        height: auto;
        border-radius: 3px;
    }

    .flex {
        height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        align-items: center;
    }

    .item {
        background-color: white;
    }

    .item-li {
        border-bottom: 1px solid #ECECEC;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .item-li-flex {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .content {
        padding: 15px;
        margin-top: 46px;
    }
</style>