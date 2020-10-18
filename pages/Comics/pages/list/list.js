// pages/Comics/pages/list/list.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:1,
    searchKey:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let obj = {
      bookId:options.book_id,
      searchKey:options.key
    }
    console.log(options.key)
    console.log(options.key == '092654')
    if(options.key == '092654'){
      
      app.globalData.isShow = true
    }

    this.setData(obj)

    wx.setNavigationBarTitle({
      title: options.name 
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