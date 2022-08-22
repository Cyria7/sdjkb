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
    qday:'',
    teachername:'钱凯文',
    hesuan:[
      {
        id:'0',
        hesuan_date:'2022-05-02',
        hesuan_time:'早上8：00开始',
        info:'新世纪大学生村1-20号楼从前往后做，21-41号楼从后往前做',
      },
      {
        id:'1',
        hesuan_date:'2022-05-01',
        hesuan_time:'早上8：00开始',
        info:'新世纪大学生村1-20号楼从前往后做，21-41号楼从后往前做',
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
  notice(){
    wx.navigateTo({
      url: '../Notice/Notice',
    })
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
      url: 'http://127.0.0.1:8000/TeUnRe/',
      data:{
        tid:this.data.tid,
        time:this.data.qday
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
    var qday=year+'-'+month+'-'+day;
    console.log('当前日期：',formatday)
    this.setData({
      curday:formatday,
      qday:qday
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
    var that=this
    wx.request({
      url: 'http://127.0.0.1:8000/TeUnRe/',
      data:{
        tid:this.data.tid,
        time:this.data.qday
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