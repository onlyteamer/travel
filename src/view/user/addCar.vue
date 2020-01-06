<template>
    <div>
        <div>
            <van-nav-bar title="车辆信息添加" :fixed="true" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="item">
                <van-field label-class="item-label" label="车牌号" placeholder="例如:A123456"
                           v-model="definition.carNumber"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆品牌" placeholder="例如:大众" v-model="definition.carBrand"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆别名" placeholder="例如:小白" v-model="definition.carName"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆型号" placeholder="例如:速腾" v-model="definition.carType"/>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆颜色" placeholder="例如:白色" v-model="definition.carColor"/>
            </div>
            <div class="item">
                <span class="item-label" style="margin-right: 20px">是否有商业保险</span>
                <van-radio-group v-model="definition.carInsurance">
                    <van-radio :name="1" checked-color="#0CC893">是</van-radio>
                    <van-radio :name="0" checked-color="#0CC893" style="margin-left:48px ">否</van-radio>
                </van-radio-group>
            </div>
            <div class="upload-item">
                <div class="upload-wrap">
                    <div style="position: relative;width: 100%;" v-if="definition.carImage2Url">
                        <van-image :src="baseImgUrl+definition.carImage2Url"  fit="cover" width="100%" height="110px" />
                        <van-icon name="close" @click="delImg2" style="font-size: 20px;position: absolute;top:-10px;right: -10px"/>
                    </div>
                    <van-uploader :max-count=1  v-if="!definition.carImage2Url" :after-read="uploadCallback2" :preview-image="false"	>
                        <van-image round width="54px" height="54px" :src="uploadIcon"/>
                        <div style="color: #9E9E9E;font-size: 14px;margin-top: 3px">上传车辆行驶证</div>
                    </van-uploader>
                </div>
            </div>
            <div class="upload-item">
                <div class="upload-wrap">
                    <div style="position: relative;width: 100%" v-if="definition.carImage1Url">
                        <van-image :src="baseImgUrl+definition.carImage1Url"  fit="cover" width="100%" height="110px" />
                        <van-icon name="close" @click="delImg" style="font-size: 20px;position: absolute;top:-10px;right: -10px"/>
                    </div>
                    <van-uploader :max-count=1  v-if="!definition.carImage1Url" :after-read="uploadCallback" :preview-image="false">
                        <van-image round width = "54px" height="54px" :src="uploadIcon"/>
                        <div style="color: #9E9E9E;font-size: 14px;margin-top: 3px">上传车辆正面照片</div>
                    </van-uploader>
                </div>
            </div>
            <div class="upload-item">
                <div class="upload-wrap">
                    <div style="position: relative;width: 100%" v-if="definition.carImage3Url">
                        <van-image :src="baseImgUrl+definition.carImage3Url"  fit="cover" width="100%" height="110px" />
                        <van-icon name="close" @click="delImg3" style="font-size: 20px;position: absolute;top:-10px;right: -10px"/>
                    </div>
                    <van-uploader :max-count=1  v-if="!definition.carImage3Url" :after-read="uploadCallback3" :preview-image="false">
                        <van-image round width="54px" height="54px" :src="uploadIcon"/>
                        <div style="color: #9E9E9E;font-size: 14px;margin-top: 3px">上传保险单照片</div>
                    </van-uploader>
                </div>
            </div>
            <div>
                <van-checkbox style="margin-top: 20px" v-model="definition.checked" checked-color="#0CC893">
                    以上信息承诺真实有效，如果填写有虚假信息，车主承担全部责任。
                </van-checkbox>
            </div>
            <van-button @click="add" v-if="!definition.id" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                添加
            </van-button>
            <van-button @click="edit" v-if="definition.id" style="margin-top:15px;width: 100%;height:44px"
                        color="#0CC893" type="default">
                修改
            </van-button>
            <van-button @click="del" v-if="definition.id" style="margin-top:15px;width: 100%;height:44px"
                        color="#9E9E9E" type="default">
                删除
            </van-button>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Field, Uploader, Image, RadioGroup, Radio, Checkbox, Toast,Icon } from 'vant';
    import uploadIcon from '../../static/images/upload.png';
    import request from "../../utils/request";
    import context from "../../utils/context";

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Image.name]: Image,
            [Field.name]: Field,
            [Uploader.name]: Uploader,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Checkbox.name]: Checkbox,
            [Toast.name]: Toast,
            [Icon.name]:Icon
        },
        data() {
            return {
                definition: {
                    id: '',
                    carBrand: '',//车辆品牌
                    carColor: '',//车辆颜色
                    carId: '',//车辆ID
                    carImage1Url: '',//车辆图片
                    carImage2Url: '',//车辆行驶证
                    carImage3Url: '',//车辆保险照片
                    carInsurance: 1,//是否有商业保险:1 有 0 没有
                    carName: '',// 车辆名称-用户起的别称
                    carNumber: '',// 车牌号
                    carType: '',//车辆型号
                    isAudite:0,
                    checked: true,
                },
                baseImgUrl:context.imageServer,
                uploadIcon: uploadIcon,
            }
        },
        methods: {
            edit() {
                if (this.checkValid()) {
                    request.sendPost({
                        url: '/user/center/updatecar',
                        params: {
                            id: this.definition.id,
                            carBrand: this.definition.carBrand,
                            carColor: this.definition.carColor,
                            carId: this.definition.carId,
                            carImage1Url: this.definition.carImage1Url,
                            carImage2Url: this.definition.carImage2Url,
                            carImage3Url: this.definition.carImage3Url,
                            carInsurance: this.definition.carInsurance,
                            carName: this.definition.carName,
                            carNumber: this.definition.carNumber,
                            carType: this.definition.carType,
                        }
                    }).then((res) => {
                        if (res.data.code === 0) {
                            Toast(res.data.msg);
                            this.$router.back(-1);
                        } else {
                            Toast(res.data.msg);
                        }
                    })
                }
            },
            del() {
                request.sendPost({
                    url: '/user/center/deletecar',
                    params: {
                        id: this.definition.id
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        Toast(res.data.msg);
                        this.$router.back(-1);
                    } else {
                        Toast(res.data.msg);
                    }
                })
            },
            add() {
                if (this.checkValid()) {
                    request.sendPost({
                        url: '/user/center/addcar',
                        params: {
                            id: this.definition.id,
                            carBrand: this.definition.carBrand,
                            carColor: this.definition.carColor,
                            carId: this.definition.carId,
                            carImage1Url: this.definition.carImage1Url,
                            carImage2Url: this.definition.carImage2Url,
                            carImage3Url: this.definition.carImage3Url,
                            carInsurance: this.definition.carInsurance,
                            carName: this.definition.carName,
                            carNumber: this.definition.carNumber,
                            carType: this.definition.carType,
                        }
                    }).then((res) => {
                        if (res.data.code === 0) {
                            Toast(res.data.msg);
                            this.$router.back(-1);
                        } else {
                            Toast(res.data.msg);
                        }
                    })
                }
            },
            checkValid() {
                if (!this.definition.carBrand) {
                    Toast("请填写车辆品牌");
                    return false;
                }
                if (!this.definition.carColor) {
                    Toast("请填写车辆颜色");
                    return false;
                }
                if (!this.definition.carImage1Url) {
                    Toast("请上传车辆图片");
                    return false;
                }
                if (!this.definition.carImage2Url) {
                    Toast("请上传车辆行驶证");
                    return false;
                }
                if (!this.definition.carImage3Url) {
                    Toast("请上传车辆保险照片");
                    return false;
                }
                if (!this.definition.carNumber) {
                    Toast("请填写车牌号");
                    return false;
                }
                if (!this.definition.carType) {
                    Toast("请填写车辆型号");
                    return false;
                }
                if (!this.definition.checked) {
                    return false;
                }
                return true;
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            //上传车辆正面照片
            uploadCallback(uploadFile) {
                if(uploadFile.file.size > 1024 * 1024){
                    Toast("图片大小不能超过1M");
                    return false;
                }
                let param = new FormData();
                param.append('file', uploadFile.file);//通过append向form对象添加数据
                request.uploadFile({
                    url: '/image/oss/upload',
                    params: param
                }).then((res) => {
                    if (res.data.code === 0) {
                        let arr = res.data.data.url.split('/');
                        if (arr && arr.length > 1) {
                            this.definition.carImage1Url = arr[arr.length - 1];
                        }
                    }
                })
            },
            //删除车辆正面照片
            delImg() {
                request.sendPost({
                    url: "/image/oss/delete",
                    params: {
                        imageName: this.definition.carImage1Url
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.definition.carImage1Url = '';
                    }
                })
            },
            //上传车辆行驶证
            uploadCallback2(uploadFile) {
                if(uploadFile.file.size > 1024 * 1024){
                    Toast("图片大小不能超过1M");
                    return false;
                }
                let param = new FormData();
                param.append('file', uploadFile.file);//通过append向form对象添加数据
                request.uploadFile({
                    url: '/image/oss/upload',
                    params: param
                }).then((res) => {
                    if (res.data.code === 0) {
                        let arr = res.data.data.url.split('/');
                        if (arr && arr.length > 1) {
                            this.definition.carImage2Url = arr[arr.length - 1];
                        }
                    }
                })
            },
            //删除车辆行驶证
            delImg2() {
                request.sendPost({
                    url: "/image/oss/delete",
                    params: {
                        imageName: this.definition.carImage2Url
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.definition.carImage2Url = '';
                    }
                })
            },
            //上传车辆保险照片
            uploadCallback3(uploadFile) {
                if(uploadFile.file.size > 1024 * 1024){
                    Toast("图片大小不能超过1M");
                    return false;
                }
                let param = new FormData();
                param.append('file', uploadFile.file);//通过append向form对象添加数据
                request.uploadFile({
                    url: '/image/oss/upload',
                    params: param
                }).then((res) => {
                    if (res.data.code === 0) {
                        let arr = res.data.data.url.split('/');
                        if (arr && arr.length > 1) {
                            this.definition.carImage3Url = arr[arr.length - 1];
                        }
                    }
                })
            },
            //删除车辆保险照片
            delImg3() {
                request.sendPost({
                    url: "/image/oss/delete",
                    params: {
                        imageName: this.definition.carImage3Url
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.definition.carImage3Url = '';
                    }
                })
            },
            queryCar() {
                request.sendPost({
                    url: '/user/center/selectcar',
                    params: {
                        id: this.definition.id
                    }
                }).then((res)=>{
                    if(res.data.code===0){
                        this.definition = res.data.data.data;
                        this.definition.checked = true;
                    }

                })
            },
        },
        created() {
            let id = this.$route.query.id;
            if (id) {
                this.definition.id = id;
                this.queryCar();
            }
        }
    }
</script>

<style scoped>
    /deep/ .van-uploader__input-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    /deep/ .van-radio-group {
        display: flex;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    /deep/ .van-uploader__preview-image {
        width: 100%;
        height: 110px;
    }

    /deep/ .van-checkbox {
        align-items: flex-start;
    }

    .upload-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 110px;
        flex: 1;
        border: 1px #CFCFCF dashed;
    }

    .upload-item {
        height: 126px;
        display: flex;
        border-bottom: 1px solid #ECECEC;
        padding-top: 16px;
    }

    .content {
        background-color: white;
        padding: 0 15px 17px 15px;
        margin-top: 46px;
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