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
    tabIndex: 0,
    nowChapter: 0,
    isCollect: true
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
        aChapter: res.data.list,
        nowChapter: res.data.list[0].list[0].id
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
    this.setData({
      nowChapter: parseInt(id)
    })
    goNovel(id)
  },
  scrollFn(e) {
    if (e.detail.scrollTop >= 70) {
      this.setData({
        isNav: true
      })
    } else {
      this.setData({
        isNav: false
      })
    }
  },
  doTab(e) {
    let num = e.currentTarget.dataset.num
    this.setData({
      tabIndex: num
    })
  },
  scrollFn2(e) {
    console.log(e.detail.scrollTop)
  },

  collectBtn() {
    if (this.data.detailData.Name && this.data.aChapter.length>0) {
      if (this.data.isCollect) {
        let obj = {
          name: this.data.detailData.Name,
          author:this.data.detailData.Author,
          img: `${this.data.img}${this.data.detailData.Img}`,
          id: this.data.detailData.Id,
          chapter:this.data.nowChapter
        }
        app.globalData.userInfo.novellist.push(obj);
        this.setData({
          isCollect: false
        })
      } else {
        let arr = app.globalData.userInfo.novellist;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == this.data.detailData.Id) {
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
      if (this.data.detailData.Name) {
        clearInterval(id);
        let arr = app.globalData.userInfo.novellist;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == this.data.detailData.Id) {
            this.setData({
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
      novelId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getInfoNovel();
    this.getChapterNovel();
    this.setData({
      isShow: app.globalData.isShow
    })

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