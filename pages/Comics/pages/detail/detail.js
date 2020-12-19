// pages/Comics/pages/detail/detail.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nIndex: 0,
    nChapter: 0,
    nowChapter: 0,
    detailData: {},
    aChapter: [],
    comicId: 0,
    infoComics: apiUrl.apiUrl.comics.infoComics,
    chapterComics: apiUrl.apiUrl.comics.chapterComics,
    fnAjax: fnCon.fnAjax,
    isShow: false,
    isCollect: true
  },

  getInfoComics() {
    let url = this.data.infoComics

    let data = {
      comic_id: this.data.comicId
    }

    this.data.fnAjax(url, data).then(res => {
      if (res.code == 200) {
        this.setData({
          detailData: res.data
        })

        wx.setNavigationBarTitle({
          title: res.data.title
        })
      }
    })
  },

  getChapterComics() {
    let url = this.data.chapterComics

    let data = {
      comic_id: this.data.comicId
    }

    this.data.fnAjax(url, data).then(res => {
      if (res.code == 200) {
        this.setData({
          aChapter: res.data
        })

        if (parseInt(this.data.nowChapter) == 0) {
          this.setData({
            nowChapter: res.data[0].chapter_id
          })
        }
      }
    })
  },

  goComicCon(e) {
    let id = e.currentTarget.dataset.id || this.data.nowChapter
    let title = e.currentTarget.dataset.title || this.data.detailData.title
    let index = e.currentTarget.dataset.index || this.data.nChapter
    let goComicCon = fnCon.goComicCon
    goComicCon(id, this.data.comicId, title, index)
  },
  tabFn(e) {
    let n = e.currentTarget.dataset.num
    this.setData({
      nIndex: n
    })
  },
  collectBtn() {
    if (this.data.detailData.title && this.data.aChapter.length > 0) {
      if (this.data.isCollect) {
        let obj = {
          name: this.data.detailData.title,
          author: this.data.detailData.author_id,
          img: `${this.data.detailData.cover_lateral}!banner-600`,
          id: this.data.detailData.comic_id,
          chapter: this.data.nowChapter,
          nIndex: this.data.nChapter
        }
        app.globalData.userInfo.comicslist.push(obj);
        this.setData({
          isCollect: false
        })
      } else {
        let arr = app.globalData.userInfo.comicslist;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == this.data.detailData.comic_id) {
            arr.splice(i, 1);
            this.setData({
              isCollect: true
            })
            break;
          }
        }
      }
    } else {
      wx.showToast({
        title: '您点的太快了，请稍后再试',
        icon: 'none',
        duration: 2000
      })
    }
  },
  getCollect() {
    let id = setInterval(() => {
      if (this.data.detailData.title) {
        clearInterval(id);
        let arr = app.globalData.userInfo.comicslist;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == this.data.detailData.comic_id) {
            this.setData({
              nowChapter: arr[i].chapter,
              nChapter: arr[i].nIndex,
              isCollect: false
            })
            break;
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
      comicId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInfoComics()
    this.getChapterComics()
    this.setData({
      isShow: app.globalData.isShow
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.sourceData) {
      this.getCollect();
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          this.getCollect();
        }
      }, 20);
    }
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