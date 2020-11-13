// pages/Music/pages/index/index.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proxyUrl: apiUrl.apiUrl.proxyUrl,
    toplist: apiUrl.apiUrl.music.toplist,
    img: apiUrl.apiUrl.music.img,
    fnAjax: fnCon.fnAjax,
    songList: [],
    banner: [
      'http://p1.music.126.net/sooZQ6BuDAtztTfS02e_hQ==/109951165457314199.jpg',
      'http://p1.music.126.net/AcfS8ODMYZCzNqvjX1HoWQ==/109951165456003034.jpg',
      'http://p1.music.126.net/qC-5B-_p4ld-ebX_uMgT8Q==/109951165456267803.jpg'
    ]
  },
  getRank() {
    let url = this.data.toplist
    let data = {
      page: 'index',
      format: 'html',
      tpl: 'macv4',
      v8debug: 1
    }
    this.data.fnAjax(url, data).then(res => {
      let arr = []
      for (var key in res.songinfomap) {
        let _obj = res.songinfomap[key]
        let mid = _obj.songmid
        let id = _obj.songid + ''
        let name = _obj.songname
        let singer = _obj.singer
        let pic = `${this.data.img}${_obj.albummid}_1.jpg?max_age=2592000`
        let obj = {
          name: name,
          mid: mid,
          id: id,
          singer: singer,
          pic: pic,
          url: '',
          lyric: ''
        }
        arr.push(obj)
      }
      let num = arr.length % 3
      arr.splice(-num, num)
      this.setData({
        songList: arr
      })
    })
  },
  goDetail(e) {
    let item = e.currentTarget.dataset.item
    let id = e.currentTarget.dataset.id
    let mid = e.currentTarget.dataset.mid
    let goMusic = fnCon.goMusic

    if (app.globalData.musiclist.mid.indexOf(mid) == -1) {
      app.globalData.musiclist.mid.push(mid)
      app.globalData.musiclist.id.push(id)
      app.globalData.musiclist.list.push(item)
    }

    if (app.globalData.isShow) {
      goMusic(id, mid)
    }
  },
  bindKeyInput(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  goList() {
    if (this.data.searchKey) {
      let str = 'type=search&name=搜索"' + this.data.searchKey + '"结果&key=' + this.data.searchKey
      this.setData({
        searchKey: ''
      })
      wx.navigateTo({
        url: '/pages/Music/pages/list/list?' + str,
      })
    } else {
      wx.showToast({
        title: '请输入搜索关键字',
        icon: 'none',
        duration: 2000
      })
    }

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
    //this.getRankInfo(27)
    // this.bb();
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