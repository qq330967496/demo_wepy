export default class Utils {
  _self = '';
  env = '-dev';//开发环境
  env = '-test';//测试环境
  env = '';//正式环境
  channelId = 'wzccb';//渠道ID
  aks = {
    baidu:'E11ef5f194c0c35e87f46d5d0adea53f',//百度ak
    qq:'WTPBZ-YIKCI-ETBGK-5IJKM-ZFGS7-DPFYE',//腾讯ak
  };

  constructor(that){
    this._self = that;
  }
  init(){
    // this._self.env = this._self.$wxapp.$app.globalData.env;
  }
  getPrefix(){
    //-dev -test
    return this.env;
  }
  getChannelId(){
    return this.channelId;
  }
  getAks(){
    return this.aks;
  }

  baiduMap(wepy,address,city){
    let own = this;
    wx.showLoading({
      title:'加载地图',
      mask:true,
    });
    let baiduObj = {
      address: address,
      ak:own.getAks().baidu
    }
    if(city){
      baiduObj.city = city;
    }
    wepy.request({
      url: "https://api.map.baidu.com/geocoder/v2/?output=json",
      data: baiduObj,
      complete:()=>{
        wx.hideLoading();
      },
      success: (req) => {
        let json = req.data;
        console.log("百度地图坐标",json.result.location);

        if (req.statusCode == 200) {
          //转化成腾讯经纬度
          wepy.request({
            url: "https://apis.map.qq.com/ws/coord/v1/translate",
            data: {
              locations: json.result.location.lat+','+json.result.location.lng,
              type:3,//1 GPS坐标；2 sogou经纬度；3 baidu经纬度；4 mapbar经纬度；5 [默认]腾讯、google、高德坐标；6 sogou墨卡托
              key:own.getAks().qq
            },
            success: (json2) => {
              if(json2.data.status==0){
                console.log("腾讯地图坐标",json2.data.locations[0]);
                own._self.markers = json2.data.locations;
                own._self.markers[0].latitude = own._self.markers[0].lat;
                own._self.markers[0].longitude = own._self.markers[0].lng;

                own._self.latitude = json2.data.locations[0].lat;
                own._self.longitude = json2.data.locations[0].lng;
                own._self.$apply();
              }else{
                wepy.showModal({
                  title: '错误',
                  content: json.data.message,
                  showCancel: false
                });
              }
            },
            fail: () => {
              wepy.showModal({
                title: '错误',
                content: '网络错误，请重试',
                showCancel: false
              });
            }
          });

        }else {
          wepy.showModal({
            title: '错误',
            content: '获取数据错误',
            showCancel: false
          });
        }
      },
      fail: () => {
        wepy.showModal({
          title: '错误',
          content: '网络错误，请重试',
          showCancel: false
        });
      }
    });
  }
}
