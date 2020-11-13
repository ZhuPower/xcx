// pages/navPage/navPage.js
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
    num: 0,
    queyu: {
      book_id: 1937115,
      include_contributors: true,
      include_hits: true,
      include_like: true,
      include_pager: true,
      include_suggests: true
    }
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
    let url = 'https://www.yuque.com/api/docs/kuhdex'
    let data = this.data.queyu
    this.data.fnAjax(url, data).then(res => {
      var obj = this.getQueYu(res);
      //console.log(obj)
      var arr1 = obj.listD
      var arr2 = obj.listC
      var arr3 = obj.listB
      var arr4 = obj.listA
      if (obj.authority[app.globalData.openid]) {
        if (obj.authority[app.globalData.openid] == 'listC') {
          app.globalData.sourceUrl.push(...arr1)
          app.globalData.sourceUrl.push(...arr2)
        } else if (obj.authority[app.globalData.openid] == 'listB') {
          app.globalData.sourceUrl.push(...arr1)
          app.globalData.sourceUrl.push(...arr2)
          app.globalData.sourceUrl.push(...arr3)
        } else if (obj.authority[app.globalData.openid] == 'listA') {
          app.globalData.sourceUrl.push(...arr1)
          app.globalData.sourceUrl.push(...arr2)
          app.globalData.sourceUrl.push(...arr3)
          app.globalData.sourceUrl.push(...arr4)
        }
        app.globalData.isShow = true
      } else {
        app.globalData.sourceUrl = arr1
      }

      app.globalData.nowSource = app.globalData.sourceUrl[app.globalData.nindex]
    })
  },
  getJxUrl() {
    let url = 'https://www.yuque.com/api/docs/dcyc02'
    let data = this.data.queyu
    this.data.fnAjax(url, data).then(res => {
      var obj = this.getQueYu(res);
      //console.log(obj)
      app.globalData.jxUrl = obj

    })
  },
  getAc() {
    let url = 'https://www.yuque.com/api/docs/vbpvs4'
    let data = this.data.queyu
    this.data.fnAjax(url, data).then(res => {
      var obj = this.getQueYu(res);
      //console.log(obj)
      app.globalData.getAc = obj

    })
  },
  getQueYu(obj) {
    let str1 = obj.data.content
    let num = str1.indexOf('">%');
    let str2 = str1.substring(num + 2);
    let num2 = str2.indexOf('</p>')
    let str = decodeURIComponent(str2.substring(0, num2)).replace(/\s+/g, "")
    var json = JSON.parse(str);
    return json
  },

  bbb() {
    let url = 'https://www.ehvip.cn/File/Edit'
    let data = {"action":"edit","item":"/xcx/新建文本文档 (2).txt","content":"154545"}
    this.data.fnAjax(url, data,'POST').then(res => {
      console.log(res)

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

    this.bbb();
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
                setTimeout(() => {
                  that.getJxUrl()
                  setTimeout(() => {
                    that.getAc()
                  }, 500)
                }, 500)
              }
            })
          }
        }
      })
    } else {
      that.getResources()
      setTimeout(() => {
        that.getJxUrl()
        setTimeout(() => {
          that.getAc()
        }, 500)
      }, 500)
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