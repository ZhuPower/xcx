// components/ComicsList/ComicsList.js
const apiUrl = require('../../utils/apiUrl')
const fnCon = require('../../utils/common')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typeComics:String,
    searchKey:String,
    bookId:String,
    themeId:Number,
    order:Number,
    finish:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    comicsList:[],
    pagecount:0,
    page:1,
    isRefresh:false,
    url:'',
    fnAjax:fnCon.fnAjax,
    isNext:true
  },

  observers:{
    'themeId'(){
      this.setData({
        page:1
      })
      this.getClassify()
    },
    'order'(){
      this.setData({
        page:1
      })
      this.getClassify()
    },
    'finish'(){
      this.setData({
        page:1
      })
      this.getClassify()
    },
  },

  ready(){
    let url = ''

    if(this.data.searchKey){
      url = apiUrl.apiUrl.comics.keywordComics
      this.getSearchList(url)
    }else{
      if(this.data.typeComics == 'list'){
        url = apiUrl.apiUrl.comics.moreComics
        this.getMoreList(url)
      }else{
        url = apiUrl.apiUrl.comics.filterComics
        this.getClassify(url)
      }
    }
    
    this.setData({
      url:url
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {
    fnTop(){

      this.setData({
        page:1
      })

      if(this.data.searchKey){
        this.getSearchList()
      }else{
        if(this.data.typeComics == 'list'){
          this.getMoreList()
        }else{
          this.getClassify()
        }
      }
    },
    fnBotton(){
      if(this.data.isNext){
        let page = this.data.page + 1
        this.setData({
          page:page
        })
        if(this.data.searchKey){
          this.getSearchList()
        }else{
          if(this.data.typeComics == 'list'){
            this.getMoreList()
          }else{
            this.getClassify()
          }
        }
      }else{
        wx.showToast({
          title: '没有更多了',
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
    getClassify(str){

      let url = this.data.url
      
      if(str){
        url = str
      }

      let data = {
        page_num: this.data.page,
        page_size: 20
      }

      if(this.data.themeId){
        data['theme_id'] = this.data.themeId
      }

      if(this.data.order){
        data['order'] = this.data.order
      }

      if(this.data.finish){
        data['order'] = this.data.finish
      }

      this.data.fnAjax(url,data).then(res => {
        console.log(res)
        if(res.code == 200){
          let arr = []
          if(this.data.page > 1){
            arr = this.data.comicsList
          }
          arr.push(...res.data.list)

          this.setData({
            comicsList:arr,
            isRefresh:false,
            isNext: !(res.data.count < 20)
          })
        }
      })

    },
    getMoreList(str){
      let url = this.data.url
      
      if(str){
        url = str
      }

      let data = {
        book_id: this.data.bookId,
        gender: 1,
        page_num: this.data.page,
        page_size: 5
      }

      this.data.fnAjax(url,data).then(res => {
        console.log(res)
        if(res.code == 200){
          let arr = []
          if(this.data.page > 1){
            arr = this.data.comicsList
          }
          arr.push(...res.data.list)

          this.setData({
            comicsList:arr,
            isRefresh:false,
            isNext: !(res.data.count < 5)
          })
        }
      })
    },
    getSearchList(str){
      let url = this.data.url
      
      if(str){
        url = str
      }

      let data = {
        keyword:this.data.searchKey,
        page_num: this.data.page,
        page_size: 20
      }

      this.data.fnAjax(url,data).then(res => {
        console.log(res)
        if(res.code == 200){
          let arr = []
          if(this.data.page > 1){
            arr = this.data.comicsList
          }
          arr.push(...res.data.list)

          this.setData({
            comicsList:arr,
            isRefresh:false,
            isNext: !(res.data.count < 20)
          })
        }
      })
    }
  }
})
