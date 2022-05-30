// pages/login/login.js
var app=getApp()

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
    idf: "student",
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
  judge: function (uid, username, password, identity) {
    var flag = false
    if (username == "") {
      wx.showModal({
        title: '提示',
        content: '请输入用户姓名',
      })
      flag = true
    } else if (uid == "") {
      wx.showModal({
        title: '提示',
        content: '请输入证件号码',
      })
      flag = true
    } else if (password == "") {
      wx.showModal({
        title: '提示',
        content: '请输入密码',
      })
      flag = true
    } else if (identity == "") {
      wx.showModal({
        title: '提示',
        content: '请选择身份',
      })
      flag = true
    }
    return flag
  },

  handleLogin:function(){
    var usrname=this.data.usrname;
    var uid=this.data.usrid;
    var passwd=this.data.passwd;
    var idf=this.data.idf;
    var that=this;
    console.log(uid,passwd);
    if(that.judge(uid,usrname,passwd,idf)==false)
    {
      wx.request({
        url: 'http://127.0.0.1:8000/Login/',
        data:{              // 发送来的数据格式是这样的
          uid:uid,
          usrname:usrname,
          password:passwd,
          identity:idf,
        },
        method:'POST',
        success:function(res){  //返回没在数据库中找到0  成功找到1  账号密码不匹配2
          console.log(res)
          if(res.data['status']==0){
            wx.showModal({
              title: '提示',
              content: '尚未存在数据库中',
            })
          }
          else if (res.data['status']==1){
            if(idf=='student'){
              app.globalData.uid = uid;
              app.globalData.usrname = usrname;
              wx.redirectTo({
                url: '/pages/stuIndex/stuIndex',
              })
            }
            else{
              app.globalData.uid = uid;
              app.globalData.usrname = usrname;
              wx.redirectTo({
                url: '/pages/teIndex/teIndex',
              })
            }
          }
          else{
            wx.showModal({
              title: '提示',
              content: '账号密码不匹配',
            })
          }
        }


      })
    }
  }

})