// pages/teIndex/teIndex.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    tid:'',
    curday:'',
    teachername:'钱凯文',
    unreport:[
      {
        id:'0',
        pname:'钱凯文',
        pidcard:'19120219',
        dormMan:'张云帆',

        dorm:'新世纪06-204-2',
        isshown:false,

        class:'19计科直招3班'
      },
      {
        id:'1',
        pname:'刘雨绮',
        pidcard:'19120244',
        retime:'2022-05-19 09:38',
        dormMan:'刘雨绮',
        dorm:'新世纪40-304-2',
        isshown:false,

        class:'19计科直招3班'
      }
    ],
  },
  onChange(event){
    console.log(event.detail);
    this.setData({
      active:event.detail
    })
    // var that=this
    // console.log(that.active)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that =this;
    that.getNowTime()
    that.setData({
      tid:app.globalData.uid,
      teachername:app.globalData.usrname
    })
    wx.request({
      url: 'url',
      data:{
        tid:this.data.tid,
        time:this.data.curday
      },
      method:'POST',
      success:function(res){
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
    console.log('当前日期：',formatday)
    this.setData({
      curday:formatday
    })
  },
  isShow:function(e){
    var idx=e.currentTarget.dataset.index;
    // console.log(this.data.report[idx].pname)
    var rev = !this.data.unreport[idx].isshown;
    var upd="unreport["+idx+"].isshown";
    var that=this;
    that.setData({
      [upd]:rev
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
    wx.request({
      url: 'url',
      data:{
        tid:this.data.tid,
        time:this.data.curday
      },
      method:'POST',
      success:function(res){
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