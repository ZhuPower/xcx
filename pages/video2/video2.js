// pages/video2/video2.js


import {
  hexMD5
} from "../../utils/md5.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    vSrc:''
  },
  setApi: function (url, data) {
    return new Promise((resolved, rejected) => {
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method: 'GET',
        data: data,
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

    if(options.vid){
      this.setApi('http://app.xjlb5.com/api.php/app_2/lookVod',{vod_id:options.vid}).then(res => {
        console.log(res)
        let src = res.info.player_list[0].url
        this.setData({
          vSrc:src
        })
      })
    }
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