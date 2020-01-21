<template>
    <div>
        <div>
            <!--<van-nav-bar title="投诉" :fixed="true" left-arrow @click-left="onClickLeft"/>-->
        </div>
        <div class="content">
            <div class="radio-wrap">
                <div class="radio-wrap-title">投诉对象</div>
                <van-radio-group v-model="userType" class="radio-wrap-content">
                    <van-radio name="1" checked-color="#07BD06">车主</van-radio>
                    <van-radio name="2" checked-color="#07BD06">乘客</van-radio>
                </van-radio-group>
            </div>
            <div class="reason-wrap">
                <div style="height: 44px;font-size:16px;color:#202020;line-height:44px;border-bottom: 1px solid #ECECEC">
                    请根据事实反映真实情况
                </div>
               <div style="border-bottom: 1px solid #ECECEC">
                   <van-field v-model="content" type="textarea" :autosize="true" placeholder="请输入" />
               </div>
            </div>
            <van-button @click="submit" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                投诉
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
    import {NavBar, Button, RadioGroup, Radio,Field ,Tabbar,TabbarItem} from 'vant';
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
            [Field .name]:Field,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active:"",
                userType: '1',
                content:'',
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
            submit(){
                if(!this.content){
                    this.$toast.fail("请填写内容");
                    return;
                }

                let userId = this.$route.query.userId;
                let tripId = this.$route.query.tripId;
                request.sendPost({
                    url:"/user/center/complain",
                    params:{
                        context:this.content,
                        tripId:tripId,
                        type:this.userType,
                        userId:userId
                    }
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.$toast.success(res.data.msg);
                        this.$router.back(-1);
                    }else {
                        this.$toast.fail(res.data.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .reason-wrap{
        background-color: white;
        padding: 0 10px 10px 10px;
        margin-top: 15px;
    }
    .radio-wrap-content {
        margin-left: 33px;
        padding: 18px;
    }

    .radio-wrap-title {
        color: #202020;
        font-size: 18px;
        font-weight: bold;
    }
    /deep/.van-radio{
        height: 40px;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }
    /deep/.van-radio__label{
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
