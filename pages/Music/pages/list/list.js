// pages/Music/pages/list/list.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: apiUrl.apiUrl.music.search,
    toplist: apiUrl.apiUrl.music.toplist,
    img: apiUrl.apiUrl.music.img,
    fnAjax: fnCon.fnAjax,
    songList: [],
    topinfo: {},
    id: 0,
    song_page: 1,
    song_num: 20,
    total_song_num: 0,
    isRefresh: false,
    searchKey: '',
    curnum: 1,
    name:''
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
      for (let i = 0; i < res.songlist.length; i++) {
        let mid = res.songlist[i].data.songmid
        let id = res.songlist[i].data.songid + ''
        let name = res.songlist[i].data.songname
        let singer = res.songlist[i].data.singer
        let pic = `${this.data.img}${res.songlist[i].data.albummid}_1.jpg?max_age=2592000`
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
      this.setData({
        total_song_num: res.total_song_num,
        topinfo: res.topinfo,
        songList: arr,
        isRefresh: false
      })
    })
  },
  fnTop() {
    this.setData({
      song_page: 1
    })

    if (this.data.searchKey) {
      this.searchFn();
    } else {
      this.getRankInfo();
    }
  },
  fnBotton() {
    let num = this.data.song_page

    if (this.data.searchKey) {
      if (num < this.data.curnum) {
        num = num + 1
        this.setData({
          song_page: num
        })
        this.searchFn();
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }

    } else {
      if (num * this.data.song_num < this.data.total_song_num) {
        num = num + 1
        this.setData({
          song_page: num
        })
        this.getRankInfo();
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    let mid = e.currentTarget.dataset.mid
    let arr = this.data.songList
    let goMusic = fnCon.goMusic

    for (let i = 0; i < arr.length; i++) {

      if (app.globalData.userInfo.musiclist[0].mid.indexOf(arr[i].mid) == -1) {
        app.globalData.userInfo.musiclist[0].mid.push(arr[i].mid)
        app.globalData.userInfo.musiclist[0].id.push(arr[i].id)
        app.globalData.userInfo.musiclist[0].list.push(arr[i])
      }
    }

    if (app.globalData.isShow) {
      goMusic(id, mid)
    }
  },
  searchFn() {
    let url = this.data.search
    let data = {
      ct: 24,
      qqmusic_ver: 1298,
      new_json: 1,
      remoteplace: 'txt.yqq.center',
      searchid: 49364391340764285,
      t: 0,
      aggr: 1,
      cr: 1,
      catZhida: 1,
      lossless: 0,
      flag_qc: 0,
      p: this.data.song_page,
      n: this.data.song_num,
      w: this.data.searchKey,
      g_tk_new_20200303: 5381,
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
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
      for (let i = 0; i < res.data.song.list.length; i++) {
        let mid = res.data.song.list[i].mid
        let id = res.data.song.list[i].id + ''
        let name = res.data.song.list[i].name
        let singer = res.data.song.list[i].singer
        let pic = `${this.data.img}${res.data.song.list[i].album.mid}_1.jpg?max_age=2592000`
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
      this.setData({
        curnum: res.data.song.curnum,
        songList: arr,
        isRefresh: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    if (options.key) {
      this.setData({
        searchKey: options.key,
        name:options.name
      })
    }

    if (options.id) {
      this.setData({
        id: options.id,
        name:options.name
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.id) {
      this.getRankInfo();
    }

    if (this.data.searchKey) {
      this.searchFn();
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