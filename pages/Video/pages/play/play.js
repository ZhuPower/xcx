// pages/Video/pages/play/play.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
var WxParse = require('../../../../wxParse/wxParse');
const CryptoJS = require('../../../../utils/Crypto')
const Base64 = require('../../../../utils/base64')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    data: null,
    videoSrc: '',
    playList: [],
    nIndex: 0,
    title: '',
    isApp: true,
    url: '',
    fnAjax: fnCon.fnAjax,
    getParameter: fnCon.getParameter,
    parsing: apiUrl.apiUrl.parsing,
    yList: [],
    aarYlist: [],
    num: 0,
    isShowSource: false,
    parsingIndex: 0,
    isParsing: false,
    isNoParse: 0
  },
  Play(e) {
    let obj = e.currentTarget.dataset

    if (obj.url.indexOf('.m3u8') > -1 || obj.url.indexOf('.mp4') > -1) {
      this.setData({
        nIndex: obj.index,
        videoSrc: obj.url
      })
      this.setView();
    } else {
      this.getVideoSrc(obj.url, res => {
        if (res.url) {
          let _src = res.url
          if (_src.indexOf('//') == 0) {
            _src = 'https:' + _src
          }
          this.setData({
            nIndex: obj.index,
            videoSrc: _src
          })
          this.setView();
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }

      })
    }

    wx.setNavigationBarTitle({
      title: `${this.data.title} ${obj.name}`
    })
  },
  getVideoSrc(str, endFn) {
    let that = this
    let fnAjax = this.data.fnAjax
    let getParameter = null;
    if (this.data.parsingIndex == 4) {
      this.data.getParameter(str, this.data.parsingIndex).then(res => {
        getParameter = res
        nextFn(endFn)
      })
    } else {
      getParameter = this.data.getParameter(str, this.data.parsingIndex)
      nextFn(endFn)
    }


    function nextFn(endFn) {
      fnAjax(getParameter.url, getParameter.data, that.data.parsing[that.data.parsingIndex].method, 'application/x-www-form-urlencoded').then(res => {
        console.log(res)
        if (that.data.parsingIndex == 3) {

          if (res.code == 200) {

            if (res.url.indexOf('AINX') != -1) {
              var newurl = res.url.replace(/AINX/, '');
              var obj = {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
              };
              var str2 = CryptoJS.enc.Utf8.parse('loveme@nxflv@com');
              var str = CryptoJS.AES.decrypt(newurl, str2, obj);
              res.url = str.toString(CryptoJS.enc.Utf8)
              console.log(res.url)
              endFn && endFn(res)
            };
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          endFn && endFn(res)
        }
      })
    }
  },
  bindPickerChange(e) {
    let num = e.detail.value
    this.setData({
      num: num,
      playList: this.data.aarYlist[num]
    })
    let url = this.data.playList[this.data.nIndex][1]
    if (url.indexOf('.m3u8') > -1 || url.indexOf('.mp4') > -1) {
      this.setData({
        videoSrc: url
      })
      this.setView();
    } else {
      this.getVideoSrc(url, res => {
        this.setData({
          videoSrc: res.url
        })
        this.setView();
      })
    }
  },

  setView() {
    var bbb = `<video src="${this.data.videoSrc}" class="playBox"></video>`;
    var that = this;
    WxParse.wxParse('article', 'html', bbb, that, 0);
  },
  parseChange(e) {
    let num = e.detail.value
    this.setData({
      parsingIndex: num
    })
    let url = this.data.playList[this.data.nIndex][1]
    this.getVideoSrc(url, res => {
      this.setData({
        videoSrc: res.url
      })
      this.setView();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.data)
    let data = JSON.parse(decodeURIComponent(options.data))
    console.log(data)
    let _url = ''
    if (data.isApp) {
      _url = apiUrl.apiUrl.video.videoDetail
    } else {
      _url = app.globalData.nowSource.url
    }

    let parsingIndex = 0
    if (_url == 'https://zy.itono.cn/inc/apijson_vod.php') {
      parsingIndex = 4
    }

    this.setData({
      id: data.id,
      nIndex: data.index,
      title: data.title,
      isApp: data.isApp,
      url: _url,
      parsingIndex: parsingIndex
    })

    let arr_1 = app.globalData.jxUrl

    if (arr_1.indexOf(_url) == -1 || data.url.indexOf('.m3u8') > -1 || data.url.indexOf('.mp4') > -1) {
      this.setData({
        videoSrc: data.url
      })
      this.setView();
    } else {
      this.setData({
        hasParse:true
      })
      this.getVideoSrc(data.url, res => {
        //console.log(res)
        if (res.url) {
          let _src = res.url
          if (_src.indexOf('//') == 0) {
            _src = 'https:' + _src
          }
          this.setData({
            videoSrc: _src
          })
          this.setView();
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }

      })
    }

    wx.setNavigationBarTitle({
      title: `${data.title} ${data.name}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    let url = this.data.url
    let fnAjax = this.data.fnAjax

    if (this.data.isApp) {

      let data2 = {
        index: '0',
        vid: this.data.id
      }

      fnAjax(url, data2).then(res => {
        if (res.code == 200) {
          this.setData({
            playList: res.data.srcList
          })
        }
      })

    } else {
      let _arr = []
      let data = {
        ac: 'detail',
        ids: this.data.id
      }
      let arr_0 = app.globalData.getAc
      if (arr_0.indexOf(url)>-1) {
        data.ac = 'videolist'
      }
      let arr1 = []
      let arr2 = []
      let arr3 = []
      let arr_1 = app.globalData.jxUrl

      fnAjax(url, data).then(res => {
        console.log(res)
        if (res.code == 1) {
          this.setData({
            data: res.list[0]
          })

          if (this.data.data.vod_play_url.indexOf('$$$') > -1) {
            arr1 = this.data.data.vod_play_from.split('$$$')
            arr2 = this.data.data.vod_play_url.split('$$$')
            for (let x = 0; x < _arr.length; x++) {
              let n = arr1.indexOf(_arr[x])
              if (n > -1) {
                arr1.splice(n, 1)
                arr2.splice(n, 1)
              }
            }
          } else {
            if (_arr.indexOf(this.data.data.vod_play_from) > -1) {
              arr1 = []
              arr2 = []
            } else {
              arr1 = [this.data.data.vod_play_from]
              arr2 = [this.data.data.vod_play_url]
            }
          }

          for (let i = 0; i < arr2.length; i++) {
            if (arr2[i].indexOf('#') > -1) {
              let arr4 = arr2[i].split('#')
              getArrList(arr4, i)
            } else {
              let arr4 = [arr2[i]]
              getArrList(arr4, i)
            }

          }

        } else if (res.rss) {
          this.setData({
            data: res.rss.list.video
          })
          let arr0 = null
          if (typeof res.rss.list.video.dl.dd == 'string') {
            arr0 = []
            arr0[0] = res.rss.list.video.dl.dd
          } else {
            arr0 = res.rss.list.video.dl.dd
          }

          for (let i = 0; i < arr0.length; i++) {
            arr1.push('影视源' + (i + 1))

            if (arr0[i].indexOf('#') > -1) {
              let arr4 = arr0[i].split('#')
              getArrList(arr4, i)
            } else {
              let arr4 = [arr0[i]]
              getArrList(arr4, i)
            }

          }
        }

        let isShowSource = false
        if (arr3.length > 1) {
          isShowSource = true
        }

        this.setData({
          yList: arr1,
          aarYlist: arr3,
          playList: arr3[that.data.isNoParse],
          isShowSource: isShowSource
        })


        function getArrList(arr4, num) {
          let arr5 = []
          for (let ii = 0; ii < arr4.length; ii++) {
            let arr6 = arr4[ii].split('$')
            let _str1 = arr6[0].replace(/\s*/g, "")
            arr6[0] = _str1
            if (arr6[1]) {
              if (arr6[1].indexOf('aHR') == 0) {
                let _str2 = Base64.decode(arr6[1])
                arr6[1] = _str2
                if (arr6[1].indexOf('.m3u8') > -1 || arr6[1].indexOf('.mp4') > -1) {
                  if (!that.data.isNoParse) {
                    that.setData({
                      isNoParse: num,
                      num: num
                    })
                  }
                }
              }
            }else{
              let _a61 = arr6[0]
              arr6[1] = _a61
              arr6[0] = '第' + (ii+1) + '集'
            }

            if (ii == 0) {
              if (arr_1.indexOf(url) == -1) {
                if (arr6[1].indexOf('.m3u8') > -1 || arr6[1].indexOf('.mp4') > -1) {

                } else {
                  arr1.splice(num, 1);
                  break;
                }
              }
            }
            arr5.push(arr6)
          }
          if (arr5.length > 0) {
            arr3.push(arr5)
          }
        }
      })
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