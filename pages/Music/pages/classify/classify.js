// pages/Music/pages/classify/classify.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proxyUrl: apiUrl.apiUrl.proxyUrl,
    toplist: apiUrl.apiUrl.music.toplist,
    img: apiUrl.apiUrl.music.img,
    fnAjax: fnCon.fnAjax,
    aToplist: []
  },
  getRank() {
    let url = this.data.toplist
    let data = {
      page: 'index',
      format: 'html',
      tpl: 'macv4',
      v8debug: 1
    }
    this.data.fnAjax(url, data).then(res => {
      this.setData({
        aToplist: res.toplist
      })
    })
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
    this.getRank()
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