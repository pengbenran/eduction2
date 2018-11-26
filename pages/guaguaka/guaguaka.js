var WxParse = require('/../../wxParse/wxParse.js');
Page({
  data: {
    indexdata:{}
  },
  onLoad:function(){
    var that=this;
    that.setData({
      indexdata: wx.getStorageSync('indexdata')
    })
    WxParse.wxParse('article', 'html', wx.getStorageSync('indexdata').descs, that, 25);
  }
})