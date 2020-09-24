const fnAjax = function (url, data) {
  return new Promise((resolved, rejected) => {
      let obj = {
          'Content-type': 'text/xml;charset=UTF-8'
      }

      if(url.indexOf('ios.xxjjappss.com')>-1){
        // let ip = getRandIP()
        // console.log(ip)
        // obj['CLIENT-IP'] = ip
        // obj['X-FORWARDED-FOR'] = ip
      }

      wx.request({
          url: url,
          method: 'GET',
          data: data,
          header: obj,
          success(res) {
              resolved(res.data)
          }
      })
  })
}

const goVideo = function (id) {
  wx.navigateTo({
      url: '/pages/Video/pages/detail/detail?id=' + id
  })
}

const goPlay = function (obj) {
  let str = JSON.stringify(obj)

  wx.navigateTo({
      url: '/pages/Video/pages/play/play?data=' + encodeURIComponent(str),
  })
}

function getRandIP() {
  var ip = ''
  for (var i = 0; i < 4; i++) {
      ip += '.' + Math.floor(Math.random() * 256) 
  }
  return ip.substring(1);
}


module.exports = {
  fnAjax,
  goVideo,
  goPlay
}