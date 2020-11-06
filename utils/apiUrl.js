const apiUrl = {
  proxyUrl: 'https://test.yijiago.com/gly/yiJiaGo/test/proxy.php',
  parsing: [
    {
      name:'金桥解析',
      url:'http://5.nmgbq.com/2/api.php', 
      method:'POST'
    },
    {
      name:'测试解析2',
      url:'http://qq.peilili.com/mgjiexi/api.php',
      method:'POST'
    },
    {
      name:'测试解析',
      url:'https://cdn.yangju.vip/kc/api.php',
      method:'GET' 
    },
    {
      name:'解析接口1',
      url:'https://www.ckmov.com/Api.php',
      method:'POST'
    },
    {
      name:'1717解析',
      url:'https://1717.ntryjd.net/1717yun/api.php',
      method:'POST'
    } 
  ],
  video: {
    banner: 'https://aa.ahy1.top/api.php/banner/banner/getBannerLists',
    homeVideo: 'https://aa.ahy1.top/api.php/videos/videos/getHomeVideoLists',
    VideoLists: 'https://aa.ahy1.top/api.php/videos/videos/getVideoLists',
    videoDetail: 'https://aa.ahy1.top/api.php/videos/videos/getVideoDetail'
  },
  comics: {
    banner: 'https://base.mkzcdn.com/advert/app/slide/v3/',
    homeComics: 'https://recommend.mkzcdn.com/mkz/top/v2/homepage', //首页
    moreComics: 'https://recommend.mkzcdn.com/mkz/top/v2/more', //更多
    infoComics: 'https://comic.mkzcdn.com/comic/info/', //详情
    chapterComics: 'https://comic.mkzcdn.com/chapter/', // 目录
    contentComics: 'https://comic.mkzcdn.com/chapter/content/', //内容
    filterComics: 'https://comic.mkzcdn.com/search/filter/', //分类
    keyComics: 'https://comic.mkzcdn.com/recom/search/app/', //热搜
    keywordComics: 'https://comic.mkzcdn.com/search/keyword/', //搜索
    themeComics: 'https://comic.mkzcdn.com/config/theme/' //分类名
  },

  novel: {
    img:'https://imgapixs.pysmei.com/BookFiles/BookImages/',
    home:'https://scxs.pysmei.com/prov8/newfram//man_channel.html',
    home2:'https://scxs.pysmei.com/prov8/newfram//lady_channel.html',
    search: 'https://scxs.pysmei.com/search.aspx',//搜索 https://scxs.pysmei.com/search.aspx?key={{key}}
    info: 'https://scxs.pysmei.com/info/',//书籍信息 https://scxs.pysmei.com/info/{$.Id}.html
    chapter: 'https://scxs.pysmei.com/book/', //书籍章节 https://scxs.pysmei.com/book/{$.Id}/  
    //章节内容    https://scxs.pysmei.com/book/521014/3144129.html
    category:'https://scxs.pysmei.com/Categories/BookCategory.html',
    //https://scxs.pysmei.com/Categories/BookCategory.html
    //https://scxs.pysmei.com/Categories/2/hot/1.html
    //https://scxs.pysmei.com/Categories/2/new/1.html
    //https://scxs.pysmei.com/Categories/2/vote/1.html
    //https://scxs.pysmei.com/Categories/2/over/1.html
  }
}
module.exports = {
  apiUrl
}