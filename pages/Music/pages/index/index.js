// pages/Music/pages/index/index.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proxyUrl: apiUrl.apiUrl.proxyUrl,
    home: apiUrl.apiUrl.music.home,
    fnAjax: fnCon.fnAjax,
    songList:[],
    banner:[
      'http://p1.music.126.net/sooZQ6BuDAtztTfS02e_hQ==/109951165457314199.jpg',
      'http://p1.music.126.net/AcfS8ODMYZCzNqvjX1HoWQ==/109951165456003034.jpg',
      'http://p1.music.126.net/qC-5B-_p4ld-ebX_uMgT8Q==/109951165456267803.jpg'
    ]
  },
  bb() {
    let url = this.data.proxyUrl
    let data = {
      apiUrl: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
      songmid: '002GwAma2DGN2x',
      g_tk: 5381
    }
    this.data.fnAjax(url, data).then(res => {
      console.log(res)
    })
  },
  getRank() {
    let url = this.data.home
    let data = {
      page: 'index',
      format: 'html',
      tpl: 'macv4',
      v8debug: 1
    }
    this.data.fnAjax(url, data).then(res => {
      console.log(res)
      this.setData({
        songList:res.songinfomap
      })
    })
  },
  getRankInfo(Id) {
    let url = this.data.home
    let data = {
      tpl: 3,
      page: 'detail',
      topid: Id,
      type: 'top',
      song_begin: 0,
      song_num: 30,
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
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRank();
    this.getRankInfo(4)
    this.bb();
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