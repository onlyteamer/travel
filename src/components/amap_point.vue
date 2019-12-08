<template>
  <div>

    <!--<div class="ivu-input-wrapper ivu-input-type">-->
      <!--<i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>-->
      <!--<input v-model="address" type="text" :style="{width:width}" :id="inputId" autocomplete="off" spellcheck="false" :placeholder="placeholder" class="ivu-input">-->
    <!--</div>-->
    <!-- <Input :id="inputId" placeholder="点击下面地图可选择地址" type="text"></Input> -->
    <!--<div style="margin-top:20px;"></div>-->
    <div :id="id" :style="{'width':width,'height':height}"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
  var placeSearch = '';

  export default {
    name: "Amap",
    props: {
      inputId:{
        default:'tipinput'
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
      placeholder:{
        default:'请输入地址'
      },
      initAddress:{
        default:''
      },
      lon:{
        default:''
      },
      lat:{
        default:''
      },

    },

    data() {
      return {
        address:'',
        isInit:true,
        marker:"",
        map:""
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
        //地图初始化
        var center = [116.379028,39.865042];
        if(this.lon&&this.lat){
          center = [this.lon,this.lat];
          this.marker  = new AMap.Marker({
            position: new AMap.LngLat(this.lon, this.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: ''
          });
        }
        var _this = this;
        var roadNetLayer = new AMap.TileLayer.RoadNet(); //定义一个路网图层
        var map = new AMap.Map(this.id, {
          resizeEnable: true,
          zoom: _this.zoom,
          center:center,
          layers: [roadNetLayer] //设置图层
        });
        this.map = "";
        this.map = map;
        console.log(this.marker);
        // if(this.marker){
        //   this.map.add(this.marker);
        // }
        // var toolBar = new AMap.ToolBar({
        //   visible: true
        // });
        // map.addControl(toolBar);
        // _this.autoSearch(map);
        //
        // map.on('click', function(e) {
        //   // _this.mapClick(map,e);//地图点击事件
        //   // alert('您在[ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ]的位置点击了地图！');
        // });


          let marker1  = new AMap.Marker({
              icon:"",
              position: new AMap.LngLat(116.379028, 39.865042),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: ''
          });
          let arr = [];
          arr.push(marker1);
          let marker2  = new AMap.Marker({
              icon:"",
              position: new AMap.LngLat(116.397281,39.883719),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: ''
          });
          arr.push(marker2);
          map.add(arr);
          //构造路线导航类
          // AMap.plugin('AMap.Driving', function() {
              // var driving = new AMap.Driving({
              //     map: map,
              //     panel: "panel"
              // });
              //
              // // 根据起终点经纬度规划驾车导航路线
              // driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function (status, result) {
              //     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
              //     if (status === 'complete') {
              //         log.success('绘制驾车路线完成')
              //     } else {
              //         log.error('获取驾车数据失败：' + result)
              //     }
              // });
              var driving = new AMap.Driving({
                  // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                  policy: AMap.DrivingPolicy.LEAST_TIME
              })
              console.log(driving)
              var startLngLat = [116.379028, 39.865042]
              var endLngLat = [116.397281, 39.883719]


              driving.search(startLngLat, endLngLat, function (status, result) {
                  // 未出错时，result即是对应的路线规划方案
              })
          // });
      },
      mapClick(map,e){
        // console.log(e);
        //改动标识物
        this.map.remove(this.marker);
        this.marker  = new AMap.Marker({
          position: new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: '当前位置'
        });
        this.map.add(this.marker);
        this.getDetail(e.lnglat,'01');
      },
      autoSearch(map){
        if(this.initAddress){
          this.address = this.initAddress ;
        }
        //搜索辅助
        var autoOptions = {
          input: this.inputId
        };
        var auto = new AMap.Autocomplete(autoOptions);
        placeSearch = new AMap.PlaceSearch({
          map: map
        });  //构造地点查询类
        var _this = this;
        AMap.event.addListener(auto, "select", function(e){
          _this.select(e)
        });//注册监听
      },
      select(e){
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
        this.address= e.poi.name;
        this.getDetail(e.poi.location,'02');
        // this.$emit('select',e);
      },
      getDetail(lnglatXY,type){
        //通过点击获取到所在地详细地址
        var _this = this;
        AMap.service('AMap.Geocoder',function(){//回调函数
          //实例化Geocoder
          var geocoder = new AMap.Geocoder();
          //TODO: 使用geocoder 对象完成相关功能
          geocoder.getAddress(lnglatXY,  function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              //获得了有效的地址信息，并传递给父组件
              _this.address = result.regeocode.formattedAddress;
              if(type == '02'){
                _this.$emit('select',{
                  lnglatXY:lnglatXY,
                  address:result.regeocode.formattedAddress,
                  result:result
                })
              }else {
                _this.$emit('getAddress',{
                  lnglatXY:lnglatXY,
                  address:result.regeocode.formattedAddress,
                  result:result
                })
              }

              // console.log(result.regeocode.formattedAddress);
            }else{
              //获取地址失败
            }
          });
        })
      },
      addMarker(map,e){
        //添加点标记
        new AMap.Marker({
          position: e.lnglat,
          map: map
        })
      }
    },
    watch: {
      lon:{
        immediate:true,
        handler(oldValue,newValue){
          if (this.lon&& this.lat&&this.isInit) {
            this.initMap();
            this.isInit = false;
          }
        },
      }
    },
  };
</script>

<style>

  .ivu-input{
    width: 400px;
    border-radius: 4px;
    background-color: white;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    font-size: inherit;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #DCDFE6;
    color: #606266;
    background-image: none;
  }
</style>
