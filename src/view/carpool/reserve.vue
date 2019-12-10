<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="6">预定座位数</van-col>
                <van-col span="18" >
                    <van-tag :color="seatIndex== '1'?'#0CC893':'#FFFFFF'" :text-color="seatIndex=='1'?'#FFFFFF':'#202020'" class="seatTag" @click="changeSeat('1')">1座</van-tag>
                    <van-tag :color="seatIndex== '2'?'#0CC893':'#FFFFFF'" :text-color="seatIndex=='2'?'#FFFFFF':'#202020'" style="border: 1px solid #CFCFCF" class="seatTag" @click="changeSeat('2')">2座</van-tag>
                    <van-tag :color="seatIndex== '3'?'#0CC893':'#FFFFFF'" :text-color="seatIndex=='3'?'#FFFFFF':'#202020'" style="border: 1px solid #CFCFCF" class="seatTag" @click="changeSeat('3')">3座</van-tag>
                    <van-tag :color="seatIndex== '4'?'#0CC893':'#FFFFFF'" :text-color="seatIndex=='4'?'#FFFFFF':'#202020'" style="border: 1px solid #CFCFCF" class="seatTag" @click="changeSeat('4')">4座</van-tag>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">剩余2座</van-col>
                <van-col span="14" style="color: #FF0200">每人限预定4座</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center">
                <van-col span="13">
                    <div>
                        <van-field
                            v-model="stroke.startPlace"
                            placeholder="上车地点"
                            label=""
                            label-width="5px"
                            :left-icon="greenBar"
                        />
                    </div>
                </van-col>
                <van-col span="11">
                    <van-button size="small" >上次行程上车地点 <van-icon name="location" color="#0CC893"/></van-button>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center">
                <van-col span="13">
                    <div>
                        <van-field
                                v-model="stroke.endPlace"
                                placeholder="下车地点"
                                label=""
                                label-width="5px"
                                :left-icon="redBar"
                        />
                    </div>
                </van-col>
                <van-col span="11">
                    <van-button size="small" >上次行程上车地点 <van-icon name="location" color="#FF0200"/></van-button>
                </van-col>
            </van-row>

            <van-row style="display: flex;align-items: center">
                <van-col span="24">
                    <div v-for="(item,index) in riderList" :key="index">
                        <van-field
                                v-model="item.riderName"
                                placeholder="乘客人姓名"
                                label=""
                                label-width="5px"
                                left-icon="user-circle-o"
                                disabled
                        />
                    </div>
                </van-col>
            </van-row>

            <van-row style="display: flex;align-items: center;border-bottom: 1px solid #ECECEC;padding: 0px 2px 12px">
                <van-col span="15">
                    <div>
                        <van-tag :color="item.isNormal == '1'?'#FFFFFF':'#0CC893'" :text-color="item.isNormal == '1'?'#202020':'#FFFFFF'" style="border: 1px solid #CFCFCF" class="contactTag" v-for="(item,index) in normalRiders" :key="index" @click="selectRider(item)">{{item.riderName}}</van-tag>
                    </div>
                </van-col>
                <van-col span="9" align="right">（常用联系人）</van-col>
            </van-row>


            <van-row style="border-bottom: 1px solid #ECECEC;padding: 8px 0px">
                <van-col span="24">
                    <div>
                        <van-field
                                placeholder="大件行李——如有行李请备注"
                                label=""
                                label-width="5px"
                                left-icon="cart-circle"
                        />
                    </div>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 8px 0px">
                <van-col span="24">
                    <div v-for="(item,index) in riderList" :key="index">
                        <van-field
                                v-model="item.phone"
                                placeholder="乘客手机号"
                                label=""
                                label-width="5px"
                                left-icon="phone-circle-o"
                                disabled
                        />
                    </div>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 0px;" >
                <van-col span="24">
                    <van-checkbox v-model="checked" checked-color="#07c160" shape="square">阅读并同意《免责协议和条款》和《平台支付条款></van-checkbox>
                </van-col>
            </van-row>

            <van-row >
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#0CC893" style="width: 100%;margin: 0 auto" @click="reserveCar">预定（23元/座）</van-button>
                </van-col>
            </van-row>

            <van-row >
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#9E9E9E" style="width: 100%;margin: 0 auto" @click="goMyStroke">取消</van-button>
                </van-col>
            </van-row>
        </div>
        <div class="footer">
            <div><van-icon name="warning" color="#F55456"/> 注意:</div>
            <div class="notice">
                1. 后台设置规则1；设置规则1；设置规则1； 1. 后台设置规则1设置规则1；设置规则1；； 1. 后台设置规则1；
            </div>

        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Icon,Checkbox, CheckboxGroup ,Button,Tag,Field,Toast   } from 'vant';

    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'
    import request from '../../utils/request'

    export default {
        name: "reserve",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Icon.name]:Icon,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup,
            [Button.name]:Button,
            [Tag.name]:Tag,
            [Field.name]:Field,
            [Toast.name]:Toast
        },
        data(){
            return{
                seatIndex:1,
                redBar:redBar,
                greenBar:greenBar,
                checked:true,
                title:"预约",
                normalRiders:[],
                riderList:[{
                    riderId:"",
                    riderName:"",
                    phone:""
                }],
                stroke:{
                    startPlace:"",
                    endPlace:"",
                    tripId:"",
                    riderNames:[],
                    riderIds:[],
                    phone:"",
                    seatCount:"1",
                    price:"23",
                    remark:""
                }
            }
        },
        mounted(){
            //获取最近乘车人
            request.sendPost({
                url:'/sharecar/pass/lastpass',
                params:{}
            }).then((res) =>{
                if(res.data.code==0){
                    console.log(res.data)
                }else{

                }

            });

            this.normalRiders = [
                {
                    riderId:"1",
                    riderName:"李四",
                    phone:"15872919149",
                    isNormal:"1"
                },
                {
                    riderId:"2",
                    riderName:"王五",
                    phone:"15872919149",
                    isNormal:"0"
                },
                {
                    riderId:"3",
                    riderName:"张三",
                    phone:"15872919149",
                    isNormal:"0"
                }]




        },

        methods:{
            //预约
            reserveCar(){
                if(!this.checked){
                    Toast.fail("请选协议后进行操作");
                    return;
                }

                if(this.normalRiders.length>0){
                    this.stroke.phone = this.normalRiders[0].phone;
                }
                if(!this.stroke.startPlace){
                    Toast.fail("上车地点不能为空");
                    return;
                }
                if(!this.stroke.endPlace){
                    Toast.fail("下车地点不能为空");
                    return;
                }

                if(this.stroke.riderIds.length == 0){
                    Toast.fail("乘客不能为空");
                    return;
                }

                request.sendPost({
                    url:'/sharecar/pass/booktrip',
                    params:this.stroke
                }).then((res) =>{
                    if(res.data.code==0){
                        this.$router.push({path:'/myStroke'});
                    }else{

                    }

                })

            },

            onClickLeft(){
                this.$router.back(-1);
            },
            goMyStroke(){
                this.$router.push({path:'/myStroke'});
            },
            changeSeat(val){
                this.seatIndex = val;

                this.stroke.seatCount = val;
            },
            selectRider(val){
                if(val){
                    if(this.stroke.riderIds.indexOf(val.riderId) == -1){
                        this.stroke.riderIds.push(val.riderId);

                        this.stroke.riderNames.push(val.riderName);

                        //电话待定

                    }else {
                        Toast.fail("请勿重复添加乘客");
                        return;
                    }

                    if(this.riderList.length == 1){
                        if(this.riderList[0].riderId == ''){
                           this.riderList.splice(0,1,val);
                        }else {
                            this.riderList.push(val);
                        }
                    }else {
                        this.riderList.push(val);
                    }

                }
            }
        }
    }
</script>

<style scoped>
    body{
        background: #FFFFFF;
    }

    .contain{
        background: #FFFFFF;
        font-size: 14px;
    }

    .contain .content{
        border-top: 1px solid #ECECEC;
        width: 90%;
        margin: 46px auto 0;
        color: #202020;
    }

    .contain .content .valStyle{
        color: #9E9E9E;
        font-size: 14px;
    }

    .seatTag{
        width: 30px;
        height: 20px;
        font-size: 16px;
        margin-left: 5px;
        justify-content: center;
    }

    .contactTag{
        width: 30px;
        height: 20px;
        font-size: 14px;
        margin-right: 5px;
        justify-content: center;
    }

    .van-cell{
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0px;
        overflow: hidden;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
    }

    .footer{
        width: 90%;
        margin: 0 auto;
        padding: 5px 0;
    }

    .footer .notice{
        margin-top: 6px;
        line-height: 24px;
    }

</style>
