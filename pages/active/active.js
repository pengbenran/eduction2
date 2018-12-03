// pages/active/active.js
var util = require('../../utils/util.js');
var apimg = getApp().globalData.apimg;
var api = getApp().globalData.api;
const request = require('../../utils/request.js')
// var apis = getApp().globalData.apis;
//获取应用实例
var app = getApp()

Page({
  //页面的初始化数据
  data: {
    GoodCatAll:[],
    CatArr:[],
    catId:'',
    name:''
  },

  //下拉刷新
  onPullDownRefresh() {
   
  },
  onShow:function(){
   
  },
  onLoad: function () {
    this.OnJob();

  },
  

  //OnJob
  OnJob(){
    let that = this;
    request.moregets('/api/Goods/GoodCatAll').then(function (res) {
      let arr =  res.GoodCatAll.map(v=>{
        return v.name
      })
      that.setData({
        CatArr: res.GoodCatAll,
        GoodCatAll: arr,
        name:arr[0],
        catId: res.GoodCatAll[0].catId
      })
    })
  },

  //类别选择
  bindPickerChange(e){
    let that = this;
    console.log(e)
    let value = e.detail.value
    that.setData({
      name: that.data.GoodCatAll[value],
      catId: that.data.CatArr[value].catId
    })
  },

  //点击提交
  formSubmit(e){
   let that = this;
    console.log("查看提交信息", that.data.catId, that.data.name)
    let Info = e.detail.value;
    // console.log(e, "123", e.detail.value)
    if (Info.UserName ==''){
      that.Show("姓名不能为空","none")
    } else if (Info.UserPhone == ''){
      that.Show("电话不能为空", "none")
    } else if (Info.UserWx == '') {
      that.Show("微信不能为空", "none")
    } else if (Info.UserJob == '') {
      that.Show("专业不能为空", "none")
    }else{
      let data = {
        ename: Info.UserName,
        telpone: Info.UserPhone,
        ambitus: Info.UserWx,
        hallRoom: Info.UserJob,
        entrustType: that.data.catId
      }
      request.MorePost('/api/parent/save', data).then(function (res) {
         console.log("请求",res)
        if (res.code == 0){
          wx.showLoading({
            title: '信息提交中',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2500)
        }
      })
    }

  },
   

   Show(text,ico){
     wx.showToast({
       title: text,
       icon: ico,
       duration: 2000
     })
   }
   
})
