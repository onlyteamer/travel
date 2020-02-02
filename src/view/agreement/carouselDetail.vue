<template>
    <div style="background-color: #fff;overflow-x: hidden">
        <div v-html="title" style="text-align: center;line-height: 45px;font-size: 20px;"></div>
        <div v-html="content" class="content"></div>
    </div>
</template>

<script>
    import request from '../../utils/request'

    export default {
        data() {
            return {
                content: "",
                title: ""
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                let id = this.$route.query.id;
                request.sendGet({
                    url: "/common/advertdetail/" + id,
                    params: {}
                }).then(res => {
                    if (res.data.code === 0) {
                        this.content = this.decode(res.data.data.context);
                        this.title = res.data.data.title
                    }
                })
            },
            decode(html) {
                var temp = document.createElement("div");
                temp.innerHTML = html;
                var output = temp.innerText || temp.textContent;
                temp = null;
                return output;
            }
        }
    }
</script>

<style scoped>
</style>
