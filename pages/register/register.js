// pages/register/register.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usrname:"",
    stuid:"",
    passwd:"",
    dorm:"",
    building:"",
    sex:"男",
    class:"",
    xueyuan:"",
    rxnf:"",
    phone:"",
  },
  regBtn:function(){
    var tid=app.globalData.tid
    var that=this
    wx.request({
      url: 'url',
      data:{
        sid:this.data.stuid,
        sname:this.data.usrname,
        password:this.data.passwd,
        building:this.data.building,
        room:this.data.dorm,
        sex:this.data.sex,
        sclass:this.data.class,
        xueyuan:this.data.xueyuan,
        year:this.data.year,
        lxfs:this.data.phone,
        islouzhang:false,
        tid:tid,
      },
      method:'POST',
      success:function(res){
        if(res.data['status']==true){
        wx.showModal({
          title: "提示",
          content:"创建新用户成功！"
        })}
        else{
          wx.showModal({
            title: "提示",
            content:"用户已存在数据库中！"
          })}
        }
      }
      
    )
  }
})