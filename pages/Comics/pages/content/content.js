// pages/Comics/pages/content/content.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
const app = getApp()
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
    infoComics: apiUrl.apiUrl.comics.infoComics,
    contentComics: apiUrl.apiUrl.comics.contentComics,
    chapterComics: apiUrl.apiUrl.comics.chapterComics,
    fnAjax: fnCon.fnAjax,
    isRefresh: false,
    isReset: false,
    isNav: false,
    isChapter: false,
    isTop: false,
    isBlack: false,
    comicIndex: -1,
    isNext: false
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
        this.getContent(this.data.chapterId)
      }
    })
  },
  goComicCon(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let title = e.currentTarget.dataset.title
    this.setData({
      arrIndex: index,
      chapterIndex: index,
      _title: title,
      isReset: true,
      isChapter: false
    })

    this.getContent(id)
  },
  getContent(str) {
    let url = this.data.contentComics

    let data = {
      comic_id: this.data.comicId,
      chapter_id: str
    }

    this.data.fnAjax(url, data).then(res => {
      if (parseInt(res.code) == 200) {
        let arr = []
        if (!this.data.isReset) {
          arr = this.data.aContent
        }
        arr.push(...res.data)
        this.setData({
          aContent: arr,
          isRefresh: false,
          _title: this.data.aChapter[this.data.chapterIndex].title
        })
        if (this.data.isReset) {
          this.setData({
            isTop: 0,
            isReset: false
          })
        }
        if (this.data.comicIndex > -1) {
          let _arr = app.globalData.userInfo.comicslist;
          _arr[this.data.comicIndex].chapter = str
          _arr[this.data.comicIndex].nIndex = this.data.chapterIndex
        }
      }
    })
  },
  fnTop() {
    console.log(this.data.arrIndex)
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
        chapterIndex: chapterIndex,
        arrIndex:chapterIndex
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
    let that = this
    let arr = app.globalData.userInfo.comicslist;

    if (this.data.isBlack) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showModal({
        content: '是否添加到书架',
        confirmColor: '#ff7830',
        success(res) {
          if (res.confirm) {
            let url = that.data.infoComics
            let data = {
              comic_id: that.data.comicId
            }
            that.data.fnAjax(url, data).then(res => {
              console.log(res)
              if (res.code == 200) {
                let obj = {
                  author: res.data.author_id,
                  chapter: that.data.chapterId,
                  id: res.data.comic_id,
                  img: `${res.data.cover_lateral}!banner-600`,
                  name: res.data.title,
                  nIndex: that.data.chapterIndex
                }
                arr.push(obj);
                wx.navigateBack({
                  delta: 1
                })
              }
            })

          } else if (res.cancel) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  },
  nextChapter() {
    this.setData({
      isReset: true
    })
    this.fnBotton()
  },
  prevChapter() {
    this.fnTop();
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
    //arr[i].chapter = this.data.chapterId
    //arr[i].nIndex = this.data.chapterIndex
    let arr = app.globalData.userInfo.comicslist;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == this.data.comicId) {
        this.setData({
          isBlack: true,
          comicIndex: i
        })
        break;
      }
    }
    this.getChapterComics()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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