// pages/upload/upload.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file_path:'',
    usrid:'',
    result:'yin',
    re1:false,
    curday:'',
    qday:'',
    curtime:''
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  handleSub:function(){
    console.log('hihihi');
    var that=this;
    var usrid=app.globalData.uid;
    that.getNowTime();
    console.log(that.data.file_path);
    that.setData({
      re1:false
    })
    if (this.data.result=='yang'){
      that.setData({
        re1:false
      })
    };
    wx.uploadFile({
      url: 'http://127.0.0.1:8000/Upload/',
      filePath: that.data.file_path[0],
      name: 'photo',
      

      formData:{
        sid:app.globalData.uid,
        date:this.data.qday,
        time:this.data.curtime,
        // result:this.data.result,
      },
      success(res){
        var jsonobj=JSON.parse(res.data)
        console.log(jsonobj)
        var path=jsonobj[0]['path']
        console.log(path)
        this.setData({
          file_path:str(path)
        })
      }

    }),
    console.log(this.data.file_path)
    wx.request({
      url: 'http://127.0.0.1:8000/UploadD/',
      data:{
        sid:app.globalData.uid,
        date:this.data.qday,
        time:this.data.curtime,
        result:this.data.re1,
        jcfs:'鼻咽拭子',
        path:this.data.file_path,            
      },
      method:'POST',
      success(res){
        console.log(res)
        if(res.data['status']==0){
          wx.showModal({
            title:'提示',
            content:'上传成功'
          })
        }
      }
      
    })
    
  },
  // afterRead(event){
  //   const {file}=event.detail;
  //   wx.uploadFile({
  //     url: 'url',
  //     filePath: 'filePath',
  //     name: 'name',
      
  //   })
  // },

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
    var qday=year+'-'+month+'-'+day;
    console.log('当前日期：',formatday)
    this.setData({
      curday:formatday,
      qday:qday
    })
    
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var curtime=h+':'+m;
    this.setData({
      curtime:curtime
    })
  },

  chooseImg:function() {
    var that=this
    wx.chooseImage({
      count:1,
      sourceType:['image'],
      // camera: 'back',
      success(res){
        const tempFilePath=res.tempFilePaths
        console.log(tempFilePath)
        that.setData({
          file_path:tempFilePath
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