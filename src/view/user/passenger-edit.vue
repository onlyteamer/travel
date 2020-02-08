<template>
        <div class="content">
            <div class="item">
                <van-field label-class="item-label" label="乘车人姓名" v-model="definition.passName"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="身份证号码" v-model="definition.cardId"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="手机号码" v-model="definition.passPhone"></van-field>
            </div>
            <div>
                <van-checkbox style="margin-top: 20px" v-model="definition.checked" checked-color="#0CC893">
                    同意：因信息填写错误导致出现意外无法理赔由用户自己承担损失；未成年赔付上限依据保监会同意。同意<span style="color:#0CC893;" @click="goAgreement">《保险条款》</span>
                </van-checkbox>
            </div>
            <div style="margin-bottom:17px;">
                <van-button @click="submitInfo" style="margin-top:15px;width: 100%;height:44px"
                            color="#0CC893" type="default">
                    保存
                </van-button>
                <van-button @click="del" style="margin-top:15px;width: 100%;height:44px" v-if="definition.id"
                            color="#9E9E9E" type="default">
                    删除
                </van-button>
            </div>

        </div>
</template>
<!--乘车人编辑页-->
<script>
    import {NavBar, Field, Button, Checkbox} from 'vant';
    import request from '../../utils/request';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Checkbox.name]: Checkbox,
        },
        data() {
            return {
                definition: {
                    checked: true,
                    cardId: '',
                    passName: '',
                    id: '',
                    passPhone: ''
                }
            }
        },
        methods: {
            del(){
                request.sendPost({
                    url: '/sharecar/pass/delete',
                    params: {
                        id: this.definition.id,
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$toast.success(res.data.msg);
                        this.$router.back(-1);
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                })
            },
            goAgreement() {
                //协议页面
                this.$router.push({path: '/agreement', query: {id: '1'}})
            },
            checkIdCard(idCard) {
                if (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(idCard)
                    || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(idCard)) {
                    return true;
                }
                return false;
            },
            checkPhone(phone) {
                if (/^1[3456789]\d{9}$/.test(phone)) {
                    return true;
                }
                return false;
            },
            //新增乘车人
            submitInfo() {
                if (!this.definition.passName) {
                    this.$toast.fail("请填写乘车人姓名");
                    return;
                }
                if (!this.definition.cardId || !this.checkIdCard(this.definition.cardId)) {
                    this.$toast.fail("请输入正确的身份证号");
                    return;
                }
                if (!this.definition.passPhone || !this.checkPhone(this.definition.passPhone)) {
                    this.$toast.fail("请输入正确的手机号");
                    return;
                }
                if (this.definition.id) {
                    this.edit()
                } else {
                    this.add();
                }
            },
            add() {
                request.sendPost({
                    url: '/sharecar/pass/add',
                    params: {
                        passName: this.definition.passName,
                        cardId: this.definition.cardId,
                        passPhone: this.definition.passPhone,
                        isDefault:0,
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$toast.success(res.data.msg);
                        this.$router.back(-1);
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                })
            },
            edit() {
                request.sendPost({
                    url: '/sharecar/pass/update',
                    params: {
                        passName: this.definition.passName,
                        cardId: this.definition.cardId,
                        id: this.definition.id,
                        passPhone: this.definition.passPhone,
                        isDefault:this.definition.isDefault
                    }
                }).then((res) => {
                    if (res.data.code == 0) {
                        this.$toast.success(res.data.msg);
                        this.$router.back(-1);
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                })
            },
            queryPassenger() {
                request.sendPost({
                    url: '/sharecar/pass/select/'+this.definition.id,
                    params: {
                    }
                }).then((res) => {
                    this.definition = res.data.data;
                    this.definition.checked = true;
                })
            },
        },
        created() {
            let id = this.$route.query.id;
            if (id) {
                this.definition.id = id;
                this.queryPassenger();
            }
        }
    }
</script>

<style scoped>
    /deep/ .van-field__label {
        font-weight: bold !important;
        font-size: 14px !important;
        color: #202020 !important;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .content {
        background-color: white;
        padding: 15px 15px 0 15px;
    }

    .item {
        height: 46px;
        border-bottom: 1px solid #ECECEC;
        display: flex;
        align-items: center;
    }

    /deep/ .van-checkbox__label {
        font-size: 14px;
        color: #202020;
        line-height: 26px;
    }

    /deep/ .item-label {
        font-size: 14px !important;
        color: #202020 !important;
    }

    /deep/ .van-cell {
        padding-left: 0 !important;
    }

    /deep/ .van-checkbox {
        align-items: flex-start;
    }
</style>