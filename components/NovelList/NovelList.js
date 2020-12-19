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
    search: apiUrl.apiUrl.novel.search,
    NovelList: [],
    url: 'https://scxs.pysmei.com/',
    pagecount: 0,
    page: 1,
    isRefresh: false,
    fnAjax: fnCon.fnAjax,
    isNext: true,
    isTop: false
  },
  observers: {
    'arrUrl'() {
      if (this.data.arrUrl.length > 0) {
        this.setData({
          page: 1
        })
        this.getNovelList()
      }
    }
  },

  ready() {
    if (this.data.searchKey) {
      this.getSearch()
    } else {
      this.getNovelList()
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    getSearch() {
      let url = this.data.search
      let data = {
        key: this.data.searchKey,
        page: this.data.page,
        siteid: 'app2'
      }
      this.data.fnAjax(url, data).then(res => {
        this.setData({
          NovelList: res.data
        })
      })
    },
    getNovelList() {
      let _str = this.data.arrUrl.join('/')
      let url = `${this.data.url}${_str}/${this.data.page}.html`
      this.data.fnAjax(url, {}).then(res => {
        let arr = []
        if (this.data.page > 1) {
          arr = this.data.NovelList
        }
        arr.push(...res.data.BookList)
        this.setData({
          page: res.data.Page,
          isNext: res.data.HasNext,
          NovelList: arr,
          isRefresh: false
        })

        if (this.data.page == 1) {
          this.setData({
            isTop: 0
          })
        }
      })
    },
    fnTop() {
      if (!this.data.searchKey) {
        this.setData({
          page: 1
        })
        this.getNovelList()
      } else {
        this.setData({
          isRefresh: false
        })
      }
    },
    fnBotton() {
      if (!this.data.searchKey) {
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
      }
    },
    goDetail(e) {
      let id = e.currentTarget.dataset.id
      let goNovel = fnCon.goNovel
      goNovel(id)
    }
  }
})
