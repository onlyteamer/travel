<template>
    <div class="contain">
<!--        <Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div >
            <van-list
                    :offset="10"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
            >
                <div class="black" v-for="(item,index) in dataMain.data" :key="item.id">
                    <van-row style="display: flex;align-items: center">
                        <van-col span="12" >
                            <div style="display: flex;align-items: center">
                                <img :src="item.personalInfo.headimgurl" style="height: 50px;width: 50px;margin-right: 10px">
                                <div>
                                    <p style="margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">{{item.personalInfo.nickname}}</span>
                                        <img src="../../static/images/man.png"
                                             style="width: 13px;height: 13px;display: inline-block;margin-left: 5px"
                                             v-if="item.personalInfo.sex === 1">
                                        <img src="../../static/images/sexTag.png"
                                             style="width: 13px;height: 13px;display: inline-block;margin-left: 5px" v-else>
                                    </p>
                                    <p style="margin: 5px 0">
                                        <img src="./../../static/images/xin.png" style="width: 14px;height: 14px;margin-right: 5px"/><span>{{item.personalInfo.goodCount}}</span>
                                        <img src="./../../static/images/unhapply.png" style="width: 14px;height: 14px;margin: 0 5px 0 20px" /> <span>{{item.personalInfo.badConunt}}</span>
                                    </p>
                                    <p style="margin: 5px 0">
                                        <span style="color: #5E5E5E">乘坐{{item.passInfo.passCount}}次</span>
                                    </p>
                                </div>
                            </div>
                        </van-col>
                        <van-col span="12" align="right">
                            <div>
                                <div class="userType" v-if="item.passInfo.isDriver===1" >车主</div>
                                <div v-else class="passer" >乘客</div>
                            </div>
                            <div><div class="removeTag" @click="del(index)">不再关注</div></div>
                        </van-col>
                    </van-row>


                </div>
            </van-list>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,List} from 'vant';
    import  request from '../../utils/request'
//TODO 字段没齐
    export default {
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [List.name]: List
        },
        data(){
            return{
                title:"我的关注",
                isOneHttp: true,
                loading: false,
                finished: false,
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back(-1);
            },
            del(index){
                let data = this.dataMain.data[index];
                request.sendPost({
                    url:'/user/center/unfollow/'+data.id,
                    params:{}
                }).then((res)=>{
                    this.dataMain.data.splice(index);
                })
            },
            goPassengerDetails(val){
                if(val){
                    if(val%2 != 0){
                        this.$router.push({path:'/carOwnerDetails'});
                    }else {
                        this.$router.push({path:'/passengerDetails'});
                    }
                }else {
                    this.$router.push({path:'/passengerDetails'});
                }

            },
            initData() {
                request.sendGet({
                    url: '/user/center/followlist',
                    params: {
                        pageSize: this.dataMain.pageSize,
                        pageNum: this.dataMain.pageNum,
                    }
                }).then((res) => {
                    this.dataMain.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.isOneHttp) {
                        this.dataMain.data = res.data.rows;
                        this.isOneHttp = false;
                    } else {
                        this.dataMain.data=this.dataMain.data.concat(res.data.rows);
                    }

                    if (!this.dataMain.data||this.dataMain.total === this.dataMain.data.length) {
                        this.finished = true;
                    }
                    this.loading = false;
                });
            },
            onLoad() {
                if (this.dataMain.total > this.dataMain.data.length) {
                    this.dataMain.pageNum += 1;
                    this.initData();
                }
            },
        },
        created(){
            this.initData();
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
    }

    .removeTag{
        width: fit-content;
        padding: 2px 8px;
        margin-top: 10px;
        color: #0CC893;
        border-radius: 5px;
        border: 1px solid #0CC893;
    }

    .passer{
        width: fit-content;
        padding: 2px 8px;
        border-radius: 5px;
        color: #FFFFFF;
        background: #0CC893;
    }

</style>
