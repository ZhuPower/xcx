// pages/rebook/rebook.js
const hexMD5 = require('../../../../utils/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    nextid: '',
    previd: '',
    bookid: 0,
    cartoonId: 0,
    imgURL: ''
  },
  chapterWithNext: function (chapterId) {
    let url = 'http://mhapi.spdchgj.com/3/cartoon/chapter/chapterWithNext'
    let data = {
      chapterId: parseInt(chapterId),
      app: 1
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  getDomainByTypes: function () {
    let url = 'http://mhapi.spdchgj.com/2/cartoon/domain/getDomainByTypes'
    let data = {
      typeString: '1,8,10'
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  last: function (bookId) {
    let url = 'http://mhapi.spdchgj.com/3/cartoon/history/last'
    let data = {
      bookId: parseInt(bookId)
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  reback: function (bookId, id) {
    let url = 'http://mhapi.spdchgj.com/3/cartoon/positionback/reback'
    let data = {
      bookId: parseInt(bookId),
      id: parseInt(id)
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  setApi: function (url, data) {
    this.getToke();
    return new Promise((resolved, rejected) => {
      var signParams = this.signString(data);
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method: 'POST',
        data: data,
        header: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Access-Token': this.data.requestToken,
          'timestamp': signParams.timestamp,
          'sign': signParams.sign
        },
        success(res) {
          console.log(res.data)
          resolved(res.data)
        }
      })
    })
  },
  async getImgSrc (aImg) {
    let _this = this;
    let _aImg = [];
    
    for (let i = 0; i < aImg.length; i++) {
      await getBase64(aImg[i],i);
    }

    function getBase64 (sUrl,n){
      let url = _this.data.imgURL + '/' + sUrl.toLowerCase().replace('.jpg', '.html').replace('.png', '.html').replace('.gif', '.html');
      _this.getImg(url).then(res => {
          let str = res.replace(/\+/g, '*').replace(/\//g, '+').replace(/\*/g, '\/');
          str = str.substring(23);
          let json = {
            img: str
          };
          let data = JSON.stringify(json);
          let _json = JSON.parse(data);
          let _str = 'data:image/jpeg;base64,' + _json.img.replace(/[\r\n]/g, "");

          _aImg[n] = _str;

          _this.setData({
            imgArr: _aImg
          })
      })
        
    }
  },
  getImg: function (url) {
    return new Promise((resolved, rejected) => {
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        success(res) {
          resolved(res.data)
        }
      })
    })
  },
  signString: function (req) {
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
      if (!v && v != 0) {
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
      sign: sign.toString().toUpperCase()
    };
  },
  getToke: function () {
    var requestToken = wx.getStorageSync('token') || '';
    var refRequestToken = function () {
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

    this.setData({
      requestToken: refRequestToken()
    })
  },
  nextBtn: function () {
    if (this.data.nextid) {
      this.changeBook(this.data.nextid)
    }
  },
  preBtn: function () {
    if (this.data.previd) {
      this.changeBook(this.data.previd)
    }
  },
  changeBook: function (id) {
    console.log(id)
    wx.pageScrollTo({
      scrollTop: 0
    })

    this.chapterWithNext(id).then(res => {
      let title = ''
      if (res.data.id) {
        this.setData({
          nextid: res.data.nextid,
          previd: res.data.previd
        })

        title = res.data.book.title + res.data.name


        let aImg = Array.from(new Set(res.data.image));
        this.getImgSrc(aImg)
      } else {
        if (res.code == 0) {
          this.setData({
            nextid: res.data[0].nextid,
            previd: res.data[0].previd
          })

          title = res.data[0].book.title + res.data[0].name
          let aImg = Array.from(new Set(res.data[0].image));
          this.getImgSrc(aImg)
        }
      }

      wx.setNavigationBarTitle({
        title: title
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToke();
    this.getDomainByTypes().then(res => {
      if (res.code == 0) {
        var url2 = res.data[1]['8'][0];
        if (url2) {
          let str = url2.domain;
          let imgURL = ''
          if (str.substr(str.length - 1, 1) == "/") {
            imgURL = str.substr(0, str.length - 1);
          } else {
            imgURL = str;
          }
          this.setData({
            imgURL: imgURL
          })
        }
      }
    })

    if (options.bookId) {
      this.setData({
        bookid: options.bookId
      })

      this.last(options.bookId).then(res => {
        if (res.code == 0) {
          this.setData({
            nextid: res.data.nextid
          })

          let title = res.data.book.title + res.data.name
          wx.setNavigationBarTitle({
            title: title
          })

          let aImg = Array.from(new Set(res.data.image));
          this.getImgSrc(aImg)
        }
      })
    } else if (options.cartoonId) {
      this.setData({
        cartoonId: options.cartoonId
      })

      this.changeBook(options.cartoonId)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})