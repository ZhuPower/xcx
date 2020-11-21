// components/NavTitle/NavTitle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    type: String,
    navPath: String,
    isOpacity: Boolean,
    isNav: Boolean,
    isScroll: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchKey:''
  },
  ready() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      wx.navigateBack({
        delta: 1
      })
    },
    bindKeyInput(e) {
      this.setData({
        searchKey: e.detail.value
      })
      e.detail.value = ''
    },
    goList() {
      if (this.data.searchKey) {
        let str = 'type=search&name=搜索"' + this.data.searchKey + '"结果&key=' + this.data.searchKey
        this.setData({
          searchKey: ''
        })
        wx.navigateTo({
          url: `/pages/${this.data.type}/pages/list/list?${str}`,
        })
      } else {
        wx.showToast({
          title: '请输入搜索关键字',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})
