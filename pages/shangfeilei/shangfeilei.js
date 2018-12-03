var apimg = getApp().globalData.apimg;
var api = getApp().globalData.api;
const request = require('../../utils/request.js')
Page({
  data: {   
    array:[],  
    array1:[],
    GoodLists:[ ],
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
        array: res.GoodCatAll,
        array1: arr
      })
    })
  },
  
  ClicktapName(e){
   let that = this;
   let arr = []
    let cartid = e.currentTarget.dataset.catid
    // arr =  that.data.GoodLists.filter(f=>{
    //   f.catId == 81
    // })
    that.data.GoodLists.map(v=>{
      if (v.catId == cartid){
        arr.push(v)
      }
    })
    console.log(cartid, arr)
    that.setData({
      array1: arr,
    })
  },
  chooseImageTap:function(){

  }
}) 