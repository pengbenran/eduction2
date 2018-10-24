var apimg = getApp().globalData.apimg;
// pages/group/group.js
var WxParse= require('/../../wxParse/wxParse.js');
var api = getApp().globalData.api;
var apimg = getApp().globalData.apimg;
var twoList={}
Page({
  data: {
    showshareModal:false,
    item:{
      voteTitle: null,
    },
    shaimg : apimg + "/image/group/5.png",
    // postsimg:apimg+"/image/souc.png",
    postsimg:"/image/xin1.png",
    elesimg:apimg+"/image/group/10.png",
    // elesimg: "/image/xin.png",
    sboximg:apimg+"/image/group/9.png",
    gimg:apimg+"/image/group/6.png",
    specimg:apimg+"/image/shouye/8.png",
    coming:apimg+"/images/guige/zu01.png",
    chaimg:apimg+"/images/guige/xx.png",
    xximg:apimg+"/images/guige/xx.png",
    lineimg:apimg+"/image/group/04.jpg",
    homeimg:apimg+"/image/group/17.png",
    weappimg:apimg+"/image/group/8.png",
    cartimg:apimg+"/image/group/7.png",
    name: "",
    image: "",
    posts:false,
    "standard": '[{"0":"m","1":"l","name":"尺码","code":"cm"},{"1":"蓝色","0":"红色","name":"颜色","code":"ys"}]',
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
      apimg+"/image/group/zu04.png",
      apimg+"/image/group/zu04.png",
      apimg+"/image/group/zu04.png"
    ], 
    goodsId:'',
    //正品保证数据
    tags: []
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
  },
    
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          ImageWidth: res.screenWidth + 'px',
          ImageHeight: res.screenWidth*9/16 + 'px',
        })
      }
    })
    that.setData({
      memberId: wx.getStorageSync('memberId')
    })
    var goodparms={}
    if (options.scene == undefined) {
      goodparms.goodsId = options.goodid
      that.setData({
        goodsId:options.goodid
      })
    }
    else {
      that.userLogin();
      var scene = decodeURIComponent(options.scene)
      var sceneArr=scene.split("&")
      goodparms.goodsId=sceneArr[0]
      that.setData({
        goodsId: sceneArr[0]
      })
      wx.setStorageSync('distribeId', sceneArr[1])
    }
    
    // goodparms.memberId = that.data.memberId
    wx.request({
      url: api+'/api/Goods/getGoods',
      // url: 'http://192.168.2.144/api/index/getGoods/166993'
      data:{
        parms: goodparms
      },
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {  
        if(res.data.code==0){
          wx.hideLoading()
          if (res.data.count == 0) {
            that.setData({
              posts: false
            })
          } else {
            that.setData({
              posts: true
            })
          }
          that.setData({
            goodDetail: res.data.Goods,
            Gallery: res.data.Gallery,
            tags: res.data.tags
          })
          var article = res.data.Goods.intro;
          WxParse.wxParse('article', 'html', article, that, 25);
          if(res.data.Goods.haveSpec!=0){
            let adjuncts = JSON.parse(res.data.Goods.adjuncts)
            for (var i = 0; i < adjuncts.length; i++) {
              for (var j in adjuncts[i].value) {
                adjuncts[i].value[j].flag = false;
              }
            }
            that.setData({
              adjuncts:adjuncts
            })
          }
          else{
          wx.request({
            url: api + '/api/Goods/getProduct',
            data: {
              parms: goodparms
            },
            header: {
              'Content-Type': 'json'
            },
            success: function (res) {
              that.setData({
                productId: res.data.product.productId,
                adjuncts: []
              })
            }
          })
          }
        }
      },
    })
   

  },
  // 获取code
  getCode: function (callback) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: api + '/api/byCode',
            // url: 'http://192.168.2.131:8080/mall/api/byCode',
            // url: 'http://192.168.2.131/mall/api/byCode',
            data: {
              code: res.code
            },
            success: function (res) {
              if (res.data.memberDo != null) {
                wx.setStorageSync('memberId', res.data.memberDo.memberId)
                // that.getMermberId(res.data.memberDo.memberId)
                let memberId = res.data.memberDo.memberId
                callback(memberId)
              }
              else {
                let memberId = "00"
                wx.setStorageSync('memberId', "00")
                callback(memberId)
              }

            }
          })
        }
      }
    })
  },
  // 获取mermberID
  getMermberId: function (memberId) {
    var parms = {}
    parms.memberId = memberId
    wx.request({
      url: api + '/api/member/memberIndex',
      // url: 'http://192.168.2.131:8080/mall/api/member/memberIndex', 
      // url: 'http://192.168.2.131/mall/api/member/memberIndex',
      data: {
        parms: parms
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.setStorageSync('point', res.data.memberDO.point)
          wx.setStorageSync('memberIdlvId', res.data.memberDO.lvId)
          wx.setStorageSync('isAgent', res.data.memberDO.isAgent)
          wx.setStorageSync('name', res.data.memberDO.name)
          wx.setStorageSync('face', res.data.memberDO.face)
          wx.setStorageSync('openId', res.data.memberDO.openId)
        }
      }
    })
  },
  userLogin: function () {
    var that = this
    that.getCode(function (memberId) {
      that.getMermberId(memberId)
      // that.selectMermberRed(memberId)
      that.setData({
        memberId: memberId
      })
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
  sharemodel:function(){
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showshareModal : true
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
        sModalStatus: false,
        showshareModal:false,
      })
    }.bind(this), 200)
  },
  hideshareModal:function(){
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
        showshareModal: false,
      })
    }.bind(this), 200)
  },
  // 分享海报
  jumpshare:function(e){
    var that=this;
    if (wx.getStorageSync('memberId')=="00"){
      wx.showModal({
        title: '提示',
        content: '你还未登录，是否登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../my/my',
            })
          } else if (res.cancel) {
            that.hideshareModal()
          }
        }
      })
    }else{
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.request({
              url: api + '/api/whetherDistribe/whetherDistribe',
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                memberId: wx.getStorageSync('memberId')
              },
              success: function (res) {
                if (res.data.code == 1) {
                  wx.setStorageSync('distribeId', null)
                }
                else {
                  wx.setStorageSync('distribeId', res.data.distribeId)
                }
                wx.navigateTo({
                  url: '../postersharing/postersharing?goodid=' + e.currentTarget.dataset.goodid + '&goodimg=' + e.currentTarget.dataset.goodimg + '&goodname=' + e.currentTarget.dataset.goodname + '&goodprice=' + e.currentTarget.dataset.goodprice,
                })
              }
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '你还未登录，是否登录',
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../my/my',
                  })
                } else if (res.cancel) {
                  that.hideshareModal()
                }
              }
            })
          }
        }
      })
    }  
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

   var that = this;
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
   else{
       var goodarr=[]
       var goodlist={}
       goodlist.pic = that.data.pic
       goodlist.num = that.pic;
       goodlist.price = that.data.goodDetail.price;
       goodlist.cost = that.data.goodDetail.cost;
       goodlist.memberPoint = that.data.goodDetail.memberPoint;
       goodlist.image = that.data.goodDetail.thumbnail
       goodlist.goodsId = that.data.goodDetail.goodsId
       goodlist.productId = that.data.productId
      if(that.data.goodDetail.haveSpec==0){
        goodlist.specvalue=null
        goodarr[0] = goodlist
        wx.navigateTo({
          url: "../dingdan/dingdan?goodlist=" + JSON.stringify(goodarr) + '&cart=0'
        })
      }else{
        if(that.data.count==that.data.adjuncts.length){
          goodlist.specvalue = that.data.space
          goodarr[0] = goodlist;
          wx.navigateTo({
            url: "../dingdan/dingdan?goodlist=" + JSON.stringify(goodarr) + '&cart=0'
          })
        }
      }
   }
 }
})
