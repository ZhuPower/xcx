const apiUrl = {
  video:{
    list:'https://www.mhapi123.com/inc/api_mac10.php'
  },
  novel:{
    search:'https://shuapi.jiaston.com/search.aspx',//搜索 https://shuapi.jiaston.com/search.aspx?key={{key}}
    info:'https://shuapi.jiaston.com/info/',//书籍信息 https://shuapi.jiaston.com/info/{$.Id}.html
    chapter:'https://shuapi.jiaston.com/book/', //书籍章节 https://shuapi.jiaston.com/book/{$.Id}/  
    //章节内容    https://shuapi.jiaston.com/book/521014/3144129.html
    sort:'https://shuapi.jiaston.com/top/', //分类
    
    //  https://shuapi.jiaston.com/top/男女/top/分类/榜单名/页码.html
    //  https://shuapi.jiaston.com/top/lady/top/commend/month/1.html
    // "男女": {
    //     "男": "man",
    //     "女": "lady" 
    // },
    // "分类": {
    //     "最热": "hot",
    //     "推荐": "commend",
    //     "完结": "over",
    //     "收藏": "collect",
    //     "新书": "new",
    //     "评分": "vote",
    // }
    // "榜单名": {
    //     "周榜": "week",
    //     "月榜": "month",
    //     "总绑": "total",
    // }
  }
}
module.exports = {
  apiUrl
}