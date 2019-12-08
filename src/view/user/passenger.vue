<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" title="乘车人管理" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="item flex">
                <span style="color:#202020;font-size: 14px">乘车人信息</span>
                <van-button type="default" color="#0CC893" @click="goAdd"
                            style="width: 66px;height: 25px;padding: 0;line-height: 25px">添加
                </van-button>
            </div>
            <div class="item" style="margin-top: 10px;padding-left: 13px;padding-right: 9px">
                <div v-for="item in dataMain.data" :key="item.id" class="item-li">
                    <div class="item-li-flex" style="align-items: flex-start">
                        <div>
                            <span style="color:#202020;font-size: 16px;margin-right: 8px;font-weight: bolder">{{item.passName}}</span>
                            <span v-if="item.dft==1" class="dft-tag">默认</span>
                        </div>
                        <div style="display:flex;align-items: center;margin-top: 5px">
                            <img src="../../static/images/idCard-black.png"
                                 style="width: 20px;height: 20px;margin-right: 3px"/>
                            <span>{{item.cardId}}</span>
                        </div>
                    </div>
                    <div class="item-li-flex" style="   align-items: center;">
                        <van-button type="default" color="#5083ED" plain v-if="item.dft==1" @click="setDft"
                                    style="width: 66px;height: 25px;margin-bottom:7px;padding: 0;line-height: 25px">默认
                        </van-button>
                        <van-button type="default" color="#0CC893" plain  @click="goEdit(item.id)"
                                    style="width: 66px;height: 25px;padding: 0;line-height: 25px">编辑
                        </van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!--乘车人管理-->
<script>
    import {NavBar, Button} from 'vant';
    import request from '../../utils/request';
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
        },
        data() {
            return {
                dataMain:{
                    data:[],
                    limit:10,
                    start:0,
                    total:0
                },
            }
        },
        methods: {
            initData(){
                request.sendGet({
                    url:'/sharecar/pass/list',
                    params:{
                        limit: this.dataMain.limit,
                        start:this.dataMain.start,
                    }
                }).then((res)=>{
                   this.dataMain.data = res.data.rows;
                });
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            goAdd(){
                this.$router.push({path:'/passenger-edit'});
            },
            goEdit(id){
                this.$router.push({path:'/passenger-edit',query:{'id':id}});
            },
            setDft(){

            },
        },
        created(){
            this.initData();
        }
    }
</script>

<style scoped>
    .dft-tag {
        color: #5083ED;
        border: 1px solid #5083ED;
        background-color: #E2EBFE;
        font-size: 12px;
        padding: 3px 8px;
        width: auto;
        height: auto;
        border-radius: 3px;
    }

    .flex {
        height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        align-items: center;
    }

    .item {
        background-color: white;
    }

    .item-li {
        border-bottom: 1px solid #ECECEC;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 75px;
    }

    .item-li-flex {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .content {
        padding: 15px;
        margin-top: 46px;
    }
</style>