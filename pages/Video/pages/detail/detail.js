// pages/Video/pages/detail/detail.js
const fnCon = require('../../../../utils/common')
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
    yList: [],
    aarYlist: [],
    num: 0,
    isShowSource: false,
    isShow: false,
    isNoParse: 0,
    hasParse: false,
    videoSrc: '',
    nIndex: -1,
    isPlay: false,
    isCollect: true
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
    fnCon.getSource(app, 'video', 'toPlay', this, obj);
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
  collectBtn() {
    if (this.data.data) {
      let obj = {
        nvideo: parseInt(app.globalData.nvideo),
        urlName: app.globalData.sourceData.video[app.globalData.nvideo].name,
        name: this.data.data.name,
        img: this.data.data.img,
        id: this.data.data.id
      }
      app.globalData.userInfo.videolist.push(obj);
      this.setData({
        isCollect: false
      })
    } else {
      wx.showToast({
        title: '您点的太快了，请稍后再试',
        icon: 'none',
        duration: 2000
      })
    }

  },

  notCollectBtn() {
    let arr = app.globalData.userInfo.videolist;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == this.data.data.id) {
        if (arr[i].urlName == app.globalData.sourceData.video[app.globalData.nvideo].name) {
          arr.splice(i, 1);
          this.setData({
            isCollect: true
          })
          break;
        }
      }
    }
  },

  getCollect() {
    let id = setInterval(() => {
      if (this.data.data) {
        clearInterval(id);
        let arr = app.globalData.userInfo.videolist;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == this.data.data.id) {
            if (arr[i].urlName == app.globalData.sourceData.video[app.globalData.nvideo].name) {
              this.setData({
                isCollect: false
              })
              break;
            }
          }
        }
      }
    }, 20);
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
    this.setData({
      isShow: app.globalData.isShow,
      isShowSource: app.globalData.isShow
    })

    if (app.globalData.sourceData) {
      fnCon.getSource(app, 'video', 'detail', this);
      this.getCollect();
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          fnCon.getSource(app, 'video', 'detail', this);
          this.getCollect();
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