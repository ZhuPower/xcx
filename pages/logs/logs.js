//logs.js
const util = require('../../utils/util.js')
const arr = require('../../utils/arr.js')

Page({
  data: {
    logs: [],
    inputUrl:'',
    arrUrl:[]
  },
  loginForm: function (data){
    var username = data.detail.value.username
    if (username.indexOf('m3u8')==-1){
      this.setData({
        arrUrl: arr.arrUrl[username]
      })
    }else{
      this.setData({
        inputUrl: username
      })
    }
  },
  playlike:function(obj){
    var str = obj.currentTarget.dataset.item
    this.setData({
      inputUrl: str
    })
  },
  onLoad: function () {
   // console.log(arr.arrUrl)
    
  }
})
