// pages/book2/book2.js

var common = require('../../common/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticket:'',
    arrObj:{
      url:'https://shayuapi.com/api.php/provide/vod/at/json/',
      type:'json',
      name:'鲨鱼影视'
    },
    wd:'',
    typeID:0,
    typeList:[],
    videolist:[],
    page:1,
    arr:[],
    arr2:[
      {
        url:'https://shayuapi.com/api.php/provide/vod/at/json/',
        type:'json',
        name:'鲨鱼影视'
      },
      {
        url:'https://jialiapi.com/api.php/provide/vod/at/json/',
        type:'json',
        name:'佳丽影视'
      },
      {
        url:'https://lbapi9.com/api.php/provide/vod/at/json/',
        type:'json',
        name:'乐播影视'
      },
      {
        url:'http://cj.cangtiancj.com/api.php/provide/vod/at/json/',
        type:'json',
        name:'苍天影视'
      },
      {
        url:'http://cj.fjgzycj.com/api.php/provide/vod/at/json/',
        type:'json',
        name:'飞机馆影视'
      },
      {
        url:'http://fhapi9.com/api.php/provide/vod/at/json/',
        type:'json',
        name:'番号资源网'
      },
      {
        url:'http://cj.809zy.com/inc/apijson_vod.php',
        type:'json',
        name:'800影视'
      },
      {
        url:'http://api.cj644.com/inc/apijson_vod.php',
        type:'json',
        name:'玉米影视'
      },
      {
        url:'https://api.rereapi.com/inc/apijson_vod.php',
        type:'json',
        name:'热热影视'
      },
      {
        url:'http://bttcj.com/inc/sapi.php',
        type:'xml',
        name:'博天堂影视'
      },
      {
        url:'https://dadiapi.com/apple_m3u8.php',
        type:'xml',
        name:'大地影视'
      },
      {
        url:'http://sscj8.com/inc/sapi.php',
        type:'xml',
        name:'色色影视'
      },
      {
        url:'http://99zywcj.com/inc/sck.php',
        type:'xml',
        name:'玖玖影视'
      },
      {
        url:'http://lsnzxcj.com/inc/sapi.php',
        type:'xml',
        name:'撸死你影视'
      },
      // {
      //   url:'http://f2dcj6.com/sapi',
      //   type:'xml',
      //   name:'富二代影视'
      // },
      {
        url:'http://zcyydy.com/sapi',
        type:'xml',
        name:'字幕网影视'
      },
      {
        url:'http://ssyydy.com/sapi',
        type:'xml',
        name:'久草影视'
      },
      {
        url:'http://nygcj.com/sapi.php',
        type:'xml',
        name:'女优影视'
      },
      {
        url:'http://llzxcj.com/inc/sck.php',
        type:'xml',
        name:'利来影视'
      },
      {
        url:'http://wmcj8.com/inc/sapi.php',
        type:'xml',
        name:'环亚影视'
      },
      {
        url:'http://api.iixxzyapi.com/inc/apickm3u8.php',
        type:'xml',
        name:'IX影视'
      },
      {
        url:'http://cj.xhgcjym.com/inc/httpapi.php',
        type:'xml',
        name:'黄瓜影视'
      }
    ]
  },

  xzlb(){
    let data = {
      ac:'videolist',
      pg:this.data.page
    }

    if(this.data.typeID){
      data.t = this.data.typeID
    }

    if(this.data.wd){
      data.wd = this.data.wd
    }

    this.setApi(this.data.arrObj.url,data).then(res => {
      let arr = this.data.videolist;
      arr.push(...res.list);
      let obj = {
        videolist: arr
      }
      this.setData(obj);
    })
  },

  cshnr(){
    this.setApi(this.data.arrObj.url,{}).then(res => {
      console.log(res)
      let obj = {
        typeList: res.class
      }
      this.setData(obj);
    })

    let data = {
      ac:'videolist',
    }
    this.setApi(this.data.arrObj.url,data).then(res => {
      console.log(res)
      let obj = {
        videolist: res.list
      }
      this.setData(obj);
    })
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

  setZYK(e){
    let item = e.currentTarget.dataset['item'];
    let obj = {
      arrObj: item
    }
    this.setData(obj);

    if(this.data.arrObj.type=='json'){
      this.cshnr();
    }else{
      
      let data = {
        ac:'videolist',
        pg:1
      }
      this.setApi(this.data.arrObj.url,data).then(res => {
        //console.log(res)
        let str = res.replace(/\<\!\[CDATA\[/ig,'').replace(/\]\]\>\<\//ig,'</');
       // console.log(str)
        var resObj=common.xml2Obj(str);
        console.log(resObj);
      })
    }
  },

  setType(e){
    let id = e.currentTarget.dataset['id'];
    let obj = {
      typeID:id,
      page:1,
      videolist:[]
    }
    this.setData(obj);
    this.xzlb();
  },
  moreBtn(){
    let page = this.data.page + 1;
    let obj = {
      page: page
    }

    this.setData(obj);
    this.xzlb();
  },

  playlike: function (e) {
    let url = e.currentTarget.dataset['url'];
    console.log(url)
    //url = url.split('$');

    wx.navigateTo({
      url: '/pages/video/video?url=' + url
    })
  },

  loginForm: function(data) {
    var username = data.detail.value.username;
    let obj = {
      wd: username,
      page:1,
      videolist:[]
    }
    this.setData(obj);
    this.xzlb();
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.cshnr();
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