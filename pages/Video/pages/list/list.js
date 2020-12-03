// pages/Video/pages/list/list.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oData: {},
    name: '',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let obj = null;
    if (options.data) {
      obj = JSON.parse(decodeURIComponent(options.data))
    } else {
      obj = options;
    }

    this.setData({
      oData: obj,
      name: obj.name
    })


    // if (options.key) {
    //   let url = app.globalData.nowSource.url
    //   this.setData({
    //     searchKey: decodeURIComponent(options.key)
    //   })
    // }

    wx.setNavigationBarTitle({
      title: `${obj.name}列表`
    })

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