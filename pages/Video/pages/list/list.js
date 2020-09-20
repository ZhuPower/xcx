// pages/Video/pages/list/list.js
const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    name:'',
    videoList:[],
    pagecount:0,
    page:1,
    isRefresh:false
  },
  fnTop(){
    if(this.data.searchKey){
      this.searchFn(1)
    }else{
      this.cshData(1)
    }
  },
  fnBotton(){
    let num = parseInt(this.data.page)+1
    if(num<=this.data.pagecount){
      wx.showLoading({
        title: '加载中...',
      })

      if(this.data.searchKey){
        this.searchFn(num)
      }else{
        this.cshData(num)
      }

    }else{
      wx.showToast({
        title: '已没有更多了',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  searchFn(num){
    let url = apiUrl.apiUrl.video.list
    let fnAjax = fnCon.fnAjax

    let data = {
      ac:'list',
      pg:num,
      wd:this.data.searchKey
    }

    fnAjax(url,data).then(res => {
      let arr_1 = []
      if(res.code == 1){
        this.setData({
          pagecount:res.pagecount,
          page:res.page
        })
        
        for(let i=0;i<res.list.length;i++){
          arr_1.push(res.list[i].vod_id)
        }

        let ids = arr_1.join(',')
        let data2 = {
          ac:'detail',
          pg:1,
          ids:ids
        }
        fnAjax(url,data2).then(res => {
          if(res.code == 1){
            let arr = []
    
            if(num > 1){
              arr = this.data.videoList
            }
    
            arr.push(...res.list)
    
            this.setData({
              videoList:arr,
              isRefresh:false
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  cshData(num){
    let url = apiUrl.apiUrl.video.list
    let fnAjax = fnCon.fnAjax

    let data = {
      ac:'detail',
      t:this.data.type,
      pg:num
    }

    fnAjax(url,data).then(res => {
      if(res.code == 1){
        let arr = []

        if(num > 1){
          arr = this.data.videoList
        }

        arr.push(...res.list)

        this.setData({
          page:res.page,
          pagecount:res.pagecount,
          videoList:arr,
          isRefresh:false
        })
        wx.hideLoading()
      }
    })
  },
  goDetail(e){
    let id = e.currentTarget.dataset.id
    let goVideo = fnCon.goVideo
    goVideo(id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type,
      page:options.page,
      name:decodeURIComponent(options.name)
    })

    if(options.key){
      this.setData({
        searchKey:options.key
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
    if(this.data.searchKey){
      this.searchFn(1)
    }else{
      this.cshData(1)
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