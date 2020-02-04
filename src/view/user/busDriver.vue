<template>
    <div>
        <div style="background-color:white;padding:15px;position: relative">
            <div style="color: #202020;font-size: 14px;font-weight: bold">票务查询</div>
            <div style="border-bottom: 1px solid #ECECEC" @click="openDatePop">
                <van-field v-model="dateStr" label="查询日期"/>
            </div>
            <div style="display: flex;align-items:center; justify-content: flex-start; border-bottom: 1px solid #ECECEC">
                <span>巴士线路</span>
                <van-dropdown-menu style="flex: 1">
                    <van-dropdown-item v-model="value1" :options="option1" @change="changeLine"/>
                </van-dropdown-menu>
                <van-icon name="arrow" color="#9E9E9E"/>
            </div>
            <div style="height: 34px;">
                <van-button type="primary" color="#0CC893" class="item-btn" @click="queryLineDetail">查询</van-button>
            </div>

        </div>
        <div style="margin-top: 6px;background-color: white;padding:15px;position: relative">
            <div style="color: #202020;font-size: 14px;font-weight: bold">核验车票</div>
            <div style="border-bottom: 1px solid #ECECEC">
                <van-field v-model="checkCode" label="车票验证码"/>
            </div>
            <div style="height: 34px;">
                <van-button type="primary" color="#0CC893" class="item-btn" @click="driverCheck">核验车票</van-button>
            </div>
        </div>

        <div style="padding: 10px 15px;margin-top: 10px" v-if="showResult">
            <div style="font-weight: bold;font-size: 16px;margin: 5px 0">查询结果：</div>
            <div>
                <span v-text="resultDate.linename"></span>（<span v-text="resultDate.busnumber"></span>）票务情况：
                <p style="margin: 0">
                    共：<span v-text="resultDate.totalnum"></span> 张， 售出：<span v-text="resultDate.soldnum"></span>张 ， 未售出：<span v-text="resultDate.unsoldnum"></span>张 ，退票次数：<span v-text="resultDate.refundnum"></span>次
                </p>
                </div>
        </div>

        <van-popup v-model="showPop" position="bottom" :style="{ height: '30%' }">
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="cancel "
                    :visible-item-count="3"
                    @confirm="changeTimer"
            />
        </van-popup>
    </div>
</template>
<!--班车司机-->
<script>
    import {NavBar, Row, Col, Field, Button, DropdownMenu, DropdownItem, Icon,Dialog,DatetimePicker,Popup } from 'vant';
    import request from '../../utils/request'
    import moment from 'moment'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [Popup.name]: Popup,
            [Button.name]: Button,
            [Field.name]: Field,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Icon.name]: Icon,
            [Dialog.name]: Dialog,
            [DatetimePicker.name]:DatetimePicker
        },
        data() {
            return {
                showResult:false,
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                showPop:false,
                currentDate:"",
                dateStr: '',
                value1: '',
                checkCode: '',
                option1: [],
                queryData:{
                    busid:"",
                    dateStr:"",
                    lineid:""
                },
                resultDate:{

                }
            }
        },
        mounted(){
            this.initData();
        },

        methods: {
            //查询
            queryLineDetail(){
                if(!this.queryData.dateStr){
                    this.$toast.fail("请选择日期");
                    return;
                }
                if(!this.queryData.lineid){
                    this.$toast.fail("  请选择巴士线路");
                    return;
                }
                request.sendPost({
                    url: "/bus/getbusticketinfo",
                    params: this.queryData
                }).then((res) =>{
                    if (res.data.code == '0') {
                       this.resultDate = res.data.data;
                       this.showResult = true;
                    }else {
                        this.$toast.fail(res.data.msg);
                    }
                })
            },

            changeLine(val){
               if(val){
                   let arr = val.split(",");
                   if(arr.length>0){
                       this.queryData.busid = arr[1];
                       this.queryData.lineid = arr[0];
                   }
               }
            },

            //线路列表
            initData(){
                request.sendGet({
                    url: "/bus/getbuslines",
                    params: {}
                }).then((res) =>{
                    if (res.data.code == '0') {
                        let result = res.data.data;

                        for(let key  in result){
                           let obj = {};
                           obj.text = key;
                           obj.value = result[key];
                           this.option1.push(obj);
                        }
                    }
                })
            },

            onClickLeft() {
                this.$router.back(-1);
            },

            cancel(){
                this.showPop = false;
            },
            changeTimer(val){
                var timer = moment(val).format("YYYY-MM-DD");
                this.dateStr = timer;
                this.queryData.dateStr = this.dateStr;
                this.showPop = false;
            },
            openDatePop(){
                this.showPop = true;
            },

            //验票
            driverCheck(){
                if(!this.checkCode){
                    this.$toast.fail("请填写车票验证码");
                    return;
                }

                // 确定
                request.sendPost({
                    url: "/bus/driverChecking",
                    params: {
                        isdriver: 0,
                        checkcode: this.checkCode
                    }
                }).then(res => {
                    if (res.data.code == '0') {
                        this.$toast.success("验票成功");
                        this.checkCode = "";
                    } else {
                        this.$toast.fail(res.data.msg)
                    }
                })
                // Dialog.confirm({
                //     title: '验票',
                //     message: '确认是否验票？'
                // }).then(() => {
                //
                // }).catch(res => {
                //
                // })
            }
        }
    }
</script>

<style scoped>
    .item-btn {
        position: absolute;
        right: 15px;
        margin-top: 10px;
        width: 95px;
        height: 34px;
        line-height: 34px
    }

    /deep/ .van-dropdown-menu__title::after {
        content: '';
        border: none;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    /deep/ .van-cell {
        padding-left: 0 !important;;
    }
</style>
