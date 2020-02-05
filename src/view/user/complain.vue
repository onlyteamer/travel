<template>
    <div>
        <div>
            <!--<van-nav-bar :fixed="true" title="我的投诉" left-arrow @click-left="onClickLeft"/>-->
        </div>
        <div class="content">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div v-for="item in complain.data" :key="item.id">
                    <div class="item">
                        <div class="item-li">
                            <div style="width: 20px;margin-right: 8px;">
                                <img src="../../static/images/tsrq.png"/>
                            </div>
                            <div>投诉日期：</div>
                            <div style="flex: 1">{{item.complainDate}}</div>
                        </div>
                        <div class="item-li">
                            <div style="width: 20px;margin-right: 8px;">
                                <img src="../../static/images/tsdx.png" width="19px"/>
                            </div>
                            <div>投诉对象：</div>
                            <div style="flex: 1">{{item.type == '1'?'车主':'乘客'}}</div>
                        </div>
                        <div class="item-li">
                            <div style="width: 20px;margin-right: 8px;">
                                <img src="../../static/images/tsnr.png"/>
                            </div>
                            <div>投诉内容：</div>
                            <div style="flex: 1">{{item.context}}</div>
                        </div>
                        <div class="item-li">
                            <div style="width: 20px;margin-right: 8px;">
                                <img src="../../static/images/cljg.png"/>
                            </div>
                            <div>处理结果：</div>
                            <div style="flex:1">{{item.dealResult}}</div>
                        </div>
                        <div class="item-li">
                            <div style="width: 20px;margin-right: 8px;">
                                <img src="../../static/images/busTrip/status.png"/>
                            </div>
                            <div>投诉状态：</div>
<!--                            投诉状态：0、未处理 1、投诉已查看 2、投诉已处理 3、投诉已取消-->
                            <div style="flex:1">{{item.status===0?"未处理":(item.status===1?"投诉已查看":(item.status===2?"投诉已处理":"投诉已取消"))}}</div>
                        </div>
                        <div class="item-li" style="justify-content: flex-end">
                            <van-button  style="height:35px;line-height:35px;" color="#0CC893" :disabled="item.isCancel===0" @click="cancel(item.id)">取消投诉</van-button>
                        </div>
                    </div>
                </div>
            </van-list>
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
    import {NavBar, List,Button,Tabbar,TabbarItem} from 'vant';
    import request from '../../utils/request'
    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'
    export default {
        components: {
            [NavBar.name]: NavBar,
            [List.name]: List,
            [Button.name]: Button,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active:"",
                loading: false,
                finished: false,

                complain:{
                    data: [],
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                },
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            cancel(id){
                request.sendPost({
                    url:'/user/center/complain/cancel/'+id,
                    params: {}
                }).then(res=>{
                    if(res.data.code===0){
                        this.$toast.success(res.data.msg);
                    }else{
                        this.$toast.fail(res.data.msg);
                    }
                })
            },
            initData(){
                request.sendGet({
                    url:"/user/center/complain/list",
                    params:{
                        pageNum:this.complain.pageNum,
                        pageSize:this.complain.pageSize
                    }
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.complain.total = res.data.total;
                        if(res.data.rows.length>0){
                            this.complain.data=this.complain.data.concat(res.data.rows);
                        }

                        if (!this.complain.data || this.complain.total === this.complain.data.length) {
                            this.finished = true;
                        }
                        this.loading = false;
                    }
                })


            },


            onClickLeft() {
                this.$router.back(-1);
            },
            onLoad() {
                if (this.complain.total > this.complain.data.length) {
                    this.complain.pageNum += 1;
                    this.initData();
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        background-color: #F6F6F6;
        padding: 10px 15px 0 15px;
        /*margin-top: 46px;*/
        margin-bottom: 55px;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .item {
        margin-bottom: 10px;
        background-color: white;
        padding: 10px;
    }

    .item-li {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #202020;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .item-li img {
        margin: auto;
        width: 17px;
        display: block;
    }
</style>
