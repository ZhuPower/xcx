// pages/video/video.js
const util = require('../../utils/util.js')
const arr = require('../../utils/arr.js')


Page({
  data: {
    logs: [],
    inputUrl: '',
    arrUrl: []
  },
  loginForm: function(data) {
    var username = data.detail.value.username
    if (username.indexOf('m3u8') == -1) {
      this.setData({
        arrUrl: arr.arrUrl[username]
      })
    } else {
      this.setData({
        inputUrl: username
      })
    }
  },
  playlike: function(obj) {
    var str = obj.currentTarget.dataset.item
    this.setData({
      inputUrl: str
    })
  },
  onLoad: function(options) {
    console.log(options.url)
    let str = options.url.replace(/\$+/ig, '$');
    console.log(str)
    let arr = str.split('$');
    let arr2 = [];
    for(let i=0; i<arr.length; i++){
      if (arr[i].indexOf('m3u8')>-1) {
        arr2.push(arr[i])
      }
    }

    this.setData({
      arrUrl: arr2,
      inputUrl: arr2[0]
    })

    // this.setData({
    //   inputUrl: options.url
    // })
    //console.log(arr.arrUrl)

  }
})