// pages/Video/pages/detail/detail.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    data:null,
    nTab:0,
    playList:[]
  },

  setTab(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      nTab:parseInt(index)
    })
  },
  toPlay(e){
    let obj = e.currentTarget.dataset
    let goPlay = fnCon.goPlay
    goPlay(obj)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    let url = apiUrl.apiUrl.video.list
    let fnAjax = fnCon.fnAjax

    let data = {
      ac:'detail',
      ids:this.data.id
    }

    fnAjax(url,data).then(res => {
      
      if(res.code == 1){
        this.setData({
          data:res.list[0]
        })

        let arr1 = this.data.data.vod_play_url.split('#')
        let arr2 = []
        for(let i=0;i<arr1.length;i++){
          let arr3 = arr1[i].split('$')
          arr2.push(arr3)
        }

        this.setData({
          playList:arr2
        })
      }
    })
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