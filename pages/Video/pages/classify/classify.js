// pages/Video/pages/classify/classify.js
const fnCon = require('../../../../utils/common')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyList: [],
    classifyType: 0,
    isShow: false,
    isShow2: false,
    nIndex: 0,
    nType: -1,
    name: '最新',
    num: 0,
    hsource: true,
    isResChange: true,
    oData: { type: 'list' }
  },
  setHeight() {
    let isShow = this.data.isShow
    this.setData({
      isShow: !isShow
    })
  },
  getType(e) {
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name
    this.setData({
      classifyType: type,
      isShow: false,
      nType: index,
      name: name
    })
  },
  resChange() {
    if (app.globalData.nvideo != this.data.nIndex) {
      this.setData({
        nIndex: app.globalData.nvideo,
        isResChange: !this.data.isResChange
      })
      fnCon.getSource(app, 'listType', this);
    }
  },
  sjcsh() {
    if (app.globalData.sourceData) {
      this.setData({
        nIndex: app.globalData.nvideo,
        isShow2: app.globalData.isShow
      })
      fnCon.getSource(app, 'listType', this);
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          this.setData({
            nIndex: app.globalData.nvideo,
            isShow2: app.globalData.isShow
          })
          fnCon.getSource(app, 'listType', this);
        }
      }, 20);
    }
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
    this.sjcsh();
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