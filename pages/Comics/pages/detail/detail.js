// pages/Comics/pages/detail/detail.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nIndex:0,
    detailData:{},
    aChapter:[],
    comicId:0,
    infoComics:apiUrl.apiUrl.comics.infoComics,
    chapterComics:apiUrl.apiUrl.comics.chapterComics,
    fnAjax:fnCon.fnAjax
  },

  getInfoComics(){
    let url = this.data.infoComics

    let data = {
      comic_id: this.data.comicId
    }

    this.data.fnAjax(url,data).then(res => {
      if(res.code == 200){
        this.setData({
          detailData:res.data
        })

        wx.setNavigationBarTitle({
          title:res.data.title 
        })
      }
    })
  },

  getChapterComics(){
    let url = this.data.chapterComics

    let data = {
      comic_id: this.data.comicId
    }

    this.data.fnAjax(url,data).then(res => {
      if(res.code == 200){
        this.setData({
          aChapter:res.data
        })
      }
    })
  },

  goComicCon(e){
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    let index = e.currentTarget.dataset.index
    let goComicCon = fnCon.goComicCon
    goComicCon(id,this.data.comicId,title,index)
  },
  tabFn(e){
    let n = e.currentTarget.dataset.num
    this.setData({
      nIndex:n
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      comicId:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInfoComics()
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