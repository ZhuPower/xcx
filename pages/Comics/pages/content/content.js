// pages/Comics/pages/content/content.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrIndex: 0,
    chapterIndex: 0,
    comicId: 0,
    chapterId: 0,
    aChapter: [],
    aContent: [],
    _title: '',
    contentComics: apiUrl.apiUrl.comics.contentComics,
    chapterComics: apiUrl.apiUrl.comics.chapterComics,
    fnAjax: fnCon.fnAjax,
    isRefresh: false,
    isReset: false,
    isNav: false,
    isChapter: false,
    isTop: false
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
      }
    })
  },
  getContent(str) {
    let url = this.data.contentComics

    let data = {
      comic_id: this.data.comicId,
      chapter_id: str
    }

    this.data.fnAjax(url, data).then(res => {
      if (res.code == 200) {
        let arr = []
        if (!this.data.isReset) {
          arr = this.data.aContent
        }
        arr.push(...res.data)
        this.setData({
          aContent: arr,
          isRefresh: false,
          isReset: false
        })
        if (this.data.aChapter.length > 0) {
          wx.setNavigationBarTitle({
            title: this.data.aChapter[this.data.chapterIndex].title
          })
        }
      }
    })
  },
  fnTop() {
    if (this.data.arrIndex > 0) {
      let arrIndex = parseInt(this.data.arrIndex) - 1
      this.setData({
        arrIndex: arrIndex,
        chapterIndex: arrIndex,
        isReset: true
      })
      this.getContent(this.data.aChapter[this.data.arrIndex].chapter_id)
    } else {
      this.setData({
        isRefresh: false
      })
      wx.showToast({
        title: '已经是第一章了',
        icon: 'none',
        duration: 800
      })
    }
  },
  fnBotton() {
    if (this.data.chapterIndex < this.data.aChapter.length) {
      let chapterIndex = parseInt(this.data.chapterIndex) + 1
      this.setData({
        chapterIndex: chapterIndex
      })
      this.getContent(this.data.aChapter[this.data.chapterIndex].chapter_id)
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  setFn() {
    this.setData({
      isNav: !this.data.isNav
    })
  },
  showChapter() {
    this.setData({
      isNav: false,
      isChapter: true
    })
  },
  hideChapter() {
    this.setData({
      isChapter: false
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  nextChapter() {
    this.fnBotton()
  },
  prevChapter() {
    if (this.data.pid > 0) {
      this.setData({
        chapterId: this.data.pid
      })
      this.getContent(false, true)
    } else {
      wx.showToast({
        title: '已经是第一章了',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      chapterId: options.chapterId,
      comicId: options.comicId,
      chapterIndex: options.index,
      arrIndex: options.index,
      _title: options.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getContent(this.data.chapterId)
    this.getChapterComics()
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