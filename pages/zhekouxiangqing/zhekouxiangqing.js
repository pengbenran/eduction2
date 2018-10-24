 var apimg = getApp().globalData.apimg;
// pages/group/group.js
const util = require('../../utils/util.js')
var WxParse = require('/../../wxParse/wxParse.js');
var api = getApp().globalData.api;
var apis = getApp().globalData.apis;
var twoList = {}
Page({
  data: {
    item: {
      voteTitle: null,

      maxtime: "",
      isHiddenLoading: true,
      isHiddenToast: true,
      dataList: {},
      countDownDay: 0,
      countDownHour: 0,
      countDownMinute: 0,
      countDownSecond: 0,   


    },
    shaimg: apimg + "/image/group/5.png",
    postsimg: apimg + "/image/souc.png",
    // elesimg:apimg+"/image/group/10.png",
    elesimg: "/image/xin.png",
    sboximg: apimg + "/image/group/9.png",
    gimg: apimg + "/image/group/6.png",
    specimg: apimg + "/image/shouye/8.png",
    coming: apimg + "/images/guige/zu01.png",
    chaimg: apimg + "/images/guige/xx.png",
    xximg: apimg + "/images/guige/xx.png",
    lineimg: apimg + "/image/group/04.jpg",
    homeimg: apimg + "/image/group/17.png",
    weappimg: apimg + "/image/group/8.png",
    cartimg: apimg + "/image/group/7.png",
    name: "",
    image: "",
    posts: false,
    modemoney: "0.00",
    goodid: "",
    catId: "",
    pic: 1,
    hidden: false,
    indicatorDots: true,  //显示面板指示点
    autoplay: true,     //自动切换
    interval: 5000,    //自动切换时间间隔
    duration: 1000,    //滑动动画时长
    imgUrls: [
      apimg + "/image/group/zu04.png",
      apimg + "/image/group/zu04.png",
      apimg + "/image/group/zu04.png"
    ],
    //正品保证数据,
     "distanceimg": [apimg + "/image/group/13.png"],

  },
  // 刷新
  onPullDownRefresh() {

    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    this.onLoad();
  },

  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          ImageWidth: res.screenWidth + 'px',
          ImageHeight: res.screenWidth * 9 / 16 + 'px',
        })
      }
    })
    wx.showLoading({
      title: '加载中',
    })
    var xianshidetail = JSON.parse(options.xianshidetail)
    that.setData({
      xianshidetail: xianshidetail
    })
        var timestamp2 = (new Date()).valueOf();
        var leftTime = that.data.xianshidetail.endtime - timestamp2;
        if (leftTime >= 0) {
          var interval = setInterval(function () {
            var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
            var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
            var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
            var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
            leftTime = leftTime - 1000;
            that.setData({
              countDownDay: days,
              countDownHour: hours,
              countDownMinute: minutes,
              countDownSecond: seconds,
            });
          }, 1000)
          if (leftTime <= 0) {
            clearinterval(interval)
          }
        }




    var parms = {}
    parms.goodsId = that.data.xianshidetail.goodsId
    wx.request({
      url: api + '/api/Goods/getGoods',
      // url: 'http://192.168.2.144/api/index/getGoods/166993'
      data: {
        "parms": parms
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        wx.hideLoading()
        var article = res.data.Goods.intro;
        var percount = res.data.percount
        var point = res.data.Goods.point
        WxParse.wxParse('article', 'html', article, that, 25);
        var haveSpec = res.data.Goods.haveSpec
        that.setData({
          Gallery: res.data.Gallery,
          Gooddetatil: res.data.Goods,
          tags: res.data.tags
        })
      
      },
    })

  },

  // 页面渲染完成后 调用  

  getChecked: function (e) {
    var self = this,
      haveCheckedProp = "",
      name = e.currentTarget.dataset.property,
      value = e.currentTarget.dataset.value,
      length, objLength;
    self.postData[name] = value;
    length = self.data.item.property.length;
    objLength = common.objLength(self.postData);
    for (var key in self.postData) {
      haveCheckedProp += " " + self.postData[key];
    }
    if (length == objLength) {
      self.setData({
        getCount: true,
      });
    }
    this.setData({
      postData: self.postData,
      haveCheckedProp: haveCheckedProp
    })
  },

  // 获取输入框的值
  voteTitle: function (e) {
    this.data.voteTitle = e.detail.value;
  },

  //下一步模态框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //立即购买模态框
  sModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      sModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  hModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        sModalStatus: false
      })
    }.bind(this), 200)
  },

  //下拉刷新
  onPullDownRefresh() {
    // wx.showNavigationBarLoading() 
    wx.stopPullDownRefresh()
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    this.onLoad();
  },
  //主页跳转
  zhuye: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },

  //主页跳转
  gochart: function (e) {
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  onShareAppMessage: function () {


    withShareTicket: true

  },
  //规格下一步跳转
  next: function () {
    var that=this;
      if (that.data.xianshidetail.perTotal == 0) {
        wx.navigateTo({
          url: "../dingdan2/dingdan2?pic=" + that.data.pic + '&goodsId=' + that.data.xianshidetail.goodsId + '&price=' + that.data.xianshidetail.finalAmount + '&limitId=' + that.data.xianshidetail.limitId + '&Type=Z',
        })
      }
      else {
        if (that.data.pic > that.data.xianshidetail.perTotal) {
          wx.showToast({
            title: '限购数量为' + that.data.xianshidetail.perTotal,
          })
        } else {
          wx.navigateTo({
            url: "../dingdan2/dingdan2?pic=" + that.data.pic + '&goodsId=' + that.data.xianshidetail.goodsId + '&price=' + that.data.xianshidetail.finalAmount + '&limitId=' + that.data.xianshidetail.limitId + '&Type=Z',
          })
        }
      }
  },
  /**
       * 绑定加数量事件
       */
  addCount(e) {
    let pic = this.data.pic;
    pic = pic + 1;
    this.data.pic = pic;
    this.setData({
      pic: pic
    });
  },
  /**
     * 绑定减数量事件
     */
  minusCount(e) {
    let pic = this.data.pic;
    if (pic <= 1) {
      return false;
    }
    pic = pic - 1;
    this.data.pic = pic;
    this.setData({
      pic: pic
    });
  },



})
