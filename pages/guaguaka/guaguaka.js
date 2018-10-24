Page({

  data: {
    indexdata:{}
  },
  onLoad:function(){
    var that=this;
    that.setData({
      indexdata: wx.getStorageSync('indexdata')
    })
  }
})