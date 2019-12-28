<template>
    <div class="content">
        <div style="width: 95%;margin: 10px 0 15px">
            <van-row>
                <van-col span="6" >当前路线：</van-col>
                <van-col span="18">
                    <div style="color: #5083ED;">
                        <!--昌坤出行3线：上河湾 → 西坝河-->
                        {{lineName}}
                    </div>
                </van-col>
            </van-row>
        </div>
        <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
        <div style="margin: 10px 0px 15px;width: 95%">
            <div>其他路线：</div>

            <div class="lineList" v-for="(item,index) in lineList" :key="index" @click="changeLine(item)">{{lineName}}</div>
        </div>
    </div>
</template>

<script>
    import { Button, Toast, Row, Col,Divider,Dialog} from 'vant';
    import request from "../../utils/request"
    export default {

        components:{
            [Button.name]: Button,
            [Toast.name]: Toast,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Dialog.name]: Dialog,
        },

        data(){
            return{
                lineList:[],
                lineName:""
            }
        },
        mounted(){
            this.initLineList();
        },

        methods:{
            initLineList(){
                request.sendGet({
                    url:"/user/center/linelist",
                    params: {}
                }).then(res =>{
                    if(res.data.code == '0'){
                        //处理数据
                        this.lineList = res.data.rows;

                        this.lineList.forEach(e =>{
                            if(e.isDefault == '1'){
                                this.lineName = e.lineName
                            }
                        })

                    }
                })
            },


            changeLine(item){
                    Dialog.confirm({
                        title: '切换路线',
                        message:  '是否切换路线到'+item.lineName+'？'
                    }).then(() => {
                        // 确定
                        request.sendPost({
                            url: "/user/center/defaultline/"+item.lineid,
                            params: {}
                        }).then(res => {
                            if (res.data.code == '0') {
                                Toast.success("切换成功")
                            } else {
                                Toast.fail(res.data.msg)
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
