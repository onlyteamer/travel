<template>
    
</template>

<script>
    import server from "../utils/request";

    export default {
        created(){
            server.axios.post(
                '/wx/login', qs.stringify({openid: localStorage.getItem('openid')})).then((res) => {
                if (res.data.code === 0) {
                    if (res.data.data.isLogin === "1") {
                        //登陆成功
                        localStorage.setItem("isLogin", "1");
                        window.location.href = location.protocol+"//"+location.hostname + "/#/user";
                    }
                } else if (res.data.code === 2) {
                    window.location.href = location.protocol + "//" + location.hostname + "/#/register";
                } else {
                    console.log(res.data.msg);
                }
            });
        }
    }
</script>

<style scoped>

</style>