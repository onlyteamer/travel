<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div style="margin-top: 46px">
            <div class="black" v-for="(item,index) in carFateList">
                <van-row  @click="goPassengerDetails(item)">
                    <van-col span="16" >
                        <div style="display: flex;align-items: center">
                            <img :src="item.headimgurl" style="height: 50px;width: 50px;margin-right: 10px">
                            <div>
                                <p style="margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">{{item.nickName}}</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="item.sex == '1'"><img src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px" v-else> </p>
                                <p style="margin: 5px 0">
                                    <img src="./../../static/images/xin.png" style="width: 14px;height: 14px;margin-right: 5px"/><span>{{item.badCount}}</span>
                                    <img src="./../../static/images/unhapply.png" style="width: 14px;height: 14px;margin: 0 5px 0 20px" /> <span>{{item.goodCount}}</span>
                                </p>
                                <p style="margin: 5px 0">
                                    <span style="color: #5E5E5E">乘坐{{item.badCount}}次</span>
                                </p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="8" align="right">
                        <div>
                            <div class="userType" v-if="item.tag == 1">车主</div>
                            <div v-else class="passer" v-else>乘客</div>
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

    import request from '../../utils/request'

    export default {
        name: "carFate",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col
        },
        data(){
            return{
                title:"同车缘分",
                carFateList:[]
            }
        },
        mounted(){
            this.initCarFate();
        },

        methods:{
            //同车缘分
            initCarFate(){
                let tripId = this.$route.query.tripId;
                if(tripId){
                    request.sendGet({
                        url:"/sharecar/pass/samecar/"+ tripId,
                        params:{}
                    }).then(res =>{
                        if(res.data.code == '0'){
                            this.carFateList = res.data.rows;
                        }
                    })
                }
            },

            onClickLeft(){
                this.$router.back(-1);
            },
            goPassengerDetails(val){
                if(val){
                    if(val.tag == '1'){
                        this.$router.push({path:'/passengerDetails',query:{userId:val.userId}});
                    }else {
                        this.$router.push({path:'/carOwnerDetails',query:{userId:val.userId}});
                    }
                }else {
                    this.$router.push({path:'/passengerDetails',query:{userId:val.userId}});
                }

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
