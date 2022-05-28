// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usrname:"",
    usrid:"",
    passwd:"",
    usrtype:"",
    //columns:['学生','教师','管理员']
    radio: true,
    icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png',
    },
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  regButton:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  }
})