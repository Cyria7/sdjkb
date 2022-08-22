var app=getApp()
// pages/QueueProgress/QueueProgress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {//这里输出41个楼的状态array 包含楼号bid 是否完成true  在排队true 
    dormMan:true,//要得到该学生是否是楼长 和学生首页的逻辑一样
    usrname:'',
    building:'',
    usrid:'',
    array: [{//这里的array需要调用后端数据库
      bid: '1',
      iscomplished:true,
      isqueue:false,
    }, {
     bid: '2',
     iscomplished:true,
     isqueue:false,
    },{
      bid: '3',
      iscomplished:true,
      isqueue:false,
     },{
      bid: '4',
      iscomplished:false,
      isqueue:true,
     },{
      bid: '5',
      iscomplished:false,
      isqueue:false,
     }]

  },
  onChange(event){
    this.setData(
      {active:event.detail}
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //监听页面加载函数中 1.确认学生是否为楼长（已完成）2.获取核酸通知数据库中【最新的】核酸通知内容
  onLoad(options) {
    this.setData({
      usrname:app.globalData.usrname,
      usrid:app.globalData.uid
    })
    var that=this;
    var usrid=this.data.usrid;
    console.log("onload here")
    wx.request({
      url: 'http://127.0.0.1:8000/StuHis/',
      data:{
        uid:usrid,
      },
      method:'POST',
      success:function(res){
        that.setData({
          building:res.data[1]['building'],
          history:res.data[2],
          dormMan:res.data[0]['islouzhang']
        })
      }
    }),
    app.globalData.building = this.data.building;
  },
  //点击“本楼开始排队”后的按钮绑定函数 后端配合找到本楼长管的楼 将数据库的isqueue改成true 注意iscomplish仍然是false 逻辑符合wxml中的if-elif-else
  queue:function(){
    this.setData({
      usrname:app.globalData.usrname,
      usrid:app.globalData.uid
    })
    var that=this;
    var usrid=this.data.usrid;
    console.log("onload here")
    wx.request({
      url: 'http://127.0.0.1:8000/StuHis/',//url改一下
      data:{
        uid:usrid,
      },
      method:'POST',
      success:function(res){
        that.setData({
          iscomplished:true,
          isqueue:false,
        })
      }
    }),
    app.globalData.building = this.data.building;
  },
 //点击“本楼完成核酸”后的按钮绑定函数 逻辑同上
   //点击“本楼开始排队”后的按钮绑定函数 后端配合找到本楼长管的楼 将数据库的isqueue改成true 注意iscomplish仍然是false 逻辑符合wxml中的if-elif-else
  complish:function(){

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.data.usrname=app.globalData.usrname;
    this.data.usrid=app.globalData.uid;
    var that=this;
    var usrid=this.data.usrid;
    console.log("pull down refresh")
    wx.request({
      url: 'http://127.0.0.1:8000/StuHis/',
      data:{
        uid:usrid,
      },
      method:'POST',
      success:function(res){
        that.setData({
          building:res.data[1]['building'],
          history:res.data[2],
          dormMan:res.data[0]['islouzhang']
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})