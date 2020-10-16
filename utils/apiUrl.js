const apiUrl = {
  proxyUrl:'https://test.yijiago.com/gly/yiJiaGo/test/proxy.php',
  video:{
    banner:'https://aa.ahy1.top/api.php/banner/banner/getBannerLists',
    homeVideo:'https://aa.ahy1.top/api.php/videos/videos/getHomeVideoLists',
    VideoLists:'https://aa.ahy1.top/api.php/videos/videos/getVideoLists',
    videoDetail:'https://aa.ahy1.top/api.php/videos/videos/getVideoDetail'
  },
  comics:{
    banner:'https://base.mkzcdn.com/advert/app/slide/v3/',
    homeComics:'https://recommend.mkzcdn.com/mkz/top/v2/homepage', //首页
    moreComics:'https://recommend.mkzcdn.com/mkz/top/v2/more', //更多
    infoComics:'https://comic.mkzcdn.com/comic/info/', //详情
    chapterComics:'https://comic.mkzhan.com/chapter/', // 目录
    contentComics:'https://comic.mkzhan.com/chapter/content/', //内容
    filterComics:'https://comic.mkzcdn.com/search/filter/', //分类
    keyComics:'https://comic.mkzcdn.com/recom/search/app/', //热搜
    keywordComics:'https://comic.mkzcdn.com/search/keyword/', //搜索
    themeComics:'https://comic.mkzcdn.com/config/theme/' //分类名
  },
  
  novel:{
    search:'https://shuapi.jiaston.com/search.aspx',//搜索 https://shuapi.jiaston.com/search.aspx?key={{key}}
    info:'https://shuapi.jiaston.com/info/',//书籍信息 https://shuapi.jiaston.com/info/{$.Id}.html
    chapter:'https://shuapi.jiaston.com/book/', //书籍章节 https://shuapi.jiaston.com/book/{$.Id}/  
    //章节内容    https://shuapi.jiaston.com/book/521014/3144129.html
    sort:'https://shuapi.jiaston.com/top/', //分类

    typeInfo:{
      channel:[
        {
          name:'男',
          field:'man'
        },
        {
          name:'女',
          field:'lady'
        }
      ],
      category:[
        {
          name:'最热',
          field:'hot'
        },
        {
          name:'推荐',
          field:'commend'
        },
        {
          name:'完结',
          field:'over'
        },
        {
          name:'收藏',
          field:'collect'
        },
        {
          name:'新书',
          field:'new'
        },
        {
          name:'评分',
          field:'vote'
        }
      ],
      rankList:[
        {
          name:'周榜',
          field:'week'
        },
        {
          name:'月榜',
          field:'month'
        },
        {
          name:'总榜',
          field:'total'
        }
      ]
    }
    
    //  https://shuapi.jiaston.com/top/男女/top/分类/榜单名/页码.html
    //  https://shuapi.jiaston.com/top/lady/top/commend/month/1.html
  }
}
module.exports = {
  apiUrl
}