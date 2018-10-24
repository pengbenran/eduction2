var apimg = getApp().globalData.apimg;
var api = getApp().globalData.api;
const request = require('../../utils/request.js')
Page({
  data: {
    Goods:[]
  },

  // 刷新

  onShareAppMessage: function () {
    withShareTicket: true
  },
  onLoad: function (options) {
    var that=this;
    request.moregets('/api/Goods/GoodCatAll').then(function (res) {
      that.setData({
        Goods: res.Goods
      })
    })
  },
  jumpclassDetail:function(e){
    wx.navigateTo({ url: '../group/group?goodid=' + e.currentTarget.dataset.goodid + '&catid=2' });
  },
  jumpbuy:function(e){
    console.log(e)
    if (wx.getStorageSync('memberId') == "00") {
      wx.showModal({
        title: '提示',
        content: '你还未登录，是否登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../my/my',
            })
          } else if (res.cancel) {
            that.hModal()
          }
        }
      })
    }
    else {
      var goodarr = []
      var goodlist = {}
      goodlist.pic = 1
      goodlist.num = 1;
      goodlist.price = e.currentTarget.dataset.price;
      goodlist.image = e.currentTarget.dataset.image;
      goodlist.goodsId = e.currentTarget.dataset.goodsid;
      goodarr[0] = goodlist
      wx.navigateTo({
        url: "../dingdan/dingdan?goodlist=" + JSON.stringify(goodarr) + '&cart=0'
      })
    }
  }
})