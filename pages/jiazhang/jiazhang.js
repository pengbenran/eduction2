const util = require('../../utils/util.js')
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[],
    // index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.loads();
  },

  loads:function(){
    let that=this;
    request.moregets('/api/parent/list').then(function(res){
      that.setData({
        imgList: res.parent
      })
    })
    
  },
  previewImage(e){
    let that = this;
    console.log(e)
    console.log(e.currentTarget.dataset.url)
    console.log(that.data.imgList)
    let arr=[]
    that.data.imgList.map(v=>{
      console.log('你好12',v)
      arr.push(v.logo)
    })

    let url = e.currentTarget.dataset.url
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})