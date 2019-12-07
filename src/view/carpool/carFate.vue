<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div>
            <div class="black" v-for="index in 6">
                <van-row >
                    <van-col span="16" >
                        <div style="display: flex;align-items: center">
                            <img src="../../static/images/userAvatar.png" style="height: 50px;width: 50px;margin-right: 10px">
                            <div>
                                <p style="margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">加菲猫</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px"> </p>
                                <p style="margin: 5px 0">
                                    <img src="./../../static/images/xin.png" style="width: 14px;height: 14px;margin-right: 5px"/><span>231</span>
                                    <img src="./../../static/images/unhapply.png" style="width: 14px;height: 14px;margin: 0 5px 0 20px" /> <span>3</span>
                                </p>
                                <p style="margin: 5px 0">
                                    <span style="color: #5E5E5E">乘坐2次</span>
                                </p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="8" align="right">
                        <div>
                            <div class="userType" v-if="index%2 != '0'">车主</div>
                            <div v-else class="passer">乘客</div>
                        </div>
                    </van-col>
                </van-row>


            </div>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col} from 'vant';

    export default {
        name: "carFate",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col
        },
        data(){
            return{
                title:"同车缘分"
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
        padding: 5px 10px;
        background: #FFFFFF;
        font-size: 14px;
    }

    .userType{
        width: fit-content;
        padding: 2px 8px;
        border-radius: 5px;
        color: #FFFFFF;
        background: #5083ED;
        margin: 5px 0;
    }

    .passer{
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
