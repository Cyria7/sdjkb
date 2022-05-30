// pages/dormMan/dormMan.js
var util=require('../../utils/util.js')
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curday:'',
    building:'',
    unreport:[
      {
        pid:'1',
        pname:'钱凯文',
        dorm:'新世纪06-204-2',
      }
    ],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that =this;
    
    that.getNowTime()
    that.setData({
      building:app.globalData.building
    })

    var building=this.data.building
    wx.request({
      url: 'url',
      data:{
        building:building
      },
      method:'POST',
      success:function(res){
        console.log(res)
        that.setData({
          unreport:res.data[0]
        })
      }
    })
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
    var building=this.data.building
    wx.request({
      url: 'url',
      data:{
        building:building
      },
      method:'POST',
      success:function(res){
        console.log(res)
        that.setData({
          unreport:res.data[0]
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