const Base64 = require('./base64')
const apiUrl = require('../utils/apiUrl')

const fnAjax = function (url, data, method, type) {
  return new Promise((resolved, rejected) => {
      let obj = {
        'Content-type': 'text/xml;charset=UTF-8'
      }

      if(url.indexOf('aa.ahy1.top')>-1){
        obj['secret'] = '03ebA9350dhGfUxudHkJtinfQwbvq+dCfNdDJv6dgF2YEtq0HZpU713NeMoT'
      }

      if(method == 'POST'){
        if(type){
          obj['Content-type'] = type
        }
        //application/x-www-form-urlencoded
      }

      let isUrl = false

      if(url.indexOf('https://aa.ahy1.top')>-1 ||url.indexOf('https://shuapi.jiaston.com')>-1 || url == apiUrl.apiUrl.proxyUrl){
        isUrl = true
      }else{
        data.apiUrl = url
      }


      //data.apiUrl = url
      wx.showLoading({
        title: '加载中...',
      })

      wx.request({
          url: isUrl ? url : apiUrl.apiUrl.proxyUrl,
          method: method || 'GET',
          data: data,
          header: obj,
          success(res) {
            wx.hideLoading()
            resolved(res.data)
          }
      })
  })
}

const goVideo = function (id, b) {
  wx.navigateTo({
      url: '/pages/Video/pages/detail/detail?id=' + id + '&isApp=' + b
  })
}

const goPlay = function (obj, b) {
  obj['isApp'] = b
  let str = JSON.stringify(obj)

  wx.navigateTo({
      url: '/pages/Video/pages/play/play?data=' + encodeURIComponent(str),
  })
}

function getParameter(url) {
  let _url = 'https://api.927jx.com/wabzj/api.php'
  //let _url = 'http://5.nmgbq.com/2/api.php'
  let oParameter = {
    apiUrl:_url,
    url:url,
    referer:Base64.encode(_url+'?url='+url),
    ref:0,
    time:parseInt(new Date().getTime()/1000),
    type:'',
    other:Base64.encode(url)
  }

  return oParameter;
}


module.exports = {
  fnAjax,
  goVideo,
  goPlay,
  getParameter
}