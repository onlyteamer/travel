<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div style="margin-top: 46px">
            <div class="black" v-for="index in 6">
                <van-row style="display: flex;align-items: center">
                    <van-col span="14" >
                        <div style="display: flex;align-items: center">
                            <img src="../../static/images/userAvatar.png" style="height: 50px;width: 50px;margin-right: 10px">
                            <div>
                                <p style="margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">加菲猫</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px"> </p>
                                <p style="margin: 5px 0">
                                    <img src="./../../static/images/xin.png" style="width: 14px;height: 14px;margin-right: 5px"/><span>231</span>
                                    <img src="./../../static/images/unhapply.png" style="width: 14px;height: 14px;margin: 0 5px 0 20px" /> <span>3</span>
                                </p>
                                <p style="margin: 5px 0">
                                    <span style="color: #5E5E5E">乘车地点：芍药居</span>
                                </p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="10" align="right">
                        <div><div class="userType">乘客</div></div>
                        <div style="color: #5E5E5E;margin: 5px 0">乘坐过 2 次</div>
                        <div><div style="color: #5E5E5E">下车地点：少年宫</div></div>
                    </van-col>
                </van-row>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false" />

                <van-row>
                    <van-col span="6" offset="11">
                        <van-button type="default" color="#9E9E9E" size="mini" style="height: 34px;font-size: 14px;width: 100%">拒绝</van-button>
                    </van-col>
                    <van-col span="6">
                        <van-button type="default" color="#0CC893" size="mini" style="height: 34px;font-size: 14px;width: 100%;margin-left: 10px">预约确定</van-button>
                    </van-col>
                </van-row>

            </div>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Divider,Button} from 'vant';

    export default {
        name: "passengerList",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button
        },
        data(){
            return{
                title:"乘客列表"
            }
        },
        methods:{
            onClickLeft(){

            }
        }
    }
</script>

<style scoped>

    .black{
        width: 90%;
        margin: 10px auto;
        padding: 5px 10px 10px 5px;
        background: #FFFFFF;
        font-size: 14px;
    }

    .userType{
        width: fit-content;
        padding: 2px 8px;
        border-radius: 5px;
        color: #FFFFFF;
        background: #0CC893;
    }

    .removeTag{
        width: fit-content;
        padding: 2px 8px;
        margin-top: 10px;
        color: #0CC893;
        border-radius: 5px;
        border: 1px solid #0CC893;
    }
</style>
