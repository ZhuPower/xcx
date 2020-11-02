// pages/Novel/pages/index/index.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: apiUrl.apiUrl.novel.img,
    homeNovel: apiUrl.apiUrl.novel.home,
    homeNovel2: apiUrl.apiUrl.novel.home2,
    fnAjax: fnCon.fnAjax,
    nChannel: 0,
    data1: null,
    data2: null,
  },
  getHome() {
    let url = this.data.homeNovel
    let data = {}
    this.data.fnAjax(url, data).then(res => {
      this.setData({
        data1: res
      })
    })
  },
  getHome2() {
    let url = this.data.homeNovel2
    let data = {}
    this.data.fnAjax(url, data).then(res => {
      this.setData({
        data2: res
      })
    })
  },
  setChannel(e) {
    let n = e.currentTarget.dataset.num
    this.setData({
      nChannel: n
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
    this.getHome();
    this.getHome2();
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