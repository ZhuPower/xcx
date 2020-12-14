// components/playList/playList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    oData: Object,
    type: String,
    isHeight: Boolean,
    nowIndex: Number,
    isPlaying: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready() {
    console.log(this.data.oData)
    console.log(this.data.type)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(e) {
      let index = e.currentTarget.dataset.index;
      this.triggerEvent('onSelect', { index: index });
    },
    onAllDel(){
      this.triggerEvent('onAllDel');
    },
    onDel(e){
      let index = e.currentTarget.dataset.index;
      this.triggerEvent('onDel', { index: index });
    },
    onCollect(e){
      let index = e.currentTarget.dataset.index;
      this.triggerEvent('onCollect', { index: index });
    }

  }
})
