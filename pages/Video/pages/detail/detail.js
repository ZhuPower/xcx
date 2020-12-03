// pages/Video/pages/detail/detail.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
const Base64 = require('../../../../utils/base64')
var WxParse = require('../../../../wxParse/wxParse');

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    data: null,
    nTab: 0,
    playList: [],
    fnAjax: fnCon.fnAjax,
    getParameter: fnCon.getParameter,
    yList: [],
    aarYlist: [],
    num: 0,
    isShowSource: false,
    isShow: false,
    isNoParse: 0,
    hasParse: false,
    videoSrc: '',
    nIndex: -1,
    isPlay: false
  },

  setTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      nTab: parseInt(index)
    })
  },
  toPlay(e) {
    let obj = e.currentTarget.dataset;
    wx.setNavigationBarTitle({
      title: `${obj.title}-${obj.name}`
    })
    fnCon.getSource(app, 'toPlay', this, obj);
  },

  bindPickerChange(e) {
    let num = e.detail.value
    this.setData({
      num: num,
      playList: this.data.aarYlist[num]
    })
  },
  setView() {
    var bbb = `<video src="${this.data.videoSrc}" class="playBox"></video>`;
    var that = this;
    WxParse.wxParse('article', 'html', bbb, that, 0);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    // let that = this
    // let url = this.data.url
    // let fnAjax = this.data.fnAjax
    // let data = {}

    this.setData({
      isShow: app.globalData.isShow,
      isShowSource: app.globalData.isShow
    })

    // if (this.data.isApp) {
    //   data = {
    //     index: '0',
    //     vid: this.data.id
    //   }

    //   fnAjax(url, data).then(res => {
    //     if (res.code == 200) {
    //       this.setData({
    //         data: res.data
    //       })
    //     } else {
    //       // wx.showModal({
    //       //   content: res.msg,
    //       //   showCancel: false,
    //       //   success(res) {
    //       //     if (res.confirm) {
    //       //       wx.navigateBack({
    //       //         delta: getCurrentPages().length - 1
    //       //       })
    //       //     }
    //       //   }
    //       // })
    //     }
    //   })

    // } else {
    //   let _arr = []
    //   data = {
    //     ac: 'detail',
    //     ids: this.data.id
    //   }
    //   let arr_0 = app.globalData.getAc
    //   if (arr_0.indexOf(url) > -1) {
    //     data.ac = 'videolist'
    //   }


    //   let arr1 = []
    //   let arr2 = []
    //   let arr3 = []
    //   let arr_1 = app.globalData.jxUrl

    //   fnAjax(url, data).then(res => {
    //     console.log(res)
    //     if (res.code == 1) {
    //       this.setData({
    //         data: res.list[0]
    //       })

    //       if (this.data.data.vod_play_url.indexOf('$$$') > -1) {
    //         arr1 = this.data.data.vod_play_from.split('$$$')
    //         arr2 = this.data.data.vod_play_url.split('$$$')
    //         for (let x = 0; x < _arr.length; x++) {
    //           let n = arr1.indexOf(_arr[x])
    //           if (n > -1) {
    //             arr1.splice(n, 1)
    //             arr2.splice(n, 1)
    //           }
    //         }
    //       } else {
    //         if (_arr.indexOf(this.data.data.vod_play_from) > -1) {
    //           arr1 = []
    //           arr2 = []
    //         } else {
    //           arr1 = [this.data.data.vod_play_from]
    //           arr2 = [this.data.data.vod_play_url]
    //         }
    //       }


    //       for (let i = 0; i < arr2.length; i++) {
    //         if (arr2[i].indexOf('#') > -1) {
    //           let arr4 = arr2[i].split('#')
    //           getArrList(arr4, i)
    //         } else {
    //           let arr4 = [arr2[i]]
    //           getArrList(arr4, i)
    //         }

    //       }

    //     } else if (res.rss) {
    //       this.setData({
    //         data: res.rss.list.video
    //       })

    //       let arr0 = null
    //       if (typeof res.rss.list.video.dl.dd == 'string') {
    //         arr0 = []
    //         arr0[0] = res.rss.list.video.dl.dd
    //       } else {
    //         arr0 = res.rss.list.video.dl.dd
    //       }

    //       for (let i = 0; i < arr0.length; i++) {
    //         arr1.push('影视源' + (i + 1))

    //         if (arr0[i].indexOf('#') > -1) {
    //           let arr4 = arr0[i].split('#')
    //           getArrList(arr4, i)
    //         } else {
    //           let arr4 = [arr0[i]]
    //           getArrList(arr4, i)
    //         }

    //       }
    //     }

    //     this.setData({
    //       yList: arr1,
    //       aarYlist: arr3,
    //       playList: arr3[that.data.isNoParse]
    //     })

    //     function getArrList(arr4, num) {
    //       let arr5 = []
    //       for (let ii = 0; ii < arr4.length; ii++) {
    //         let arr6 = arr4[ii].split('$')
    //         let _str1 = arr6[0].replace(/\s*/g, "")
    //         arr6[0] = _str1
    //         if (arr6[1]) {
    //           if (arr6[1].indexOf('aHR') == 0) {
    //             let _str2 = Base64.decode(arr6[1])
    //             arr6[1] = _str2
    //             if (arr6[1].indexOf('.m3u8') > -1 || arr6[1].indexOf('.mp4') > -1) {
    //               if (!that.data.isNoParse) {
    //                 that.setData({
    //                   isNoParse: num,
    //                   num: num
    //                 })
    //               }
    //             }
    //           }
    //         } else {
    //           let _a61 = arr6[0]
    //           arr6[1] = _a61
    //           arr6[0] = '第' + (ii + 1) + '集'
    //         }


    //         if (ii == 0) {
    //           if (arr_1.indexOf(url) == -1) {
    //             if (arr6[1].indexOf('.m3u8') > -1 || arr6[1].indexOf('.mp4') > -1) {

    //             } else {
    //               arr1.splice(num, 1);
    //               break;
    //             }
    //           }
    //         }
    //         arr5.push(arr6)
    //       }
    //       if (arr5.length > 0) {
    //         arr3.push(arr5)
    //       }
    //     }
    //   })
    // }

    if (app.globalData.sourceData) {
      fnCon.getSource(app, 'detail', this);
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          fnCon.getSource(app, 'detail', this);
        }
      }, 20);
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