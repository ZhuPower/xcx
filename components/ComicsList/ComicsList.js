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
    bookId:String
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
    isNext:true,
    url:''
  },

  ready(){
    let url = ''
    if(this.data.typeComics == 'list'){
      url = apiUrl.apiUrl.comics.moreComics
      this.getMoreList(url)
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

      this.getMoreList()
    },
    fnBotton(){
      if(this.data.isNext){
        let page = this.data.page + 1
        this.setData({
          page:page
        })
        this.getMoreList()
      }
    },
    goDetail(e){
      let id = e.currentTarget.dataset.id
      let goComics = fnCon.goComics
      goComics(id)
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
    }
  }
})
