const apiUrl = {
  video:{
    //小小影视
    // tab:'https://ios.xxjjappss.com/index', // tab=0： 0热门，1电影，2电视剧，3动漫，4综艺
    // listing:'https://ios.xxjjappss.com/vod/',  //listing-0-0-0-0-0-0-1 
    // //https://api.shizi.in:1443/vod/listing-[分类ID:0]-[地区ID:0]-[年份ID:0]-[剧情:0]-[字幕语言:0]-[排序:0]-[页码:1]
    // search:'https://ios.xxjjappss.com/search', //wd=琉璃&page=1
    // show:'https://ios.xxjjappss.com/vod/show/', // 66463
    // reqplay:'https://ios.xxjjappss.com/vod/reqplay/' //66463?plt=3&playindex=1
    url:'http://zy.itono.cn/inc/',
    arr:[
      {
        type:'api.php',
        name:'全站'
      },
      {
        type:'qq.php',
        name:'腾讯'
      },
      {
        type:'qiyi.php',
        name:'奇艺'
      },
      {
        type:'youku.php',
        name:'优酷'
      },
      {
        type:'mgtv.php',
        name:'芒果'
      },
      {
        type:'letv.php',
        name:'乐视'
      },
      {
        type:'sohu.php',
        name:'搜狐'
      },
      {
        type:'pptv.php',
        name:'PPTV'
      },
      {
        type:'migu.php',
        name:'咪咕'
      },
      {
        type:'bilibili.php',
        name:'哔哩哔哩'
      },
      {
        type:'m1905.php',
        name:'1905'
      }
    ]

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