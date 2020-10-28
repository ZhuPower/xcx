const Base64 = require('./base64')
const apiUrl = require('../utils/apiUrl')
const X2JS = require('../x2js/we-x2js');
const CryptoJS = require('../utils/Crypto')

const fnAjax = function (url, data, method, type) {
  return new Promise((resolved, rejected) => {
    let obj = {
      'Content-type': 'text/xml;charset=UTF-8'
    }

    if (url.indexOf('aa.ahy1.top') > -1) {
      obj['secret'] = '03ebA9350dhGfUxudHkJtinfQwbvq+dCfNdDJv6dgF2YEtq0HZpU713NeMoT'
    }

    if (method == 'POST') {
      if (type) {
        obj['Content-type'] = type
      }
      //application/x-www-form-urlencoded
    }

    let isUrl = false

    //console.log(url)
    if (url == apiUrl.apiUrl.proxyUrl) {
      //data.apiUrl = url
    } else {
      isUrl = true
    }

    //console.log(url)

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
        if (typeof res.data == 'string') {
          if (res.data.indexOf('<?xml') == 0) {
            var x2js = new X2JS();
            var json = x2js.xml2js(res.data);
            resolved(json)
          }
        } else {
          resolved(res.data)
        }
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

function getParameter(url, num) {
  let oParameter = {}
  switch (num) {
    case 0:
      oParameter = getParameter0(url)
      break;
    case 1:
      oParameter = getParameter1(url)
      break;
    case 2:
      oParameter = getParameter2(url)
      break;
    case 3:
      oParameter = getParameter3(url)
      break;
  }

  return oParameter;
}


function getParameter0(url) {
  var _str1 = CryptoJS.enc.Utf8.parse(url);
  var _obj = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  };
  var _str2 = CryptoJS.enc.Utf8.parse('your@menxflv@com');
  var _str = CryptoJS.AES.encrypt(_str1, _str2, _obj);
  var _str = _str.toString();
  let data = {
    url: url,
    vkey: _str
  }
  let oParameter = {
    url: apiUrl.apiUrl.parsing[0],
    data: data
  }

  return oParameter;
}

function getParameter1(url) {
  let _url = apiUrl.apiUrl.parsing[1]
  let data = {
    apiUrl: _url,
    url: url,
    referer: Base64.encode(_url + '?url=' + url),
    ref: 0,
    time: parseInt(new Date().getTime() / 1000),
    type: '',
    other: Base64.encode(url)
  }

  let oParameter = {
    url: apiUrl.apiUrl.proxyUrl,
    data: data
  }

  return oParameter;
}

function getParameter2(url) {
  let _url = apiUrl.apiUrl.parsing[2]
  let data = {
    apiUrl: _url,
    url: url,
    referer: Base64.encode(_url + '?url=' + url),
    ref: 0,
    time: parseInt(new Date().getTime() / 1000),
    type: '',
    other: Base64.encode(url)
  }

  let oParameter = {
    url: apiUrl.apiUrl.proxyUrl,
    data: data
  }

  return oParameter;
}

function getParameter3(url) {
  let data = {
    url: url
  }

  let oParameter = {
    url: apiUrl.apiUrl.parsing[3],
    data: data
  }

  return oParameter;
}

function getParameter4(url) {
  let data = {
    apiUrl: apiUrl.apiUrl.parsing[4],
    url: url,
    time: parseInt(new Date().getTime() / 1000),
    other: Base64.encode(url)
  }

  let oParameter = {
    url: apiUrl.apiUrl.proxyUrl,
    data: data
  }


  return oParameter;
}



const goComics = function (id) {
  wx.navigateTo({
    url: '/pages/Comics/pages/detail/detail?id=' + id
  })
}

const goComicCon = function (chapterId, comicId, title, index) {
  wx.navigateTo({
    url: '/pages/Comics/pages/content/content?chapterId=' + chapterId + '&comicId=' + comicId + '&title=' + title + '&index=' + index
  })
}


module.exports = {
  fnAjax,
  goVideo,
  goPlay,
  getParameter,
  goComics,
  goComicCon
}