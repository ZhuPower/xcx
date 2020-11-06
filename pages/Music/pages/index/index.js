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
  getHome() {
    let url = this.data.home
    let data = {
      _: 'recom02391503404708506',
      g_tk: 5381,
      sign: 'zzajmonki9kqesy6616ff15c4441255ee9ef959d8dacccc3f88',
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data: '{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":5}},"new_album":{"module":"newalbum.NewAlbumServer","method":"get_new_album_info","param":{"area":1,"sin":0,"num":20}},"new_album_tag":{"module":"newalbum.NewAlbumServer","method":"get_new_album_area","param":{}},"toplist":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}},"focus":{"module":"music.musicHall.MusicHallPlatform","method":"GetFocus","param":{}}}'
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
    this.getHome();
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