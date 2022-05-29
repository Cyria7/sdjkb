// pages/teIndex/teIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachername:'钱凯文',
    active:0,
    tabbar:[{
        idx:0,
        url:'/pages/teIndex/teIndex'
      },
      {
        idx:1,
        url:'/pages/teStu/teStu'
      }
    ],
    query_stuname:'',
    query_class:'',
    query_dorm:'',
    query_bud:'',
    query:{
      stuname:'',
      class:'',
      dorm:'',
      building:'',
    },
    curday:'',
    teachername:'钱凯文',
    student:[
      {
        id:'0',
        pname:'钱凯文',
        pidcard:'19120219',
        dormMan:'张云帆',
        phone:'17321122258',
        dorm:'新世纪06-204',
        isshown:false,
        isMan:false,
        class:'19计科直招3班'
      },
      {
        id:'1',
        pname:'张云帆',
        pidcard:'19120159',
        dormMan:'张云帆',
        phone:'17321122258',
        dorm:'新世纪06-204',
        isshown:false,
        isMan:true,
        class:'19计科直招3班'
      }
    ],
  },
  onChange(event){
    console.log(event.detail);
    this.setData({
      active:event.detail
    });
    var cur = this.data.tabbar[event.detail].url;
    wx.navigateTo({
      url: cur,
    });

  },
  regButton:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  unReport(){
    wx.navigateTo({
      url: '../unreport/unreport',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that =this;
    that.getNowTime()
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
    var rev = !this.data.student[idx].isshown;
    var upd="student["+idx+"].isshown";
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