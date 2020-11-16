// pages/Music/pages/detail/detail.js
const apiUrl = require('../../../../utils/apiUrl')
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
    proxyUrl: apiUrl.apiUrl.proxyUrl,
    songInfo: apiUrl.apiUrl.music.songInfo,
    songSrc: apiUrl.apiUrl.music.songSrc,
    img: apiUrl.apiUrl.music.img,
    fnAjax: fnCon.fnAjax,
    musicInfo: {},
    isPlaying: false, // false表示不播放，true表示正在播放
    isLyricShow: false, //表示当前歌词是否显示
    isSame: false, // 表示是否为同一首歌
    isShow:false
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
      let url = this.data.songInfo
      let data = {
        data: `{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1236856180","songmid":["${this.data.musicInfo.mid}"],"songtype":[0],"uin":"2466469516","loginflag":1,"platform":"23","h5to":"speed"}},"detail":{"module":"music.pf_song_detail_svr","method":"get_song_detail","param":{"song_id":${this.data.musicInfo.id}}},"comm":{"g_tk":599058787,"uin":2466469516,"format":"json","platform":"h5"}}`
      }
      this.data.fnAjax(url, data).then(res => {
        console.log(res)
        if (res.code == 0) {
          if (res.detail.code == 0) {
            let songImg = `${this.data.img}${res.detail.data.track_info.album.pmid}.jpg?max_age=2592000`
            let name = res.detail.data.track_info.name
            let singer = res.detail.data.track_info.singer[0].name

            backgroundAudioManager.title = name
            backgroundAudioManager.coverImgUrl = songImg
            backgroundAudioManager.singer = singer
            backgroundAudioManager.epname = name

            if (!app.globalData.musiclist.list[nowPlayingIndex].name) {
              app.globalData.musiclist.list[nowPlayingIndex].name = name
            }

            if (!app.globalData.musiclist.list[nowPlayingIndex].pic) {
              app.globalData.musiclist.list[nowPlayingIndex].pic = songImg
            }

            if (app.globalData.musiclist.list[nowPlayingIndex].singer.length == 0) {
              app.globalData.musiclist.list[nowPlayingIndex].singer = singer
            }

            wx.setNavigationBarTitle({
              title: name
            })

            for (let x = 0; x < res.detail.data.info.length; x++) {
              if (res.detail.data.info[x].type == 'lyric') {
                let lyric = res.detail.data.info[x].content[0].value
                if (!app.globalData.musiclist.list[nowPlayingIndex].lyric) {
                  app.globalData.musiclist.list[nowPlayingIndex].lyric = lyric
                }

                this.setData({
                  'musicInfo.lyric': lyric
                })

              }
            }
          }

          if (res.req_0.code == 0) {
            let str = ''
            if (res.req_0.data.midurlinfo[0].purl) {
              str = `${this.data.songSrc}${res.req_0.data.midurlinfo[0].purl}`
              backgroundAudioManager.src = str

              if (!app.globalData.musiclist.list[nowPlayingIndex].url) {
                app.globalData.musiclist.list[nowPlayingIndex].url = str
              }

              this.setData({
                isPlaying: true
              })
            } else {
              let url = `https://i.y.qq.com/v8/playsong.html?songmid=${this.data.musicInfo.mid}&ADTAG=myqq&from=myqq&channel=10007100`
              this.data.fnAjax(url, {}).then(res => {
                let num0 = res.indexOf(',"m4aUrl":"')
                if (num0 > -1) {
                  let str0 = res.substring(num0 + 11)
                  let num1 = str0.indexOf('","singer":')

                  if (num1 > -1) {
                    let str1 = str0.substring(0, num1)
                    backgroundAudioManager.src = str1

                    if (!app.globalData.musiclist.list[nowPlayingIndex].url) {
                      app.globalData.musiclist.list[nowPlayingIndex].url = str1
                    }

                    this.setData({
                      isPlaying: true
                    })
                  }
                }
              })
            }
          }
        }
      })
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
    nowPlayingIndex--
    if (nowPlayingIndex < 0) {
      nowPlayingIndex = app.globalData.musiclist.list.length - 1
    }
    let musicInfo = app.globalData.musiclist.list[nowPlayingIndex]
    this.setData({
      musicInfo: musicInfo
    })
    this.getMusic()
  },
  onNext() {
    nowPlayingIndex++
    if (nowPlayingIndex == app.globalData.musiclist.list.length) {
      nowPlayingIndex = 0
    }
    let musicInfo = app.globalData.musiclist.list[nowPlayingIndex]
    this.setData({
      musicInfo: musicInfo
    })
    this.getMusic()
  },
  onChangeLyricShow() {
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    nowPlayingIndex = app.globalData.musiclist.mid.indexOf(options.mid)

    if (nowPlayingIndex > -1) {
      this.setData({
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

      this.setData({
        musicInfo: obj
      })

      app.globalData.musiclist.mid.push(options.mid)
      app.globalData.musiclist.id.push(options.id)
      app.globalData.musiclist.list.push(obj)
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
      isShow:app.globalData.isShow
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