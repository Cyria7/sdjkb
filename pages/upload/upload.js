// pages/upload/upload.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload_pic:[],
    usrid:'',
    result:"yin",
    curday:'',
    curtime:''
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  handleSub:function(){
    var that=this;
    var usrid=app.globalData.uid;
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // var that =this;
    // that.getNowTime()
  },
  getNowTime:function(){
    var now = new Date();
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var day=now.getDate();
    if(month < 10) {
      month = '0' + month;
    };
    if(day < 10) {
      day = '0' + day;
    };
    var formatday=month+'月'+day+'日';
    
    console.log('当前日期：',formatday)
    this.setData({
      curday:formatday
    })
    
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var curtime=h+':'+m;
    this.setData({
      curtime:curtime
    })
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