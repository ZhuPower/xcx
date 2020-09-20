
const fnAjax = function (url,data) {
  return new Promise((resolved, rejected) => {
    let obj = {
      'Content-type': 'text/xml;charset=UTF-8'
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

const goVideo = function(id){
  wx.navigateTo({
    url: '/pages/Video/pages/detail/detail?id='+id
  })
}

const goPlay = function(obj){
  let str = JSON.stringify(obj)
  
  wx.navigateTo({
    url: '/pages/Video/pages/play/play?data='+encodeURIComponent(str),
  })
}


module.exports = {
  fnAjax,
  goVideo,
  goPlay
}