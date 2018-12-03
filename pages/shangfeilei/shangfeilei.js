var apimg = getApp().globalData.apimg;
var api = getApp().globalData.api;
const request = require('../../utils/request.js')
Page({
  data: {   
    Catlist:[],  
    ShopList:[],
    GoodLists:[ ],
    selectIndex:81
    },
  // 刷新
  onShareAppMessage: function (){
    withShareTicket: true
  },
  onLoad: function (options) {
    var that=this;
    request.moregets('/api/Goods/GoodCatAll').then(function (res) {
      console.log(res)
      let arr = []
      res.Goods.map(v=>{
        if (v.catId == res.GoodCatAll[0].catId){
          arr.push(v)
        }
      })
      that.setData({
        GoodLists: res.Goods,
        Catlist: res.GoodCatAll,
        ShopList: arr
      })
    })
  },
  

  //点击分类
  ClicktapName(e){
   let that = this;
   let arr = []
   let cartid = e.currentTarget.dataset.catid
    that.data.GoodLists.map(v=>{
      if (v.catId == cartid){
        arr.push(v)
      }
    })
    console.log(cartid, arr)
    that.setData({
      ShopList: arr,
      selectIndex: cartid
    })
  },

  //跳转
  Topage(e){
    let that = this;
    let goodsid = e.currentTarget.dataset.goodsid
    wx.navigateTo({ url: '../group/group?goodid=' + goodsid + '&catid=2' });
  }
  

}) 