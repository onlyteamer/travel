<template>
    <div>
        <div :id="id" :style="{'width':width,'height':height}"></div>
    </div>
</template>

<script>
    export default {
        props: {
            inputId: {
                default: 'tipinput'
            },
            id: {
                default: "container"
            },
            width: {
                default: "100%"
            },
            zoom: {
                default: 13
            },
            height: {
                default: "800px"
            },
            placeholder: {
                default: '请输入地址'
            },
            initAddress: {
                default: ''
            },
            lon: {
                default: '116.379028'
            },
            lat: {
                default: '39.865042'
            },

        },

        data() {
            return {
                address: '',
                isInit: true,
                marker: "",
                map: ""
            };
        },

        mounted() {
            let _this = this
            if (process.browser) {
                _this.initMap()
            }
        },
        methods: {
            initMap() {
                //基本地图加载
                var center = [116.379028, 39.865042];
                let _this = this;
                var roadNetLayer = new AMap.TileLayer.RoadNet(); //定义一个路网图层
                var map = new AMap.Map(this.id, {
                    resizeEnable: true,
                    zoom: _this.zoom,
                    center: center,
                    layers: [roadNetLayer] //设置图层
                });
              var marker = new AMap.Marker({
                position: new AMap.LngLat(this.lon, this.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '北京'
              });
              map.add(marker);
            },
        },
    };
</script>

<style>

</style>
