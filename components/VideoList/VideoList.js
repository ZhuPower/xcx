// components/VideoList/VideoList.js
const apiUrl = require('../../utils/apiUrl')
const fnCon = require('../../utils/common')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:Number,
    searchKey:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoList:[],
    pagecount:0,
    page:1,
    isRefresh:false
  },
  observers:{
    'type':function(str){
      if(str>0){
        if(this.data.searchKey){
          this.searchFn(1)
        }else{
          this.cshData(1)
        }
      }
    }
  },

  ready(){
    if(this.data.searchKey){
      this.searchFn(1)
    }else{
      this.cshData(1)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    }
  }
})
