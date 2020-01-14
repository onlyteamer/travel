<template>
    <div ref="content" class="content">
        <div class="content">
            <div class="item">
                <van-field label-class="item-label" v-model="driverInfo.driverName" label="司机姓名"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" v-model="driverInfo.driverAge" label="驾龄"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" v-model="driverInfo.cardId" label="身份证号"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" v-model="driverInfo.driverCardId" label="驾驶证编号"></van-field>
            </div>
            <div class="upload-item">
                <span class="item-label">上传驾驶证</span>
                <div class="upload-wrap">
                    <div style="position: relative;width: 100%" v-if="driverInfo.driverCardimage">
                        <img :src="baseImgUrl+driverInfo.driverCardimage"   width="100%" height="110px" />
                        <van-icon name="close" @click="delImg3" style="font-size: 20px;position: absolute;top:-10px;right: -10px"/>
                    </div>
                    <van-uploader :max-count=1  v-if="!driverInfo.driverCardimage" :after-read="uploadCallback"  :preview-image="false">
                        <img round width="54px" height="54px" :src="uploadIcon"/>
                        <div style="color: #9E9E9E;font-size: 14px">选择文件</div>
                    </van-uploader>
                </div>
            </div>
            <div>
                <van-checkbox style="margin-top: 20px" v-model="definition.checked" checked-color="#0CC893">
                    <div style="display: flex">
                        <div>同意：</div>
                        <div>
                            <div>司机驾龄不低于2年</div>
                            <div>阅读并同意《隐私保护条款》</div>
                        </div>
                    </div>

                </van-checkbox>
            </div>
            <van-button @click="submit" style="margin-top:39px;width: 100%;height:44px" color="#0CC893" type="default">
                提交实名认证
            </van-button>
            <div style="margin-top: 19px">
                <div style="display: flex;align-items: center">
                    <img style="width: 16px;height: 16px" src="../../static/images/notice.png"/>
                    <span style="font-size: 14px;color: #202020;font-weight: bold">注意：</span>
                </div>
                <div style="font-size: 14px;color: #202020;margin-top: 3px">
                    实名认证完全处于乘客安全考虑，我们不会将您的实名信息透露给任何第三方组织或个人。
                </div>
            </div>
        </div>
    </div>


</template>
<!--车主认证-->
<script>
    import {NavBar, Field, Button, Uploader, Checkbox,Toast,Icon} from 'vant';
    import uploadIcon from '../../static/images/upload.png';

    import request from '../../utils/request';
    import context from "../../utils/context";

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Checkbox.name]: Checkbox,
            [Toast.name]: Toast,
            [Icon.name]:Icon
        },
        data() {
            return {
                definition: {
                    checked: false
                },
                driverInfo:{
                    driverName:"",
                    cardId:"",
                    driverAge:"",
                    driverCardId:"",
                    driverCardimage:""
                },
                baseImgUrl:context.imageServer,
                imgURL: [],
                uploadIcon: uploadIcon
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            uploadCallback(uploadFile) {
                if (uploadFile.file.size > 1024 * 1024) {
                    //创建一个image
                    let img = new Image();
                    //设置图片路径为 获取的file的content
                    img.src = uploadFile.content;
                    let me = this;
                    img.onload = function(){
                        let file = me.ontpys(img);
                        me.upLoadImg(file);
                    }
                }else{
                    this.upLoadImg(uploadFile.file);
                }

            },
            upLoadImg(file){
                let param = new FormData();
                param.append('file', file);//通过append向form对象添加数据
                request.uploadFile({
                    url: '/image/oss/upload',
                    params: param
                }).then((res) => {
                    if (res.data.code === 0) {
                        let arr = res.data.data.url.split('/');
                        if (arr && arr.length > 1) {
                            this.driverInfo.driverCardimage = arr[arr.length - 1];
                        }
                    }
                })
            },
            //压缩图片的方法
            ontpys(img) {
                let originWidth = img.width, // 压缩后的宽
                    originHeight = img.height,
                    maxWidth = 1024,
                    maxHeight = 768,
                    quality = 1.5, // 压缩质量
                    canvas = document.createElement("canvas"),
                    drawer = canvas.getContext("2d");
                canvas.width = maxWidth;
                canvas.height = (originHeight / originWidth) * maxWidth;
                drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
                let file = this.dataURLtoFile(base64, Date.parse(Date()) + ".jpg");
                return file;
            },
            //base64转file
            dataURLtoFile(dataurl, filename) {
                let arr = dataurl.split(","),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type: mime});
            },
            //删除照片
            delImg3() {
                request.sendPost({
                    url: "/image/oss/delete",
                    params: {
                        imageName: this.driverInfo.driverCardimage
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.driverInfo.driverCardimage = '';
                    }
                })
            },

            setHeight() {
                let content = document.getElementsByClassName('content')[0];
                let height = window.innerHeight;
                content.style.height = height + 'px';
            },
            submit() {
                if(!this.definition.checked){
                    Toast.fail("请同意条款再操作");
                    return false;
                }

                if(!this.driverInfo.driverName){
                    Toast.fail("司机姓名不能为空");
                    return false;
                }
                if(!this.driverInfo.cardId){
                    Toast.fail("司机身份证号不能为空");
                    return false;
                }
                if(!this.driverInfo.driverCardId){
                    Toast.fail("驾驶证编号不能为空");
                    return false;
                }
                if(!this.driverInfo.driverAge){
                    Toast.fail("驾龄不能为空");
                    return false;
                }
                if(!this.driverInfo.driverCardimage){
                    Toast.fail("请上传驾驶证图片");
                    return false;
                }

                request.sendPost({
                    url:"/user/center/driver/update",
                    params:this.driverInfo
                }).then(res =>{
                    if(res.data.code == '0'){
                        Toast.success("操作成功");
                        this.$router.push({path:'/ownerCertificationRemind'});
                    }else {
                        Toast.fail(res.data.msg)
                    }
                })

            }
        },
        mounted: function () {
            this.setHeight();
        }
    }
</script>

<style scoped>
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
        padding: 0 15px;
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
