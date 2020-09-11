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
      // {
      //   url:'https://apilj.com/api.php/provide/vod/at/json/',
      //   type:'json',
      //   name:'辣椒影视'
      // },
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
    this.cshnr();
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
    
    url = url.substring(5);
    console.log(url)

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
    // let data = {
    //   ac:'videolist',
    //   pg:1
    // }
    // this.setApi(this.data.arrObj.url,data).then(res => {
    //   console.log(res)
    //   //let str = res.replace(/\<\!\[CDATA\[/ig,'').replace(/\]\]\>\<\//ig,'</');
    //   //console.log(str)

    //   //var baseNodeName='rss';
    //   //var resObj=common.xml2Obj(str,baseNodeName);
    //   //console.log(resObj);
    // })

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