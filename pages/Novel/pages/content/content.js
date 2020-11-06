// pages/Novel/pages/content/content.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novelId: 0,
    chapterId: 0,
    aChapter: [],
    aContent: [],
    _title:'',
    chapterNovel: apiUrl.apiUrl.novel.chapter,
    fnAjax: fnCon.fnAjax,
    pid: 0,
    nid: 0,
    isRefresh: false,
    isReset: false,
    setInfo: {
      Bj: '/pages/Novel/assets/image/bj3.jpg',
      size: 44,
      color: '#000'
    },
    aColor:['#000','#fff'],
    aBj: ['/pages/Novel/assets/image/bj1.jpg','/pages/Novel/assets/image/bj2.jpg','/pages/Novel/assets/image/bj3.jpg'],
    isNav:false
  },
  getContent(b) {
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
        _title:res.data.cname
      })
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
  setFn(){
    this.setData({
      isNav:!this.data.isNav
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
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