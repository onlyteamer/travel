<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" title="我的投诉" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div v-for="item in list" :key="item.id">
                    <div class="item">
                        <div class="item-li">
                            <img src="../../static/images/user/wdzl.png"/>
                            <div>投诉日期：</div>
                            <div style="flex: 1">2019年10月12日</div>
                        </div>
                        <div class="item-li">
                            <img src="../../static/images/user/wdzl.png"/>
                            <div >投诉对象：</div>
                            <div style="flex: 1">乘客</div>
                        </div>
                        <div class="item-li">
                            <img src="../../static/images/user/wdzl.png"/>
                            <div >投诉内容：</div>
                            <div style="flex: 1">不给钱</div>
                        </div>
                        <div class="item-li">
                            <img src="../../static/images/user/wdzl.png"/>
                            <div >处理结果：</div>
                            <div style="flex:1">给钱给钱给钱给钱给钱给钱给钱给钱给钱给钱给钱给钱</div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    import {NavBar, List} from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [List.name]: List,
        },
        data() {
            return {
                loading: false,
                finished: false,
                list: [{id: '1', time: '8:30', year: '2019年12月30日', name: '拼车出行收益', value: '20', type: '1'},
                    {id: '2', time: '8:30', year: '2019年12月30日', name: '拼车出行收益', value: '100', type: '-1'},
                    {id: '3', time: '8:30', year: '2019年12月30日', name: '拼车出行收益', value: '80', type: '-1'},
                    {id: '4', time: '8:30', year: '2019年12月30日', name: '拼车出行收益', value: '120', type: '1'},
                ],
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            onLoad() {

            }
        }
    }
</script>

<style scoped>
    .content {
        background-color: #F6F6F6;
        padding: 10px 15px 0 15px;
        margin-top: 46px;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .item {
        margin-bottom: 10px;
        background-color: white;
        padding: 10px;
    }

    .item-li {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #202020;
    }

    .item-li img {
        height: 17px;
        width: auto;
        margin-right: 8px;
        display: block;
    }
</style>