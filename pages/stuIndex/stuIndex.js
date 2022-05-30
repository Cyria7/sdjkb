// pages/stuIndex/stuIndex.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //active:'home',
    dormMan:true,
    usrname:'',
    building:'',
    usrid:'',
    history:[
      {
        jcrq:'2022-05-01 00:00:00',
        result:'阴性',
      },
    ],
  },
  todayUp:function(){
    wx.navigateTo({
      url: '../upload/upload',
    })
  },
  todayNot:function(){
    wx.navigateTo({
      url: '../dormMan/dormMan',
    })
  },

  onChange(event){
    this.setData(
      {active:event.detail}
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      usrname:app.globalData.usrname,
      usrid:app.globalData.uid
    })

    var that=this;
    var usrid=this.data.usrid;
    console.log("onload here")
    wx.request({
      url: '',
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
      url: '',
      data:{
        uid:usrid,
      },
      method:'POST',
      success:function(res){
        that.setData({
          history:res.data[1],
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