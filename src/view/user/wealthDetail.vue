<template>
    <div>
        <div>
            <van-nav-bar title="账单明细" left-arrow @click-left="onClickLeft"/>
        </div>
        <div>
            <van-tabs  sticky type="card" v-model="active" @click="onClick" title-active-color="#fff" title-inactive-color="#0CC893" color="#0CC893">
                <van-tab title="全部">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                       <div style="padding: 0 15px;background-color: white">
                           <van-row v-for="item in list0" :key="item.id" class="item">
                               <van-col span="8" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.year}}</van-col>
                               <van-col span="4" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.time}}</van-col>
                               <van-col span="8" style="color:#202020;font-size: 14px;height: 50px;line-height: 50px">{{item.name}}</van-col>
                               <van-col span="4" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.value}}</van-col>
                           </van-row>
                       </div>
                    </van-list>
                </van-tab>
                <van-tab title="消费">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <div style="padding: 0 15px;background-color: white">
                            <van-row v-for="item in list1" :key="item.id" class="item">
                                <van-col span="8" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.year}}</van-col>
                                <van-col span="4" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.time}}</van-col>
                                <van-col span="8" style="color:#202020;font-size: 14px;height: 50px;line-height: 50px">{{item.name}}</van-col>
                                <van-col span="4" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.value}}</van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="收益">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <div style="padding: 0 15px;background-color: white">
                            <van-row v-for="item in list2" :key="item.id" class="item">
                                <van-col span="8" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.year}}</van-col>
                                <van-col span="4" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.time}}</van-col>
                                <van-col span="8" style="color:#202020;font-size: 14px;height: 50px;line-height: 50px">{{item.name}}</van-col>
                                <van-col span="4" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.value}}</van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="充值">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <div style="padding: 0 15px;background-color: white">
                            <van-row v-for="item in list3" :key="item.id" class="item">
                                <van-col span="8" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.year}}</van-col>
                                <van-col span="4" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.time}}</van-col>
                                <van-col span="8" style="color:#202020;font-size: 14px;height: 50px;line-height: 50px">{{item.name}}</van-col>
                                <van-col span="4" style="color: #5E5E5E;font-size: 14px;height: 50px;line-height: 50px">{{item.value}}</van-col>
                            </van-row>
                        </div>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import {NavBar, Tab, Tabs,Row, Col, List } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
        },
        data() {
            return {
                loading: false,
                finished: false,
                active:1,
                list0:[{id:'1',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'20',type:'1'},
                    {id:'2',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'100',type:'-1'},
                    {id:'3',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'80',type:'-1'},
                    {id:'4',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'120',type:'1'},
                ],
                list1:[{id:'1',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'20',type:'1'},
                    {id:'2',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'100',type:'-1'},
                    {id:'3',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'80',type:'-1'},
                    {id:'4',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'120',type:'1'},
                ],
                list2:[{id:'1',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'20',type:'1'},
                    {id:'2',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'100',type:'-1'},
                    {id:'3',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'80',type:'-1'},
                    {id:'4',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'120',type:'1'},
                ],
                list3:[{id:'1',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'20',type:'1'},
                    {id:'2',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'100',type:'-1'},
                    {id:'3',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'80',type:'-1'},
                    {id:'4',time:'8:30',year:'2019年12月30日',name:'拼车出行收益',value:'120',type:'1'},
                ],
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            onClick(){

            },
            onLoad(){
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);
            }
        },
        created: function(){
            this.active = this.$route.query.activeIndex;
        }
    }
</script>

<style scoped>
    /deep/ .van-tabs__nav--card{
        margin-left: 0;
        margin-right: 0;
    }
    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }
    .item{
        height: 50px;
    }
</style>