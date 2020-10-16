// pages/Comics/pages/index/index.js

const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlBanner:apiUrl.apiUrl.comics.banner,
    homeComics:apiUrl.apiUrl.comics.homeComics,
    fnAjax:fnCon.fnAjax,
    banner:[],
    bannerCurrent: 0,
    swiperBanner:{
      dots:true,
      autoplay:true,
      interval:2000,
      duration:500,
      circular:true,
      indicatorActive:'#33a0ff'
    },
    comicsLists:[],
    searchKey:''
  },

  getBannerLists(){
    let url = this.data.urlBanner
    let data = {
      app_id:103,
      //app_version:'3.3.6',
      // citycode:360000,
      gender:1
    }
    this.data.fnAjax(url,data).then(res => {
      if(res.code == 200){
        let arr = []
        for(let i=0; i<res.data.length; i++){
            if(res.data[i].link.indexOf('app://')>-1){
              let obj = res.data[i];
              obj.vid = res.data[i].link.substring(6,res.data[i].link.length-1)
              obj.img = res.data[i].image + '!banner-800-x'
              arr.push(obj)
            }
        }
        this.setData({
          banner:arr
        })
      }
    })
  },

  getHomeComicsLists(){
    let url = this.data.homeComics
    let data = {
      gender:1
    }
    this.data.fnAjax(url,data).then(res => {
      if(res.status == 0){
        this.setData({
          comicsLists:res.data
        })
      }
    })
  },
  bindKeyInput(e){
    this.setData({
      searchKey: e.detail.value
    })
  },
  goList(){
    if(this.data.searchKey){
      let str = 'page=1&name=搜索"'+this.data.searchKey+'"结果&key='+this.data.searchKey
      wx.navigateTo({
        url:'/pages/Comics/pages/list/list?'+str
      })
    }else{
      wx.showToast({
        title: '请输入搜索关键字',
        icon: 'none',
        duration: 2000
      })
    }
  },
  goDetail(e){
    let id = e.currentTarget.dataset.id
    let goComics = fnCon.goComics
    goComics(id)
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
    this.getBannerLists()
    this.getHomeComicsLists()
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