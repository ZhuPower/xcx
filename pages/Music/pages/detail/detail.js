// pages/Music/pages/detail/detail.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proxyUrl:apiUrl.apiUrl.proxyUrl,
    songInfo: apiUrl.apiUrl.music.songInfo,
    songSrc: apiUrl.apiUrl.music.songSrc,
    img: apiUrl.apiUrl.music.img,
    fnAjax: fnCon.fnAjax,
    musicSrc: '',
    songmid:''
  },
  getMusic() {
    let url = this.data.songInfo
    let data = {
      id:this.data.songmid,
      type:'song',
      media:'tencent'
    }
    this.data.fnAjax(url, data).then(res => {
      console.log(res)
      // let str = `${this.data.songSrc}${res.req_0.data.testfile2g}`
      // this.setData({
      //   musicSrc:str
      // })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      songmid:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMusic();
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