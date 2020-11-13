const Base64 = require('./base64')
const parse1717 = require('./parse1717')
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
    obj['cookie'] = 'user_id=8754; login_status=ok; login_key=261936dda6b290ca28145e6c981e3ca6; path=xcx; path_tmp=xcx'
    let isUrl = false

    //console.log(url)
    if (url == apiUrl.apiUrl.proxyUrl) {
      //data.apiUrl = url
    } else if (url.indexOf('https://') != 0) {
      isUrl = false
      data.apiUrl = url
    } else {
      isUrl = true
    }

    //console.log(url)

    //data.apiUrl = url
    wx.showLoading({
      title: '加载中...',
    })

    if (url) {
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
            } else if (res.data.indexOf('<script type="text/javascript" src="//iszzj.com/"></script') > -1) {
              let num = res.data.indexOf('{"code":')
              let str = res.data.substring(num)
              let obj = JSON.parse(str)
              resolved(obj)
            } else if (url.indexOf('https://i.y.qq.com') > -1) {
              resolved(res.data)
            } else {
              let str = res.data.replace(/,]/ig, "]");
              let obj = JSON.parse(str)
              resolved(obj)
            }
          } else {
            resolved(res.data)
          }
        }
      })
    }
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
  //console.log(url, num)
  let oParameter = {}

  if (url.indexOf('www.mgtv.com') > -1 && parseInt(num) == 4) {
    num = -1
  }
  switch (parseInt(num)) {
    case -1:
      oParameter = getParameter_mg(url)
      break;
    case 0:
      oParameter = getParameter0(url, parseInt(num))
      break;
    case 1:
      oParameter = getParameter1(url, parseInt(num))
      break;
    case 2:
      oParameter = getParameter2(url, parseInt(num))
      break;
    case 3:
      oParameter = getParameter3(url, parseInt(num))
      break;
    case 4:
      oParameter = getParameter4(url, parseInt(num))
      break;
  }

  return oParameter;
}


function getParameter0(url, nIndex) {
  let _url = apiUrl.apiUrl.parsing[nIndex].url
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

function getParameter1(url, nIndex) {
  let data = {
    apiUrl: apiUrl.apiUrl.parsing[nIndex].url,
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

function getParameter2(url, nIndex) {
  let data = {
    apiUrl: apiUrl.apiUrl.parsing[nIndex].url,
    url: url
  }

  let oParameter = {
    url: apiUrl.apiUrl.proxyUrl,
    data: data
  }

  return oParameter;
}

function getParameter3(url, nIndex) {
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
    url: apiUrl.apiUrl.parsing[nIndex].url,
    data: data
  }

  return oParameter;
}


function getParameter4(url, nIndex) {
  let _url = 'https://1717.ntryjd.net/1717yun/'
  let _data = {
    url: url
  }

  return new Promise((resolved, rejected) => {
    wx.request({
      url: _url,
      data: _data,
      header: {
        'Content-type': 'text/xml;charset=UTF-8'
      },
      success(res) {
        let time = '';
        let keys = '';
        let key = '';

        let str1 = res.data;
        let num1 = str1.indexOf('var time = ')
        let str2 = str1.substring(num1)
        let num2 = str2.indexOf('\';')
        time = str2.substring(12, num2)

        let num3 = str2.indexOf('\'keys\':\'')
        let str3 = str2.substring(num3)
        let num4 = str3.indexOf('\',')
        keys = str3.substring(8, num4)

        let num5 = str3.indexOf('\'key\':\'')
        let str4 = str3.substring(num5)
        let num6 = str4.indexOf('\',')
        key = str4.substring(7, num6)

        let obj = parse1717(time)

        let data = {
          url: url,
          time: time,
          other: Base64.encode(url),
          token: obj.token,
          keys: keys,
          keep: obj.keep,
          key: key
        }

        let oParameter = {
          url: apiUrl.apiUrl.parsing[nIndex].url,
          data: data
        }

        resolved(oParameter)
      }
    })
  })
}


function getParameter_mg(url) {
  let data = {
    url: url,
    danmu: 0
  }
  let oParameter = {
    url: 'https://plamgtvcache.ccyjjd.com/mgtv666/api.php',
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


const goNovel = function (id) {
  wx.navigateTo({
    url: '/pages/Novel/pages/detail/detail?id=' + id
  })
}

const goNovelCon = function (chapterId, novelId) {
  wx.navigateTo({
    url: '/pages/Novel/pages/content/content?chapterId=' + chapterId + '&novelId=' + novelId
  })
}

const goMusic = function (id, mid) {
  wx.navigateTo({
    url: '/pages/Music/pages/detail/detail?id=' + id + '&mid=' + mid
  })
}



module.exports = {
  fnAjax,
  goVideo,
  goPlay,
  getParameter,
  goComics,
  goComicCon,
  goNovel,
  goNovelCon,
  goMusic
}