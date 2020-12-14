// pages/Music/pages/list/list.js
const fnCon = require('../../../../utils/common')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    topinfo: {},
    id: 0,
    song_page: 1,
    song_num: 20,
    total_song_num: 0,
    isRefresh: false,
    searchKey: '',
    curnum: 1,
    name: ''
  },
  getRankInfo() {
    if (app.globalData.sourceData) {
      this.setData({
        nIndex: app.globalData.nmusic,
        isShow: app.globalData.isShow
      })
      fnCon.getSource(app, 'music', 'rankInfo', this);
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          this.setData({
            nIndex: app.globalData.nmusic,
            isShow: app.globalData.isShow
          })
          fnCon.getSource(app, 'music', 'rankInfo', this);
        }
      }, 20);
    }
  },
  fnTop() {
    this.setData({
      song_page: 1
    })

    if (this.data.searchKey) {
      this.searchFn();
    } else {
      this.getRankInfo();
    }
  },
  fnBotton() {
    let num = this.data.song_page

    if (this.data.searchKey) {
      if (num < this.data.curnum) {
        num = num + 1
        this.setData({
          song_page: num
        })
        this.searchFn();
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }

    } else {
      if (num * this.data.song_num < this.data.total_song_num) {
        num = num + 1
        this.setData({
          song_page: num
        })
        this.getRankInfo();
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    let mid = e.currentTarget.dataset.mid
    let arr = this.data.songList
    let goMusic = fnCon.goMusic

    for (let i = 0; i < arr.length; i++) {
      if (app.globalData.musiclist.mid.indexOf(arr[i].mid) == -1) {
        app.globalData.musiclist.mid.push(arr[i].mid)
        app.globalData.musiclist.id.push(arr[i].id)
        app.globalData.musiclist.list.push(arr[i])
        app.globalData.userInfo.musiclist[0].list.push(item)
      }
    }

    if (app.globalData.isShow) {
      goMusic(id, mid)
    }
  },
  searchFn() {
    if (app.globalData.sourceData) {
      this.setData({
        nIndex: app.globalData.nmusic,
        isShow: app.globalData.isShow
      })
      fnCon.getSource(app, 'music', 'search', this);
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          this.setData({
            nIndex: app.globalData.nmusic,
            isShow: app.globalData.isShow
          })
          fnCon.getSource(app, 'music', 'search', this);
        }
      }, 20);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    if (options.key) {
      this.setData({
        searchKey: options.key,
        name: options.name
      })
    }

    if (options.id) {
      this.setData({
        id: options.id,
        name: options.name
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.id) {
      this.getRankInfo();
    }

    if (this.data.searchKey) {
      this.searchFn();
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