// pages/Video/pages/list/list.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyType:0,
    searchKey:'',
    name:'',
    url:'',
    isApp:true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classifyType:options.type,
      name:decodeURIComponent(options.name)
    })
  
    if(options.key){
      let url = app.globalData.nowSource.url
      this.setData({
        searchKey:decodeURIComponent(options.key),
        url:url,
        isApp:false
      })
    }

    wx.setNavigationBarTitle({
      title: `${this.data.name}列表` 
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