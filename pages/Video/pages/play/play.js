// pages/Video/pages/play/play.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
var WxParse = require('../../../../wxParse/wxParse');
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
    isShowSource: false
  },
  Play(e) {
    let obj = e.currentTarget.dataset

    if (this.data.isShowSource) {
      this.getVideoSrc(obj.url, res => {
        console.log(res)
        this.setData({
          nIndex: obj.index,
          videoSrc: res.url
        })
        this.setView();
      })
    } else {
      this.setData({
        nIndex: obj.index,
        videoSrc: obj.url
      })
      this.setView();
    }



    wx.setNavigationBarTitle({
      title: `${this.data.title} ${obj.name}`
    })
  },
  getVideoSrc(str, endFn) {
    let fnAjax = this.data.fnAjax

    let data = {
      url:str
    }

    fnAjax(this.data.parsing, data).then(res => {
      endFn && endFn(res)
    })
  },
  bindPickerChange(e) {
    let num = e.detail.value
    this.setData({
      num: num,
      playList: this.data.aarYlist[num]
    })
  },

  setView() {
    var bbb = `<video src="${this.data.videoSrc}" class="playBox"></video>`;
    var that = this;
    WxParse.wxParse('article', 'html', bbb, that, 0);
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

    this.setData({
      id: data.id,
      nIndex: data.index,
      title: data.title,
      isApp: data.isApp,
      url: _url
    })

    let arr_1 = ['https://zy.itono.cn/inc/apijson_vod.php']

    if (arr_1.indexOf(_url) == -1) {
      this.setData({
        videoSrc: data.url
      })
      this.setView();
    } else {

      this.setData({
        isShowSource: true
      })

      this.getVideoSrc(data.url, res => {
        //console.log(res)
        let _src = res.url
        if(_src.indexOf('//') == 0){
          _src = 'https:'+_src
        }
        this.setData({
          videoSrc: _src
        })
        this.setView();
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
      let _arr = ['sohu', 'funshion', 'pptv']
      let data = {
        ac: 'detail',
        ids: this.data.id
      }

      fnAjax(url, data).then(res => {
        if (res.code == 1) {
          this.setData({
            data: res.list[0]
          })
          let arr1 = []
          let arr2 = []
          let arr3 = []
          let arr_1 = ['https://zy.itono.cn/inc/apijson_vod.php']
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

          function getArrList(arr4, num) {

            let arr5 = []

            for (let ii = 0; ii < arr4.length; ii++) {
              let arr6 = arr4[ii].split('$')

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

          this.setData({
            yList: arr1,
            aarYlist: arr3,
            playList: arr3[0]
          })
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