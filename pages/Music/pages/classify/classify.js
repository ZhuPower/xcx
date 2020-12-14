// pages/Music/pages/classify/classify.js
const fnCon = require('../../../../utils/common')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aToplist: []
  },

  goTopList(e) {
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/Music/pages/list/list?id=' + id + '&name=' + name
    })
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
    if (app.globalData.sourceData) {
      this.setData({
        nIndex: app.globalData.nmusic,
        isShow: app.globalData.isShow
      })
      fnCon.getSource(app, 'music', 'listType', this);
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          this.setData({
            nIndex: app.globalData.nmusic,
            isShow: app.globalData.isShow
          })
          fnCon.getSource(app, 'music', 'listType', this);
        }
      }, 20);
    }
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