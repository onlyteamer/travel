<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div style="margin-bottom: 55px">
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
                    <van-col span="12" @click="goPassengerDetails(item)">
                        <div style="display: flex;align-items: center">
                            <img :src="item.headimgurl?item.headimgurl:userAvatar" style="height: 50px;width: 50px;margin-right: 10px;border-radius: 50%">
                            <div>
                                <p style="margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">{{item.nickname}}</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="item.sex == '1'"><img src="./../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px" v-else /> </p>
                                <p style="margin: 5px 0">
                                    <img src="./../../static/images/xin.png" style="width: 14px;height: 14px;margin-right: 5px"/><span>{{item.goodCount}}</span>
                                    <img src="./../../static/images/unhapply.png" style="width: 14px;height: 14px;margin: 0 5px 0 20px" /> <span>{{item.badCount}}</span>
                                </p>
                                <p style="margin: 5px 0">
                                    <span style="color: #5E5E5E">乘坐{{item.passCount}}次</span>
                                </p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="12" align="right">
                        <div>
                            <div class="userType" v-if="item.tag == '2'" >车主</div>
                            <div v-else class="passer" >乘客</div>
                        </div>
                        <div><div class="removeTag" @click="del(item.id)">移出黑名单</div></div>
                    </van-col>
                </van-row>


            </div>
            </van-list>
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
    import Title from './../../components/header'
    import { Row, Col,List,Tabbar, TabbarItem} from 'vant';
    import  request from '../../utils/request'
    import avatar from '../../static/images/userAvatar.png'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [List.name]: List,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data(){
            return{
                active:"",
                userAvatar:avatar,
                title:"黑名单",
                isOneHttp: true,
                loading: false,
                finished: false,
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },

                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back(-1);
            },
            del(recordId){
                request.sendPost({
                    url:'/user/center/blackdelete/'+recordId,
                    params:{}
                }).then((res)=>{
                    if(res.data.code == '0'){
                        this.dataMain.pageNum = 1;
                        this.dataMain.data = [];
                        this.initData();
                        this.$toast.success(res.data.msg)
                    }else {
                        this.$toast.fail(res.data.msg)
                    }
                })
            },
            goPassengerDetails(val){
                if(val.tag == '1'){
                    this.$router.push({path:'/passengerDetails',query:{userId:val.blackUserId}});
                }else {
                    this.$router.push({path:'/carOwnerDetails',query:{userId:val.blackUserId}});
                }
            },
            initData() {
                request.sendGet({
                    url: '/user/center/blacklist',
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

                    if (this.dataMain.total === this.dataMain.data.length) {
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
