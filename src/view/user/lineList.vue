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
        <div style="margin: 10px 0px 15px;width: 95%">
            <div>其他路线：</div>
            <div class="lineList" v-for="(item,index) in lineList" :key="index" @click="changeLine(item)">{{item.lineName}}</div>
        </div>
    </div>
</template>

<script>
    import { Button, Row, Col,Divider,Dialog} from 'vant';
    import request from "../../utils/request"
    export default {

        components:{
            [Button.name]: Button,
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
