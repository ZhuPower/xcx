//logs.js
import {
  hexMD5
} from "../../utils/md5.js"
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
  onLoad: function() {
    console.log(arr.arrUrl)



    var requestToken = wx.getStorageSync('token') || '';
    var refRequestToken = function() {
      if (requestToken) {
        return requestToken;
      } else {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [];
        for (var i = 0; i < 32; i++) uuid[i] = chars[0 | Math.random() * 62];
        requestToken = uuid.join('');
        wx.setStorageSync("token", requestToken);
        return requestToken;
      }
    }

    console.log(refRequestToken())

    // let url = 'http://mhapi.spdchgj.com/2/cartoon/positionback/reback';

    // let data = {
    //   refid: '',
    //   linkid: 35,
    //   from: ''
    // }


    // let url = 'http://mhapi.spdchgj.com/2/cartoon/cartoon/newRand';



    // setAjax(url, 'POST', data).then(res => {
    //   console.log(res)
    // })





    let obj_1 = {
      app: 1,
      tname: 'u_temp_user_5',
      refid: '',
      linkid: 35,
      recommend: '',
      from: ''
    }

    var signParams = signString(obj_1);

    wx.request({
      url: 'http://mhapi.spdchgj.com/2/cartoon/tempuser/login', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: obj_1,
      header: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Token': requestToken,
        'timestamp': signParams.timestamp,
        'sign': signParams.sign
      },
      success(res) {
        //wx.setStorageSync('access_token', res.data.access_token)

        if (res.data.code == 0) {
          // let data = {
          //   bookId: 2072,
          //   id: 2
          // }

          // var signParams = signString(data);

          // wx.request({
          //   url: 'http://mhapi.spdchgj.com/2/cartoon/cartoon/newRand', //仅为示例，并非真实的接口地址
          //   method: 'POST',
          //   data: data,
          //   header: {
          //     'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          //     'Access-Token': requestToken,
          //     'timestamp': signParams.timestamp,
          //     'sign': signParams.sign
          //   },
          //   success(res) {
          //     //wx.setStorageSync('access_token', res.data.access_token)
          //   }
          // })


          let data = {
            bookId: 2067,
            id: 44,
            linkid: 35
          }

          var signParams = signString(data);

          wx.request({
            url: 'http://mhapi.spdchgj.com/3/cartoon/cartoon/rand', //仅为示例，并非真实的接口地址
            method: 'POST',
            data: data,
            header: {
              'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Access-Token': requestToken,
              'timestamp': signParams.timestamp,
              'sign': signParams.sign
            },
            success(res) {
              //wx.setStorageSync('access_token', res.data.access_token)
            }
          })
        }
      }
    })


    function signString(req) {
      var obj = {}
      for (var key in req) {
        obj[key] = req[key]
      }
      var tmp = Date.parse(new Date()).toString();
      var timestamp = tmp.substr(0, 13);
      obj.timestamp = timestamp;
      var arr = new Array();
      var num = 0;
      for (var i in obj) {
        arr[num] = i;
        num++;
      }
      var sortArr = arr.sort();
      var stringA = '';
      var j = 0;
      for (var i in sortArr) {
        var v = obj[sortArr[i]];
        if (!v) {
          v = '';
        }
        stringA += sortArr[i] + '=' + v;
        if (j < sortArr.length - 1) {
          stringA += '&';
        }
        j++;
      }

      var key = '&key=Cartoon$2019&#';
      var sign = hexMD5(stringA + key);
      return {
        timestamp: timestamp,
        sign: sign.toUpperCase()
      };
    }

  }
})