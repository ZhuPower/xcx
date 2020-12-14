// pages/Collect/Collect.js
const fnCon = require('../../utils/common')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    navType: 'Novel'
  },
  tabFn(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      navType: type
    })
  },
  goDetail(e) {
    let type = e.currentTarget.dataset.type
    let item = e.currentTarget.dataset.item
    if (type == 'novel') {
      let goNovelCon = fnCon.goNovelCon
      goNovelCon(item.chapter, item.id)
    } else if (type == 'comics') {
      let goComicCon = fnCon.goComicCon
      goComicCon(item.chapter, item.id, item.name, item.nIndex)
    } else if (type == 'music') {
      let arr = this.data.userInfo.musiclist[1].list
      for (let i = 0; i < arr.length; i++) {
        if (app.globalData.musiclist.mid.indexOf(arr[i].mid) == -1) {
          app.globalData.musiclist.mid.push(arr[i].mid)
          app.globalData.musiclist.id.push(arr[i].id)
          app.globalData.musiclist.list.push(arr[i])
        }
      }
      let goMusic = fnCon.goMusic
      goMusic(item.id, item.mid)
    } else if (type == 'video') {
      if (app.globalData.sourceData.video[item.nvideo].name == item.urlName) {
        app.globalData.nvideo = item.nvideo
        let id = item.id
        let goVideo = fnCon.goVideo
        goVideo(id)
      } else {
        wx.showToast({
          title: '资源已失效',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  notCollect(e) {
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    let arr = [];
    if (type == 'novel') {
      arr = this.data.userInfo.novellist
    } else if (type == 'comics') {
      arr = this.data.userInfo.comicslist
    } else if (type == 'music') {
      arr = this.data.userInfo.musiclist[1].list
    } else if (type == 'video') {
      arr = this.data.userInfo.videolist
    }

    arr.splice(index, 1);
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navType: options.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
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