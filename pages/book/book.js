// pages/book/book.js

import { hexMD5 } from "../../utils/md5.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestToken:'',
    bookList:[],
    typeArr:[]
  },
  reback:function(){
    let url = 'http://mhapi.spdchgj.com/3/cartoon/positionback/reback'
    let data = {
      lang: 1
    }

    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
  },
  typeList:function(){
    let url = 'http://mhapi.spdchgj.com/3/cartoon/cartoonType/list'
    let data = {
      lang: 1
    }

    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
  },
  newRand:function(bookId,id){
    let url = 'http://mhapi.spdchgj.com/2/cartoon/cartoon/newRand';
    let data = {
      bookId: parseInt(bookId),
      id:parseInt(id)
    }

    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
  },
  cartoonLists:function(){
    let url = 'http://mhapi.spdchgj.com/3/cartoon/cartoon/lists';
    let data = {
      typeId: 0,
      lang: 1,
      sexy: 0,
      status: 0,
      pagesize: 20,
      page: 1
    }

    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    }); 
  },
  recommendLists:function(ids){
    let url = 'http://mhapi.spdchgj.com/3/cartoon/recommend/lists';
    let data = {
      ids: ids
    }

    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
  },
  minListt:function(){
    let url = 'http://mhapi.spdchgj.com/3/cartoon/statiscartoon/minlist';
    let data = {
      num: 20,
      sortField: 'rate_order',
      sort: 1,
      lang: 1,
      page: 1
    }

    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
  },
  isLogin2:function(){
    let url = 'http://mhapi.spdchgj.com/2/cartoon/tempuser/login'
    let data = {
      app: 1,
      tname: 'u_temp_user_5'
    }

    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
  },
  isLogin:function(){
    
    let url = 'http://mhapi.spdchgj.com/3/cartoon/user/login'
    let data = {
      phone: '18007027355',
      password: '123456asdf'
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
            //console.log(res.data)
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
      requestToken: refRequestToken()
    })
  },
  playlike:function(e){
    let bookId = e.currentTarget.dataset['id'];
    let typename = e.currentTarget.dataset['typename'];
    let id = 0;

    for(let i=0; i<this.data.typeArr.length; i++){
        if(typename == this.data.typeArr[i].typename){
          id = this.data.typeArr[i].id;
          break;
        }
    }

    this.newRand(bookId,id).then(res => {
      if(res.code == 0){
        console.log(res)
      }
    })
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
    this.isLogin2().then(res => {
      //console.log(res)
      if(res.code == 0){
        this.typeList().then(res => {
          this.setData({
            typeArr: res.data
          })
        })

        this.recommendLists(2).then(res => {
          if(res.code == 0){
            this.setData({
              bookList: res.data['2'].list
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