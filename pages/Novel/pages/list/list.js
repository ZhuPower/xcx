// pages/Novel/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Htab: 'hot',
    searchKey: '',
    name: '',
    url: '',
    type: 'list'
  },

  setHtab(e) {
    let type = e.currentTarget.dataset.type
    let arr = this.data.url
    arr[2] = type
    this.setData({
      Htab: type,
      url: arr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let arr = []
    if (options.type == 'more') {
      arr = options.url.substring(24, options.url.length - 12).split('/')
    } else if (options.type == 'category') {
      arr = ['Categories', options.id, 'hot']
    }

    if (options.type == 'more' || options.type == 'category') {
      this.setData({
        name: options.name,
        url: arr,
        type: options.type
      })
    } else if (options.type == 'search') {
      this.setData({
        name: options.name,
        searchKey: options.key
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