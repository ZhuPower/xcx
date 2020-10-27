// pages/navPage/navPage.js
const apiUrl = require('../../utils/apiUrl')
const fnCon = require('../../utils/common')
const X2JS = require('../../x2js/we-x2js');
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
  getResources() {
    let url = apiUrl.apiUrl.proxyUrl
    let data = {
      apiUrl: 'https://note.youdao.com/yws/public/note/956f3aa608490fb2a28b13cb923e4ed5',
      editorType: 1,
      unloginId: '191fd197-241a-d913-c3ab-cc184cc1882a',
      editorVersion: 'new-json-editor',
      cstk: 'NRR52d4u',
    }
    this.data.fnAjax(url, data).then(res => {
      var x2js = new X2JS();
      var json = x2js.xml2js(res.content);
      var obj = JSON.parse(json.note.body.code.text);
      //console.log(obj)
      if(obj.authority[app.globalData.openid]){
        if(obj.authority[app.globalData.openid] == 'listC'){
          app.globalData.sourceUrl.push(...obj.listD)
          app.globalData.sourceUrl.push(...obj.listC)
        }else if(obj.authority[app.globalData.openid] == 'listB'){
          app.globalData.sourceUrl.push(...obj.listD)
          app.globalData.sourceUrl.push(...obj.listC)
          app.globalData.sourceUrl.push(...obj.listB)
        }else if(obj.authority[app.globalData.openid] == 'listA'){
          app.globalData.sourceUrl.push(...obj.listD)
          app.globalData.sourceUrl.push(...obj.listC)
          app.globalData.sourceUrl.push(...obj.listB)
          app.globalData.sourceUrl.push(...obj.listA)
        }
        app.globalData.isShow = true
      }else{
        app.globalData.sourceUrl = obj.listD
      }

      app.globalData.nowSource = app.globalData.sourceUrl[app.globalData.nindex]
    })
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
    let that = this;
    wx.showModal({
      title: '温馨提示',
      content: app.globalData.prompt,
      success(res) { }
    })
    if (!app.globalData.openid) {
      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: apiUrl.apiUrl.proxyUrl,
              data: {
                apiUrl: 'https://api.weixin.qq.com/sns/jscode2session',
                appid: 'wx0393ec5072a7e5b1',
                secret: 'd1eebf97803dae9e10da566f11664840',
                js_code: res.code,
                grant_type: 'authorization_code'
              },
              success(res) {
                app.globalData.openid = res.data.openid
                that.getResources()
              }
            })
          }
        }
      })
    } else {
      that.getResources()
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