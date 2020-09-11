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
    let data = {
      ac:'videolist',
      pg:1
    }
    this.setApi('http://bttcj.com/inc/sapi.php',data).then(res => {
      //console.log(res)
      let str = res.replace(/\<\!\[CDATA\[/ig,'').replace(/\]\]\>\<\//ig,'</');
      //console.log(str)

      var baseNodeName='rss';
      var resObj=common.xml2Obj(str,baseNodeName);
      console.log(resObj);
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