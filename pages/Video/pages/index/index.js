// pages/Video/pages/index/index.js

const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    lbID:{
      aID:[1,2,3,4,41,42,43,49,20,19],
      aid2:[
        [5,6,7,8,9,10,11],
        [12,13,14,15,16,17,18,48,54],
        [3],
        [39,40,47],
        [41],
        [42],
        [43],
        [51,52,53],
        [20],
        [19]
      ]
    },
    classify:[],
    list:[]
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
    // wx.showLoading({
    //   title: '加载中',
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let url = apiUrl.apiUrl.video.list
    let fnAjax = fnCon.fnAjax

    let data = {
      ac:'list'
    }

    fnAjax(url,data).then(res => {
      if(res.code == 1){
        let arr = []
        for(let i=0;i<this.data.lbID.aID.length;i++){
          for(let ii=0;ii<res.class.length;ii++){
            if(this.data.lbID.aID[i] == res.class[ii].type_id){
              arr.push(res.class[ii])
              break;
            }
          }

          let data = {
            ac:'detail',
            t:this.data.lbID.aid2[i][0]
          }

          fnAjax(url,data).then(res => {
             if(res.code == 1){
               let arr = this.data.list
               arr[i] = res.list
               let obj = {
                 list:arr
               }
               this.setData(obj)
             }
           })
        }
        
        let obj = {
          classify:arr
        }
        this.setData(obj)
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