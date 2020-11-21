// pages/Member/Member.js
const apiUrl = require('../../utils/apiUrl')
const fnCon = require('../../utils/common')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fnAjax: fnCon.fnAjax,
    userInfo: {},
    isUser: true,
    num: 0
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    this.setData({
      isUser: false,
      userInfo: e.detail.userInfo
    })

  },
  copyTex() {
    let num = this.data.num;
    num = num + 1;
    this.setData({
      num: num
    })
    console.log(num)
    if (app.globalData.openid && num >= 3) {
      wx.setClipboardData({
        data: app.globalData.openid
      })
    }
    setTimeout(() => {
      this.setData({
        num: 0
      })
    }, 3000)
  },
  bbb() {
    // let url = 'https://www.ehvip.cn/File/Edit'
    // let data = {"action":"edit","item":"/xcx/新建文本文档 (2).txt","content":"154545"}
    // this.data.fnAjax(url, data,'POST').then(res => {
    //   console.log(res)

    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.setData({
            isUser: false
          })
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                isUser: false,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
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