// assets/components/NavBar/NavBar.js
const apiUrl = require('../../utils/apiUrl')
const fnCon = require('../../utils/common')
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navType: String,
    navPath: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    nIndex: 0,
    isShow: false,
    fnAjax: fnCon.fnAjax
  },
  ready() {
    let that = this;
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
   * 组件的方法列表
   */
  methods: {
    getResources() {
      if (app.globalData.sourceUrl.length == 0) {
        let url = 'https://www.ehvip.cn/File/Content'
        let data = { "action": "getContent", "item": "/xcx/Resources.txt" }
        this.data.fnAjax(url, data, 'POST').then(res => {
          let obj = JSON.parse(res.result)
          app.globalData.sourceData = obj
          if (obj.authority[app.globalData.openid]) {
            app.globalData.isShow = true
            this.setData({
              isShow: app.globalData.isShow
            })
          }
        })
      }else{
        this.setData({
          isShow: app.globalData.isShow
        })
      }
    }
  }
})
