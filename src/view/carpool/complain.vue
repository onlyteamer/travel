<template>
    <div>
        <div>
            <van-nav-bar title="投诉" :fixed="true" left-arrow @click-left="onClickLeft"/>
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
    </div>
</template>

<script>
    import {NavBar, Button, RadioGroup, Radio,Field ,Toast} from 'vant';
    import request from '../../utils/request'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Field .name]:Field,
            [Toast.name]:Toast
        },
        data() {
            return {
                userType: '1',
                content:''
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            submit(){
                if(!this.content){
                    Toast.fail("请填写内容");
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
                        Toast.success("操作成功");
                        this.$router.back(-1);
                    }else {
                        Toast.fail("操作失败")
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
        margin-top: 46px;
    }
</style>
