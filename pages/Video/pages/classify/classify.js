// pages/Video/pages/classify/classify.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyList: [],
    classifyType: 0,
    searchKey: '',
    isShow: false,
    nIndex: -1,
    name: '最新',
    url: '',
    fnAjax: fnCon.fnAjax,
    sourceUrl: [],
    num: 0
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
      nIndex: index,
      name: name
    })
  },
  bindPickerChange: function (e) {
    let num = e.detail.value
    app.globalData.nowSource = app.globalData.sourceUrl[num]
    app.globalData.nindex = num
    let url = app.globalData.nowSource.url
    this.setData({
      num: num,
      url: url,
      isShow: false,
      nIndex: -1,
      classifyType: 0
    })
    this.sjcsh();
  },

  sjcsh() {
    let url = this.data.url
    let fnAjax = this.data.fnAjax

    let data = {
      ac: 'list'
    }
    fnAjax(url, data).then(res => {
      console.log(res)
      this.setData({
        classifyList: res.class || res.rss.class.ty
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = app.globalData.nowSource.url
    this.setData({
      url: url,
      sourceUrl: app.globalData.sourceUrl,
      num: app.globalData.nindex
    })
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