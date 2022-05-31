// pages/dormMan/dormMan.js
var util=require('../../utils/util.js')
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curday:'',
    // building:'',
    qday:'',
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
    // that.setData({
    //   building:app.globalData.building
    // })

    // var building=this.data.building
    wx.request({
      url:'http://127.0.0.1:8000/StuUnrepo/',
      data:{
        sid:app.globalData.uid,
        curday:this.data.qday
      },
      method:'POST',
      success:function(res){
        console.log(res)
        that.setData({
          unreport:res.data
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
    var fullday=year+'-'+month+'-'+day;
    console.log('当前日期：',formatday)
    this.setData({
      curday:formatday,
      qday:fullday
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
    // var building=this.data.building
    var that=this
    wx.request({
      url:'http://127.0.0.1:8000/StuUnrepo/',
      data:{
        sid:app.globalData.uid,
        curday:this.data.qday
      },
      method:'POST',
      success:function(res){
        console.log(res)
        that.setData({
          unreport:res.data
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