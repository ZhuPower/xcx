// pages/catbook/catbook.js
const hexMD5 = require('../../../../utils/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    bookId:0,
    cartoonId:0,
    catlist:[],
    arr:[],
    index:0
  },
  catalog: function () {
    let url = 'http://mhapi.spdchgj.com/3/cartoon/chapter/catalog'
    let data = {
      cartoonId: parseInt(this.data.cartoonId),
      pagesize: 20,
      page: parseInt(this.data.page),
      sort: 0
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
        if (!v && v!=0) {
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
  playlike:function(e){
    let cartoonId = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '/pages/Comics2/pages/rebook/rebook?cartoonId='+cartoonId
    })
  },
  bindPickerChange:function(e){
    let page = parseInt(e.detail.value) + 1
    this.setData({
      page:page,
      index: parseInt(e.detail.value)
    })

    this.getData();
  },
  getData:function(){
    this.catalog().then(res => {
      if(res.code == 0){
        this.setData({
          catlist:res.data.cChapterList
        })
        let _num = res.data.count%20
        let npage = res.data.count/20
        if(_num>0){
          npage = Math.ceil(res.data.count/20)
        }

        let arr = []
        for(let i=0; i<npage; i++){
          let str = '第'+(i+1)+'页';
          arr.push(str)
          this.setData({
            arr:arr
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.setData({
      cartoonId:options.cartoonId
    })
    this.getToke();
    this.getData();
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