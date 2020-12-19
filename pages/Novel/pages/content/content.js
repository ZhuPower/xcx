// pages/Novel/pages/content/content.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novelId: 0,
    chapterId: 0,
    aChapter: [],
    aContent: [],
    _title: '',
    img: apiUrl.apiUrl.novel.img,
    infoNovel: apiUrl.apiUrl.novel.info,
    chapterNovel: apiUrl.apiUrl.novel.chapter,
    fnAjax: fnCon.fnAjax,
    pid: 0,
    nid: 0,
    isRefresh: false,
    isReset: false,
    setInfo: {
      Bj: '/pages/Novel/assets/image/bj3.jpg',
      size: 32,
      color: '#000'
    },
    aColor: ['#000', '#fff', '#000'],
    aBj: ['/pages/Novel/assets/image/bj1.jpg', '/pages/Novel/assets/image/bj2.jpg', '/pages/Novel/assets/image/bj3.jpg'],
    isNav: false,
    isTop: false,
    isChapter: false,
    isBlack: false,
    novelIndex: -1
  },
  getContent(b, b2) {
    let url = `${this.data.chapterNovel}${this.data.novelId}/${this.data.chapterId}.html`
    this.data.fnAjax(url, {}).then(res => {
      console.log(res)
      let arr = []
      if (b) {
        arr = this.data.aContent
      }
      arr.push(res.data)
      this.setData({
        aContent: arr,
        pid: res.data.pid,
        nid: res.data.nid,
        isRefresh: false,
        _title: res.data.cname
      })
      if (b2) {
        this.setData({
          isTop: 0
        })
      }
      console.log(this.data.isTop)
      if (this.data.novelIndex > -1) {
        let _arr = app.globalData.userInfo.novellist;
        _arr[this.data.novelIndex].chapter = this.data.chapterId
      }

    })
  },
  getChapterNovel() {
    let url = `${this.data.chapterNovel}${this.data.novelId}/`
    this.data.fnAjax(url, {}).then(res => {
      this.setData({
        aChapter: res.data.list
      })
    })
  },
  fnTop() {
    if (this.data.pid > -1) {
      this.setData({
        chapterId: this.data.pid,
      })
      this.getContent(false)
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
    if (this.data.nid > -1) {
      this.setData({
        chapterId: this.data.nid,
      })
      this.getContent(true)
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
  goBack() {
    let that = this
    let arr = app.globalData.userInfo.novellist;
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
            let url = `${that.data.infoNovel}/${that.data.novelId}.html`
            that.data.fnAjax(url, {}).then(res => {
              if (res.status == 1) {
                let obj = {
                  author: res.data.Author,
                  chapter: that.data.chapterId,
                  id: res.data.Id,
                  img: `${that.data.img}${res.data.Img}`,
                  name: res.data.Name
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
  setAddFont() {
    let num = this.data.setInfo.size
    if (num > 56) {
      wx.showToast({
        title: '已经是最大的字体了',
        icon: 'none',
        duration: 2000
      })
    } else {
      num += 8
      this.setData({
        'setInfo.size': num
      })
    }
  },
  setMinusFont() {
    let num = this.data.setInfo.size
    if (num < 24) {
      wx.showToast({
        title: '已经是最小的字体了',
        icon: 'none',
        duration: 2000
      })
    } else {
      num -= 8
      this.setData({
        'setInfo.size': num
      })
    }
  },
  nextChapter() {
    if (this.data.nid > 0) {
      this.setData({
        chapterId: this.data.nid
      })
      this.getContent(false, true)
    } else {
      wx.showToast({
        title: '已经是最后一章了',
        icon: 'none',
        duration: 2000
      })
    }
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
  setBj(e) {
    let id = e.currentTarget.dataset.id
    this.data.setInfo.Bj = this.data.aBj[parseInt(id)]
    this.data.setInfo.color = this.data.aColor[parseInt(id)]
    this.setData({
      setInfo: this.data.setInfo
    })
  },
  goNovelCon(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      chapterId: id,
      isNav: false,
      isChapter: false
    })
    this.getContent(false, true)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      novelId: options.novelId,
      chapterId: options.chapterId
    })

    let arr = app.globalData.userInfo.novellist;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == this.data.novelId) {
        this.setData({
          isBlack: true,
          novelIndex: i
        })
        break;
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getContent()
    this.getChapterNovel()
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