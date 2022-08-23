// pages/register/register.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hsdate:"",
    hstime:"",
    hsinfo:"",
  },
  //后端配合建立核酸通知数据库 和新建学生信息逻辑相同
  regBtn:function(){
    var tid=app.globalData.uid
    var that=this
    wx.request({
      url: 'http://127.0.0.1:8000/NewNotice',
      data:{
        hsdate:that.data.hsdate,
        hstime:that.data.hstime,
        hsinfo:that.data.hsinfo
      },
      method:'POST',
      success:function(res){
        if(res.data['status']==true){
        wx.showModal({
          title: "提示",
          content:"新建核酸通知成功！"
        })}
        else{
          wx.showModal({
            title: "提示",
            content:"该日期已存在核酸通知！"
          })}
        }
      }
      
    )
  }
})