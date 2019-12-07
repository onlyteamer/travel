<template>
    <div>
        <van-nav-bar title="车辆管理" :fixed="true" left-arrow @click-left="onClickLeft"/>
        <div class="content">
            <div class="item flex">
                <span style="color:#202020;font-size: 14px">车辆信息</span>
                <van-button type="default" color="#0CC893" @click="goAdd"
                            style="width: 66px;height: 25px;padding: 0;line-height: 25px">增加
                </van-button>
            </div>
            <div v-for="item in list" :key="item.id" style="margin-top: 10px">
                <div class="row-wrap">
                    <div class="row-wrap-title">
                        <span style="font-size: 16px;color: #202020;font-weight: bold">车辆自定义名称</span>
                        <van-button type="default" color="#0CC893" plain  @click="goEdit"
                                    style="width: 66px;height: 25px;padding: 0;line-height: 25px">编辑
                        </van-button>
                    </div>
                    <div class="row-wrap-content">
                        <van-row style="height: 50%;display: flex;align-items: center;">
                            <van-col span="12" class="col-flex">
                                <img src="../../static/images/user/wdzl.png"/>
                                <span >车牌：</span>
                                <span>京A12345</span>
                            </van-col>
                            <van-col span="12" class="col-flex">
                                <img src="../../static/images/user/wdzl.png"/>
                                <span >车型：</span>
                                <span>大众15款速腾</span>
                            </van-col>
                        </van-row>
                        <van-row style="height: 50%;display: flex;align-items: center;">
                            <van-col span="12" class="col-flex">
                                <img src="../../static/images/user/wdzl.png"/>
                                <span >颜色：</span>
                                <span>白色</span>
                                </van-col>
                            <van-col span="12" class="col-flex">
                                <img src="../../static/images/user/wdzl.png"/>
                                <span>是否认证：</span>
                                <span>认证通过</span>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {NavBar, Field,Row, Col, Button, } from 'vant';
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Row.name]: Row,
            [Col.name]: Col,
        },
        data(){
          return{
              list:[
                  {id:'1',name:'1'},
                  {id:'2',name:'1'},
                  {id:'3',name:'1'},
                  {id:'4',name:'1'},
              ]
          }
        },
        methods:{
            onClickLeft() {
                this.$router.back(-1);
            },
            goAdd(){
                this.$router.push({path:'/ownerCertificationRemind'});
            },
            goEdit(){
                this.$router.push({path:'/addCar'});
            },
        }
    }
</script>

<style scoped>
    .row-wrap{
        height: 127px;
        background-color: white;
        padding: 0 10px;
    }
    .row-wrap-title{
        height: 47px;
        border-bottom: 1px solid #ECECEC;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .row-wrap-content{
        height: 79px;
    }
    .content {
        margin-top: 46px;
        padding: 12px 15px;
    }
    .flex {
        height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        align-items: center;
    }
    .col-flex{
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .col-flex img{
        width: auto;
        height: 14px;
        margin-right: 3px;
    }
    .col-flex span{
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