// pages/navPage/navPage.js
const apiUrl = require('../../utils/apiUrl')
const fnCon = require('../../utils/common')
const HtmlToJson = require('../../wxParse/html2json');
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
    resRule: {
      index: {
        url: 'http://www.bubulai.com',
        getData: function (json) {
          let body = json.nodes[1].nodes[1];
          let a = body.nodes[0].nodes[1].nodes;
          let b = body.nodes[0].nodes;
          let indexList = [];

          for (let i = 1; i < 5; i++) {
            let url = a[i].nodes[0].attr.href;
            let name = a[i].nodes[0].nodes[0].text;
            let list = [];
            let b1 = b[i + 5].nodes[0].nodes[1].nodes[0].nodes;

            for (let x = 0; x < a.length; x++) {
              let name = b1[x].nodes[0].attr.title.toString();
              let url = b1[x].nodes[0].attr.href;
              let img = b1[x].nodes[0].nodes[0].attr.src;
              let obj = {
                name: name,
                url: url,
                img: img
              }
              list.push(obj);
            }

            let obj = {
              url: url,
              name: name,
              list: list
            }
            indexList.push(obj);
          }
          return indexList;
        }
      },
      sort:{
        url:'http://www.bubulai.com/zv/10.html',
        getData: function (json) {
          let body = json.nodes[1].nodes[1];
          let a = body.nodes[0].nodes[5].nodes[1];
          let b = a.nodes[0].nodes[0].nodes;
          let c = a.nodes[1].nodes;
          let d = c[c.length-1]
          console.log(b)
          console.log(d)
          console.log(json.nodes[1].nodes[1].nodes[0].nodes[5].nodes[1].nodes[1].nodes[9].nodes[0])
          // let b = body.nodes[0].nodes;
          let indexList = [];

          // for (let i = 1; i < 5; i++) {
          //   let url = a[i].nodes[0].attr.href;
          //   let name = a[i].nodes[0].nodes[0].text;
          //   let list = [];
          //   let b1 = b[i + 5].nodes[0].nodes[1].nodes[0].nodes;

          //   for (let x = 0; x < a.length; x++) {
          //     let name = b1[x].nodes[0].attr.title.toString();
          //     let url = b1[x].nodes[0].attr.href;
          //     let img = b1[x].nodes[0].nodes[0].attr.src;
          //     let obj = {
          //       name: name,
          //       url: url,
          //       img: img
          //     }
          //     list.push(obj);
          //   }

          //   let obj = {
          //     url: url,
          //     name: name,
          //     list: list
          //   }
          //   indexList.push(obj);
          // }
          return indexList;
        }
      }


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
    let url = 'https://www.ehvip.cn/File/Content'
    let data = { "action": "getContent", "item": "/xcx/Resources.txt" }
    this.data.fnAjax(url, data, 'POST').then(res => {
      let obj = JSON.parse(res.result)
      app.globalData.jxUrl = obj.JxUrl
      app.globalData.getAc = obj.Ac
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
  bbb() {
    // let url = 'https://www.ehvip.cn/File/Edit'
    // let data = {"action":"edit","item":"/xcx/新建文本文档 (2).txt","content":"154545"}
    // this.data.fnAjax(url, data,'POST').then(res => {
    //   console.log(res)

    // })
  },
  getNodes(str){
    let arr = str.split('.')
    console.log(arr)
  },
  aaa() {
    /* let url = this.data.resRule.index.url
    let data = {}
    this.data.fnAjax(url, data).then(res => {
      var html2json = HtmlToJson.html2json;
      var json = html2json(res, 'html');
      console.log(json)
      let oData = this.data.resRule.index.getData(json);
      console.log(oData)
    }) */

    this.getNodes('1.1.0.5.1.1.9.0');
    let url = this.data.resRule.sort.url
    let data = {}
    this.data.fnAjax(url, data).then(res => {
      var html2json = HtmlToJson.html2json;
      var json = html2json(res, 'html');
      console.log(json)
      let oData = this.data.resRule.sort.getData(json);
      //console.log(oData)
    })
  },
  /**i
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this;
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       that.setData({
    //         isUser: false
    //       })
    //       wx.getUserInfo({
    //         success: function (res) {
    //           that.setData({
    //             isUser: false,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.aaa();
    // let that = this;
    // // wx.showModal({
    // //   title: '温馨提示',
    // //   content: app.globalData.prompt,
    // //   success(res) { }
    // // })
    // if (!app.globalData.openid) {
    //   wx.login({
    //     success(res) {
    //       if (res.code) {
    //         wx.request({
    //           url: apiUrl.apiUrl.proxyUrl,
    //           data: {
    //             apiUrl: 'https://api.weixin.qq.com/sns/jscode2session',
    //             appid: 'wx0393ec5072a7e5b1',
    //             secret: 'd1eebf97803dae9e10da566f11664840',
    //             js_code: res.code,
    //             grant_type: 'authorization_code'
    //           },
    //           success(res) {
    //             app.globalData.openid = res.data.openid
    //             that.getResources()
    //           }
    //         })
    //       }
    //     }
    //   })
    // } else {
    //   that.getResources()
    // }
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