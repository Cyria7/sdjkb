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
  //后端配合建立核酸通知数据库 和新建学生信息逻辑相同
  regBtn:function(){
    var tid=app.globalData.uid
    var that=this
    wx.request({
      url: 'http://127.0.0.1:8000/Reg/',
      data:{
        sid:this.data.stuid,
        sname:this.data.usrname,
        password:this.data.passwd,
        building:this.data.building,
        room:this.data.dorm,
        sex:this.data.sex,
        sclass:this.data.class,
        xueyuan:this.data.xueyuan,
        year:this.data.rxnf,
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