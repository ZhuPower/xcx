// pages/Comics/pages/classify/classify.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aTheme:[],
    themeComics:apiUrl.apiUrl.comics.themeComics,
    fnAjax:fnCon.fnAjax,
    finish:['全部','连载','完成'],
    order:['全部','最热','最新','推荐'],
    curFinish:0,
    curOrder:0,
    themeId:0
  },

  getTheme(){
    let url = this.data.themeComics

    let data = { }

    this.data.fnAjax(url,data).then(res => {
      if(res.code == 200){
        this.setData({
          aTheme:res.data
        })
      }
    })
  },
  setTheme(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      themeId:parseInt(id)
    })
  },
  setFinish(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      curFinish:parseInt(id)
    })
  },
  setOrder(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      curOrder:parseInt(id)
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
    this.getTheme()
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