<template>
    <div>
        <div>
            <!--<van-nav-bar title="取消行程" :fixed="true" left-arrow @click-left="onClickLeft"/>-->
        </div>
        <div class="content">
            <div class="radio-wrap">
                <div class="radio-wrap-title">取消行程原因：</div>
                <van-radio-group v-model="reasonId" class="radio-wrap-content">
                    <van-radio :name="item.reasonId" checked-color="#07BD06" v-for="(item,index) in reasonList">{{item.reasonContext}}</van-radio>
                </van-radio-group>
            </div>
            <van-button @click="submit" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                确认终止行程
            </van-button>
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
    import {NavBar, Button, RadioGroup, Radio, Toast,Tabbar, TabbarItem} from 'vant';
    import request from '../../utils/request'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Toast.name]: Toast,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active:"",
                reasonId: 1,
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                reasonList:[]
            }
        },
        mounted(){
            this.initReasonList();
        },

        methods: {
            //理由列表
            initReasonList(){
                request.sendGet({
                    url:"/sharecar/pass/cancelreason",
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.reasonList = res.data.rows;
                    }
                })
            },

            onClickLeft() {
                this.$router.back(-1);
            },
            submit() {
                let tripId = this.$route.query.tripId;
                let bookid = this.$route.query.bookid;
                let reasonId = this.reasonId;

                //无偿
                request.sendPost({
                    url: "/sharecar/pass/cancel/" + bookid + "/" + reasonId,
                    params: {}
                }).then(res => {
                    if (res.data.code == '0') {
                        Toast.success("操作成功")
                    } else {
                        Toast.fail("操作失败")
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .radio-wrap-content {
        margin-left: 33px;
        padding: 18px;
    }

    .radio-wrap-title {
        color: #FF7E00;
        font-size: 18px;
        font-weight: bold;
    }

    /deep/ .van-radio {
        height: 40px;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    /deep/ .van-radio__label {
        color: #202020;
        font-weight: bold;
        font-size: 16px;
    }

    .radio-wrap {
        background-color: white;
        padding: 12px;
    }

    .content {
        background-color: #F6F6F6;
        padding: 15px;
        /*margin-top: 46px;*/
        margin-bottom: 55px;
    }
</style>
