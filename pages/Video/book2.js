// pages/book2/book2.js

var common = require('../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticket:''
  },

  setApi: function (url,data) {
    return new Promise((resolved, rejected) => {
      let obj = {
        'Content-type': 'text/xml;charset=UTF-8'
      }
 
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method: 'GET',
        data: data,
        header: obj,
        success(res) {
          resolved(res.data)
        }
      })
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let data = {
    //   ac:'videolist',
    //   pg:1
    // }
    // this.setApi('http://bttcj.com/inc/sapi.php',data).then(res => {
    //   //console.log(res)
    //   let str = res.replace(/\<\!\[CDATA\[/ig,'').replace(/\]\]\>\<\//ig,'</');
    //   //console.log(str)

    //   var baseNodeName='rss';
    //   var resObj=common.xml2Obj(str,baseNodeName);
    //   console.log(resObj);
    // })

    // let data = {}

    // this.setApi('https://shuapi.jiaston.com/v5/kssqgoogle/SearchEngine.html',data).then(res => {
    //   console.log(res)
    // })


// 全站视频资源采集api: 　http://zy.itono.cn/inc/api.php

// 优酷视频资源采集api: 　http://zy.itono.cn/inc/youku.php

// 芒果视频资源采集api: 　http://zy.itono.cn/inc/mgtv.php

// 乐视视频资源采集api:　 http://zy.itono.cn/inc/letv.php

// 腾讯视频资源采集api: 　http://zy.itono.cn/inc/qq.php

// 奇艺视频资源采集api: 　http://zy.itono.cn/inc/qiyi.php

// 搜狐视频资源采集api: 　http://zy.itono.cn/inc/sohu.php

// PPTV视频资源采集api:　 http://zy.itono.cn/inc/pptv.php

// 咪咕视频资源采集api: 　http://zy.itono.cn/inc/migu.php

// 哔哩哔哩资源采集api: 　http://zy.itono.cn/inc/bilibili.php

// 1905视频资源采集api: 　http://zy.itono.cn/inc/m1905.php

    https://jx.hsjyg.com/vip?vvv=
http://www.razfw.com/xxys/two/index.html

https://ios.xxjjappss.com/index?tab=0

https://ios.xxjjappss.com/search

https://ios.xxjjappss.com/search?wd=%E7%90%89%E7%92%83&page=1


https://ios.xxjjappss.com/getGlobalData

https://ios.xxjjappss.com/vod/show/66463

https://ios.xxjjappss.com/vod/reqplay/66463?plt=3&playindex=1

https://api.shizi.in:1443/vod/listing-0-0-0-0-0-0-1 

https://ios.xxjjappss.com/vod/listing-0-0-0-0-0-0-1   全部
https://ios.xxjjappss.com/vod/listing-3-0-0-0-0-0-1   电视剧
https://ios.xxjjappss.com/vod/listing-2-0-0-0-0-0-1   电影
https://ios.xxjjappss.com/vod/listing-5-0-0-0-0-0-1   动漫
https://ios.xxjjappss.com/vod/listing-4-0-0-0-0-0-1   综艺



https://ios.xxjjappss.com/vod/day-0-0-0-0-0-0-1

https://ios.xxjjappss.com/vod/month-4-0-0-0-0-0-1



    https://shuapi.jiaston.com/top/96/1.html
    https://shuapi.jiaston.com/Categories/BookCategory.html
    https://shuapi.jiaston.com/Categories/1/new/1.html
    https://shuapi.jiaston.com/Categories/1/hot/1.html
    https://shuapi.jiaston.com/Categories/1/vote/1.html
    https://shuapi.jiaston.com/Categories/1/over/1.html
    
    https://scxs.pysmei.com/prov8/newfram/96553.jpg
    https://infosxs.pysmei.com/BookFiles/Html/276/275933/info.html

    https://scxs.pysmei.com/prov8/newfram//channels.html

https://scxs.pysmei.com/prov8/newfram//man_channel.html
https://imgapixs.pysmei.com/BookFiles/BookImages/zuiqiangyaonietianwang.jpg


    https://content.anchengcn.com/BookFiles/Html/
    
    http://yck.mumuceo.com/yuedu/shuyuan/json/id/2683.json
    
    http://yck.mumuceo.com/yuedu/shuyuan/json/id/2483.json

    http://api.easou.com/api/bookapp/searchdzh.m?word=元尊&page_id=1&count=20&cid=eef_&os=ios&appverion=1049

    http://api.easou.com/api/bookapp/searchdzh.m?word=%E7%8E%B0%E4%BB%A3%E9%83%BD%E5%B8%82&type=2&page_id=1&count=20&sort_type=0&subclass=0&datasource=0&showj=1&wc=0&catalog=0&bookStatus=0&cid=eef_easou_book&version=002&os=android&udid=6A54C891235854DDD001A408A685B333&appverion=1064&ch=blf1298_11982_011&session_id=&lastClock=0&dzh=1&scp=0&appid=10001&utype=0&rtype=3&pushid=140fe1da9e87e9d63e9&ptype=4&birt=0&instime=1548583697419

    http://api.easou.com/api/bookapp/bookSummary.m?nid=256307&gid=100256307&sort=1&size=10000&returnType=110&session_id=-nEua-HnRcZlOf2ovVVOOzJ&gsort=1&showj=1&ad=0&cid=eef_easou_book&version=002&os=android&udid=1FD1EC34C1A1DD11DD61A603B9369449&appverion=1064&ch=blf1298_11982_011&session_id=-nEua-HnRcZlOf2ovVVOOzJ&lastClock=0&dzh=1&scp=0&appid=10001&utype=0&rtype=1&pushid=1a0018970afa6c9bc74&ptype=4&birt=1548574906221&instime=1548574868198

    http://api.easou.com/api/bookapp/chargeChapter.m?a=1&autoBuy=0&cid=eef_easou_book&version=002&os=android&udid=1FD1EC34C1A1DD11DD61A603B9369449&appverion=1064&ch=blf1298_11982_011&session_id=-nEua-HnRcZlOf2ovVVOOzJ&lastClock=0&dzh=1&scp=0&appid=10001&utype=0&rtype=1&pushid=1a0018970afa6c9bc74&ptype=4&birt=1548574906221&instime=1548574868198&gid=100256307&nid=256307&sort=1&gsort=0&sgsort=0&sequence=2&chapter_name=第1章 归来！


    // let data2 = {
    //   word:'元尊',
    //   page_id:1,
    //   count:20,
    //   cid:'eef_',
    //   os:'ios',
    //   appverion:'1049'
    // }

    // this.setApi('http://api.easou.com/api/bookapp/searchdzh.m',data2).then(res => {
    //   console.log(res)
    // })

    // let data3 = {}

    // this.setApi('https://shuapi.jiaston.com/top/man/top/commend/month/1.html',data3).then(res => {
    //   console.log(res)
    // })


    // let data4 = {
    // }

    // this.setApi('https://shuapi.jiaston.com/info/521014.html',data4).then(res => {
    //   console.log(res)
    // })


    // let data5 = {}
    
    // this.setApi('https://shuapi.jiaston.com/book/521014/',data5).then(res => {
    //   console.log(res)
    // })

    // let data6 = {}
    
    // this.setApi('https://shuapi.jiaston.com/book/521014/3144129.html',data6).then(res => {
    //   console.log(res)
    // })
    //https://imgapi.jiaston.com/BookFiles/BookImages/yinianyongheng.jpg
//http://ku.mumuceo.com/yuedu/shuyuan/json/id/2768.json
 
    let data7 = {
      key:'元尊'
    }
    
    this.setApi('https://shuapi.jiaston.com/search.aspx',data7).then(res => {
      console.log(res)
    })



    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})