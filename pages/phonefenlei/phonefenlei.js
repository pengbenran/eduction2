var apimg = getApp().globalData.apimg;
var api = getApp().globalData.api;
const request = require('../../utils/request.js')
Page({
  data: {
 
  },
  onShareAppMessage: function () {
    withShareTicket: true
  },
  onLoad:function(option){
    var that = this
    request.moregets('/api/activity/limit').then(function (res) {
      var limitActive = [];
      for (var i = 0; i < res.apiLimit.length; i++) {
        limitActive = limitActive.concat(res.apiLimit[i].apilimitGoods)
      }
      that.setData({
        apiLimit: limitActive,
        limitActive: res.apiLimit
      })
    })
  },
// 商品详情跳转
  jumpclassDetail: function (e) {
    var that = this;
    var indx = e.currentTarget.id
    let xianshi = that.data.apiLimit[indx]
    var xianshidetail = {}
    for (var i = 0; i < that.data.limitActive.length; i++) {
      if (that.data.limitActive[i].limitId == xianshi.limitId) {
        xianshidetail.endtime = that.data.limitActive[i].endtime
        xianshidetail.perTotal = that.data.limitActive[i].perTotal
        var fitMemberType = that.data.limitActive[i].fitMemberType
      }
    }
    xianshidetail.finalAmount = xianshi.finalAmount
    xianshidetail.goodsPrice = xianshi.goodsPrice
    xianshidetail.goodsId = xianshi.goodsId
    xianshidetail.limitId = xianshi.limitId
    var lvidarr = fitMemberType.split(",")
    for (var i = 0; i < lvidarr.length; i++) {
      lvidarr[i] = lvidarr[i] * 1
    }
    if (xianshidetail.endtime < (new Date()).valueOf()) {
      wx.showToast({
        title: '该活动已结束',
      });
    } else {
      wx.navigateTo({
        url: '../zhekouxiangqing/zhekouxiangqing?xianshidetail=' + JSON.stringify(xianshidetail)
      })
    }
  }
})