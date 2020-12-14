const Base64 = require('./base64')
const apiUrl = require('../utils/apiUrl')
const X2JS = require('../x2js/we-x2js');
const HtmlToJson = require('../wxParse/html2json');
const CryptoJS = require('../utils/Crypto');
import { evaluate } from '../utils/eval5.js'

const fnAjax = function (url, data, method, type) {
  return new Promise((resolved, rejected) => {
    let obj = {
      'Content-type': 'text/xml;charset=UTF-8'
    }
    let isLoading = true

    if (typeof type == 'object') {
      Object.assign(obj, type)
    } else if (typeof type == 'boolean') {
      if (type) {
        isLoading = false
      }
    } else {
      if (method == 'POST') {
        if (type) {
          obj['Content-type'] = type
        }
        //application/x-www-form-urlencoded
      }
    }

    if (url.indexOf('https://www.ehvip.cn') > -1) {
      obj['cookie'] = 'user_id=8754; login_status=ok; login_key=261936dda6b290ca28145e6c981e3ca6; path=xcx; path_tmp=xcx'
    }

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
    if (isLoading) {
      wx.showLoading({
        title: '加载中...',
      })
    }


    if (url) {
      wx.request({
        url: isUrl ? url : apiUrl.apiUrl.proxyUrl,
        method: method || 'GET',
        data: data,
        header: obj,
        success(res) {
          wx.hideLoading()
          if (typeof res.data == 'string') {
            var num = res.data.indexOf('<?xml');
            if (num > -1) {
              var str = res.data.substring(num);
              var x2js = new X2JS();
              var json = x2js.xml2js(str);
              resolved(json)
            } else if (res.data.indexOf('<script type="text/javascript" src="//iszzj.com/"></script') > -1) {
              let num = res.data.indexOf('{"code":')
              let str = res.data.substring(num)
              let obj = JSON.parse(str)
              resolved(obj)
            } else if (url.indexOf('https://i.y.qq.com') > -1) {
              resolved(res.data)
            } else if (url.indexOf('https://scxs.pysmei.com/book/') > -1) {
              let str = res.data.replace(/,]/ig, "]");
              let obj = JSON.parse(str)
              resolved(obj)
            } else {
              resolved(res.data)
            }
          } else {
            resolved(res.data)
          }
        }
      })
    }
  })
}

const goVideo = function (id) {
  if (id) {
    wx.navigateTo({
      url: '/pages/Video/pages/detail/detail?id=' + id
    })
  }
}

const goPlay = function (obj, b) {
  obj['isApp'] = b
  let str = JSON.stringify(obj)

  wx.navigateTo({
    url: '/pages/Video/pages/play/play?data=' + encodeURIComponent(str),
  })
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

const runGetData = function (arr, obj, oJson, b, endFn) {
  let url = apiUrl.apiUrl.proxyUrl

  for (let i = 0; i < arr.length; i++) {

    if (arr[i].url) {
      let data = {
        apiUrl: arr[i].url
      }

      Object.assign(data, arr[i].reqData)

      if (arr[i].reqFun) {
        evaluate(arr[i].reqFun, {
          that: obj,
          par: data,
          obj: arr[i],
          en,
          Base64,
          setInterval,
          clearInterval,
          console
        })
      }

      if (!arr[i].proxy) {
        url = arr[i].url
        delete data.apiUrl
      }

      if (b) {
        if (arr[i].isScroll) {
          ajaxFn(url, data, arr, i, endFn);
        }
      } else {
        ajaxFn(url, data, arr, i, endFn);
      }


    } else if (arr[i].runFun) {
      evaluate(arr[i].runFun, {
        that: obj,
        oJson,
        fnAjax,
        Base64,
        setInterval,
        clearInterval,
        console
      })
    }
  }

  function ajaxFn(url, data, arr, i, endFn) {
    fnAjax(url, data, arr[i].reqMet, arr[i].reqHead).then(res => {
      if (arr[i].reqType == 'str') {
      } else if (arr[i].reqType == 'html') {
        var html2json = HtmlToJson.html2json;
        var json = html2json(res, 'html');
        evaluate(arr[i].strFun, {
          that: obj,
          Base64,
          res: json,
          endFn,
          fnAjax,
          getNodes,
          setInterval,
          clearInterval,
          console
        })

      } else if (arr[i].reqType == 'json') {
        evaluate(arr[i].strFun, {
          that: obj,
          de,
          Base64,
          res,
          endFn,
          fnAjax,
          setInterval,
          clearInterval,
          console
        })
      }
    })
  }

  function en(str) {
    var Ze = CryptoJS.enc.Utf8.parse("625202f9149hello");
    var He = CryptoJS.enc.Utf8.parse("5efd3f6060ehello");
    var t = CryptoJS.enc.Utf8.parse(str);
    var i = CryptoJS.AES.encrypt(t, Ze, { iv: He, padding: CryptoJS.pad.Pkcs7 });
    var n = i.ciphertext.toString().toUpperCase();
    return n;
  }

  function de(str) {
    var Ze = CryptoJS.enc.Utf8.parse("625202f9149hello");
    var He = CryptoJS.enc.Utf8.parse("5efd3f6060ehello");
    var t = CryptoJS.enc.Hex.parse(str);
    var i = CryptoJS.enc.Base64.stringify(t);
    var n = CryptoJS.AES.decrypt(i, Ze, { iv: He, padding: CryptoJS.pad.Pkcs7 });
    return n.toString(CryptoJS.enc.Utf8);
  }


  function getNodes(obj, str) {
    let arr = str.split('.')
    for (let i = 0; i < arr.length; i++) {
      let _obj = obj.nodes[arr[i]]
      obj = _obj;
    }
    return obj;
  }
}

const getSource = function (appData, type, key, obj, oJson, b, endFn) {
  let arr = null
  let nIndex = appData.globalData['n' + type]
  let num = appData.globalData.sourceData[type][nIndex].muban
  if (num || num == 0) {
    arr = appData.globalData.sourceData.muban[num][key];
    let url = appData.globalData.sourceData[type][nIndex].url
    if (key != 'toPlay') {
      arr[0].url = url
    }
  } else {
    arr = appData.globalData.sourceData[type][nIndex][key];
  }
  runGetData(arr, obj, oJson, b, endFn);
}


module.exports = {
  fnAjax,
  goVideo,
  goPlay,
  goComics,
  goComicCon,
  goNovel,
  goNovelCon,
  goMusic,
  getSource
}