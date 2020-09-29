// pages/Video/pages/play/play.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc:'',
    playList:[],
    nIndex:0,
    title:'',
    isApp:true,
    url:'',
    fnAjax:fnCon.fnAjax
  },
  Play(e){
    let obj = e.currentTarget.dataset
    this.setData({
      nIndex:obj.index,
      videoSrc:obj.url
    })

    wx.setNavigationBarTitle({
      title: `${this.data.title} ${obj.name}` 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.data)
    let data = JSON.parse(decodeURIComponent(options.data))
    console.log(data)

    if(data.isApp){
      url = apiUrl.apiUrl.video.videoDetail
    }else{
      url = app.globalData.nowSource.url
    }

    this.setData({
      videoSrc:data.url,
      nIndex:data.index,
      title:data.title,
      isApp:data.isApp,
      url:url
    })

    wx.setNavigationBarTitle({
      title: `${data.title} ${data.name}` 
    })


    let url = this.data.url
    let fnAjax = this.data.fnAjax
    
    if(this.data.isApp){

      let data2 = {
        index:'0',
        vid:data.id
      }

      fnAjax(url,data2).then(res => {
        if(res.code == 200){
          this.setData({
            playList:res.data.srcList
          })
        }
      })

    }else{
        let data2 = {
          ac:'detail',
          ids:data.id
        }

        fnAjax(url,data2).then(res => {
          
          if(res.code == 1){

            let arr1 = res.list[0].vod_play_url.split('#')
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