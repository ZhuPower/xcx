// pages/Video/pages/detail/detail.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    data:null,
    nTab:0,
    playList:[],
    isApp:true,
    url:'',
    fnAjax:fnCon.fnAjax,
    yList:[],
    aarYlist:[]
  },

  setTab(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      nTab:parseInt(index)
    })
  },
  toPlay(e){
    let obj = e.currentTarget.dataset
    let app = this.data.isApp
    let goPlay = fnCon.goPlay
    goPlay(obj,app)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let b = (options.isApp == 'true' ? true : false)
    let url = ''

    if(b){
      url = apiUrl.apiUrl.video.videoDetail
    }else{
      url = app.globalData.nowSource.url
    }

    this.setData({
      id:options.id,
      isApp:b,
      url:url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    let url = this.data.url
    let fnAjax = this.data.fnAjax
    let data = {}

    if(this.data.isApp){
      data = {
        index:'0',
        vid:this.data.id
      }

      fnAjax(url,data).then(res => {
        if(res.code == 200){
          this.setData({
            data:res.data
          })
        }else{
          wx.showModal({
            content: res.msg,
            showCancel:false,
            success (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: getCurrentPages().length-1
                })
              }
            }
          })
        }
      })

    }else{
      data = {
        ac:'detail',
        ids:this.data.id
      }

      fnAjax(url,data).then(res => {
        if(res.code == 1){
          this.setData({
            data:res.list[0]
          })
          let arr1 = []
          let arr2 = []
          let arr3 =[]
          if(this.data.data.vod_play_note){
            arr1 = this.data.data.vod_play_from.split(this.data.data.vod_play_note)
            arr2 = this.data.data.vod_play_url.split(this.data.data.vod_play_note)
          }else{
            arr2 = [this.data.data.vod_play_url]
          }

          for(let i=0; i<arr2.length; i++){
            let arr4 = arr2[i].split('#')
            let arr5 = []

            for(let ii=0;ii<arr4.length;ii++){
              let arr6 = arr4[ii].split('$')
              
              if(ii==0){
                if(arr6[1].indexOf('.m3u8')>-1 || arr6[1].indexOf('.mp4')>-1){

                }else{
                  arr1.splice(i,1);
                  break;
                }
              }
              arr5.push(arr6)
            }
            if(arr5.length>0){
              arr3.push(arr5)
            }
          }
  
          this.setData({
            yList:arr1,
            aarYlist:arr3,
            playList:arr3[0]
          })
        }
      })
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