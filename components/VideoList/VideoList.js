// components/VideoList/VideoList.js
const fnCon = require('../../utils/common')
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    oData: Object,
    type: String,
    isResChange: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoList: [],
    pagecount: 1,
    page: 1,
    isRefresh: false,
    isNext: true,
    item: ''
  },
  observers: {
    'type': function (str) {
      if (str > 0) {
        this.setData({
          page: 1,
          videoList: []
        })
        this.cshData('list')
      }
    },
    'isResChange': function (b) {
      this.setData({
        page: 1,
        videoList: []
      })
      this.cshData('list')
    }
  },

  ready() {
    console.log(this.data.oData)
    if (this.data.oData.type == 'search') {
      this.cshData('search')
      let iTime = null
      clearInterval(iTime);
      iTime = setInterval(() => {
        if (this.data.item) {
          clearInterval(iTime);
          this.cshData('searchDetail')
        }
      }, 20);
    } else {
      if (!this.data.isResChange) {
        this.cshData('list')
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fnTop() {
      this.setData({
        page: 1
      })

      if (this.data.oData.type == 'search') {
        this.cshData('search')
        let iTime = null
        clearInterval(iTime);
        iTime = setInterval(() => {
          if (this.data.item) {
            clearInterval(iTime);
            this.cshData('searchDetail')
          }
        }, 20);
      } else {
        this.cshData('list')
      }
    },
    fnBotton() {
      if (this.data.isNext) {
        this.setData({
          isNext: false
        })

        let num = parseInt(this.data.page) + 1
        if (num <= this.data.pagecount) {
          this.setData({
            page: num
          })

          if (this.data.oData.type == 'search') {
            this.cshData('search')
            let iTime = null
            clearInterval(iTime);
            iTime = setInterval(() => {
              if (this.data.item) {
                clearInterval(iTime);
                this.cshData('searchDetail')
              }
            }, 20);
          } else {
            this.cshData('list')
          }

        } else {
          wx.showToast({
            title: '已没有更多了',
            icon: 'none',
            duration: 2000
          })
        }
      }
    },
    cshData(key) {
      if (app.globalData.sourceData) {
        fnCon.getSource(app, key, this);
      } else {
        clearInterval(app.globalData.iTime)
        app.globalData.iTime = setInterval(() => {
          if (app.globalData.sourceData) {
            clearInterval(app.globalData.iTime)
            fnCon.getSource(app, key, this);
          }
        }, 20);
      }
    },
    goDetail(e) {
      let id = e.currentTarget.dataset.id
      let goVideo = fnCon.goVideo
      goVideo(id)
    }
  }
})
