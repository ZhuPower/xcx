const fnCon = require('../../../../utils/common')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerCurrent: 0,
    list: [],
    oData: null,
    nIndex: 0,
    isShow: false,
    isRefresh: false,
    isNext: true,
    pagecount: 1,
    page: 1
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    let goVideo = fnCon.goVideo
    goVideo(id)
  },
  resChange() {
    if (app.globalData.nvideo != this.data.nIndex) {
      this.setData({
        nIndex: app.globalData.nvideo,
        oData: null
      })
      fnCon.getSource(app, 'video', 'index', this);
    }
  },
  fnBotton() {},
  fnTop() {},

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
        nIndex: app.globalData.nvideo,
        isShow: app.globalData.isShow
      })
      fnCon.getSource(app, 'video', 'index', this);
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          this.setData({
            nIndex: app.globalData.nvideo,
            isShow: app.globalData.isShow
          })
          fnCon.getSource(app, 'video', 'index', this);
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