// pages/Novel/pages/index/index.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: apiUrl.apiUrl.novel.img,
    homeNovel: apiUrl.apiUrl.novel.home,
    homeNovel2: apiUrl.apiUrl.novel.home2,
    fnAjax: fnCon.fnAjax,
    nChannel: 0,
    data1: null,
    data2: null,
    searchKey: '',
    arrUrl: ['top', 'man', 'top', 'hot', 'week'],
    curType: {
      rankList: 'week',
      channel: 'man',
      category: 'hot'
    },
    typeInfo: {
      rankList: [
        {
          name: '周榜',
          field: 'week'
        },
        {
          name: '月榜',
          field: 'month'
        },
        {
          name: '总榜',
          field: 'total'
        }
      ],
      channel: [
        {
          name: '男频',
          field: 'man'
        },
        {
          name: '女频',
          field: 'lady'
        }
      ],
      category: [
        {
          name: '最热',
          field: 'hot'
        },
        {
          name: '推荐',
          field: 'commend'
        },
        {
          name: '完结',
          field: 'over'
        },
        {
          name: '收藏',
          field: 'collect'
        },
        {
          name: '新书',
          field: 'new'
        },
        {
          name: '评分',
          field: 'vote'
        }
      ]
    }
  },
  getHome() {
    let url = this.data.homeNovel
    let data = {}
    this.data.fnAjax(url, data).then(res => {
      this.setData({
        data1: res
      })
    })
  },
  getHome2() {
    let url = this.data.homeNovel2
    let data = {}
    this.data.fnAjax(url, data).then(res => {
      this.setData({
        data2: res
      })
    })
  },
  setChannel(e) {
    let n = e.currentTarget.dataset.num
    this.setData({
      nChannel: n
    })
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    let goNovel = fnCon.goNovel
    goNovel(id)
  },
  setType(e) {
    let field = e.currentTarget.dataset.field
    let key = e.currentTarget.dataset.key
    let arr = this.data.arrUrl
    if (key == 'rankList') {
      arr[4] = field
    } else if (key == 'channel') {
      arr[1] = field
    } else if (key == 'category') {
      arr[3] = field
    }

    this.setData({
      arrUrl: arr,
      curType: {
        rankList: arr[4],
        channel: arr[1],
        category: arr[3]
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHome();
    this.getHome2();
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
  onShareAppMessage: function () {}
})