var app=getApp()
// pages/QueueProgress/QueueProgress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {//这里输出41个楼的状态array 包含楼号bid 是否完成true  在排队true 
    dormMan:true,//要得到该学生是否是楼长 和学生首页的逻辑一样
    usrname:"",
    usrid:"",
    building:1,
    curday:"",
    qday:"",
    hsdate:"",
    hstime:"",
    hsinfo:"",
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
    var qday=year+'-'+month+'-'+day
    console.log('当前日期：',formatday)
    this.setData({
      curday:formatday,
      qday:qday         // 数据库存放的日期string
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
  //监听页面加载函数中 1.确认学生是否为楼长（已完成）2.获取核酸通知数据库中【最新的】核酸通知内容
  onLoad(options) {
    this.getNowTime();
    this.setData({
      usrname:app.globalData.usrname,
      usrid:app.globalData.uid
    })
    var that = this;
    var usrid = this.data.usrid;
    wx.request({
      url: 'http://127.0.0.1:8000/Qnotice',   // 此处为核酸队列的初始查询函数
      data:{
        uid:usrid,
        curdate:that.data.qday,
      },
      method:'POST',
      success:function(res){
        that.setData({
          dormMan:res.data[0],    // 返回是否是楼长
          building:res.data[1], // 返回学生所在楼，注意是楼的名字不是编号
          hsdate:res.data[2],   // 返回下一次核酸日期
          hstime:res.data[3],   // 返回下一次核酸的时间
          hsinfo:res.data[4],   // 返回核酸信息
          array:res.data[5]   // 返回的是所有楼当前的核酸排队状态
        })
      }
    })


  },
  //点击“本楼开始排队”后的按钮绑定函数 后端配合找到本楼长管的楼 将数据库的isqueue改成true 注意iscomplish仍然是false 逻辑符合wxml中的if-elif-else
  queue:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/Qstart',
      data:{
        building:that.data.building,
      },
      method:'POST',
      success:function(res){
        that.setData({
          array:res.data
        })
      }
    })
  },
 //点击“本楼完成核酸”后的按钮绑定函数 逻辑同上
   //点击“本楼开始排队”后的按钮绑定函数 后端配合找到本楼长管的楼 将数据库的isqueue改成true 注意iscomplish仍然是false 逻辑符合wxml中的if-elif-else
  complish:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/Qfinish',
      data:{
        building:that.data.building,
      },
      method:'POST',
      success:function(res){
        that.setData({
          array:res.data
        })
      }
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
    this.getNowTime();
    this.setData({
      usrname:app.globalData.usrname,
      usrid:app.globalData.uid
    })
    var that = this;
    var usrid = this.data.usrid;
    wx.request({
      url: 'http://127.0.0.1:8000/Qnotice',   // 此处为核酸队列的初始查询函数
      data:{
        uid:usrid,
        curdate:that.data.qday,
      },
      method:'POST',
      success:function(res){
        that.setData({
          dormMan:res.data[0],    // 返回是否是楼长
          building:res.data[1], // 返回学生所在楼，注意是楼的名字不是编号
          hsdate:res.data[2],   // 返回下一次核酸日期
          hstime:res.data[3],   // 返回下一次核酸的时间
          hsinfo:res.data[4],   // 返回核酸信息
          array:res.data[5]   // 返回的是所有楼当前的核酸排队状态
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