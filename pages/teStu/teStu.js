// pages/teIndex/teIndex.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachername:'钱凯文',
    active:0,
    tid:'',
    query_stuname:'',
    query_class:'',
    query_dorm:'',
    query_bud:'',
    // query:{
    //   stuname:'',
    //   class:'',
    //   dorm:'',
    //   building:'',
    // },
    curday:'',
    teachername:'钱凯文',
    student:[
      {
        id:'0',
        pname:'钱凯文',
        pidcard:'19120219',
        dormMan:'张云帆',
        phone:'17321122258',
        building:'新世纪06',
        dorm:'204',
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
        building:'新世纪06',
        dorm:'204',
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
    that.setData({
      teachername:app.globalData.usrname,
      tid:app.globalData.tid
    })
    wx.request({
      url: 'url',
      data:{
        tid:this.data.tid,
      },
      method:'POST',
      success:function(res){
        that.setData({
          student:res.data
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
    var rev = !this.data.student[idx].isshown;
    var upd="student["+idx+"].isshown";
    var that=this;
    that.setData({
      [upd]:rev
    })
    
  },
  DeleteStu:function(e){
    var that=this;
    wx.showModal({
      title:'提示',
      content:'请确定是否删除该学生！',
      success:function(res){
        if(res.confirm){
          console.log(e.target.dataset.sid),
          wx.request({
            url: 'url',
            data:{
              sid:e.target.dataset.sid,
            },
            method:'POST',
            success:function(res){
              if(res.data['status']==true){
                wx.showModal({
                  title:'提示',
                  content:'删除学生成功'
                })
                that.Query();
              }
            }
          })
        }        
      }
    })
  },

  Judge:function(stuname,qclass,building,dorm){   // 判断检索栏是否为空，为空return false
    if(stuname==""&&qclass==""&&building==""&&dorm==""){
      return false
    }
    return true
  },

  Query:function(){
    var stuname=this.data.query_stuname;
    var qclass=this.data.query_class;
    var building=this.data.query_bud;
    var dorm=this.data.query_dorm;
    var that=this;
    if(that.Judge(stuname,qclass,building,dorm)==true){
      wx.request({
        url: 'url',
        data:{
          sname:stuname,
          sclass:qclass,
          building:building,
          room:dorm,
        },
        method:'POST',
        success:function(res){
          that.setData({
            student:res.data
          })
        }
      })
    }
    else{
      that.SearchAll();
    }
    
  },

  Setlouzhang:function(e){
    var sid=e.target.dataset.sid;
    var building=e.target.dataset.building;
    wx.showModal({
      title:'提示',
      content:'请确定是否将该学生设为楼长！',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: 'url',
            data:{
              sid:sid,
              building:building
            },
            method:'POST',
            success:function(res){
              if(res.data[status]==1){
                wx.showModal({
                  title:'提示',
                  content:'成功设为楼长！'
                })
              }
              else{
                wx.showModal({
                  title:'提示',
                  content:'学生所在楼栋已有楼长！'
                })
              }
              that.Query();
            }
          })
        }
      }
    })
  },

  UnSetlouzhang:function(e){
    var sid=e.target.dataset.sid;
    var building=e.target.dataset.building;
    var that=this
    wx.showModal({
      title:'提示',
      content:'确认取消该同学楼长职务',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: 'url',
            data:{
              sid:sid,
              building:building,
            },
            method:'POST',
            success:function(res){
              if(res.data[status]==1){
                wx.showModal({
                  title:'提示',
                  content:'成功取消该同学为楼长！'
                })
              }
              else{
                wx.showModal({
                  title:'提示',
                  content:'取消失败！'
                })
              }
              that.Query();
            }
          })
        }
      }
    })
  },

  SearchAll:function(){  // 全部人员查找
    wx.request({
      url: 'url',
      data:{
        tid:this.data.tid,
      },
      method:'POST',
      success:function(res){
        that.setData({
          student:res.data
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
    wx.request({
      url: 'url',
      data:{
        tid:this.data.tid,
      },
      method:'POST',
      success:function(res){
        that.setData({
          student:res.data
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