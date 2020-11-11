// pages/Music/pages/list/list.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toplist: apiUrl.apiUrl.music.toplist,
    img: apiUrl.apiUrl.music.img,
    fnAjax: fnCon.fnAjax,
    songList: [],
    topinfo:{},
    id: 0,
    song_page: 1,
    song_num: 20,
    total_song_num: 0,
    isRefresh: false
  },
  getRankInfo() {
    let url = this.data.toplist
    let data = {
      tpl: 3,
      page: 'detail',
      topid: this.data.id,
      type: 'top',
      song_begin: (this.data.song_page - 1) * this.data.song_num,
      song_num: this.data.song_num,
      g_tk: '5381',
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }
    this.data.fnAjax(url, data).then(res => {
      let arr = []
      if (this.data.song_page > 1) {
        arr = this.data.songList
      }
      arr.push(...res.songlist)
      this.setData({
        total_song_num: res.total_song_num,
        topinfo:res.topinfo,
        songList: arr,
        isRefresh: false
      })
    })
  },
  fnTop() {
    this.setData({
      song_page: 1
    })
    this.getRankInfo();
  },
  fnBotton() {
    let num = this.data.song_page

    if (num * this.data.song_num < this.data.total_song_num) {
      num = num + 1
      this.setData({
        song_page: num
      })
      this.getRankInfo();
    }
  },
  goDetail(e){
    let id = e.currentTarget.dataset.id
    let goMusic = fnCon.goMusic
    goMusic(id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })

    wx.setNavigationBarTitle({
      title: options.name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRankInfo();
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