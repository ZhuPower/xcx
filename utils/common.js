const Base64 = require('./base64')

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

      wx.request({
          url: url,
          method: method || 'GET',
          data: data,
          header: obj,
          success(res) {
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
  let oParameter = {
    apiUrl:'https://api.927jx.com/wabzj/api.php',
    url:url,
    referer:Base64.encode('https://api.927jx.com/wab/?url='+url),
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