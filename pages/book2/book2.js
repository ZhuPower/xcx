// pages/book2/book2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticket:''
  },

  chapter:function(bookId,chapterId){
    let data = 'bookId='+bookId+'&chapterId='+chapterId
    let url = 'https://www.xxmh228.com/home/query/chapter?'+data

    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
  },
  setApi: function (url,data) {
    return new Promise((resolved, rejected) => {
      // var signParams = this.signString(data);
      let obj = {
        'Content-type': 'text/plain;charset=UTF-8'
      }
      if(this.data.ticket){
        obj.ticket = this.data.ticket
      }
      
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method: 'POST',
        data: data,
        header: obj,
        success(res) {
          resolved(res.data)
        }
      })
    })
  },
  login:function(){
    let data = 'userName=tlz139&password=123456asdf'
    let url = 'https://www.xxmh228.com/user/login?'+data
    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
  },
  getTicket:function(){
    let data = ''
    let url = 'https://www.xxmh228.com/user/detail?ticket='
    return this.setApi(url,data).then(res => {
      return Promise.resolve(res)
    });
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
    this.getTicket().then(res => {
      this.setData({
        ticket: res.content.token
      })
      this.login().then(res => {
        console.log(res)
      })
      // this.chapter(1513,233480).then(res => {
      //   console.log(res)
      // })
    });
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