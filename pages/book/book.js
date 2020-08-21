// pages/book/book.js

import {
  hexMD5
} from "../../utils/md5.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestToken: '',
    bookList_1: [],
    bookList_2: [],
    bookList_3: [],
    bookList_4: [],
    bookList_5: [],
    bookList_6: [],
    typeArr: [],
    page: 1,
    typeId: 0,
    sexy: 0,
    status: 0,
    tname: 'u_temp_user_1'
  },


  //类别
  typeList: function () {
    let url = 'http://mhapi.spdchgj.com/3/cartoon/cartoonType/list'
    let data = {
      lang: 1
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  newRand: function (bookId, id) {
    let url = 'http://mhapi.spdchgj.com/2/cartoon/cartoon/newRand';
    let data = {
      bookId: parseInt(bookId),
      id: parseInt(id)
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },

  //列表
  cartoonLists: function () {
    let url = 'http://mhapi.spdchgj.com/3/cartoon/cartoon/lists';
    let data = {
      typeId: parseInt(this.data.typeId),
      lang: 1,
      sexy: parseInt(this.data.sexy),
      status: parseInt(this.data.status), //2完结，1连载
      pagesize: 20,
      page: parseInt(this.data.page)
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },

  //榜单
  recommendLists: function (ids) {
    let url = 'http://mhapi.spdchgj.com/3/cartoon/recommend/lists';
    let data = {
      ids: ids
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  //随机
  minListt: function () {
    let url = 'http://mhapi.spdchgj.com/3/cartoon/statiscartoon/minlist';
    let data = {
      num: 20,
      sortField: 'rate_order',
      sort: 1,
      lang: 1,
      page: 1
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  //模板登录
  isLogin2: function () {
    let url = 'http://mhapi.spdchgj.com/2/cartoon/tempuser/login'
    let data = {
      app: 1,
      tname: this.data.tname
    }

    return this.setApi(url, data).then(res => {
      return Promise.resolve(res)
    });
  },
  isLogin: function () {

    let url = 'http://mhapi.spdchgj.com/3/cartoon/user/login'
    let data = {
      phone: '18007027355',
      password: '123456asdf'
    }

    this.setApi(url, data);
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
          if (res.data.code == 0) {
            //console.log(res.data)
            resolved(res.data)
          }
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
  playlike: function (e) {
    let bookId = e.currentTarget.dataset['id'];
    // let typename = e.currentTarget.dataset['typename'];
    // let id = 0;

    // for(let i=0; i<this.data.typeArr.length; i++){
    //     if(typename == this.data.typeArr[i].typename){
    //       id = this.data.typeArr[i].id;
    //       break;
    //     }
    // }

    // this.newRand(bookId,id).then(res => {
    //   if(res.code == 0){
    //     wx.navigateTo({
    //       url: '/pages/rebook/rebook?bookId='+bookId+'&id='+id
    //     })
    //     console.log(res)
    //   }
    // })


    wx.navigateTo({
      url: '/pages/rebook/rebook?bookId=' + bookId
    })
  },
  randBtn: function () {
    this.minListt().then(res => {
      this.setData({
        bookList_5: res.data
      })
    })
  },
  setType: function (e) {
    let typeId = e.currentTarget.dataset['id'];
    let obj = {
      page: 1,
      typeId: typeId
    }

    this.setData(obj)
    this.cartoonLists().then(res => {
      this.setData({
        bookList_6: res.data
      })
    })
  },
  setSex: function (e) {
    let sexy = e.currentTarget.dataset['id'];
    let obj = {
      page: 1,
      sexy: sexy
    }

    this.setData(obj)
    this.cartoonLists().then(res => {
      this.setData({
        bookList_6: res.data
      })
    })
  },
  setStatus: function (e) {
    let status = e.currentTarget.dataset['id'];
    let obj = {
      page: 1,
      status: status
    }

    this.setData(obj)
    this.cartoonLists().then(res => {
      this.setData({
        bookList_6: res.data
      })
    })
  },
  moreBtn: function () {
    let page = this.data.page + 1;
    let obj = {
      page: page
    }

    this.setData(obj)
    this.cartoonLists().then(res => {
      let arr = this.data.bookList_6;
      arr.push(...res.data);
      this.setData({
        bookList_6: arr
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToke();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.isLogin2().then(res => {
      //console.log(res)
      if (res.code == 0) {
        this.typeList().then(res => {
          this.setData({
            typeArr: res.data
          })
        })

        this.recommendLists(2).then(res => {
          if (res.code == 0) {
            this.setData({
              bookList_1: res.data['2'].list
            })
          }
        })

        this.recommendLists(10).then(res => {
          if (res.code == 0) {
            this.setData({
              bookList_2: res.data['10'].list
            })
          }
        })

        this.recommendLists(3).then(res => {
          if (res.code == 0) {
            this.setData({
              bookList_3: res.data['3'].list
            })
          }
        })

        this.recommendLists(11).then(res => {
          if (res.code == 0) {
            this.setData({
              bookList_4: res.data['11'].list
            })
          }
        })

        this.minListt().then(res => {
          this.setData({
            bookList_5: res.data
          })
        })

        this.cartoonLists().then(res => {
          this.setData({
            bookList_6: res.data
          })
        })

        // this.fn_1().then(res => {
        //   console.log(res)
        // })
      }
    })


    // .then(res => {
    //   //console.log(res)
    // })
    
    // setTimeout(()=>{
      
    // },2000)


    // setTimeout(()=>{
    //   this.player(803, res => {
    //     console.log(res)
    //   })
    // },4000)


    // setTimeout(()=>{
    //   this.player(430, res => {
    //     console.log(res)
    //   })
    // },6000)



    // setTimeout(()=>{
    //   this.player(420, res => {
    //     console.log(res)
    //   })
    // },8000)


    // setTimeout(()=>{
    //   this.player(571, res => {
    //     console.log(res)
    //   })
    // },10000)

    // setTimeout(()=>{
    //   this.player(573, res => {
    //     console.log(res)
    //   })
    // },12000)


    // setTimeout(()=>{
    //   this.player(804, res => {
    //     console.log(res)
    //   })
    // },14000)

  },

  async player (vid,endFn) {
    let res = await this.isLogin2();
    if(res.code == 0){
      let url = 'http://vapi.yichuba.com/player'
      let data = {
        vid: parseInt(vid),
        tname: this.data.tname
      }
      wx.clearStorage();
      let res2 = await this.setApi(url, data);

      if(res2.code == 0){
        endFn && endFn(res2)
      }
    }
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