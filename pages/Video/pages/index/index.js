// pages/Video/pages/index/index.js

const apiUrl = require('../../../../utils/apiUrl')
const fnCon = require('../../../../utils/common')
//const oJson = require('../../../../utils/xml2Obj')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proxyUrl:apiUrl.apiUrl.proxyUrl,
    urlBanner:apiUrl.apiUrl.video.banner,
    homeVideo:apiUrl.apiUrl.video.homeVideo,
    fnAjax:fnCon.fnAjax,
    banner:[],
    videoLists:[],
    swiperBanner:{
      dots:true,
      autoplay:true,
      interval:2000,
      duration:500,
      circular:true,
      indicatorActive:'#33a0ff'
    },
    bannerCurrent: 0,
    classify:{
      movie:{
        m:'电影',
        n:1
      },
      tv:{
        m:'电视剧',
        n:2
      },
      acg:{
        m:'动漫',
        n:4
      },
      variety:{
        m:'综艺',
        n:3
      }
    },
    list:[],
    searchKey:''
  },
  goDetail(e){
    let id = e.currentTarget.dataset.id
    let goVideo = fnCon.goVideo
    goVideo(id,true)
  },
  bindKeyInput(e){
    this.setData({
      searchKey: e.detail.value
    })
  },
  goList(){
    if(this.data.searchKey){
      let str = 'type=-1&page=1&name=搜索"'+this.data.searchKey+'"结果&key='+this.data.searchKey
      this.setData({
        searchKey:''
      })
      wx.navigateTo({
        url: '/pages/Video/pages/list/list?'+str,
      })
    }else{
      wx.showToast({
        title: '请输入搜索关键字',
        icon: 'none',
        duration: 2000
      })
    }
    
  },

  getBannerLists(){
    let url = this.data.urlBanner
    this.data.fnAjax(url,{}).then(res => {
      //console.log(res)
      if(res.code == 200){
        this.setData({
          banner:res.data.list
        })
      }
    })
  },

  getHomeVideoLists(){
    let url = this.data.homeVideo
    this.data.fnAjax(url,{}).then(res => {
      if(res.code == 200){
        this.setData({
          videoLists:res.data
        })
      }
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

    // let fnAjax = fnCon.fnAjax;
    // let _this = this;
    

    // let data = {
    //   // ac:'detail', //detail videolist
    //   // //wd:'琉璃',
    //   // pg:1,
    //   // ids:92567

    //   //详情列表
    //   // ac:'videolist',
    //   // pg:1

    //   //搜索
    //   // ac:'list',
    //   // wd:'琉璃',
    //   // pg:1

    //   ac:'list',
    //   t:2
    // }

    //data = fnCon.getParameter()

    


    // let data = {}

    // fnAjax(this.data.videoUrl,data).then(res => {
    //   if(res.code == 1){
    //     let arr = []
    //     for(let i=0;i<this.data.videoType.level1.length;i++){
    //       for(let ii=0;ii<res.class.length;ii++){
    //         if(this.data.videoType.level1[i] == res.class[ii].type_id){
    //           arr.push(res.class[ii])
    //           break;
    //         }
    //       }
    //     }

    //     let obj = {
    //       classify:arr,
    //       pagecount:res.pagecount
    //     }
    //     this.setData(obj)

    //     this.getList(this.data.pagecount)
    //     // this.getList(this.data.pagecount-1)
    //     // this.getList(this.data.pagecount-2)
    //     // this.getList(this.data.pagecount-3)


    //     // let data2 = {
    //     //   ac:'videolist',
    //     //   pg:this.data.pagecount
    //     //   //pg:7,
    //     //   //h:24
    //     // }
    
    //     // fnAjax(this.data.videoUrl,data2).then(res => {
    //     //   if(res.code == 1){
    //     //     console.log(res)

    //     //     let arr3 = []
    //     //     arr3 = this.data.list
    //     //     for(let i=0; i<res.list.length; i++){
    //     //       for(let ii=0; ii<this.data.videoType.level2.length; ii++){
    //     //         if(this.data.videoType.level2[ii].indexOf(res.list[i].type_id)>-1){
    //     //           if(arr3[ii]){
    //     //             arr3[ii].push(res.list[i])
    //     //           }else{
    //     //             arr3[ii] = []
    //     //             arr3[ii].push(res.list[i])
    //     //           }
    //     //         }
    //     //       }
    //     //     }

    //     //     let obj = {
    //     //       list:arr3,
    //     //     }
    //     //     this.setData(obj)
    //     //   }
    //     // })
    //   }
    // })




    this.getBannerLists();
    this.getHomeVideoLists();
  },
  
  // getList(num){
  //   let fnAjax = fnCon.fnAjax;

  //   let data2 = {
  //     ac:'videolist',
  //     pg:num
  //   }

  //   fnAjax(this.data.videoUrl,data2).then(res => {
  //     if(res.code == 1){
  //       let arr3 = []

  //       arr3 = this.data.list

  //       for(let i=0; i<res.list.length; i++){

  //         for(let ii=0; ii<this.data.videoType.level2.length; ii++){

  //           if(this.data.videoType.level2[ii].indexOf(res.list[i].type_id)>-1){

  //             if(arr3[ii]){
  //               arr3[ii].push(res.list[i])
  //             }else{
  //               arr3[ii] = []
  //               arr3[ii].push(res.list[i])
  //             }

  //           }
  //         }
  //       }

  //       let obj = {
  //         list:arr3,
  //       }
        
  //       this.setData(obj)

  //       console.log(this.data.list)
  //     }
  //   })
  // },

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