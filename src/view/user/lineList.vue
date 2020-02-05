<template>
    <div class="content">
        <div style="width: 95%;margin: 10px 0 15px">
            <div style="margin: 10px 0px 15px;width: 95%;display:flex;align-items: center">
                <div>当前路线：</div>
                    <div style="color: #5083ED;">
                        {{lineName?lineName:'暂无'}}
                    </div>
            </div>
        </div>
        <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
        <div style="margin: 10px 0px 55px;width: 95%">
            <div>其他路线：</div>
            <div class="lineList" v-for="(item,index) in lineList" :key="index" @click="changeLine(item)">{{item.lineName}}</div>
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
    import { Button, Row, Col,Divider,Dialog,Tabbar,TabbarItem} from 'vant';
    import request from "../../utils/request"
    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {

        components:{
            [Button.name]: Button,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Dialog.name]: Dialog,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },

        data(){
            return{
                active:"",
                lineList:[],
                lineName:"",
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person
            }
        },
        mounted(){
            this.initLineList();
        },

        methods:{
            initLineList(){
                let me = this;
                request.sendGet({
                    url:"/user/center/linelist",
                    params: {}
                }).then(res =>{
                    if(res.data.code === 0){
                        //处理数据
                        this.lineList = res.data.rows;
                        this.lineList.forEach(e =>{
                            if(e.isDefault == '1'){
                                me.lineName = e.lineName
                            }
                        })

                    }
                })
            },


            changeLine(item){
                let me = this;
                    Dialog.confirm({
                        title: '切换路线',
                        message:  '是否切换路线到'+item.lineName+'？'
                    }).then(() => {
                        // 确定
                        request.sendPost({
                            url: "/user/center/defaultline/"+item.lineId,
                            params: {}
                        }).then(res => {
                            if (res.data.code === 0) {
                                //切换路线成功后刷新页面
                                me.initLineList();
                                this.$toast.success("切换成功")
                            } else {
                                this.$toast.fail(res.data.msg)
                            }
                        })
                    }).catch(res =>{

                    })

            }
        }

    }
</script>

<style scoped>
    .content{
        background: #FFFFFF;
        font-size: 14px;
        padding: 10px 15px;
    }

    .lineList{
        width: 100%;
        margin: 15px auto;
        padding: 10px 5px;
        background: rgb(12, 200, 147);
        color: rgb(255, 255, 255);
        text-align: center;
        font-size: 18px;
    }


</style>
