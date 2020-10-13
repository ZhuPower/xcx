// components/VideoList/VideoList.js
const apiUrl = require('../../utils/apiUrl')
const fnCon = require('../../utils/common')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:Number,
    searchKey:String,
    isApp:Boolean,
    sourceUrl: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoList:[],
    pagecount:0,
    page:1,
    isRefresh:false,
    url:'',
    fnAjax:fnCon.fnAjax,
    isNext:true
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
    },
    'url':function(str){
      if(this.data.url != str){
        this.setData({
          url:str
        })
  
        if(this.data.url){
          if(this.data.searchKey){
            this.searchFn(1)
          }else{
            this.cshData(1)
          }
        }
      }
    },
    'sourceUrl':function(str){
      this.setData({
        url:str,
        page:1
      })

      if(this.data.searchKey){
        this.searchFn(1)
      }else{
        this.cshData(1)
      }
    }
  },

  ready(){
    if(this.data.isApp){
      this.setData({
        url:apiUrl.apiUrl.video.VideoLists
      })
    }else{
      this.setData({
        url:this.data.sourceUrl
      })
    }

    if(this.data.url){
      if(this.data.searchKey){
        this.searchFn(1)
      }else{
        this.cshData(1)
      }
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
      if(this.data.isNext){
        this.setData({
          isNext:false
        })

        let num = parseInt(this.data.page)+1
        if(num<=this.data.pagecount){
          // wx.showLoading({
          //   title: '加载中...',
          // })
    
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
      }
    },
    searchFn(num){
     let url = this.data.url
     let fnAjax = this.data.fnAjax
  
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
                isRefresh:false,
                isNext:true
              })
              wx.hideLoading()
            }
          })
        }
      })
    },
    cshData(num){
      let url = this.data.url
      let fnAjax = this.data.fnAjax
      let data = {}

      if(this.data.isApp){
        data = {
          limit:20,
          area: "-1",
	        year: "全部",
          type_id:this.data.type,
          page:num
        }
      }else{
        data = {
          ac:'detail',
          t:this.data.type,
          pg:num
        }
      }
  

      fnAjax(url,data).then(res => {
        if(res.code == 1 || res.code == 200 || res.status == 200){
          let arr = []
  
          if(num > 1){
            arr = this.data.videoList
          }
     
          if(res.data){
            if(res.data.list){
              arr.push(...res.data.list)
            }else{
              arr.push(...res.data)
            }
          }else if(res.list){
            arr.push(...res.list)
          }

          let obj = {
            videoList:arr,
            isNext:true,
            isRefresh:false
          }

          if(res.page){
            if(res.page.pageindex){
              obj['page'] = res.page.pageindex
              obj['pagecount'] = res.page.pagecount
            }else{
              obj['page'] = res.page
              obj['pagecount'] = res.pagecount
            }
          }else{
            if(res.data){
              if(res.data.page){
                obj['page'] = res.data.page
                obj['pagecount'] = res.data.count
              }
            }
          }
          

          this.setData(obj)
          wx.hideLoading()
        }
      })
    },
    goDetail(e){
      let id = e.currentTarget.dataset.id
      let app = this.data.isApp
      let goVideo = fnCon.goVideo
      goVideo(id,app)
    }
  }
})
