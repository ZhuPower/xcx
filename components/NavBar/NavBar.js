// assets/components/NavBar/NavBar.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navType:String,
    navPath:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    nIndex:0,
    isShow:false
  },
  ready(){
    this.setData({
      isShow: app.globalData.isShow
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
