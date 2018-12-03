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
   tabitem:[],
   typeid:0
  },
  onShareAppMessage: function () {
  },
  //下拉刷新
  onPullDownRefresh() {
   
  },
  onShow:function(){
   
  },
  onLoad: function () {
    var that=this;
    request.moregets('/api/student/getAllGrade').then(function (res) {
      console.log(res)
      for(var i in res.grades){
        res.grades[i].isSelect=false
      }
      res.grades[0].isSelect=true;
      that.setData({
        tabitem: res.grades
      })
      request.moregets('/api/student/listStudentByTypeId?typeId=' + that.data.tabitem[0].typeId).then(function (res) {
        that.setData({
          students:res.students
        })
      })
    })   
  },

  //表单
  inputTap:function(e){
    let that = this;
    let text = e.detail.value
    console.log("查看数据", e, text)
    that.setData({
      inputText: text
    })
  },

  //搜索
  sousuo:function(){
    let that = this;
    request.moregets('/api/student/list/byTypeId/withCondition', { typeId: that.data.typeid, condition: that.data.inputText}).then(function(res){
      that.setData({
        students: res.students
      })
      console.log(that.data.students)
    })
  },
  change:function(e){
    var that=this;2
    let typeid = e.currentTarget.dataset.typeid;
    console.log('查看选中ID', e.currentTarget, that.data.tabitem)
    that.setData({
      typeid: typeid
    })
    for (var i in that.data.tabitem){
      var keyvalue = "tabitem["+i+"].isSelect"
      that.setData({
        [keyvalue]:false
      })
    }
    var key ="tabitem["+e.currentTarget.dataset.index+"].isSelect"
    that.setData({
      [key]:true
    })
    request.moregets('/api/student/listStudentByTypeId?typeId=' + that.data.tabitem[e.currentTarget.dataset.index].typeId).then(function (res) {
      that.setData({
        students: res.students
      })
    }) 
  }
})
