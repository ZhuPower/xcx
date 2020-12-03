// components/Resources/Resources.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String,
    isRefresh: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    num: 0,
  },
  ready() {
    if (app.globalData.sourceData) {
      let key = `n${this.data.type}`
      let num = app.globalData[key]
      this.setData({
        list: app.globalData.sourceData[this.data.type],
        num: num
      })
    } else {
      let iTime = null;
      clearInterval(iTime);
      iTime = setInterval(() => {
        if (app.globalData.sourceData) {
          clearInterval(iTime)
          this.setData({
            list: app.globalData.sourceData[this.data.type]
          })
        }
      }, 20);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function (e) {
      if (this.data.isRefresh) {
        let num = e.detail.value
        let key = `n${this.data.type}`
        app.globalData[key] = num
        this.setData({
          num: num
        })
        this.triggerEvent('resChange');
      } else {
        wx.showToast({
          title: '您点的太快了，请稍后再试',
          icon: 'none',
          duration: 2000
        })
      }
    },
  }
})
