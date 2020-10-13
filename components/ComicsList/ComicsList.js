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
    videoList:[],
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
    },
    fnBotton(){
    },
    getMoreList(str){
      let url = this.data.url
      
      if(str){
        url = str
      }

      let data = {
        book_id: 1,
        gender: 1,
        page_num: 1,
        page_size: 5,
        uid: 35050531
      }

      this.data.fnAjax(url,data).then(res => {
        console.log(res)
        if(res.code == 200){
          
          // this.setData({
          //   banner:arr
          // })
        }
      })
    }
  }
})
