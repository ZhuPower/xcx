// pages/videoList/videoList.js

import {
  hexMD5
} from "../../utils/md5.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    catelist:[],
    tagsList:[],
    tname: 'u_temp_user_1',
    tag:0,
    page:1,
    isSearch:false,
    keySearch:''
  },
  getSearch:function(){
    let vname = this.data.keySearch.toString()
    let url = 'http://vapi.yichuba.com/search'
    let data = {
      vname: vname,
      page: parseInt(this.data.page),
      pageCount: 20
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  getTags: function(){
    let url = 'http://vapi.yichuba.com/showtags'
    let data = {}

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  getCate: function(){
    
    let url = 'http://vapi.yichuba.com/catelist'
    let data = {
      type: 0,
      tag: parseInt(this.data.tag),
      page: parseInt(this.data.page),
      pageCount: 20,
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  isLogin2: function () {
    let url = 'http://mhapi.spdchgj.com/2/cartoon/tempuser/login'
    let data = {
      app: 1,
      tname: this.data.tname
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  setApi: function (url, data) {
    this.getToke();
    return new Promise((resolved, rejected) => {
      var signParams = this.signString(data);
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method: 'POST',
        data: data,
        header: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Access-Token': this.data.requestToken,
          'timestamp': signParams.timestamp,
          'sign': signParams.sign
        },
        success(res) {
          resolved(res.data)
        }
      })
    })
  },
  signString: function (req) {
    var obj = {}
    for (var key in req) {
      obj[key] = req[key]
    }
    var tmp = Date.parse(new Date()).toString();
    var timestamp = tmp.substr(0, 13);
    obj.timestamp = timestamp;
    var arr = new Array();
    var num = 0;
    for (var i in obj) {
      arr[num] = i;
      num++;
    }
    var sortArr = arr.sort();
    var stringA = '';
    var j = 0;
    for (var i in sortArr) {
      var v = obj[sortArr[i]];
      if (!v && v != 0) {
        v = '';
      }
      stringA += sortArr[i] + '=' + v;
      if (j < sortArr.length - 1) {
        stringA += '&';
      }
      j++;
    }

    var key = '&key=Cartoon$2019&#';
    var sign = hexMD5(stringA + key);
    return {
      timestamp: timestamp,
      sign: sign.toString().toUpperCase()
    };
  },
  getToke: function () {
    var requestToken = wx.getStorageSync('token') || '';
    var refRequestToken = function () {
      if (requestToken) {
        return requestToken;
      } else {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [];
        for (var i = 0; i < 32; i++) uuid[i] = chars[0 | Math.random() * 62];
        requestToken = uuid.join('');
        wx.setStorageSync("token", requestToken);
        return requestToken;
      }
    }

    this.setData({
      requestToken: refRequestToken()
    })
  },
  loginForm: function(data) {
    var keySearch = data.detail.value.username
    if (keySearch) {
      this.setData({
        keySearch: keySearch,
        isSearch:true
      })
      this.getSearch().then(res => {
        if(res.code == 0){
          this.setData({
            catelist: res.data
          })
        }
      })
    }
  },
  changeTag:function(e){
    let tag = e.currentTarget.dataset['id'];
    let obj = {
      page: 1,
      isSearch:false,
      tag: tag
    }

    this.setData(obj)
    this.getCate().then(res => {
      if(res.code == 0){
        this.setData({
          catelist: res.data
        })
      }
    })
  },
  playlike:function(e){
    wx.clearStorage();
    wx.setStorageSync("tname", this.data.tname);

    let vid = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '/pages/video2/video2?vid=' + vid
    })
  },
  moreBtn:function(){
    let page = this.data.page + 1;
    let obj = {
      page: page
    }

    this.setData(obj);
    if(this.data.isSearch){
      this.getSearch().then(res => {
        if(res.code == 0){
          let catelist = this.data.catelist
          catelist.push(...res.data)
          this.setData({
            catelist: catelist
          })
        }
      })
    }else{
      this.getCate().then(res => {
        if(res.code == 0){
          let catelist = this.data.catelist
          catelist.push(...res.data)
          this.setData({
            catelist: catelist
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToke();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.isLogin2().then(res =>{
      if(res.code == 0){
        this.setData({
          tname: res.data.tname
        })
        this.getTags().then(res =>{
          if(res.code == 0){
            this.setData({
              tagsList: res.data
            })
          }
        })
        this.getCate().then(res => {
          if(res.code == 0){
            this.setData({
              catelist: res.data
            })
          }
        })
      }
    })
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