// components/NovelList/NovelList.js
const apiUrl = require('../../utils/apiUrl')
const fnCon = require('../../utils/common')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String,
    searchKey: String,
    arrUrl: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    img: apiUrl.apiUrl.novel.img,
    NovelList: [],
    url: 'https://scxs.pysmei.com/',
    pagecount: 0,
    page: 1,
    isRefresh: false,
    fnAjax: fnCon.fnAjax,
    isNext: true
  },

  ready() {
    this.getNovelList()
  },
  fnTop() {
    this.setData({
      page: 1
    })
    this.getNovelList()
  },
  fnBotton() {
    if (this.data.isNext) {
      let page = this.data.page + 1
      this.setData({
        page: page
      })
      this.getNovelList()
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  goDetail(e){
    let id = e.currentTarget.dataset.id
    let goNovel = fnCon.goNovel
    goNovel(id)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getNovelList() {
      let _str = this.data.arrUrl.join('/')
      let url = `${this.data.url}${_str}/${this.data.page}.html`
      this.data.fnAjax(url, {}).then(res => {
        console.log(res)
        this.setData({
          page: res.data.Page,
          isNext: res.data.HasNext,
          NovelList: res.data.BookList
        })
      })
    }
  }
})
