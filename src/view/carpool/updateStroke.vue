<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">始发时间</van-col>
                <van-col span="16" class="valStyle" @click="openTimer"><span v-text="stroke.startDate"></span></van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">方向</van-col>
                <van-col span="14" class="valStyle">{{stroke.point}}</van-col>
                <van-col span="2" @click="changePoint"><van-icon name="arrow" color="#9E9E9E"/></van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="8">行驶路线</van-col>
                <van-col span="16" class="valStyle">{{stroke.route}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">座位数</van-col>
                <van-col span="16" class="valStyle">{{stroke.seatCount}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="8">价格</van-col>
                <van-col span="16" class="valStyle">{{stroke.price}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                <van-col span="8">车辆信息</van-col>
                <van-col span="14" class="valStyle">{{stroke.carInfo}}</van-col>
                <van-col span="2" @click="changePoint"><van-icon name="arrow" color="#9E9E9E"/></van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;" >
                <van-col span="8" style="display: flex;align-items: center;min-height: 80px"><span>备注信息</span></van-col>
                <van-col span="14" class="valStyle" style="min-height: 80px">{{stroke.remark}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 0px;" >
                <van-col span="24">
                    <van-checkbox v-model="checked" checked-color="#07c160" shape="square">阅读并同意《免责协议和条款》和《平台支付条款></van-checkbox>
                </van-col>
            </van-row>

            <van-row >
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#0CC893" style="width: 100%;margin: 0 auto">修改行程</van-button>
                </van-col>
            </van-row>

            <van-row >
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#9E9E9E" style="width: 100%;margin: 0 auto">取消</van-button>
                </van-col>
            </van-row>
        </div>

        <van-popup
                v-model="showPop"
                position="bottom"
                :style="{ height: '30%' }"
        >
            <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    @cancel="cancel"
                    @confirm="changeTimer"
            />
        </van-popup>

        <van-popup
                v-model="showPoint"
                position="bottom"
                :style="{ height: '30%' }"
        >
            <van-picker :columns="columns" show-toolbar  @cancel="showPoint = false"
                        @confirm="onChange" />
        </van-popup>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Cell, CellGroup,DatetimePicker,Popup,Row, Col,Icon,Picker ,Checkbox, CheckboxGroup ,Button  } from 'vant';

    const citys = {
        '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        '福建': ['福州', '厦门', '莆田', '三明', '泉州']
    };

    export default {
        name: "pushStroke",
        components:{
            Title,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [DatetimePicker.name]:DatetimePicker,
            [Popup.name]:Popup,
            [Row.name]:Row,
            [Col.name]:Col,
            [Icon.name]:Icon,
            [Picker.name]:Picker,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup,
            [Button.name]:Button
        },
        data(){
            return{
                checked:true,
                title:"修改行程",
                minDate: new Date(),
                currentDate: new Date(),
                showPop:false,
                showPoint:false,
                stroke:{
                    startDate:"2019年12月2日 06:55",
                    point:"北京",
                    route:"上河湾出发，李哥庄，绿地，果园，少年宫，万象城",
                    seatCount:3,
                    price:23,
                    carInfo:"大众速腾（京A***356）",
                    remark:"车上不能抽烟，不能长时间打电话"
                },
                cityList:this.citys,
                columns: [
                    {
                        values: Object.keys(citys),
                        className: 'column1'
                    },
                    {
                        values: citys['浙江'],
                        className: 'column2',
                        defaultIndex: 2
                    }
                ]
            }
        },
        methods:{
            onClickLeft(){

            },

            changePoint(){
                this.showPoint = true;
            },
            //方向
            onChange(picker, values) {
                console.log(picker);
                console.log(values);

                this.stroke.point = picker[1];
                this.showPoint = false;
                // picker.setColumnValues(1, citys[values[0]]);
            },


            openTimer(){
                this.showPop = true;
            },
            cancel(){
                this.showPop = false
            },

            changeTimer(val){
                let timer = this.formatTime(val.getTime());

                this.stroke.startDate = timer;

                this.showPop = false;

            },

            formatTime(timestamp){
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '年';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
                let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
                let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
                return Y + M + D + h + m;
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
    }

    .contain .content{
        border-top: 1px solid #ECECEC;
        width: 90%;
        margin: 46px auto 15px;
        color: #202020;
    }

    .contain .content .valStyle{
        color: #9E9E9E;
        font-size: 14px;
    }

</style>
