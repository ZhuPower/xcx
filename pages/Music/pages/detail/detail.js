// pages/Music/pages/detail/detail.js
const fnCon = require('../../../../utils/common')
// 正在播放歌曲的index
let nowPlayingIndex = 0
// 获取全局唯一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicInfo: {},
    isPlaying: false, // false表示不播放，true表示正在播放
    isLyricShow: false, //表示当前歌词是否显示
    isSame: false, // 表示是否为同一首歌
    isShow: false,
    playMode: 0,
    musicList: [],
    isHeight: false,
    nowIndex: 0
  },
  getData() {
    let that = this;
    if (app.globalData.sourceData) {
      this.setData({
        nIndex: app.globalData.nmusic,
        isShow: app.globalData.isShow
      })
      fnCon.getSource(app, 'music', 'detail', this, '', '', setFn);
    } else {
      clearInterval(app.globalData.iTime)
      app.globalData.iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(app.globalData.iTime)
          this.setData({
            nIndex: app.globalData.nmusic,
            isShow: app.globalData.isShow
          })
          fnCon.getSource(app, 'music', 'detail', this, '', '', setFn);
        }
      }, 20);
    }

    function setFn(obj) {
      if (!obj.name) {
        obj.name = that.data.musicInfo.name
      }
      if (!obj.songImg) {
        obj.songImg = that.data.musicInfo.pic
      }
      if (!obj.singer) {
        obj.singer = that.data.musicInfo.singer
      }
      if (obj.str) {
        backgroundAudioManager.src = obj.str
      }

      backgroundAudioManager.title = obj.name
      backgroundAudioManager.coverImgUrl = obj.songImg
      backgroundAudioManager.singer = obj.singer
      backgroundAudioManager.epname = obj.name


      if (!app.globalData.musiclist.list[nowPlayingIndex].name) {
        app.globalData.musiclist.list[nowPlayingIndex].name = obj.name
      }

      if (!app.globalData.musiclist.list[nowPlayingIndex].pic) {
        app.globalData.musiclist.list[nowPlayingIndex].pic = obj.songImg
      }

      if (app.globalData.musiclist.list[nowPlayingIndex].singer.length == 0) {
        app.globalData.musiclist.list[nowPlayingIndex].singer = obj.singer
      }

      if (!app.globalData.musiclist.list[nowPlayingIndex].lyric) {
        app.globalData.musiclist.list[nowPlayingIndex].lyric = obj.lyric
        that.setData({
          'musicInfo.lyric': obj.lyric
        })
      }

      if (!app.globalData.musiclist.list[nowPlayingIndex].url) {
        app.globalData.musiclist.list[nowPlayingIndex].url = obj.str
      }

      that.setData({
        isPlaying: true
      })

      wx.setNavigationBarTitle({
        title: obj.name || that.data.musicInfo.name
      })
    }
  },
  getMusic() {
    backgroundAudioManager.stop()
    app.globalData.songmid = this.data.musicInfo.mid
    if (this.data.musicInfo.url) {
      backgroundAudioManager.title = this.data.musicInfo.name
      backgroundAudioManager.coverImgUrl = this.data.musicInfo.pic
      backgroundAudioManager.singer = this.data.musicInfo.singer[0].name
      backgroundAudioManager.epname = this.data.musicInfo.name
      backgroundAudioManager.src = this.data.musicInfo.url
    } else {
      this.getData();
    }
  },
  togglePlaying() {
    // 正在播放
    if (this.data.isPlaying) {
      backgroundAudioManager.pause()
    } else {
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  onPrev() {
    let playMode = this.data.playMode
    let onOff = true
    if (playMode == 0) {
      if (nowPlayingIndex > 0) {
        nowPlayingIndex--
      } else {
        onOff = false
        wx.showToast({
          title: '已是第一首',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (playMode == 1) {
      nowPlayingIndex--
      if (nowPlayingIndex < 0) {
        nowPlayingIndex = app.globalData.musiclist.list.length - 1
      }
    } else if (playMode == 2) {

    } else if (playMode == 3) {
      let num = app.globalData.musiclist.list.length
      nowPlayingIndex = Math.floor(Math.random() * num)
    }

    if (onOff) {
      let musicInfo = app.globalData.musiclist.list[nowPlayingIndex]
      this.setData({
        nowIndex: nowPlayingIndex,
        musicInfo: musicInfo
      })
      this.getMusic()
    }
  },
  onNext() {
    let playMode = this.data.playMode
    let onOff = true
    if (playMode == 0) {
      if (nowPlayingIndex < app.globalData.musiclist.list.length - 1) {
        nowPlayingIndex++
      } else {
        onOff = false
        wx.showToast({
          title: '已是最后一首',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (playMode == 1) {
      nowPlayingIndex++
      if (nowPlayingIndex == app.globalData.musiclist.list.length) {
        nowPlayingIndex = 0
      }
    } else if (playMode == 2) {

    } else if (playMode == 3) {
      let num = app.globalData.musiclist.list.length
      nowPlayingIndex = Math.floor(Math.random() * num)
    }

    if (onOff) {
      let musicInfo = app.globalData.musiclist.list[nowPlayingIndex]
      this.setData({
        nowIndex: nowPlayingIndex,
        musicInfo: musicInfo
      })
      this.getMusic()
    }
  },
  onSelect(e) {
    if (nowPlayingIndex != e.detail.index) {
      nowPlayingIndex = e.detail.index
      let musicInfo = app.globalData.musiclist.list[nowPlayingIndex]
      this.setData({
        nowIndex: nowPlayingIndex,
        musicInfo: musicInfo
      })
      this.getMusic()
    } else {
      this.togglePlaying();
    }

  },
  onChangeLyricShow() {
    if (this.data.isHeight) {
      this.setData({
        isHeight: false,
      })
    } else {
      this.setData({
        isLyricShow: !this.data.isLyricShow,
      })
    }

  },
  timeUpdate(event) {
    this.selectComponent('.lyric').update(event.detail.currentTime)
  },
  onPlay() {
    this.setData({
      isPlaying: true,
    })
  },
  onPause() {
    this.setData({
      isPlaying: false,
    })
  },
  showList() {
    this.setData({
      isHeight: !this.data.isHeight
    })
  },
  changePlayMode() {
    let playMode = this.data.playMode
    if (playMode < 3) {
      playMode++;
    } else {
      playMode = 0
    }
    
    this.setData({
      playMode: playMode
    })
  },
  onAllDel() {
    backgroundAudioManager.stop()
    app.globalData.musiclist.list = [];
    app.globalData.musiclist.id = [];
    app.globalData.musiclist.mid = [];
    app.globalData.userInfo.musiclist[0].list = [];
    this.setData({
      nowIndex: 0,
      musicList: [],
      musicInfo: {}
    })
    wx.showToast({
      title: '播放列表已清空',
      icon: 'none',
      duration: 1000
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  onDel(e) {
    let num = e.detail.index
    if (nowPlayingIndex != num) {
      app.globalData.musiclist.list.splice(num, 1);
      app.globalData.musiclist.id.splice(num, 1);
      app.globalData.musiclist.mid.splice(num, 1)
      if (nowPlayingIndex > num) {
        nowPlayingIndex--
      }

      this.setData({
        nowIndex: nowPlayingIndex,
        musicList: app.globalData.musiclist
      })
    } else if (nowPlayingIndex == num) {
      backgroundAudioManager.stop()
      app.globalData.musiclist.list.splice(num, 1);
      app.globalData.musiclist.id.splice(num, 1);
      app.globalData.musiclist.mid.splice(num, 1)
      nowPlayingIndex = 0
      this.setData({
        nowIndex: nowPlayingIndex,
        musicList: app.globalData.musiclist
      })
    }
  },
  onCollect(e) {
    let num = e.detail.index
    let _o = app.globalData.musiclist.list[num]
    let arr = app.globalData.userInfo.musiclist[1].list
 
    if (_o.isCollect) {
      _o.isCollect = false
      for (let i = 0; i < arr.length; i++) {
        if (_o.id == arr[i].id) {
          arr.splice(i, 1);
          wx.showToast({
            title: '取消收藏！',
            icon: 'none',
            duration: 500
          })
          break;
        }
      }
    } else {
      _o.isCollect = true
      let obj = {
        id: _o.id,
        mid: _o.mid,
        name: _o.name,
        pic: _o.pic,
        lyric: '',
        singer: _o.singer
      }
      app.globalData.userInfo.musiclist[1].list.push(obj);
      wx.showToast({
        title: '收藏成功！',
        icon: 'none',
        duration: 500
      })
    }

    this.setData({
      musicList: app.globalData.musiclist,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    nowPlayingIndex = app.globalData.musiclist.mid.indexOf(options.mid)
    let arr = app.globalData.userInfo.musiclist[1].list;
    for (let i = 0; i < arr.length; i++) {
      let arr1 = app.globalData.musiclist.list;
      for (let j = 0; j < arr1.length; j++) {
        if (arr[i].mid == arr1[j].mid) {
          arr1[j].isCollect = true
          break;
        }
      }
    }

    if (nowPlayingIndex > -1) {
      this.setData({
        nowIndex: nowPlayingIndex,
        musicList: app.globalData.musiclist,
        musicInfo: JSON.parse(JSON.stringify(app.globalData.musiclist.list[nowPlayingIndex]))
      })

      wx.setNavigationBarTitle({
        title: this.data.musicInfo.name
      })

    } else {

      nowPlayingIndex = 0
      let obj = {
        name: '',
        mid: options.mid,
        id: options.id,
        singer: [],
        pic: '',
        url: '',
        lyric: ''
      }
      app.globalData.musiclist.mid.push(options.mid)
      app.globalData.musiclist.id.push(options.id)
      app.globalData.musiclist.list.push(obj)

      this.setData({
        nowIndex: nowPlayingIndex,
        musicList: app.globalData.musiclist,
        musicInfo: obj
      })

    }

    if (options.mid == app.globalData.songmid) {
      this.setData({
        isSame: true
      })
    } else {
      this.setData({
        isSame: false
      })

      this.getMusic();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      isShow: app.globalData.isShow
    })
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