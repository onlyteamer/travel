<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div class="userInfo">
            <van-row style="display: flex;align-items: center;font-size: 14px">
                <van-col span="24" >
                    <div style="display: flex;align-items: center">
                        <img src="../../static/images/userAvatar.png" style="height: 52px;width: 52px;margin-right: 10px">
                        <div>
                            <p style="margin: 5px 0">
                                <span style="color: #5E5E5E;font-weight: bold">加菲猫</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px">

                                <img src="./../../static/images/xin.png" style="width: 14px;height: 14px;margin-right: 5px;margin-left: 20px"/><span>231</span>
                                <img src="./../../static/images/unhapply.png" style="width: 14px;height: 14px;margin: 0 5px 0 20px" /> <span>3</span>
                            </p>
                            <p style="margin: 5px 0;display: flex;align-items: center">
                                <img src="../../static/images/userInfo.png" style="width: 14px;height: 16px;margin-right: 5px" /><span style="font-size: 14px;color: #5E5E5E">张**</span>
                            </p>
                            <p style="margin: 5px 0">
                                <img src="./../../static/images/tel.png" style="width: 14px" /><span style="font-size: 14px;color: #5E5E5E">13884997727</span>
                            </p>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="assess">
            <div><span style="font-size: 16px;font-weight: bold;margin-right: 10px">车主评价:</span><span>（517）</span></div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false" />

            <div v-for="index in 6">
                <div class="card">
                    <van-row style="display: flex;align-items: center">
                        <van-col span="16" style="display: flex;align-items: center">
                            <img src="./../../static/images/avatar.png"  style="width: 34px;height: 34px;border-radius: 50%;margin-right: 15px;"/>
                            <span>大海</span>
                        </van-col>
                        <van-col span="8">2019-12-01</van-col>
                    </van-row>
                    <div style="margin-top: 10px">
                        准时到达，很有礼貌的车主。
                    </div>
                </div>

            </div>

        </div>


    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Divider,Button} from 'vant';

    import request from '../../utils/request'

    export default {
        name: "passengerDetails",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button
        },
        data(){
            return{
                title:"乘客详情"
            }
        },
        mounted(){
            this.initData();
        },

        methods:{
            initData(){

            },

            onClickLeft(){
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped>
    .userInfo{
        width: 85%;
        margin: 55px auto 15px;
        padding: 5px 10px;
        background: #FFFFFF;
    }

    .assess{
        padding: 10px 15px;
        background: #FFFFFF;
    }

    .card{
       padding: 10px;
        margin: 15px auto;
        border: 1px solid #ECECEC;
    }
</style>
