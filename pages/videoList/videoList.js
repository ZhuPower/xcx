// pages/videoList/videoList.js

import {
  hexMD5
} from "../../utils/md5.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagecount:1,
    page:1,
    type:13,
    key:'最新片源',
    catelist:[],
    tagsList:[
      '高清无码',
      '偷拍自拍',
      '日韩女优',
      '欧美激情',
      '成人动漫',
      '今日网红',
      '经典三级',
      '麻豆专区',
      '韩国演艺圈',
      '网红主播',
      '台湾特辑',
      '明星换脸',
      '女教师辅导',
      '最新片源',
      'H动漫',
      '中文字幕',
      '重磅热播',
      '剧情',
      '国产高清',
      '大神专区',
      '按摩桑拿',
      '不雅视频',
      'OL',
      '韩国女主播',
      '有码',
      '无码'
    ]
  },
  getList(){
    let url = 'http://app.xjlb6.com/api.php/app_2/typeSearch'
    let data = {
      uid:11425432,
      limit:20,
      page:this.data.page
    }
    if(this.data.type<7){
      data['vod_big_class'] = this.data.key
    }else{
      data['vod_class'] = this.data.key
    }

    this.setApi(url,data).then(res => {
      let arr = []
      if(this.data.page == 1){
        arr = []
      }else{
        arr = this.data.catelist
      }

      if(res.list.length>0){
        arr.push(...res.list)
      }

      this.setData({
        catelist:arr,
        pagecount:res.pagecount
      })

    })
  },
  changeTag(e){
    let key = e.currentTarget.dataset['name'];
    let index = e.currentTarget.dataset['index'];
    this.setData({
      page:1,
      key:key,
      type:parseInt(index)
    })
    this.getList();
  },
  moreBtn(){
    let page = this.data.page+1
    if(page<=this.data.pagecount){
      this.setData({
        page:page
      })
      this.getList();
    }
  },

  setApi: function (url, data) {
    return new Promise((resolved, rejected) => {
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method: 'GET',
        data: data,
        success(res) {
          resolved(res.data)
        }
      })
    })
  },

  playlike:function(e){
    let vid = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '/pages/video2/video2?vid=' + vid
    })
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
    this.getList();
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