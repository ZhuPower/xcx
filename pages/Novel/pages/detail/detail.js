// pages/Novel/pages/detail/detail.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: apiUrl.apiUrl.novel.img,
    detailData: {},
    aChapter: [],
    novelId: 0,
    infoNovel: apiUrl.apiUrl.novel.info,
    chapterNovel: apiUrl.apiUrl.novel.chapter,
    fnAjax: fnCon.fnAjax,
    isShow: false,
    isShow2: false,
    isNav: false,
    tabIndex:0
  },
  getInfoNovel() {
    let url = `${this.data.infoNovel}/${this.data.novelId}.html`
    this.data.fnAjax(url, {}).then(res => {
      this.setData({
        detailData: res.data,
        isShow2: true
      })
      wx.setNavigationBarTitle({
        title: res.data.Name
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
  goNovelCon(e) {
    let id = e.currentTarget.dataset.id
    let goNovelCon = fnCon.goNovelCon
    goNovelCon(id, this.data.novelId)
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    let goNovel = fnCon.goNovel
    goNovel(id)
  },
  scrollFn(e) {
    if (e.detail.scrollTop >= 150) {
      this.setData({
        isNav: true
      })
    } else {
      this.setData({
        isNav: false
      })
    }
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  doTab(e){
    let num = e.currentTarget.dataset.num
    this.setData({
      tabIndex:num
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      novelId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInfoNovel();
    this.getChapterNovel();
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