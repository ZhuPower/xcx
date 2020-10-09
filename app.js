//app.js
App({
  onLaunch: function () {
    this.globalData.nowSource = this.globalData.sourceUrl[this.globalData.nindex]
  },
  globalData: {
    sourceUrl:[
      {
        name:'百度云资源',
        url:'https://m3u8.apibdzy.com/api.php/provide/vod/'
      },
      {
        name:'1717资源',
        url:'http://zy.itono.cn/inc/apijson_vod.php'
      },
      // {
      //   name:'OK影视',
      //   url:'https://api.okzy.tv/api.php/provide/vod/at/json/'
      // },
      // {
      //   name:'极快影视',
      //   url:'http://ts.caijizy.vip/api.php/provide/vod/at/json/'
      // },
      // {
      //   name:'麻花资源',
      //   url:'https://www.mhapi123.com/inc/api_mac10.php'
      // },
      {
        name:'天空影视',
        url:'https://m3u8.tiankongapi.com/api.php/provide/vod/at/json/'
      },
      // {
      //   name:'八戒资源',
      //   url:'http://cj.bajiecaiji.com/inc/apijson_vod.php'
      // },
      // {
      //   name:'快播影视',
      //   url:'http://www.kuaibozy.com/api.php/provide/vod/from/kbm3u8/at/json/'
      // }  
    ],
    nowSource:{},
    nindex:0
  }
})