//app.js
App({
  onLaunch: function () {
    this.globalData.nowSource = this.globalData.sourceUrl[this.globalData.nindex]
  },
  globalData: {
    sourceUrl:[
      {
        name:'麻花资源',
        url:'https://www.mhapi123.com/inc/api_mac10.php'
      },
      {
        name:'百度云资源',
        url:'https://m3u8.apibdzy.com/api.php/provide/vod/'
      },
      {
        name:'1717资源',
        url:'http://zy.itono.cn/inc/apijson_vod.php'
      },
      {
        name:'天空影视',
        url:'https://m3u8.tiankongapi.com/api.php/provide/vod/at/json/'
      },
      {
        name:'最大影视',
        url:'http://www.zdziyuan.com/inc/s_feifei3zuidam3u8/'
      }
    ],
    nowSource:{},
    nindex:0
  }
})