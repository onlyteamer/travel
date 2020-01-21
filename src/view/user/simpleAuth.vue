<template>
    <div>
        <div class="content">
            <div class="item">
                <van-field label-class="item-label" label="司机姓名"  v-model="definition.driverName"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="驾龄" type="number" placeholder="例如:5" v-model="definition.driverAge"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="身份证"  v-model="definition.cardId"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车牌号" placeholder="例如:A123456"
                           v-model="definition.carNumber"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆品牌" placeholder="例如:大众" v-model="definition.carBrand"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆型号" placeholder="例如:速腾" v-model="definition.carType"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆颜色" placeholder="例如:白色" v-model="definition.carColor"/>
            </div>
            <div>
                <van-checkbox style="margin-top: 20px" v-model="definition.checked" checked-color="#0CC893">
                    以上信息承诺真实有效，如果填写有虚假信息，车主承担全部责任。
                </van-checkbox>
            </div>
            <van-button @click="add" v-if="!definition.id" style="margin-top:15px;width: 100%;height:44px"
                        color="#0CC893" type="default">
                添加
            </van-button>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Field,Checkbox, Icon} from 'vant';
    import request from "../../utils/request";

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Field.name]: Field,
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox,
        },
        data() {
            return {
                definition: {
                    carBrand: '',//车辆品牌
                    carColor: '',//车辆颜色
                    cardId:'',//身份证id
                    carNumber: '',// 车牌号
                    carType: '',//车辆型号
                    driverAge:'',//驾龄
                    driverName:'',//司机姓名
                    checked: true,
                },
            }
        },
        methods: {
            add() {
                if (this.checkValid()) {
                    request.sendPost({
                        url: '/user/center/tripauth',
                        params: {
                            carBrand: this.definition.carBrand,
                            carColor: this.definition.carColor,
                            driverAge: this.definition.driverAge,
                            driverName: this.definition.driverName,
                            cardId:this.definition.cardId,
                            carNumber: this.definition.carNumber,
                            carType: this.definition.carType,
                        }
                    }).then((res) => {
                        if (res.data.code === 0) {
                            this.$toast(res.data.msg);
                            this.$router.go(-1);
                        } else {
                            this.$toast(res.data.msg);
                        }
                    })
                }
            },
            checkIdCard(idCard) {
                if (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(idCard)
                    || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(idCard)) {
                    return true;
                }
                return false;
            },
            checkValid() {
                if (!this.definition.carBrand) {
                    this.$toast("请填写车辆品牌");
                    return false;
                }
                if (!this.definition.carColor) {
                    this.$toast("请填写车辆颜色");
                    return false;
                }
                if (!this.definition.driverAge) {
                    this.$toast("请填写驾龄");
                    return false;
                }
                if (!this.definition.driverName) {
                    this.$toast("请填写司机姓名");
                    return false;
                }
                if (!this.definition.cardId || !this.checkIdCard(this.definition.cardId)) {
                    this.$toast("请输入正确的身份证号");
                    return;
                }
                if (!this.definition.carNumber) {
                    this.$toast("请填写车牌号");
                    return false;
                }
                if (!this.definition.carType) {
                    this.$toast("请填写车辆型号");
                    return false;
                }
                if (!this.definition.checked) {
                    return false;
                }
                return true;
            },
        },
    }
</script>

<style scoped>

    .content {
        background-color: white;
        padding: 0 15px 17px 15px;
    }

    /deep/ .van-checkbox {
        align-items: flex-start;
    }

    /deep/ .van-checkbox__label {
        font-size: 14px;
        color: #202020;
    }

    /deep/ .item-label {
        font-size: 14px !important;
        color: #202020 !important;
    }

    /deep/ .van-cell {
        padding-left: 0 !important;
    }

    .item {
        height: 51px;
        border-bottom: 1px solid #ECECEC;
        display: flex;
        align-items: center;
    }
</style>