// pages/book/book.js

import { hexMD5 } from "../../utils/md5.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestToken:'',
    bookList:[]
  },
  newRand:function(bookId){
    let url = 'http://mhapi.spdchgj.com/2/cartoon/cartoon/newRand';
    let data = {
      bookId: parseInt(bookId),
      id:33
    }

    this.setApi(url,data).then(res=>{
      console.log(res)
    });
  },
  getCartoonLists:function(){
    let url = 'http://mhapi.spdchgj.com/3/cartoon/cartoon/lists';
    let data = {
      typeId: 0,
      lang: 1,
      sexy: 0,
      status: 0,
      pagesize: 20,
      page: 1
    }

    this.setApi(url,data);  
  },
  getreCommendLists:function(){
    let url = 'http://mhapi.spdchgj.com/3/cartoon/recommend/lists';
    let data = {
      ids: 2
    }

    this.setApi(url,data).then(res=>{
      console.log(res)
      this.setData({
        bookList: res.data['2'].list
      })
      
    });
  },
  getMinlist:function(){
    let url = 'http://mhapi.spdchgj.com/3/cartoon/statiscartoon/minlist';
    let data = {
      num: 20,
      sortField: 'rate_order',
      sort: 1,
      lang: 1,
      page: 1
    }

    this.setApi(url,data).then(res=>{
      console.log(res)
    });
  },
  isLogin2:function(){
    let url = 'http://mhapi.spdchgj.com/2/cartoon/tempuser/login'
    let data = {
      app: 1,
      tname: 'u_temp_user_5',
      refid: '',
      linkid: '',
      recommend: '',
      from: ''
    }

   this.setApi(url,data);
  },
  isLogin:function(){
    
    let url = 'http://mhapi.spdchgj.com/3/cartoon/user/login'
    let data = {
      phone: '18007027355',
      password: '123456asdf',
      refid: '',
      linkid: '',
      recommend: '',
      from: ''
    }

    this.setApi(url,data);
  },
  setApi:function(url,data){
    this.getToke();
    return new Promise((resolved,rejected)=>{
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
          if (res.data.code == 0) {
            console.log(res.data)
            resolved(res.data)
          }
        }
      })
    })
  },
  signString:function(req){
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
        if (!v) {
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
        sign: sign.toUpperCase()
      };
  },
  getToke:function(){
    var requestToken = wx.getStorageSync('token') || '';
    var refRequestToken = function() {
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
      requestToken: requestToken
    })
  },
  playlike:function(e){
    let id = e.currentTarget.dataset['id']
    this.newRand(id)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

    

    this.isLogin();
    this.getreCommendLists();
    //this.getMinlist();
    //this.getCartoonLists();

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